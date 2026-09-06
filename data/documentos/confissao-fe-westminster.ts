import type { ChurchDocument } from "./types";

export type WestminsterConfessionParagraph = {
  number: number;
  text: string;
};

export type WestminsterConfessionChapter = {
  number: number;
  title: string;
  paragraphs: WestminsterConfessionParagraph[];
};

export const westminsterConfessionChapters: WestminsterConfessionChapter[] = [
  {
    number: 1,
    title: "Das Sagradas Escrituras",
    paragraphs: [
      {
        number: 1,
        text: "Embora a luz da natureza e as obras da criação e da providência manifestem a bondade, a sabedoria e o poder de Deus de modo suficiente para deixar os homens indesculpáveis, elas não bastam para comunicar o conhecimento de Deus e de sua vontade necessário à salvação. Por isso, aprouve ao Senhor, em diversos tempos e de diferentes maneiras, revelar-se e declarar sua vontade à sua Igreja; e, depois, para melhor preservar e propagar a verdade e para o estabelecimento e consolo mais seguros da Igreja contra a corrupção da carne, a malícia de Satanás e do mundo, aprouve-lhe registrar inteiramente essa revelação por escrito. Assim, as Sagradas Escrituras se tornam absolutamente necessárias, tendo cessado os antigos modos pelos quais Deus revelava sua vontade ao seu povo.",
      },
      {
        number: 2,
        text: "Sob o nome de Sagradas Escrituras, ou Palavra de Deus escrita, estão agora contidos todos os livros do Antigo e do Novo Testamento: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 e 2 Samuel, 1 e 2 Reis, 1 e 2 Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cântico dos Cânticos, Isaías, Jeremias, Lamentações, Ezequiel, Daniel, Oseias, Joel, Amós, Obadias, Jonas, Miqueias, Naum, Habacuque, Sofonias, Ageu, Zacarias e Malaquias; Mateus, Marcos, Lucas, João, Atos dos Apóstolos, Romanos, 1 e 2 Coríntios, Gálatas, Efésios, Filipenses, Colossenses, 1 e 2 Tessalonicenses, 1 e 2 Timóteo, Tito, Filemom, Hebreus, Tiago, 1 e 2 Pedro, 1, 2 e 3 João, Judas e Apocalipse. Todos esses livros foram dados por inspiração de Deus para serem a regra de fé e de vida.",
      },
      {
        number: 3,
        text: "Os livros geralmente chamados Apócrifos, não sendo de inspiração divina, não fazem parte do cânon das Escrituras; portanto, não possuem autoridade na Igreja de Deus, nem devem ser aprovados ou utilizados de modo diferente de quaisquer outros escritos humanos.",
      },
      {
        number: 4,
        text: "A autoridade das Sagradas Escrituras, pela qual devem ser cridas e obedecidas, não depende do testemunho de qualquer homem ou igreja, mas inteiramente de Deus, que é a própria verdade e seu Autor. Por isso, devem ser recebidas porque são a Palavra de Deus.",
      },
      {
        number: 5,
        text: "Podemos ser movidos e levados pelo testemunho da Igreja a uma elevada e reverente estima pelas Sagradas Escrituras. A excelência celestial de seu conteúdo, a eficácia de sua doutrina, a majestade de seu estilo, a harmonia de todas as suas partes, o propósito do conjunto — dar toda glória a Deus —, a plena revelação do único caminho de salvação do homem, suas muitas outras excelências incomparáveis e sua inteira perfeição são argumentos pelos quais ela demonstra abundantemente ser a Palavra de Deus. Contudo, nossa plena persuasão e certeza de sua verdade infalível e autoridade divina provêm da obra interior do Espírito Santo, que testemunha por meio da Palavra e com a Palavra em nosso coração.",
      },
      {
        number: 6,
        text: "Todo o conselho de Deus acerca de todas as coisas necessárias para sua própria glória, para a salvação, fé e vida do homem está expressamente registrado nas Escrituras ou pode ser delas deduzido por boa e necessária consequência. Nada, em tempo algum, deve ser acrescentado a elas, seja por novas revelações do Espírito, seja por tradições humanas. Reconhecemos, contudo, que a iluminação interior do Espírito de Deus é necessária para a compreensão salvadora das coisas reveladas na Palavra; e que há circunstâncias relativas ao culto de Deus e ao governo da Igreja, comuns às ações e sociedades humanas, que devem ser ordenadas pela luz da natureza e pela prudência cristã, segundo as regras gerais da Palavra, que sempre devem ser observadas.",
      },
      {
        number: 7,
        text: "Nem todas as coisas nas Escrituras são igualmente claras em si mesmas, nem igualmente evidentes a todos. Entretanto, as coisas que precisam ser conhecidas, cridas e observadas para a salvação estão tão claramente apresentadas e explicadas em algum lugar das Escrituras que tanto os instruídos quanto os simples, mediante o uso adequado dos meios ordinários, podem alcançar suficiente entendimento delas.",
      },
      {
        number: 8,
        text: "O Antigo Testamento em hebraico, língua nativa do antigo povo de Deus, e o Novo Testamento em grego, língua geralmente conhecida entre as nações no tempo em que foi escrito, sendo imediatamente inspirados por Deus e, por seu singular cuidado e providência, conservados puros em todas as eras, são, por isso, autênticos; de modo que, em todas as controvérsias religiosas, a Igreja deve apelar finalmente para eles. Como, porém, essas línguas originais não são conhecidas por todo o povo de Deus, que tem direito e interesse nas Escrituras e é ordenado, no temor de Deus, a lê-las e examiná-las, elas devem ser traduzidas para a língua comum de cada nação a que chegarem, para que, habitando ricamente a Palavra de Deus em todos, adorem a Deus de modo aceitável e, pela paciência e consolação das Escrituras, tenham esperança.",
      },
      {
        number: 9,
        text: "A regra infalível de interpretação das Escrituras é a própria Escritura. Portanto, quando houver questão a respeito do verdadeiro e pleno sentido de qualquer passagem — sentido que não é múltiplo, mas um —, ele deve ser investigado e conhecido por outros lugares que falem mais claramente.",
      },
      {
        number: 10,
        text: "O Juiz Supremo por quem todas as controvérsias religiosas devem ser determinadas, todos os decretos de concílios, opiniões de escritores antigos, doutrinas humanas e espíritos particulares devem ser examinados, e em cuja sentença devemos descansar, não pode ser outro senão o Espírito Santo falando nas Escrituras.",
      },
    ],
  },
  {
    number: 2,
    title: "De Deus e da Santíssima Trindade",
    paragraphs: [
      {
        number: 1,
        text: "Há um só Deus, vivo e verdadeiro, infinito em ser e perfeição, espírito puríssimo, invisível, sem corpo, partes ou paixões; imutável, imenso, eterno, incompreensível, todo-poderoso, sapientíssimo, santíssimo, plenamente livre e absoluto; que opera todas as coisas segundo o conselho de sua própria vontade imutável e justíssima, para sua própria glória; amorosíssimo, gracioso, misericordioso, longânimo, abundante em bondade e verdade, perdoador da iniquidade, transgressão e pecado; galardoador dos que o buscam diligentemente; e, ao mesmo tempo, justíssimo e terrível em seus juízos, odiando todo pecado e de modo algum tendo por inocente o culpado.",
      },
      {
        number: 2,
        text: "Deus possui em si mesmo e de si mesmo toda vida, glória, bondade e bem-aventurança; é, em si e para si, totalmente suficiente, não necessitando de nenhuma criatura que tenha feito nem derivando delas glória alguma, mas somente manifestando sua própria glória nelas, por elas, para elas e sobre elas. Ele é a única fonte de todo ser, de quem, por quem e para quem são todas as coisas; e tem sobre elas domínio soberaníssimo para fazer por elas, para elas ou sobre elas tudo quanto lhe agrada. Diante dele todas as coisas estão abertas e manifestas; seu conhecimento é infinito, infalível e independente da criatura, de modo que nada é para ele contingente ou incerto. Ele é santíssimo em todos os seus conselhos, obras e mandamentos. A ele são devidos, por anjos, homens e toda criatura, todo culto, serviço e obediência que lhe aprouver requerer.",
      },
      {
        number: 3,
        text: "Na unidade da Divindade há três pessoas, de uma só substância, poder e eternidade: Deus Pai, Deus Filho e Deus Espírito Santo. O Pai não procede de ninguém, nem é gerado; o Filho é eternamente gerado do Pai; o Espírito Santo procede eternamente do Pai e do Filho.",
      },
    ],
  },
  {
    number: 3,
    title: "Do Decreto Eterno de Deus",
    paragraphs: [
      {
        number: 1,
        text: "Desde toda a eternidade, Deus, pelo sapientíssimo e santíssimo conselho de sua própria vontade, ordenou livre e imutavelmente tudo quanto acontece; contudo, de tal maneira que Deus não é autor do pecado, nem se faz violência à vontade das criaturas, nem se elimina a liberdade ou contingência das causas secundárias, antes elas são estabelecidas.",
      },
      {
        number: 2,
        text: "Embora Deus conheça tudo quanto pode ou poderia acontecer sob todas as condições imagináveis, ele não decretou coisa alguma porque a previu como futura ou como algo que aconteceria sob determinadas condições.",
      },
      {
        number: 3,
        text: "Pelo decreto de Deus, para manifestação de sua glória, alguns homens e anjos são predestinados para a vida eterna, e outros preordenados para a morte eterna.",
      },
      {
        number: 4,
        text: "Esses anjos e homens, assim predestinados e preordenados, são particular e imutavelmente designados; e seu número é tão certo e definido que não pode ser aumentado nem diminuído.",
      },
      {
        number: 5,
        text: "Aqueles dentre a humanidade que são predestinados para a vida, Deus, antes de lançar os fundamentos do mundo, segundo seu propósito eterno e imutável e o secreto conselho e beneplácito de sua vontade, escolheu em Cristo para a glória eterna, por sua mera e livre graça e amor, sem qualquer previsão de fé ou boas obras, de perseverança nelas, ou de qualquer outra coisa na criatura como condição ou causa que o movesse a isso; e tudo para louvor de sua gloriosa graça.",
      },
      {
        number: 6,
        text: "Assim como Deus designou os eleitos para a glória, também preordenou, pelo eterno e libérrimo propósito de sua vontade, todos os meios para esse fim. Portanto, os eleitos, tendo caído em Adão, são redimidos por Cristo, eficazmente chamados à fé em Cristo por seu Espírito no devido tempo, justificados, adotados, santificados e guardados por seu poder, mediante a fé, para a salvação. Nenhum outro é redimido por Cristo, eficazmente chamado, justificado, adotado, santificado e salvo, senão os eleitos.",
      },
      {
        number: 7,
        text: "Quanto ao restante da humanidade, aprouve a Deus, segundo o insondável conselho de sua própria vontade, pela qual concede ou retém misericórdia como lhe apraz, para a glória de seu soberano poder sobre suas criaturas, deixá-los passar e ordená-los à desonra e à ira por causa de seus pecados, para louvor de sua gloriosa justiça.",
      },
      {
        number: 8,
        text: "A doutrina deste elevado mistério da predestinação deve ser tratada com especial prudência e cuidado, para que os homens, atendendo à vontade de Deus revelada em sua Palavra e prestando-lhe obediência, possam, pela certeza de sua vocação eficaz, ter segurança de sua eleição eterna. Assim, essa doutrina fornecerá motivo de louvor, reverência e admiração de Deus, bem como de humildade, diligência e abundante consolação a todos os que sinceramente obedecem ao evangelho.",
      },
    ],
  },
  {
    number: 4,
    title: "Da Criação",
    paragraphs: [
      {
        number: 1,
        text: "Aprouve a Deus Pai, Filho e Espírito Santo, para manifestação da glória de seu eterno poder, sabedoria e bondade, no princípio criar, ou fazer do nada, o mundo e todas as coisas nele, visíveis ou invisíveis, no espaço de seis dias, e tudo muito bom.",
      },
      {
        number: 2,
        text: "Depois de Deus ter feito todas as demais criaturas, criou o homem, macho e fêmea, com almas racionais e imortais, dotados de conhecimento, justiça e verdadeira santidade, segundo sua própria imagem; tendo a lei de Deus escrita em seus corações e poder para cumpri-la, embora sujeitos à possibilidade de transgredir, por terem sido deixados à liberdade de sua própria vontade, que era mutável. Além dessa lei escrita em seus corações, receberam o mandamento de não comer da árvore do conhecimento do bem e do mal; enquanto guardassem esse mandamento, eram felizes em sua comunhão com Deus e tinham domínio sobre as criaturas.",
      },
    ],
  },
  {
    number: 5,
    title: "Da Providência",
    paragraphs: [
      {
        number: 1,
        text: "Deus, o grande Criador de todas as coisas, sustenta, dirige, dispõe e governa todas as criaturas, ações e coisas, desde a maior até a menor, por sua sapientíssima e santíssima providência, segundo sua presciência infalível e o livre e imutável conselho de sua própria vontade, para louvor da glória de sua sabedoria, poder, justiça, bondade e misericórdia.",
      },
      {
        number: 2,
        text: "Embora, em relação à presciência e ao decreto de Deus, a causa primeira, todas as coisas aconteçam imutável e infalivelmente, pela mesma providência ele ordena que ocorram conforme a natureza das causas secundárias, seja necessária, livre ou contingentemente.",
      },
      {
        number: 3,
        text: "Em sua providência ordinária, Deus faz uso de meios; contudo, é livre para operar sem eles, acima deles e contra eles, conforme lhe apraz.",
      },
      {
        number: 4,
        text: "O poder onipotente, a sabedoria insondável e a bondade infinita de Deus manifestam-se de tal modo em sua providência que ela se estende até mesmo à primeira queda e a todos os demais pecados de anjos e homens; e isso não por mera permissão, mas por uma permissão acompanhada de sapientíssimo e poderosíssimo limite, ordenação e governo deles, em uma multiforme dispensação, para seus próprios fins santos. Contudo, a pecaminosidade desses atos procede somente da criatura, e não de Deus, que, sendo santíssimo e justíssimo, não é nem pode ser autor ou aprovador do pecado.",
      },
      {
        number: 5,
        text: "O sapientíssimo, justíssimo e gracioso Deus frequentemente deixa, por algum tempo, seus próprios filhos sujeitos a muitas tentações e à corrupção de seus próprios corações, para castigá-los por pecados anteriores, revelar-lhes a força oculta da corrupção e a falsidade de seus corações, a fim de que sejam humilhados, levá-los a dependência mais íntima e constante dele para seu sustento, torná-los mais vigilantes contra futuras ocasiões de pecado e alcançar outros fins justos e santos.",
      },
      {
        number: 6,
        text: "Quanto aos homens perversos e ímpios, a quem Deus, como justo Juiz, cega e endurece por pecados anteriores, ele não apenas retém deles sua graça, pela qual poderiam ter sido iluminados no entendimento e tocados no coração, mas às vezes também retira os dons que possuíam, expondo-os a objetos que sua corrupção transforma em ocasiões de pecado; além disso, entrega-os às próprias concupiscências, às tentações do mundo e ao poder de Satanás, de modo que se endurecem até mesmo sob os meios que Deus usa para abrandar outros.",
      },
      {
        number: 7,
        text: "Assim como a providência de Deus alcança, em geral, todas as criaturas, de modo especialíssimo ela cuida de sua Igreja e dispõe todas as coisas para o bem dela.",
      },
    ],
  },
  {
    number: 6,
    title: "Da Queda do Homem, do Pecado e de seu Castigo",
    paragraphs: [
      {
        number: 1,
        text: "Nossos primeiros pais, seduzidos pela sutileza e tentação de Satanás, pecaram ao comer o fruto proibido. Aprouve a Deus, segundo seu sábio e santo conselho, permitir esse pecado, tendo determinado ordená-lo para sua própria glória.",
      },
      {
        number: 2,
        text: "Por esse pecado eles caíram de sua justiça original e da comunhão com Deus, tornando-se mortos em pecado e inteiramente corrompidos em todas as partes e faculdades da alma e do corpo.",
      },
      {
        number: 3,
        text: "Sendo eles a raiz de toda a humanidade, a culpa desse pecado foi imputada e a mesma morte no pecado e natureza corrompida foram transmitidas a toda a posteridade que deles descende por geração ordinária.",
      },
      {
        number: 4,
        text: "Dessa corrupção original, pela qual somos totalmente indispostos, incapacitados e opostos a todo bem e inteiramente inclinados a todo mal, procedem todas as transgressões atuais.",
      },
      {
        number: 5,
        text: "Essa corrupção da natureza permanece, durante esta vida, naqueles que são regenerados; e, embora seja perdoada e mortificada por Cristo, tanto ela quanto todos os seus movimentos são verdadeira e propriamente pecado.",
      },
      {
        number: 6,
        text: "Todo pecado, tanto original quanto atual, sendo transgressão da justa lei de Deus e contrário a ela, traz por sua própria natureza culpa sobre o pecador, pelo que ele fica sujeito à ira de Deus e à maldição da lei e, assim, à morte, com todas as misérias espirituais, temporais e eternas.",
      },
    ],
  },
  {
    number: 7,
    title: "Da Aliança de Deus com o Homem",
    paragraphs: [
      {
        number: 1,
        text: "A distância entre Deus e a criatura é tão grande que, embora criaturas racionais lhe devam obediência como seu Criador, jamais poderiam desfrutá-lo como bem-aventurança e recompensa sem alguma condescendência voluntária da parte de Deus, que ele se agradou em expressar por meio de aliança.",
      },
      {
        number: 2,
        text: "A primeira aliança feita com o homem foi uma aliança de obras, na qual a vida foi prometida a Adão e, nele, à sua posteridade, sob a condição de obediência perfeita e pessoal.",
      },
      {
        number: 3,
        text: "Tendo o homem, por sua queda, tornado-se incapaz de alcançar a vida por essa aliança, aprouve ao Senhor fazer uma segunda, geralmente chamada aliança da graça, na qual ele oferece gratuitamente aos pecadores vida e salvação por Jesus Cristo, requerendo deles fé em Cristo para que sejam salvos e prometendo dar seu Espírito Santo a todos os que são ordenados para a vida eterna, a fim de torná-los dispostos e capazes de crer.",
      },
      {
        number: 4,
        text: "Essa aliança da graça é frequentemente apresentada nas Escrituras pelo nome de testamento, em referência à morte de Jesus Cristo, o Testador, e à herança eterna, com todas as coisas que a ela pertencem e que nela são legadas.",
      },
      {
        number: 5,
        text: "Essa aliança foi administrada de maneira diferente no tempo da lei e no tempo do evangelho. Sob a lei, foi administrada por promessas, profecias, sacrifícios, circuncisão, cordeiro pascal e outros tipos e ordenanças dados ao povo judeu, todos prefigurando Cristo que havia de vir; esses meios eram, naquele tempo, suficientes e eficazes, pela operação do Espírito, para instruir e edificar os eleitos na fé no Messias prometido, por quem tinham plena remissão dos pecados e salvação eterna. Essa administração é chamada Antigo Testamento.",
      },
      {
        number: 6,
        text: "Sob o evangelho, quando Cristo, a substância, foi manifestado, as ordenanças pelas quais essa aliança é dispensada são a pregação da Palavra e a administração dos sacramentos do batismo e da Ceia do Senhor. Embora sejam menos numerosas e administradas com maior simplicidade e menor glória externa, nelas a aliança é apresentada com maior plenitude, evidência e eficácia espiritual a todas as nações, tanto judeus quanto gentios, e é chamada Novo Testamento. Portanto, não existem duas alianças da graça diferentes em substância, mas uma e a mesma sob diferentes dispensações.",
      },
    ],
  },
  {
    number: 8,
    title: "De Cristo, o Mediador",
    paragraphs: [
      {
        number: 1,
        text: "Aprouve a Deus, em seu propósito eterno, escolher e ordenar o Senhor Jesus, seu Filho unigênito, para ser o Mediador entre Deus e o homem, Profeta, Sacerdote e Rei, Cabeça e Salvador de sua Igreja, Herdeiro de todas as coisas e Juiz do mundo; a quem, desde toda a eternidade, deu um povo para ser sua descendência e, no tempo, por ele ser redimido, chamado, justificado, santificado e glorificado.",
      },
      {
        number: 2,
        text: "O Filho de Deus, segunda pessoa da Trindade, sendo verdadeiro e eterno Deus, de uma só substância e igual ao Pai, quando chegou a plenitude do tempo tomou sobre si a natureza humana, com todas as suas propriedades essenciais e fraquezas comuns, contudo sem pecado; foi concebido pelo poder do Espírito Santo no ventre da virgem Maria, da substância dela. Assim, duas naturezas inteiras, perfeitas e distintas, a divina e a humana, foram inseparavelmente unidas em uma só pessoa, sem conversão, composição ou confusão. Essa pessoa é verdadeiro Deus e verdadeiro homem, contudo um só Cristo, o único Mediador entre Deus e os homens.",
      },
      {
        number: 3,
        text: "O Senhor Jesus, em sua natureza humana assim unida à divina, foi santificado e ungido com o Espírito Santo sem medida, possuindo em si todos os tesouros da sabedoria e do conhecimento; e aprouve ao Pai que nele habitasse toda a plenitude, para que, sendo santo, inocente, imaculado e cheio de graça e verdade, estivesse plenamente preparado para exercer o ofício de Mediador e Fiador. Esse ofício ele não tomou para si mesmo, mas foi chamado pelo Pai, que colocou em suas mãos todo poder e juízo e lhe deu ordem para exercê-lo.",
      },
      {
        number: 4,
        text: "O Senhor Jesus assumiu esse ofício de modo inteiramente voluntário. Para cumpri-lo, foi feito sujeito à lei e a cumpriu perfeitamente; suportou tormentos gravíssimos diretamente em sua alma e sofrimentos dolorosíssimos em seu corpo; foi crucificado e morreu, foi sepultado e permaneceu sob o poder da morte, sem, contudo, ver corrupção. No terceiro dia ressuscitou dentre os mortos com o mesmo corpo em que sofreu; com ele também subiu ao céu, onde está sentado à direita de seu Pai, fazendo intercessão, e de onde voltará para julgar homens e anjos no fim do mundo.",
      },
      {
        number: 5,
        text: "O Senhor Jesus, por sua perfeita obediência e pelo sacrifício de si mesmo, que pelo Espírito eterno ofereceu uma única vez a Deus, satisfez plenamente a justiça de seu Pai e adquiriu não apenas reconciliação, mas também uma herança eterna no reino dos céus para todos aqueles que o Pai lhe deu.",
      },
      {
        number: 6,
        text: "Embora a obra da redenção não tenha sido efetivamente realizada por Cristo senão depois de sua encarnação, sua virtude, eficácia e benefícios foram comunicados aos eleitos em todas as eras sucessivas desde o princípio do mundo, por meio das promessas, tipos e sacrifícios nos quais ele foi revelado e significado como a descendência da mulher que esmagaria a cabeça da serpente e como o Cordeiro morto desde o princípio do mundo, sendo o mesmo ontem, hoje e para sempre.",
      },
      {
        number: 7,
        text: "Cristo, na obra da mediação, age segundo ambas as naturezas, cada natureza fazendo aquilo que lhe é próprio; contudo, em razão da unidade da pessoa, aquilo que é próprio de uma natureza é, nas Escrituras, às vezes atribuído à pessoa denominada pela outra natureza.",
      },
      {
        number: 8,
        text: "A todos aqueles para quem Cristo adquiriu redenção, ele certamente e eficazmente a aplica e comunica, intercedendo por eles, revelando-lhes, na Palavra e por meio dela, os mistérios da salvação, persuadindo-os eficazmente por seu Espírito a crer e obedecer e governando seus corações por sua Palavra e Espírito; e vencendo todos os seus inimigos por seu onipotente poder e sabedoria, da maneira e pelos meios mais conformes à sua maravilhosa e insondável dispensação.",
      },
    ],
  },
  {
    number: 9,
    title: "Do Livre-Arbítrio",
    paragraphs: [
      { number: 1, text: "Deus dotou a vontade do homem de uma liberdade natural tal que ela não é forçada nem, por qualquer necessidade absoluta da natureza, determinada ao bem ou ao mal." },
      { number: 2, text: "O homem, em seu estado de inocência, tinha liberdade e poder para querer e fazer aquilo que era bom e agradável a Deus; contudo, de modo mutável, de forma que pudesse cair desse estado." },
      { number: 3, text: "O homem, por sua queda em estado de pecado, perdeu inteiramente toda capacidade da vontade para qualquer bem espiritual que acompanhe a salvação; de modo que o homem natural, sendo totalmente contrário a esse bem e morto em pecado, não é capaz, por sua própria força, de converter-se ou de preparar-se para isso." },
      { number: 4, text: "Quando Deus converte um pecador e o transfere para o estado de graça, liberta-o de sua escravidão natural ao pecado e, somente por sua graça, capacita-o a querer e fazer livremente aquilo que é espiritualmente bom; contudo, por causa da corrupção que nele permanece, ele não quer perfeita e exclusivamente o bem, mas também quer o mal." },
      { number: 5, text: "A vontade do homem é tornada perfeita e imutavelmente livre somente para o bem apenas no estado de glória." },
    ],
  },
  {
    number: 10,
    title: "Do Chamamento Eficaz",
    paragraphs: [
      { number: 1, text: "A todos aqueles que Deus predestinou para a vida, e somente a eles, aprouve-lhe, no tempo por ele determinado e aceito, chamar eficazmente por sua Palavra e Espírito, tirando-os do estado de pecado e morte em que se encontram por natureza e conduzindo-os à graça e salvação por Jesus Cristo; iluminando espiritual e salvificamente suas mentes para compreenderem as coisas de Deus; tirando-lhes o coração de pedra e dando-lhes um coração de carne; renovando suas vontades e, por seu onipotente poder, determinando-as para o bem; e atraindo-os eficazmente a Jesus Cristo, de modo que vêm livremente, sendo tornados dispostos por sua graça." },
      { number: 2, text: "Esse chamamento eficaz procede unicamente da livre e especial graça de Deus, e não de coisa alguma previamente vista no homem, que é inteiramente passivo nisso até que, vivificado e renovado pelo Espírito Santo, seja assim capacitado a responder ao chamamento e a abraçar a graça nele oferecida e comunicada." },
      { number: 3, text: "As crianças eleitas que morrem na infância são regeneradas e salvas por Cristo, por meio do Espírito, que opera quando, onde e como lhe apraz; o mesmo ocorre com todas as demais pessoas eleitas incapazes de serem exteriormente chamadas pelo ministério da Palavra." },
      { number: 4, text: "Outros, não eleitos, embora possam ser chamados pelo ministério da Palavra e experimentar algumas operações comuns do Espírito, nunca vêm verdadeiramente a Cristo e, portanto, não podem ser salvos. Muito menos podem ser salvos por qualquer outro meio os que não professam a religião cristã, por mais diligentes que sejam em moldar sua vida segundo a luz da natureza e as leis da religião que professam. Afirmar e sustentar que podem ser salvos dessa maneira é muito pernicioso e deve ser rejeitado." },
    ],
  },
  {
    number: 11,
    title: "Da Justificação",
    paragraphs: [
      { number: 1, text: "Aqueles a quem Deus chama eficazmente, ele também justifica gratuitamente; não infundindo neles justiça, mas perdoando seus pecados e considerando e aceitando suas pessoas como justas, não por coisa alguma neles operada ou por eles realizada, mas unicamente por causa de Cristo; nem imputando-lhes como justiça a própria fé, o ato de crer ou qualquer outra obediência evangélica, mas imputando-lhes a obediência e satisfação de Cristo, enquanto recebem e descansam nele e em sua justiça pela fé; fé que não procede deles mesmos, mas é dom de Deus." },
      { number: 2, text: "A fé, assim recebendo e descansando em Cristo e em sua justiça, é o único instrumento da justificação; contudo, não está sozinha na pessoa justificada, mas é sempre acompanhada de todas as demais graças salvadoras e não é uma fé morta, mas atua pelo amor." },
      { number: 3, text: "Cristo, por sua obediência e morte, pagou plenamente a dívida de todos os que são assim justificados e ofereceu à justiça de seu Pai, em favor deles, satisfação própria, real e completa. Contudo, visto que ele foi dado pelo Pai por eles, e sua obediência e satisfação foram aceitas em lugar deles, ambas gratuitamente e não por coisa alguma neles, sua justificação é somente pela livre graça, para que tanto a exata justiça quanto a rica graça de Deus sejam glorificadas na justificação dos pecadores." },
      { number: 4, text: "Deus decretou desde toda a eternidade justificar todos os eleitos; e Cristo, na plenitude do tempo, morreu pelos pecados deles e ressuscitou para sua justificação. Contudo, eles não são justificados até que o Espírito Santo, no devido tempo, lhes aplique efetivamente Cristo." },
      { number: 5, text: "Deus continua a perdoar os pecados dos que são justificados; e, embora jamais possam cair do estado de justificação, podem, por seus pecados, cair sob o desagrado paternal de Deus e não ter restaurada a luz de seu rosto até que se humilhem, confessem seus pecados, peçam perdão e renovem sua fé e arrependimento." },
      { number: 6, text: "A justificação dos crentes sob o Antigo Testamento era, em todos esses aspectos, uma e a mesma com a justificação dos crentes sob o Novo Testamento." },
    ],
  },
  {
    number: 12,
    title: "Da Adoção",
    paragraphs: [
      { number: 1, text: "A todos os que são justificados, Deus se digna, em seu único Filho Jesus Cristo e por causa dele, fazer participantes da graça da adoção. Por ela são recebidos no número dos filhos de Deus e desfrutam de suas liberdades e privilégios; recebem sobre si o nome de Deus, recebem o Espírito de adoção, têm acesso ao trono da graça com confiança, são capacitados a clamar: Aba, Pai; são compadecidos, protegidos, sustentados e disciplinados por ele como por um pai; contudo, nunca são rejeitados, mas selados para o dia da redenção e herdam as promessas como herdeiros da salvação eterna." },
    ],
  },
  {
    number: 13,
    title: "Da Santificação",
    paragraphs: [
      { number: 1, text: "Aqueles que são eficazmente chamados e regenerados, tendo um novo coração e um novo espírito criados neles, são ainda santificados real e pessoalmente pela virtude da morte e ressurreição de Cristo, por sua Palavra e Espírito que neles habitam. O domínio de todo o corpo do pecado é destruído, suas diversas concupiscências são cada vez mais enfraquecidas e mortificadas, e eles são cada vez mais vivificados e fortalecidos em todas as graças salvadoras, para a prática da verdadeira santidade, sem a qual ninguém verá o Senhor." },
      { number: 2, text: "Essa santificação alcança o homem inteiro, embora seja imperfeita nesta vida, permanecendo ainda resíduos de corrupção em cada parte; daí surge uma guerra contínua e irreconciliável, a carne desejando contra o Espírito e o Espírito contra a carne." },
      { number: 3, text: "Nessa guerra, embora a corrupção remanescente possa por algum tempo prevalecer muito, mediante o contínuo suprimento de força do Espírito santificador de Cristo a parte regenerada vence; e assim os santos crescem em graça, aperfeiçoando a santidade no temor de Deus." },
    ],
  },
  {
    number: 14,
    title: "Da Fé Salvadora",
    paragraphs: [
      { number: 1, text: "A graça da fé, pela qual os eleitos são capacitados a crer para a salvação de suas almas, é obra do Espírito de Cristo em seus corações e é ordinariamente produzida pelo ministério da Palavra; também é aumentada e fortalecida pela Palavra, pela administração dos sacramentos e pela oração." },
      { number: 2, text: "Por essa fé, o cristão crê ser verdadeiro tudo quanto é revelado na Palavra, por causa da autoridade do próprio Deus que nela fala; e responde de maneiras diferentes ao conteúdo de cada passagem: obedecendo aos mandamentos, tremendo diante das ameaças e abraçando as promessas de Deus para esta vida e para a vindoura. Contudo, os atos principais da fé salvadora são aceitar, receber e descansar somente em Cristo para justificação, santificação e vida eterna, em virtude da aliança da graça." },
      { number: 3, text: "Essa fé varia em graus, sendo fraca ou forte; pode muitas vezes e de muitas maneiras ser atacada e enfraquecida, mas alcança a vitória, crescendo em muitos até atingir plena certeza por meio de Cristo, que é tanto o autor quanto o consumador de nossa fé." },
    ],
  },
  {
    number: 15,
    title: "Do Arrependimento para a Vida",
    paragraphs: [
      { number: 1, text: "O arrependimento para a vida é uma graça evangélica, cuja doutrina deve ser pregada por todo ministro do evangelho, assim como a doutrina da fé em Cristo." },
      { number: 2, text: "Por esse arrependimento, o pecador, percebendo e sentindo não apenas o perigo, mas também a imundícia e odiosidade de seus pecados como contrários à santa natureza e à justa lei de Deus, e apreendendo a misericórdia de Deus em Cristo para com os penitentes, entristece-se e odeia seus pecados de tal modo que se volta de todos eles para Deus, propondo-se e esforçando-se por andar com ele em todos os caminhos de seus mandamentos." },
      { number: 3, text: "Embora o arrependimento não deva servir de fundamento como satisfação pelo pecado ou causa de seu perdão — que é ato da livre graça de Deus em Cristo —, ele é de tal necessidade para todos os pecadores que ninguém deve esperar perdão sem ele." },
      { number: 4, text: "Assim como não existe pecado tão pequeno que não mereça condenação, também não existe pecado tão grande que possa trazer condenação sobre aqueles que verdadeiramente se arrependem." },
      { number: 5, text: "Os homens não devem contentar-se com um arrependimento geral; é dever de cada pessoa esforçar-se para arrepender-se particularmente de seus pecados particulares." },
      { number: 6, text: "Assim como cada pessoa é obrigada a fazer confissão particular de seus pecados a Deus, pedindo perdão — e, ao abandoná-los, encontrará misericórdia —, aquele que escandaliza seu irmão ou a Igreja de Cristo deve estar disposto, por confissão particular ou pública e tristeza pelo pecado, a declarar seu arrependimento aos ofendidos, que então devem reconciliar-se com ele e recebê-lo em amor." },
    ],
  },
  {
    number: 16,
    title: "Das Boas Obras",
    paragraphs: [
      { number: 1, text: "Boas obras são somente aquelas que Deus ordenou em sua santa Palavra, e não as que, sem autorização dela, são inventadas por homens por zelo cego ou sob qualquer pretexto de boa intenção." },
      { number: 2, text: "Essas boas obras, feitas em obediência aos mandamentos de Deus, são frutos e evidências de uma fé verdadeira e viva. Por elas os crentes manifestam gratidão, fortalecem sua certeza, edificam seus irmãos, adornam a profissão do evangelho, fecham a boca dos adversários e glorificam a Deus, de quem são feitura, criados em Cristo Jesus para boas obras, para que, tendo seu fruto para santificação, alcancem o fim, a vida eterna." },
      { number: 3, text: "A capacidade dos crentes para realizar boas obras não procede de modo algum deles mesmos, mas inteiramente do Espírito de Cristo. Para que sejam capacitados a isso, além das graças já recebidas, é necessária uma influência atual do mesmo Espírito Santo, operando neles tanto o querer quanto o realizar segundo seu beneplácito. Contudo, não devem por isso tornar-se negligentes, como se não estivessem obrigados a cumprir dever algum sem um impulso especial do Espírito; antes, devem ser diligentes em despertar a graça de Deus que há neles." },
      { number: 4, text: "Aqueles que, em sua obediência, alcançam o mais alto grau possível nesta vida estão tão longe de poder fazer obras supererrogatórias — isto é, mais do que Deus exige — que ficam aquém de muito daquilo que são obrigados a fazer." },
      { number: 5, text: "Não podemos, pelas melhores obras, merecer de Deus perdão de pecados ou vida eterna, por causa da grande desproporção entre elas e a glória futura e da distância infinita entre nós e Deus, a quem por elas não podemos beneficiar nem satisfazer pela dívida de nossos pecados anteriores. Quando fizermos tudo quanto pudermos, teremos feito apenas nosso dever e continuaremos servos inúteis; além disso, na medida em que são boas, as obras procedem do Espírito, mas, na medida em que são realizadas por nós, são contaminadas e misturadas com tanta fraqueza e imperfeição que não podem suportar a severidade do juízo de Deus." },
      { number: 6, text: "Apesar disso, sendo as pessoas dos crentes aceitas por meio de Cristo, suas boas obras também são aceitas nele; não como se nesta vida fossem inteiramente irrepreensíveis e sem falha aos olhos de Deus, mas porque ele, contemplando-as em seu Filho, se agrada em aceitar e recompensar aquilo que é sincero, embora acompanhado de muitas fraquezas e imperfeições." },
      { number: 7, text: "As obras realizadas por homens não regenerados, embora quanto à matéria possam ser coisas ordenadas por Deus e úteis tanto a eles quanto a outros, por não procederem de um coração purificado pela fé, nem serem realizadas de modo correto segundo a Palavra, nem para o fim correto — a glória de Deus — são, portanto, pecaminosas e não podem agradar a Deus nem tornar o homem apto a receber graça de Deus; contudo, a negligência delas é ainda mais pecaminosa e desagradável a Deus." },
    ],
  },
  {
    number: 17,
    title: "Da Perseverança dos Santos",
    paragraphs: [
      { number: 1, text: "Aqueles que Deus aceitou em seu Amado, eficazmente chamou e santificou por seu Espírito não podem cair total nem finalmente do estado de graça, mas certamente perseverarão nele até o fim e serão eternamente salvos." },
      { number: 2, text: "Essa perseverança dos santos não depende de seu próprio livre-arbítrio, mas da imutabilidade do decreto da eleição, que flui do livre e imutável amor de Deus Pai; da eficácia do mérito e intercessão de Jesus Cristo; da permanência do Espírito e da semente de Deus neles; e da natureza da aliança da graça. De tudo isso também procedem sua certeza e infalibilidade." },
      { number: 3, text: "Contudo, pelas tentações de Satanás e do mundo, pelo predomínio da corrupção que permanece neles e pela negligência dos meios de sua preservação, podem cair em pecados graves e permanecer neles por algum tempo. Com isso incorrem no desagrado de Deus, entristecem seu Santo Espírito, ficam privados de certa medida de suas graças e consolações, têm o coração endurecido e a consciência ferida, prejudicam e escandalizam outros e atraem sobre si juízos temporais." },
    ],
  },
  {
    number: 18,
    title: "Da Certeza da Graça e da Salvação",
    paragraphs: [
      { number: 1, text: "Embora hipócritas e outros homens não regenerados possam enganar-se em vão com falsas esperanças e presunções carnais de estarem no favor de Deus e em estado de salvação — esperança que perecerá —, aqueles que verdadeiramente creem no Senhor Jesus, amam-no sinceramente e procuram andar diante dele com boa consciência podem, nesta vida, ter certeza de que estão em estado de graça e alegrar-se na esperança da glória de Deus, esperança que jamais os envergonhará." },
      { number: 2, text: "Essa certeza não é mera persuasão conjectural e provável baseada em esperança falível, mas uma certeza infalível de fé, fundada na verdade divina das promessas de salvação, na evidência interior das graças às quais essas promessas são feitas e no testemunho do Espírito de adoção, que testifica com nosso espírito que somos filhos de Deus; esse Espírito é o penhor de nossa herança, pelo qual somos selados para o dia da redenção." },
      { number: 3, text: "Essa certeza infalível não pertence de tal modo à essência da fé que um verdadeiro crente não possa esperar muito tempo e lutar com muitas dificuldades antes de participar dela. Contudo, sendo capacitado pelo Espírito a conhecer as coisas que Deus gratuitamente lhe deu, pode, sem revelação extraordinária, pelo uso correto dos meios ordinários, alcançá-la. Portanto, é dever de cada um aplicar toda diligência para tornar firme sua vocação e eleição, para que seu coração se amplie em paz e alegria no Espírito Santo, em amor e gratidão a Deus e em força e disposição alegre nos deveres da obediência, frutos próprios dessa certeza; tão longe está ela de inclinar os homens à negligência." },
      { number: 4, text: "Os verdadeiros crentes podem ter a certeza da salvação abalada, diminuída e interrompida de diversas maneiras: pela negligência em preservá-la; por cair em algum pecado especial que fira a consciência e entristeça o Espírito; por alguma tentação súbita ou violenta; ou por Deus retirar a luz de seu rosto e permitir que até os que o temem andem em trevas e sem luz. Entretanto, jamais ficam inteiramente destituídos da semente de Deus e da vida da fé, do amor de Cristo e dos irmãos, da sinceridade de coração e da consciência do dever, de onde, pela operação do Espírito, essa certeza pode no devido tempo ser reavivada; e, por essas coisas, são enquanto isso sustentados para não cair em completo desespero." },
    ],
  },
  {
    number: 19,
    title: "Da Lei de Deus",
    paragraphs: [
      { number: 1, text: "Deus deu a Adão uma lei como aliança de obras, pela qual o obrigou, e com ele toda a sua posteridade, a uma obediência pessoal, inteira, exata e perpétua; prometeu vida em seu cumprimento e ameaçou morte em sua violação; e dotou Adão de poder e capacidade para guardá-la." },
      { number: 2, text: "Essa lei, depois da queda de Adão, continuou sendo uma regra perfeita de justiça e, como tal, foi entregue por Deus no monte Sinai em dez mandamentos, escritos em duas tábuas: os primeiros quatro contendo nosso dever para com Deus, e os outros seis nosso dever para com o homem." },
      { number: 3, text: "Além dessa lei, geralmente chamada moral, aprouve a Deus dar ao povo de Israel, como igreja em menoridade, leis cerimoniais contendo várias ordenanças típicas: em parte de culto, prefigurando Cristo, suas graças, ações, sofrimentos e benefícios; e em parte apresentando diversas instruções sobre deveres morais. Todas essas leis cerimoniais estão agora revogadas sob o Novo Testamento." },
      { number: 4, text: "A eles também, como corpo político, Deus deu diversas leis judiciais, que expiraram juntamente com o Estado daquele povo, não obrigando agora nenhum outro além do que a equidade geral nelas contida possa exigir." },
      { number: 5, text: "A lei moral obriga para sempre todos, tanto pessoas justificadas quanto as demais, à sua obediência; e isso não apenas por causa da matéria nela contida, mas também em razão da autoridade de Deus Criador, que a deu. Cristo, no evangelho, de modo algum desfaz essa obrigação, antes a fortalece muito." },
      { number: 6, text: "Embora os verdadeiros crentes não estejam debaixo da lei como aliança de obras para serem por ela justificados ou condenados, ela é de grande utilidade tanto para eles quanto para outros. Como regra de vida, informando-os da vontade de Deus e de seu dever, dirige-os e os obriga a andar de acordo com ela; também revela as contaminações pecaminosas de sua natureza, coração e vida, de modo que, examinando-se por ela, cheguem a maior convicção, humilhação e ódio do pecado, juntamente com uma visão mais clara da necessidade que têm de Cristo e da perfeição de sua obediência. A lei também é útil aos regenerados para restringir suas corrupções, pois proíbe o pecado; suas ameaças mostram o que até os pecados deles merecem e quais aflições podem esperar nesta vida por causa deles, embora libertos da maldição ameaçada na lei. Suas promessas, de modo semelhante, mostram a aprovação de Deus à obediência e quais bênçãos podem esperar pelo cumprimento dela, embora não lhes sejam devidas pela lei como aliança de obras. Assim, fazer o bem e evitar o mal porque a lei encoraja um e desencoraja o outro não prova que alguém esteja debaixo da lei e não debaixo da graça." },
      { number: 7, text: "Os usos da lei mencionados acima não são contrários à graça do evangelho, mas concordam harmoniosamente com ela, pois o Espírito de Cristo subjuga e capacita a vontade do homem a fazer livre e alegremente aquilo que a vontade de Deus, revelada na lei, requer." },
    ],
  },
  {
    number: 20,
    title: "Da Liberdade Cristã e da Liberdade de Consciência",
    paragraphs: [
      { number: 1, text: "A liberdade que Cristo adquiriu para os crentes sob o evangelho consiste em sua libertação da culpa do pecado, da ira condenatória de Deus e da maldição da lei moral; e em serem libertos deste presente mundo mau, da escravidão de Satanás e do domínio do pecado, do mal das aflições, do aguilhão da morte, da vitória da sepultura e da condenação eterna; bem como em seu livre acesso a Deus e em prestarem-lhe obediência não por medo servil, mas por amor filial e mente voluntária. Tudo isso também era comum aos crentes sob a lei. Sob o Novo Testamento, porém, a liberdade dos cristãos é ainda ampliada: são libertos do jugo da lei cerimonial a que a igreja judaica estava sujeita, têm maior confiança no acesso ao trono da graça e participam de comunicações mais plenas do livre Espírito de Deus do que os crentes sob a lei ordinariamente desfrutavam." },
      { number: 2, text: "Somente Deus é Senhor da consciência e a deixou livre das doutrinas e mandamentos humanos que sejam, em qualquer coisa, contrários à sua Palavra ou, em questões de fé ou culto, estejam além dela. Portanto, crer em tais doutrinas ou obedecer a tais mandamentos por motivo de consciência é trair a verdadeira liberdade de consciência; e exigir fé implícita ou obediência absoluta e cega é destruir a liberdade de consciência e também a razão." },
      { number: 3, text: "Aqueles que, sob pretexto de liberdade cristã, praticam qualquer pecado ou alimentam qualquer concupiscência destroem o propósito da liberdade cristã, que é que, libertos das mãos de nossos inimigos, sirvamos ao Senhor sem medo, em santidade e justiça diante dele, todos os dias de nossa vida." },
      { number: 4, text: "Como os poderes que Deus ordenou e a liberdade que Cristo adquiriu não foram estabelecidos por Deus para destruir-se, mas para sustentar-se e preservar-se mutuamente, aqueles que, sob pretexto de liberdade cristã, se opõem a qualquer poder legítimo ou ao exercício legítimo dele, seja civil ou eclesiástico, resistem à ordenança de Deus. Por publicarem opiniões ou sustentarem práticas contrárias à luz da natureza, aos princípios conhecidos do cristianismo — quanto à fé, culto ou conduta —, ao poder da piedade, ou opiniões e práticas errôneas que, por sua natureza ou pelo modo de serem publicadas e mantidas, destruam a paz e a ordem externas que Cristo estabeleceu na Igreja, podem legitimamente ser chamados a prestar contas e submetidos às censuras da Igreja." },
    ],
  },
  {
    number: 21,
    title: "Do Culto Religioso e do Dia de Descanso",
    paragraphs: [
      { number: 1, text: "A luz da natureza mostra que há um Deus que possui senhorio e soberania sobre tudo, é bom e faz bem a todos e, portanto, deve ser temido, amado, louvado, invocado, confiado e servido de todo o coração, de toda a alma e com todas as forças. Mas o modo aceitável de adorar o verdadeiro Deus é instituído por ele mesmo e tão limitado por sua vontade revelada que não deve ser adorado segundo imaginações e invenções humanas, sugestões de Satanás, qualquer representação visível ou qualquer outro modo não prescrito nas Sagradas Escrituras." },
      { number: 2, text: "O culto religioso deve ser prestado a Deus Pai, Filho e Espírito Santo, e somente a ele; não a anjos, santos ou qualquer outra criatura. E, desde a queda, não deve ser prestado sem Mediador, nem pela mediação de qualquer outro senão Cristo somente." },
      { number: 3, text: "A oração com ações de graças, sendo parte especial do culto religioso, é requerida por Deus de todos os homens. Para que seja aceita, deve ser feita em nome do Filho, com auxílio de seu Espírito, segundo sua vontade, com entendimento, reverência, humildade, fervor, fé, amor e perseverança; e, quando vocal, em língua conhecida." },
      { number: 4, text: "A oração deve ser feita por coisas lícitas e por todo tipo de pessoas vivas ou que ainda viverão; mas não pelos mortos, nem por aqueles de quem se saiba que cometeram o pecado para a morte." },
      { number: 5, text: "A leitura das Escrituras com temor piedoso, a sã pregação e a audição consciente da Palavra em obediência a Deus, com entendimento, fé e reverência, o cântico de salmos com graça no coração, bem como a devida administração e digna recepção dos sacramentos instituídos por Cristo, são partes do culto religioso ordinário de Deus. Além delas, juramentos religiosos, votos, jejuns solenes e ações de graças em ocasiões especiais devem, em seus respectivos tempos e ocasiões, ser usados de modo santo e religioso." },
      { number: 6, text: "Nem a oração nem qualquer outra parte do culto religioso está, agora sob o evangelho, vinculada a qualquer lugar em que seja realizada ou direção para a qual se volte, nem se torna mais aceitável por causa deles. Deus deve ser adorado em toda parte, em espírito e em verdade: diariamente nas famílias, em secreto por cada pessoa e, mais solenemente, nas assembleias públicas, que não devem ser descuidadamente ou voluntariamente negligenciadas ou abandonadas quando Deus, por sua Palavra ou providência, chama para elas." },
      { number: 7, text: "Assim como é lei da natureza que, em geral, uma proporção adequada de tempo seja separada para o culto de Deus, assim também, em sua Palavra, por um mandamento positivo, moral e perpétuo, obrigatório a todos os homens em todas as eras, Deus designou especialmente um dia em sete como sábado, para ser guardado santo para ele. Desde o princípio do mundo até a ressurreição de Cristo, esse dia foi o último da semana; desde a ressurreição de Cristo, foi mudado para o primeiro dia da semana, chamado nas Escrituras Dia do Senhor, e deve continuar até o fim do mundo como o sábado cristão." },
      { number: 8, text: "Esse sábado é guardado santo ao Senhor quando os homens, depois de prepararem devidamente o coração e ordenarem previamente seus assuntos comuns, não apenas observam durante todo o dia santo descanso de suas próprias obras, palavras e pensamentos acerca de empregos e recreações mundanas, mas também ocupam todo o tempo nos exercícios públicos e particulares do culto de Deus e nos deveres de necessidade e misericórdia." },
    ],
  },
  {
    number: 22,
    title: "Dos Juramentos e Votos Lícitos",
    paragraphs: [
      { number: 1, text: "Um juramento lícito é parte do culto religioso, no qual, em ocasião justa, a pessoa que jura solenemente chama Deus como testemunha daquilo que afirma ou promete e para julgá-la segundo a verdade ou falsidade do que jura." },
      { number: 2, text: "Somente o nome de Deus é aquele pelo qual os homens devem jurar, e nele deve ser usado com todo santo temor e reverência. Portanto, jurar vã ou temerariamente por esse nome glorioso e temível, ou jurar por qualquer outra coisa, é pecado e deve ser abominado. Entretanto, assim como em assuntos de peso e importância um juramento é autorizado pela Palavra de Deus tanto sob o Novo quanto sob o Antigo Testamento, um juramento lícito imposto por autoridade legítima em tais matérias deve ser prestado." },
      { number: 3, text: "Quem presta juramento deve considerar devidamente a seriedade de ato tão solene e nele afirmar somente aquilo de que está plenamente persuadido ser verdade. Ninguém deve obrigar-se por juramento a coisa alguma senão ao que é bom e justo, que acredita ser assim e que é capaz e está resolvido a cumprir." },
      { number: 4, text: "Um juramento deve ser feito no sentido simples e comum das palavras, sem equívoco ou reserva mental. Ele não pode obrigar ao pecado; mas, quando feito acerca de coisa não pecaminosa, obriga ao cumprimento, ainda que resulte em prejuízo próprio. Tampouco deve ser violado mesmo quando feito a hereges ou incrédulos." },
      { number: 5, text: "O voto tem natureza semelhante ao juramento promissório e deve ser feito com o mesmo cuidado religioso e cumprido com a mesma fidelidade." },
      { number: 6, text: "O voto não deve ser feito a qualquer criatura, mas somente a Deus; e, para ser aceito, deve ser feito voluntariamente, por fé e consciência de dever, em gratidão por misericórdia recebida ou para alcançar aquilo de que necessitamos, por meio do qual nos obrigamos mais estritamente a deveres necessários ou a outras coisas, na medida e pelo tempo em que conduzam adequadamente a esses deveres." },
      { number: 7, text: "Ninguém pode votar fazer qualquer coisa proibida na Palavra de Deus, nem aquilo que impediria o cumprimento de algum dever nela ordenado, nem o que não esteja em seu próprio poder ou para cuja realização não tenha promessa de capacidade da parte de Deus. Por essas razões, votos monásticos de celibato perpétuo, pobreza professada e obediência regular estão tão longe de serem graus de perfeição superior que são laços supersticiosos e pecaminosos nos quais nenhum cristão deve enredar-se." },
    ],
  },
  {
    number: 23,
    title: "Do Magistrado Civil",
    paragraphs: [
      { number: 1, text: "Deus, supremo Senhor e Rei de todo o mundo, ordenou magistrados civis para estarem, debaixo dele, sobre o povo, para sua própria glória e para o bem público; e, para esse fim, armou-os com o poder da espada para defesa e incentivo dos que fazem o bem e para punição dos malfeitores." },
      { number: 2, text: "É lícito aos cristãos aceitar e exercer o ofício de magistrado quando chamados a ele. No exercício desse ofício devem especialmente manter piedade, justiça e paz segundo as leis saudáveis de cada comunidade; e, para esse fim, podem legitimamente, mesmo sob o Novo Testamento, fazer guerra em ocasião justa e necessária." },
      { number: 3, text: "Os magistrados civis não podem assumir para si a administração da Palavra e dos sacramentos, nem o poder das chaves do reino dos céus, nem interferir minimamente em matérias de fé. Contudo, como protetores, é dever dos magistrados civis proteger a Igreja de nosso Senhor comum sem dar preferência a qualquer denominação cristã sobre as demais, de modo que todas as pessoas eclesiásticas desfrutem de plena, livre e indiscutível liberdade para exercer cada parte de suas funções sagradas sem violência ou perigo. E, como Jesus Cristo estabeleceu governo e disciplina regulares em sua Igreja, nenhuma lei civil deve interferir, impedir ou obstruir o devido exercício deles entre membros voluntários de qualquer denominação cristã, segundo sua profissão e crença. É dever dos magistrados civis proteger a pessoa e o bom nome de todo o povo de modo que ninguém, sob pretexto de religião ou incredulidade, tenha permissão para oferecer indignidade, violência, abuso ou dano a qualquer outra pessoa; e devem providenciar que todas as assembleias religiosas e eclesiásticas sejam realizadas sem perturbação ou tumulto." },
      { number: 4, text: "É dever do povo orar pelos magistrados, honrar suas pessoas, pagar-lhes tributos e outros encargos, obedecer a seus mandamentos legítimos e sujeitar-se à sua autoridade por motivo de consciência. Incredulidade ou diferença de religião não anula a justa e legal autoridade do magistrado nem liberta o povo da devida obediência a ele; dessa obediência as pessoas eclesiásticas não estão isentas. Muito menos possui o papa qualquer poder ou jurisdição sobre os magistrados em seus domínios ou sobre qualquer pessoa de seu povo, e menos ainda poder para privá-los de seus domínios ou vidas se os julgar hereges ou sob qualquer outro pretexto." },
    ],
  },
  {
    number: 24,
    title: "Do Matrimônio e do Divórcio",
    paragraphs: [
      { number: 1, text: "O casamento deve ser entre um homem e uma mulher. Não é lícito a nenhum homem ter mais de uma esposa, nem a nenhuma mulher ter mais de um marido ao mesmo tempo." },
      { number: 2, text: "O casamento foi ordenado para ajuda mútua de marido e mulher, para o aumento da humanidade por descendência legítima e da Igreja por uma descendência santa, e para prevenção da impureza." },
      { number: 3, text: "É lícito casar-se a todo tipo de pessoa capaz de dar seu consentimento com discernimento. Contudo, é dever dos cristãos casar somente no Senhor. Portanto, os que professam a verdadeira religião reformada não devem casar com incrédulos, papistas ou outros idólatras; nem os piedosos devem pôr-se em jugo desigual casando com pessoas notoriamente perversas em sua vida ou que sustentem heresias condenáveis." },
      { number: 4, text: "O casamento não deve ocorrer dentro dos graus de consanguinidade ou afinidade proibidos pela Palavra. Tais casamentos incestuosos nunca podem ser tornados lícitos por qualquer lei humana ou consentimento das partes para que essas pessoas vivam juntas como marido e mulher." },
      { number: 5, text: "Adultério ou fornicação cometidos depois do compromisso e descobertos antes do casamento dão justa ocasião à parte inocente para dissolver o compromisso. No caso de adultério depois do casamento, é lícito à parte inocente buscar o divórcio e, depois dele, casar-se com outra pessoa como se a parte ofensora estivesse morta." },
      { number: 6, text: "Embora a corrupção humana seja tal que tende a inventar argumentos indevidos para separar aqueles que Deus uniu em casamento, nada senão adultério ou deserção voluntária que não possa de modo algum ser remediada pela Igreja ou pelo magistrado civil é causa suficiente para dissolver o vínculo matrimonial. Nesse caso deve ser observado procedimento público e ordenado, e as pessoas envolvidas não devem ser deixadas à própria vontade e discrição em sua própria causa." },
    ],
  },
  {
    number: 25,
    title: "Da Igreja",
    paragraphs: [
      { number: 1, text: "A Igreja católica ou universal, que é invisível, consiste em todo o número dos eleitos que foram, são ou serão reunidos em um só corpo sob Cristo, sua Cabeça; ela é a esposa, o corpo e a plenitude daquele que enche tudo em todos." },
      { number: 2, text: "A Igreja visível, que também é católica ou universal sob o evangelho — não confinada a uma só nação como antes sob a lei —, consiste em todos aqueles, em todo o mundo, que professam a verdadeira religião, juntamente com seus filhos; e é o reino do Senhor Jesus Cristo, a casa e família de Deus, fora da qual não há possibilidade ordinária de salvação." },
      { number: 3, text: "A essa Igreja católica visível Cristo deu o ministério, os oráculos e as ordenanças de Deus para reunir e aperfeiçoar os santos nesta vida até o fim do mundo; e, por sua própria presença e Espírito, segundo sua promessa, torna esses meios eficazes para esse fim." },
      { number: 4, text: "Essa Igreja católica tem sido às vezes mais, às vezes menos visível. As igrejas particulares que dela são membros são mais ou menos puras conforme a doutrina do evangelho é nelas ensinada e recebida, as ordenanças administradas e o culto público realizado com maior ou menor pureza." },
      { number: 5, text: "As igrejas mais puras debaixo do céu estão sujeitas tanto a mistura quanto a erro; e algumas degeneraram a ponto de deixar de ser igrejas de Cristo e tornar-se sinagogas de Satanás. Contudo, sempre haverá na terra uma Igreja para adorar a Deus segundo sua vontade." },
      { number: 6, text: "Não há outra Cabeça da Igreja senão o Senhor Jesus Cristo; e o papa de Roma não pode, em sentido algum, ser cabeça dela." },
    ],
  },
  {
    number: 26,
    title: "Da Comunhão dos Santos",
    paragraphs: [
      { number: 1, text: "Todos os santos que estão unidos a Jesus Cristo, sua Cabeça, por seu Espírito e pela fé, têm comunhão com ele em suas graças, sofrimentos, morte, ressurreição e glória; e, estando unidos uns aos outros em amor, têm comunhão nos dons e graças uns dos outros e estão obrigados ao cumprimento dos deveres públicos e particulares que promovam seu bem mútuo, tanto no homem interior quanto no exterior." },
      { number: 2, text: "Os santos por profissão estão obrigados a manter santa comunhão e companheirismo no culto de Deus e na realização de outros serviços espirituais que promovam sua edificação mútua; e também a socorrer uns aos outros nas coisas externas conforme suas diferentes capacidades e necessidades. Essa comunhão, conforme Deus oferece oportunidade, deve estender-se a todos aqueles que, em todo lugar, invocam o nome do Senhor Jesus." },
      { number: 3, text: "A comunhão que os santos têm com Cristo não os torna de modo algum participantes da substância de sua Divindade nem iguais a Cristo em qualquer aspecto; afirmar qualquer dessas coisas é ímpio e blasfemo. Sua comunhão uns com os outros como santos também não tira nem viola o título ou a propriedade que cada pessoa possui sobre seus bens e posses." },
    ],
  },
  {
    number: 27,
    title: "Dos Sacramentos",
    paragraphs: [
      { number: 1, text: "Os sacramentos são santos sinais e selos da aliança da graça, imediatamente instituídos por Deus para representar Cristo e seus benefícios e confirmar nosso interesse nele; também para estabelecer diferença visível entre os que pertencem à Igreja e o restante do mundo, e para comprometê-los solenemente ao serviço de Deus em Cristo, segundo sua Palavra." },
      { number: 2, text: "Em cada sacramento há uma relação espiritual ou união sacramental entre o sinal e a coisa significada, de modo que os nomes e efeitos de um são atribuídos ao outro." },
      { number: 3, text: "A graça exibida nos sacramentos ou por meio deles, quando corretamente usados, não é conferida por qualquer poder que neles exista; nem a eficácia de um sacramento depende da piedade ou intenção daquele que o administra, mas da obra do Espírito e da palavra de instituição, que contém, juntamente com um preceito autorizando seu uso, uma promessa de benefício aos que dignamente o recebem." },
      { number: 4, text: "Há somente dois sacramentos ordenados por Cristo nosso Senhor no evangelho: o batismo e a Ceia do Senhor; nenhum deles deve ser administrado por qualquer pessoa, mas por ministro da Palavra legitimamente ordenado." },
      { number: 5, text: "Os sacramentos do Antigo Testamento, quanto às coisas espirituais por eles significadas e exibidas, eram em substância os mesmos do Novo Testamento." },
    ],
  },
  {
    number: 28,
    title: "Do Batismo",
    paragraphs: [
      { number: 1, text: "O batismo é sacramento do Novo Testamento, ordenado por Jesus Cristo não somente para admissão solene da pessoa batizada na Igreja visível, mas também para ser para ela sinal e selo da aliança da graça, de sua união com Cristo, de regeneração, de remissão dos pecados e de sua entrega a Deus por meio de Jesus Cristo para andar em novidade de vida. Esse sacramento, por determinação do próprio Cristo, deve continuar em sua Igreja até o fim do mundo." },
      { number: 2, text: "O elemento externo a ser usado nesse sacramento é água, com a qual a pessoa deve ser batizada em nome do Pai, do Filho e do Espírito Santo por ministro do evangelho legitimamente chamado para isso." },
      { number: 3, text: "A imersão da pessoa na água não é necessária; o batismo é corretamente administrado por derramamento ou aspersão de água sobre a pessoa." },
      { number: 4, text: "Não apenas aqueles que de fato professam fé em Cristo e obediência a ele devem ser batizados, mas também os filhos de um ou de ambos os pais crentes." },
      { number: 5, text: "Embora seja grande pecado desprezar ou negligenciar essa ordenança, a graça e a salvação não estão tão inseparavelmente ligadas a ela que nenhuma pessoa possa ser regenerada ou salva sem o batismo, nem que todos os batizados sejam indubitavelmente regenerados." },
      { number: 6, text: "A eficácia do batismo não está ligada ao momento em que é administrado. Contudo, pelo uso correto dessa ordenança, a graça prometida não é apenas oferecida, mas realmente exibida e conferida pelo Espírito Santo àqueles — adultos ou crianças — a quem essa graça pertence, segundo o conselho da própria vontade de Deus, no tempo por ele determinado." },
      { number: 7, text: "O sacramento do batismo deve ser administrado uma única vez a cada pessoa." },
    ],
  },
  {
    number: 29,
    title: "Da Ceia do Senhor",
    paragraphs: [
      { number: 1, text: "Nosso Senhor Jesus, na noite em que foi traído, instituiu o sacramento de seu corpo e sangue, chamado Ceia do Senhor, para ser observado em sua Igreja até o fim do mundo, para lembrança perpétua do sacrifício de si mesmo em sua morte, para selar todos os benefícios desse sacrifício aos verdadeiros crentes, para seu alimento espiritual e crescimento nele, para maior compromisso com todos os deveres que lhe devem, e para ser vínculo e penhor de sua comunhão com Cristo e uns com os outros como membros de seu corpo místico." },
      { number: 2, text: "Nesse sacramento Cristo não é oferecido ao Pai, nem se realiza sacrifício real algum para remissão dos pecados dos vivos ou dos mortos; há apenas comemoração daquele único oferecimento de si mesmo por si mesmo na cruz, de uma vez por todas, e uma oferta espiritual de todo louvor possível a Deus por ele. Assim, o sacrifício papista da missa, como é chamado, é gravemente ofensivo ao único e exclusivo sacrifício de Cristo, a única propiciação por todos os pecados de seus eleitos." },
      { number: 3, text: "O Senhor Jesus designou nessa ordenança que seus ministros declarem ao povo sua palavra de instituição, orem e abençoem os elementos de pão e vinho, separando-os assim de uso comum para uso santo; tomem e partam o pão, tomem o cálice e, participando também eles mesmos, deem ambos aos comungantes, mas a ninguém que não esteja então presente na congregação." },
      { number: 4, text: "Missas particulares, receber esse sacramento sozinho das mãos de sacerdote ou de qualquer outra pessoa, negar o cálice ao povo, adorar os elementos, elevá-los ou levá-los de um lugar a outro para adoração e reservá-los para qualquer pretenso uso religioso são práticas contrárias à natureza desse sacramento e à instituição de Cristo." },
      { number: 5, text: "Os elementos externos desse sacramento, devidamente separados para os usos ordenados por Cristo, possuem tal relação com Cristo crucificado que, verdadeira mas somente sacramentalmente, às vezes são chamados pelos nomes das coisas que representam, isto é, corpo e sangue de Cristo; contudo, em substância e natureza permanecem verdadeira e somente pão e vinho, como eram antes." },
      { number: 6, text: "A doutrina que sustenta mudança da substância do pão e do vinho na substância do corpo e sangue de Cristo — geralmente chamada transubstanciação — pela consagração de sacerdote ou por qualquer outro meio é contrária não somente às Escrituras, mas até ao senso comum e à razão; destrói a natureza do sacramento e tem sido causa de muitas superstições e até de idolatrias grosseiras." },
      { number: 7, text: "Os que recebem dignamente, participando externamente dos elementos visíveis desse sacramento, também recebem interiormente pela fé, verdadeira e realmente, porém não carnal e corporalmente, mas espiritualmente, e alimentam-se de Cristo crucificado e de todos os benefícios de sua morte. O corpo e o sangue de Cristo não estão corporal ou carnalmente em, com ou sob o pão e o vinho; contudo, estão tão real, porém espiritualmente, presentes à fé dos crentes nessa ordenança quanto os próprios elementos estão presentes aos sentidos externos." },
      { number: 8, text: "Embora homens ignorantes e ímpios recebam os elementos externos desse sacramento, não recebem a coisa por eles significada; antes, por se aproximarem indignamente, tornam-se culpados do corpo e do sangue do Senhor para sua própria condenação. Portanto, todas as pessoas ignorantes e ímpias, por serem impróprias para desfrutar comunhão com Cristo, são indignas da mesa do Senhor e não podem, enquanto permanecerem assim, participar desses santos mistérios ou ser admitidas a eles sem grande pecado contra Cristo." },
    ],
  },
  {
    number: 30,
    title: "Das Censuras Eclesiásticas",
    paragraphs: [
      { number: 1, text: "O Senhor Jesus, como Rei e Cabeça de sua Igreja, estabeleceu nela um governo nas mãos dos oficiais da Igreja, distinto do magistrado civil." },
      { number: 2, text: "A esses oficiais estão confiadas as chaves do reino dos céus; em virtude delas têm poder, respectivamente, para reter e remitir pecados, fechar o reino contra os impenitentes por meio da Palavra e das censuras e abri-lo aos pecadores penitentes pelo ministério do evangelho e pela absolvição das censuras, conforme a ocasião exigir." },
      { number: 3, text: "As censuras eclesiásticas são necessárias para recuperar e ganhar irmãos ofensores, dissuadir outros de ofensas semelhantes, purificar o fermento que poderia contaminar toda a massa, vindicar a honra de Cristo e a santa profissão do evangelho e prevenir a ira de Deus, que poderia justamente cair sobre a Igreja caso ela permitisse que sua aliança e os selos dela fossem profanados por ofensores notórios e obstinados." },
      { number: 4, text: "Para alcançar melhor esses fins, os oficiais da Igreja devem proceder por admoestação, suspensão do sacramento da Ceia do Senhor por algum tempo e excomunhão da Igreja, conforme a natureza do delito e a gravidade da culpa da pessoa." },
    ],
  },
  {
    number: 31,
    title: "Dos Sínodos e Concílios",
    paragraphs: [
      { number: 1, text: "Para melhor governo e maior edificação da Igreja, devem existir assembleias geralmente chamadas sínodos ou concílios; e cabe aos supervisores e outros governantes das igrejas particulares, em virtude de seu ofício e do poder que Cristo lhes deu para edificação e não para destruição, designar tais assembleias e reunir-se nelas sempre que julgarem conveniente para o bem da Igreja." },
      { number: 2, text: "Compete aos sínodos e concílios determinar ministerialmente controvérsias de fé e casos de consciência; estabelecer regras e orientações para melhor ordenação do culto público de Deus e governo de sua Igreja; receber queixas em casos de má administração e determiná-las com autoridade. Esses decretos e determinações, se estiverem de acordo com a Palavra de Deus, devem ser recebidos com reverência e submissão, não somente por sua concordância com a Palavra, mas também por causa do poder pelo qual são feitos, como ordenança de Deus designada para esse fim em sua Palavra." },
      { number: 3, text: "Todos os sínodos ou concílios, desde os tempos dos apóstolos, sejam gerais ou particulares, podem errar e muitos erraram. Portanto, não devem ser constituídos regra de fé ou prática, mas usados como auxílio em ambas." },
      { number: 4, text: "Sínodos e concílios devem tratar ou concluir somente aquilo que é eclesiástico e não devem intrometer-se em assuntos civis que dizem respeito ao Estado, exceto por humilde petição em casos extraordinários ou por conselho para satisfação de consciência, se forem solicitados pelo magistrado civil." },
    ],
  },
  {
    number: 32,
    title: "Do Estado dos Homens Após a Morte e da Ressurreição dos Mortos",
    paragraphs: [
      { number: 1, text: "Depois da morte, os corpos dos homens retornam ao pó e veem corrupção; mas suas almas, que nem morrem nem dormem e possuem subsistência imortal, retornam imediatamente a Deus, que as deu. As almas dos justos, então aperfeiçoadas em santidade, são recebidas nos mais altos céus, onde contemplam a face de Deus em luz e glória, aguardando a plena redenção de seus corpos. As almas dos ímpios são lançadas no inferno, onde permanecem em tormentos e densas trevas, reservadas para o juízo do grande dia. Além desses dois lugares para as almas separadas de seus corpos, as Escrituras não reconhecem nenhum outro." },
      { number: 2, text: "No último dia, os que forem encontrados vivos não morrerão, mas serão transformados; e todos os mortos ressuscitarão com os mesmos corpos, e não outros, embora com qualidades diferentes, os quais serão novamente unidos às suas almas para sempre." },
      { number: 3, text: "Os corpos dos injustos serão, pelo poder de Cristo, ressuscitados para desonra; os corpos dos justos serão, por seu Espírito, ressuscitados para honra e tornados conformes ao próprio corpo glorioso de Cristo." },
    ],
  },
  {
    number: 33,
    title: "Do Juízo Final",
    paragraphs: [
      { number: 1, text: "Deus determinou um dia em que julgará o mundo com justiça por Jesus Cristo, a quem todo poder e juízo foram dados pelo Pai. Nesse dia, não somente os anjos apóstatas serão julgados, mas também todas as pessoas que viveram sobre a terra comparecerão diante do tribunal de Cristo para prestar contas de seus pensamentos, palavras e obras e receber segundo o que fizeram no corpo, seja bem ou mal." },
      { number: 2, text: "O propósito de Deus ao determinar esse dia é manifestar a glória de sua misericórdia na salvação eterna dos eleitos e de sua justiça na condenação dos réprobos, que são perversos e desobedientes. Então os justos irão para a vida eterna e receberão aquela plenitude de alegria e refrigério que procede da presença do Senhor; mas os ímpios, que não conhecem a Deus e não obedecem ao evangelho de Jesus Cristo, serão lançados em tormentos eternos e punidos com destruição eterna, afastados da presença do Senhor e da glória de seu poder." },
      { number: 3, text: "Assim como Cristo quer que estejamos firmemente persuadidos de que haverá um dia de juízo, tanto para dissuadir todos os homens do pecado quanto para maior consolação dos piedosos em suas adversidades, também quer que esse dia permaneça desconhecido aos homens, para que abandonem toda segurança carnal, estejam sempre vigilantes, pois não sabem a hora em que o Senhor virá, e estejam sempre preparados para dizer: Vem, Senhor Jesus, vem depressa. Amém." },
    ],
  },
];

export const confissaoFeWestminster: ChurchDocument = {
  id: "confissao-fe-westminster",
  title: "Confissão de Fé de Westminster",
  shortTitle: "CFW",
  category: "simbolo-de-fe-ipb",
  status: "oficial-ipb",
  year: 1647,
  description:
    "Principal confissão doutrinária dos Padrões de Westminster e símbolo de fé oficial da Igreja Presbiteriana do Brasil.",
  localDataPath: "data/documentos/confissao-fe-westminster.ts",
  sources: [
    {
      label: "Confissão de Fé de Westminster — PDF publicado pela IPB",
      url: "https://www.ipb.org.br/content/Arquivos/A_Confissao_de_Fe_de_Westminster.pdf",
      publisher: "Igreja Presbiteriana do Brasil",
      notes: "Use esta edição como referência denominacional para conferência de redação.",
    },
    {
      label: "Westminster Confession of Faith (1647) — texto-base histórico",
      url: "https://www.wscal.edu/westminster-confession-of-faith/",
      publisher: "Westminster Seminary California",
      year: 1647,
      notes: "Texto histórico em inglês utilizado como base para a tradução própria armazenada no projeto.",
    },
  ],
  notes: [
    "O conteúdo integral está armazenado localmente e pode ser pesquisado por capítulo e parágrafo.",
    "A redação portuguesa nativa é uma tradução própria do projeto baseada no texto histórico de 1647; não deve ser apresentada como transcrição oficial da edição portuguesa da IPB.",
  ],
};

export default confissaoFeWestminster;
