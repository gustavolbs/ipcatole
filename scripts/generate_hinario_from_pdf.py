from __future__ import annotations

import json
import re
import statistics
import tempfile
import urllib.request
from collections import Counter
from pathlib import Path

import pdfplumber

PDF_URL = "https://novocantico.com.br/novo_cantico.pdf"
ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "data" / "index-hinario.json"
HINARIO_DIR = ROOT / "data" / "hinario"

HEADING_RE = re.compile(r"^(\d{1,3}(?:-[A-Z])?)\s+(.+)$")
NUMBERED_RE = re.compile(r"^\d{3}(?:-[A-Z])?$")

# Syllabification artifacts present in the source PDF text layer. These are
# line-layout artifacts, not intended Portuguese hyphenation.
ARTIFACT_FIXES = {
    "cora-ção": "coração",
    "induzi-do": "induzido",
    "gra-tidão": "gratidão",
    "Prometi-do": "Prometido",
    "altu-ras": "alturas",
    "a-li": "ali",
    "Despreza-do": "Desprezado",
    "is-so": "isso",
    "clarida-de": "claridade",
    "vi-da": "vida",
}


def normalize_number(raw: str) -> str:
    return raw if "-" in raw else f"{int(raw):03d}"


def clean_text(text: str) -> str:
    for source, target in ARTIFACT_FIXES.items():
        text = text.replace(source, target)
    text = re.sub(r"\s+([,;:.!?])", r"\1", text)
    return "\n".join(re.sub(r" {2,}", " ", line).strip() for line in text.splitlines())


def extract_page_lines(page) -> list[dict]:
    words = page.extract_words(extra_attrs=["fontname", "size"])
    groups: list[dict] = []

    for word in words:
        matched = False
        for group in reversed(groups[-2:]):
            if abs(group["top"] - word["top"]) <= 0.8:
                group["words"].append(word)
                matched = True
                break
        if not matched:
            groups.append({"top": word["top"], "words": [word]})

    groups.sort(key=lambda group: group["top"])
    lines: list[dict] = []
    for group in groups:
        line_words = sorted(group["words"], key=lambda word: word["x0"])
        text = " ".join(word["text"] for word in line_words).strip()
        if not text:
            continue

        italic_count = sum("Italic" in word["fontname"] for word in line_words)
        bold_count = sum("Bold" in word["fontname"] for word in line_words)
        lines.append(
            {
                "top": group["top"],
                "text": text,
                "italic": italic_count >= (len(line_words) + 1) // 2,
                "bold": bold_count >= (len(line_words) + 1) // 2,
                "size": statistics.median(word["size"] for word in line_words),
            }
        )
    return lines


def extract_hymns(pdf_path: Path) -> dict[str, list[dict]]:
    hymns: dict[str, list[dict]] = {}
    current: str | None = None

    with pdfplumber.open(pdf_path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            for line in extract_page_lines(page):
                text = line["text"]
                match = HEADING_RE.match(text)
                is_heading = bool(match and line["bold"] and line["top"] < 20)

                # The source PDF omits the printed heading for hymn 378. It
                # begins near the bottom of PDF page 386, immediately after 377.
                is_missing_378_heading = (
                    page_index == 385
                    and line["top"] > 650
                    and text.startswith("Por nossa Pátria oramos")
                )

                if is_heading and match:
                    current = normalize_number(match.group(1))
                    hymns.setdefault(current, [])
                    continue

                if is_missing_378_heading:
                    current = "378"
                    hymns.setdefault(current, [])

                if current:
                    hymns[current].append({**line, "page": page_index})

    return hymns


def to_stanzas(lines: list[dict]) -> list[str]:
    blocks: list[list[dict]] = []
    current: list[dict] = []
    previous: dict | None = None

    for line in lines:
        split = False
        if previous is not None:
            if line["italic"] != previous["italic"]:
                split = True
            elif line["page"] == previous["page"]:
                # Body lines are normally 17.25 pt apart; stanza/refrain
                # boundaries use a visibly larger vertical gap (~32 pt).
                if line["top"] - previous["top"] > 24:
                    split = True
            else:
                # The few multi-page hymns continue their current stanza across
                # the page boundary in this PDF.
                split = False

        if split and current:
            blocks.append(current)
            current = []

        current.append(line)
        previous = line

    if current:
        blocks.append(current)

    stanzas: list[str] = []
    for block in blocks:
        text = clean_text("\n".join(line["text"] for line in block).strip())
        if block and all(line["italic"] for line in block):
            text = "chorus:" + text
        stanzas.append(text)
    return stanzas


def download_pdf(destination: Path) -> None:
    request = urllib.request.Request(
        PDF_URL,
        headers={"User-Agent": "Mozilla/5.0 (compatible; IPCatole-HNC-Importer/1.0)"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        destination.write_bytes(response.read())


def main() -> None:
    index = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    metadata = {entry["numero"]: entry for entry in index}

    desired = [
        entry["numero"]
        for entry in index
        if NUMBERED_RE.match(entry["numero"])
        and int(entry["numero"].split("-")[0]) >= 49
    ]
    if len(desired) != 358:
        raise RuntimeError(f"Expected 358 hymns from 049 onward; found {len(desired)}")

    with tempfile.TemporaryDirectory() as temp_dir:
        pdf_path = Path(temp_dir) / "novo_cantico.pdf"
        download_pdf(pdf_path)
        extracted = extract_hymns(pdf_path)

    missing = [number for number in desired if number not in extracted]
    if missing:
        raise RuntimeError(f"Missing hymns in PDF extraction: {missing}")

    HINARIO_DIR.mkdir(parents=True, exist_ok=True)

    for number in desired:
        meta = metadata[number]
        stanzas = to_stanzas(extracted[number])
        if not stanzas or any(not stanza.strip() for stanza in stanzas):
            raise RuntimeError(f"Invalid stanza extraction for hymn {number}")

        payload = {
            "numero": number,
            "titulo": meta["titulo"],
            "categoria": meta["categoria"],
            "estrofes": stanzas,
        }
        (HINARIO_DIR / f"{number}.json").write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    # 048 already contains the correct lyric, but its title was accidentally
    # duplicated from hymn 047. Preserve its stanzas and repair metadata only.
    hymn_48_path = HINARIO_DIR / "048.json"
    hymn_48 = json.loads(hymn_48_path.read_text(encoding="utf-8"))
    hymn_48["titulo"] = metadata["048"]["titulo"]
    hymn_48["categoria"] = metadata["048"]["categoria"]
    hymn_48_path.write_text(
        json.dumps(hymn_48, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    # Final structural validation against the canonical project index.
    for number in ["048", *desired]:
        path = HINARIO_DIR / f"{number}.json"
        payload = json.loads(path.read_text(encoding="utf-8"))
        meta = metadata[number]
        assert payload["numero"] == number
        assert payload["titulo"] == meta["titulo"]
        assert payload["categoria"] == meta["categoria"]
        assert isinstance(payload["estrofes"], list) and payload["estrofes"]

    print(f"Generated and validated {len(desired)} hymns plus corrected 048.json")


if __name__ == "__main__":
    main()
