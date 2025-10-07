import { Church, Instagram, Youtube, Music, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Church className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg">
                Igreja Presbiteriana do Catolé
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sola Scriptura, Sola Gratia, Sola Fide, Solus Christus, Soli Deo
              Gloria
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ipcatole"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Nosso Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/c/IgrejaPresbiterianadoCatol%C3%A9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Canal no YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://open.spotify.com/playlist/64MgFUDhHzokXvR5NOJFyt?si=c90475031aad4c2f"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Playlist de Louvores no Spotify"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Horários de Culto */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Horários de Culto
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium">Domingo</p>
                <p className="text-muted-foreground">10h - Escola Dominical</p>
                <p className="text-muted-foreground">18h - Culto Vespertino</p>
              </div>
              <div className="pt-2">
                <p className="font-medium">Quarta-feira</p>
                <p className="text-muted-foreground">19h - Culto de Oração</p>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Localização
            </h3>
            <address className="text-sm text-muted-foreground not-italic">
              <p>Rua Manoel Paulino, 525</p>
              <p>Itararé - Campina Grande/PB</p>
              <p>CEP 58411-140</p>
              <p className="mt-2">presbiterianacatole@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Igreja Presbiteriana. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
