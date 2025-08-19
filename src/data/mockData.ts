import { User, TreeSubmission, Comment, TreeSpecies, MunicipalForm, TreeLegend } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'adam.wolkin@email.com',
    name: 'Adam Kowalski',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
    registrationDate: '2024-01-15',
    submissionsCount: 12,
    verificationsCount: 45,
  },
  {
    id: '2',
    email: 'maria.kowalska@email.com',
    name: 'Maria Nowak',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop',
    registrationDate: '2024-02-20',
    submissionsCount: 8,
    verificationsCount: 32,
  },
  {
    id: '3',
    email: 'piotr.nowak@email.com',
    name: 'Piotr Wiśniewski',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop',
    registrationDate: '2024-03-10',
    submissionsCount: 15,
    verificationsCount: 28,
  },
  {
    id: '4',
    email: 'anna.wisniowska@email.com',
    name: 'Anna Zielińska',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop',
    registrationDate: '2024-01-05',
    submissionsCount: 22,
    verificationsCount: 67,
  },
];

export const mockTreeSubmissions: TreeSubmission[] = [
  {
    id: '1',
    userId: '1',
    species: 'Dąb szypułkowy',
    speciesLatin: 'Quercus robur',
    location: {
      lat: 52.2297,
      lng: 21.0122,
      address: 'Warszawa, Park Łazienkowski, przy Pałacu na Wyspie',
    },
    circumference: 520,
    height: 28,
    condition: 'excellent',
    isMonument: true,
    description: 'Wspaniały okaz dębu szypułkowego w Parku Łazienkowskim. Ten majestatyczny dąb rośnie tuż przy Pałacu na Wyspie i jest jednym z najstarszych drzew w parku. Szacowany wiek około 300 lat. Drzewo ma charakterystyczną, rozłożystą koronę i imponujący pień. W cieniu tego dęba odpoczywali już królowie polscy.',
    images: [
      'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop'
    ],
    status: 'monument',
    submissionDate: '2024-01-15',
    approvalDate: '2024-01-20',
    votes: { approve: 25, reject: 1 },
  },
  {
    id: '2',
    userId: '2',
    species: 'Lipa drobnolistna',
    speciesLatin: 'Tilia cordata',
    location: {
      lat: 50.0647,
      lng: 19.9450,
      address: 'Kraków, Rynek Główny, przy Sukiennicach',
    },
    circumference: 380,
    height: 22,
    condition: 'good',
    isMonument: false,
    description: 'Piękna lipa na Rynku Głównym w Krakowie, rosnąca w pobliżu Sukiennic. To drzewo pamięta czasy średniowiecza i było świadkiem wielu historycznych wydarzeń. Każdego lata jej kwiaty wypełniają powietrze cudownym aromatem, przyciągając pszczoły z całej okolicy. Lokalni mieszkańcy nazywają ją "Lipą Mariacką".',
    images: [
    'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    ],
    status: 'approved',
    submissionDate: '2024-12-20',
    approvalDate: '2024-12-25',
    votes: { approve: 18, reject: 2 },
  },
  {
    id: '3',
    userId: '3',
    species: 'Buk zwyczajny',
    speciesLatin: 'Fagus sylvatica',
    location: {
      lat: 54.3520,
      lng: 18.6466,
      address: 'Gdańsk, Park Oliwski, Aleja Bukowa 15',
    },
    circumference: 420,
    height: 30,
    condition: 'excellent',
    isMonument: false,
    description: 'Potężny buk w Parku Oliwskim, jeden z najstarszych okazów w regionie. Drzewo rośnie w malowniczej alei bukowej, która jesienią zamienia się w złoty tunel. Ten konkretny okaz wyróżnia się niezwykle gładką, srebrzystą korą i idealnie symetryczną koroną. Miejscowi biegacze często zatrzymują się pod nim, aby odpocząć.',
    images: [
      'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    ],
    status: 'pending',
    submissionDate: '2024-11-10',
    votes: { approve: 12, reject: 0 },
  },
  {
    id: '4',
    userId: '4',
    species: 'Klon pospolity',
    speciesLatin: 'Acer platanoides',
    location: {
      lat: 51.1079,
      lng: 17.0385,
      address: 'Wrocław, Park Szczytnicki, przy Hali Stulecia',
    },
    circumference: 290,
    height: 18,
    condition: 'good',
    isMonument: false,
    description: 'Wspaniały klon rosnący w Parku Szczytnickim we Wrocławiu. Drzewo znajduje się w pobliżu słynnej Hali Stulecia i jest ulubionym miejscem fotografów, szczególnie jesienią, gdy jego liście przybierają spektakularne odcienie żółci i czerwieni. Pod tym klonem często organizowane są plenerowe lekcje botaniki dla dzieci.',
    images: [
      'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    ],
    status: 'pending',
    submissionDate: '2024-12-15',
    votes: { approve: 8, reject: 1 },
  },
  {
    id: '5',
    userId: '1',
    species: 'Jesion wyniosły',
    speciesLatin: 'Fraxinus excelsior',
    location: {
      lat: 50.2649,
      lng: 19.0238,
      address: 'Katowice, Park Kościuszki, przy stawie',
    },
    circumference: 340,
    height: 25,
    condition: 'fair',
    isMonument: false,
    description: 'Majestatyczny jesion rosnący nad stawem w Parku Kościuszki w Katowicach. To drzewo jest szczególnie piękne wiosną, gdy pokrywa się delikatnymi, jasnozielonymi liśćmi. Niestety, w ostatnich latach widać oznaki choroby - zamieranie pędów, co jest typowe dla jesionów w Polsce. Wymaga pilnej opieki dendrologicznej.',
    images: [
      'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?w=800&h=600&fit=crop',
    ],
    status: 'pending',
    submissionDate: '2024-12-18',
    votes: { approve: 5, reject: 3 },
  },
];

export const mockComments: { [treeId: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      userId: '2',
      userName: 'Maria Kowalska',
      userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop',
      content: 'Wspaniały okaz! Widziałam go osobiście podczas spaceru z rodziną. Moje dzieci były zachwycone jego rozmiarami. To naprawdę żywy pomnik historii.',
      date: '2024-01-21',
      isLegend: false,
      votes: 8,
    },
    {
      id: '2',
      userId: '3',
      userName: 'Piotr Wiśniewski',
      userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop',
      content: 'Ten dąb pamięta czasy króla Jana III Sobieskiego. Według lokalnej tradycji przekazywanej przez pokolenia, król odpoczywał w jego cieniu po powrocie z wiktorii wiedeńskiej w 1683 roku. Stare dokumenty z archiwum królewskiego wspominają o "wielkim dębie przy pałacu", który mógł być właśnie tym drzewem.',
      date: '2024-01-22',
      isLegend: true,
      votes: 15,
    },
    {
      id: '3',
      userId: '4',
      userName: 'Anna Zielińska',
      userAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop',
      content: 'Jako dendrolożka mogę potwierdzić, że to wyjątkowy okaz. Pierśnica 520 cm to naprawdę imponujący rozmiar. Stan zachowania jest doskonały jak na wiek drzewa.',
      date: '2024-01-23',
      isLegend: false,
      votes: 12,
    },
  ],
  '2': [
    {
      id: '4',
      userId: '1',
      userName: 'Adam Kowalski',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
      content: 'Potrzeba więcej zdjęć z różnych perspektyw, szczególnie kory i liści. Byłoby też dobrze dodać zdjęcie całego drzewa z większej odległości.',
      date: '2024-12-21',
      isLegend: false,
      votes: 4,
    },
    {
      id: '5',
      userId: '3',
      userName: 'Piotr Wiśniewski',
      userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop',
      content: 'Ta lipa była sadzona w 1257 roku z okazji lokacji miasta Krakowa. Przez wieki była miejscem spotkań kupców i rzemieślników. W średniowieczu pod lipami na rynkach odbywały się sądy i zgromadzenia miejskie. "Lipa Mariacka" była świadkiem koronacji królów i ważnych wydarzeń historycznych.',
      date: '2024-12-22',
      isLegend: true,
      votes: 9,
    },
  ],
  '3': [
    {
      id: '6',
      userId: '2',
      userName: 'Maria Nowak',
      userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop',
      content: 'Przepiękne drzewo! Biegam tą aleją codziennie rano i zawsze podziwiam ten buk. Jesienią to prawdziwa magia kolorów.',
      date: '2024-11-12',
      isLegend: false,
      votes: 6,
    },
  ],
  '4': [
    {
      id: '7',
      userId: '1',
      userName: 'Adam Kowalski',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
      content: 'Świetne miejsce na sesje fotograficzne! Polecam szczególnie październik, gdy liście mają najpiękniejsze barwy.',
      date: '2024-12-16',
      isLegend: false,
      votes: 3,
    },
  ],
};

export const mockTreeSpecies: TreeSpecies[] = [
  {
    id: '1',
    namePolish: 'Dąb szypułkowy',
    nameLatin: 'Quercus robur',
    family: 'Fagaceae',
    description: 'Dąb szypułkowy to jeden z najważniejszych gatunków drzew w Polsce. Może żyć ponad 1000 lat i osiągać wysokość do 40 metrów. Jest symbolem siły, trwałości i mądrości w kulturze słowiańskiej. Drewno dębu było używane do budowy statków, domów i mebli przez wieki.',
    identificationTips: [
      'Liście z wyraźnymi wcięciami, bez szypułek lub z bardzo krótkimi szypułkami',
      'Żołędzie na długich szypułkach (2-8 cm), dojrzewają jesienią',
      'Kora szara, głęboko bruzdowna u starych okazów, gładka u młodych',
      'Korona szeroka, rozłożysta, charakterystyczny pokrój "parasola"',
      'Pąki skupione na końcach pędów, jajowate, brązowe'
    ],
    seasonalChanges: {
      spring: 'Młode liście jasno-zielone, często z czerwonawym nalotem. Kwitnienie w maju - kotki męskie i niewielkie kwiaty żeńskie',
      summer: 'Liście ciemno-zielone, gęsta korona dająca dużo cienia. Rozwijają się żołędzie',
      autumn: 'Liście żółto-brązowe, opadają późno w sezonie. Dojrzałe żołędzie opadają i są zbierane przez zwierzęta',
      winter: 'Charakterystyczna sylwetka z grubym pniem i rozłożystymi gałęziami. Kora wyraźnie bruzdowna'
    },
    images: {
      tree: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
      leaves: 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?w=800&h=600&fit=crop',
      bark: 'https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?w=800&h=600&fit=crop',
      fruit: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=800&h=600&fit=crop',
    },
    characteristics: {
      maxHeight: '40 m',
      lifespan: 'Ponad 1000 lat',
      nativeToPoland: true,
    },
  },
  {
    id: '2',
    namePolish: 'Lipa drobnolistna',
    nameLatin: 'Tilia cordata',
    family: 'Malvaceae',
    description: 'Lipa drobnolistna to drzewo o wielkiej wartości kulturowej i przyrodniczej. Od wieków sadzona w centrach miast i przy dworkach. W tradycji słowiańskiej lipa była drzewem świętym, symbolem miłości i sprawiedliwości. Pod lipami odbywały się sądy i zgromadzenia wiejskie.',
    identificationTips: [
      'Małe, sercowate liście z ząbkowanymi brzegami (3-6 cm długości)',
      'Kwiaty żółtawe, bardzo pachnące, zebrane w baldachogrona (czerwiec-lipiec)',
      'Owoce kuliste z charakterystyczną przysadką - skrzydełkiem',
      'Gładka kora, u starszych drzew lekko spękana w płytkie bruzdy',
      'Korona gęsta, jajowata lub okrągła'
    ],
    seasonalChanges: {
      spring: 'Młode liście jasno-zielone, często z czerwonawymi nasadami ogonków. Pąki czerwonawe',
      summer: 'Intensywnie pachnące kwiaty przyciągają pszczoły - lipiec to "miesiąc lipowy" pszczelarzy',
      autumn: 'Liście żółte, opadają wcześnie. Dojrzałe owoce z przysadkami unoszą się na wietrze',
      winter: 'Charakterystyczne rozgałęzienie, często przystrzyżone w parkach. Pąki czerwonawe'
    },
    images: {
      tree: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
      leaves: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?w=800&h=600&fit=crop',
      bark: 'https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?w=800&h=600&fit=crop',
    },
    characteristics: {
      maxHeight: '30 m',
      lifespan: '800-1000 lat',
      nativeToPoland: true,
    },
  },
  {
    id: '3',
    namePolish: 'Buk zwyczajny',
    nameLatin: 'Fagus sylvatica',
    family: 'Fagaceae',
    description: 'Buk zwyczajny to "król lasów liściastych" w Polsce. Tworzy charakterystyczne "katedry bukowe" - lasy o wysokich, prostych pniach i zwartym sklepieniu koron. Drewno buka jest bardzo twarde i było używane do produkcji narzędzi, mebli i węgla drzewnego.',
    identificationTips: [
      'Liście owalne, faliste brzegi, wyraźne nerwowanie (6-12 cm długości)',
      'Kora gładka, szara, charakterystyczna przez całe życie drzewa',
      'Owoce - trójkątne orzeszki w kolczastych okrywach (żołędzie bukowe)',
      'Pąki długie, spiczaste, brązowe, charakterystyczne dla gatunku',
      'Korona gęsta, jajowata, rzuca głęboki cień'
    ],
    seasonalChanges: {
      spring: 'Młode liście jasnozielone, jedwabiste, z delikatnym meszkiem. Kwitnienie w maju',
      summer: 'Ciemnozielone liście tworzą gęsty baldachim. Pod bukami panuje charakterystyczny półmrok',
      autumn: 'Spektakularne żółto-brązowo-miedziane ubarwienie. Opadające liście tworzą grubą ściółkę',
      winter: 'Gładka, szara kora wyraźnie widoczna. Długie, spiczaste pąki na końcach gałązek'
    },
    images: {
      tree: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
      leaves: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?w=800&h=600&fit=crop',
      bark: 'https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?w=800&h=600&fit=crop',
    },
    characteristics: {
      maxHeight: '45 m',
      lifespan: '300-500 lat',
      nativeToPoland: true,
    },
  },
];

export const mockMunicipalForms: MunicipalForm[] = [
  {
    id: '1',
    treeId: '2',
    userId: '2',
    municipalityName: 'Gmina Kraków',
    applicantName: 'Maria Nowak',
    applicantAddress: 'ul. Floriańska 45/12, 31-019 Kraków',
    generatedDate: '2024-12-20',
    status: 'draft',
    content: `WNIOSEK O UZNANIE ZA POMNIK PRZYRODY

Do: Prezydenta Miasta Krakowa
Od: Maria Nowak, ul. Floriańska 45/12, 31-019 Kraków

Szanowny Panie Prezydencie,

Na podstawie art. 44 ustawy z dnia 16 kwietnia 2004 r. o ochronie przyrody (Dz. U. z 2021 r. poz. 1098 ze zm.) składam wniosek o uznanie za pomnik przyrody następującego drzewa:

DANE DRZEWA:
- Gatunek: Lipa drobnolistna (Tilia cordata)
- Lokalizacja: Kraków, Rynek Główny, przy Sukiennicach
- Współrzędne GPS: 50.0647°N, 19.9450°E
- Pierśnica: 380 cm
- Wysokość: około 22 m
- Stan zdrowotny: dobry

UZASADNIENIE:
Przedmiotowa lipa drobnolistna stanowi wyjątkowy okaz o znacznych walorach przyrodniczych, historycznych i kulturowych. Drzewo rośnie w sercu Krakowa, na Rynku Głównym, będąc żywym świadkiem historii miasta.

Walory przyrodnicze:
- Imponujące rozmiary (pierśnica 380 cm)
- Doskonały stan zdrowotny
- Rzadki okaz w centrum miasta
- Siedlisko dla ptaków i owadów

Walory historyczne i kulturowe:
- Drzewo pamięta średniowieczne dzieje Krakowa
- Lokalna tradycja nazywa je "Lipą Mariacką"
- Miejsce spotkań mieszkańców przez wieki

Proszę o rozpatrzenie niniejszego wniosku i uznanie opisanego drzewa za pomnik przyrody.

Z poważaniem,
Maria Nowak
Data: 20.12.2024`,
  },
];

export const mockTreeLegends: TreeLegend[] = [
  {
    id: '1',
    title: 'Dąb Bartek - Najsłynniejszy Dąb Polski',
    species: 'Dąb szypułkowy',
    location: 'Zagnańsk, województwo świętokrzyskie',
    region: 'Świętokrzyskie',
    period: 'Około 700 lat',
    story: 'Dąb Bartek to najsłynniejszy dąb w Polsce, rosnący w Zagnańsku koło Kielc. Według legendy, pod tym drzewem odpoczywał król Kazimierz Wielki podczas swoich podróży. Drzewo ma obwód pnia około 13,5 metra i wysokość 30 metrów. Nazwa "Bartek" pochodzi od imienia miejscowego leśniczego, który opiekował się drzewem w XIX wieku. W 1954 roku dąb został uznany za pomnik przyrody. Legenda głosi, że każdy, kto dotknie pnia Bartka, będzie miał szczęście w życiu.',
    author: 'Maria Nowak',
    image: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    likes: 234,
    treeId: '1'
  },
  {
    id: '2',
    title: 'Lipa Napoleona w Kutnie',
    species: 'Lipa drobnolistna',
    location: 'Kutno, województwo łódzkie',
    region: 'Łódzkie',
    period: 'Około 200 lat',
    story: 'Ta majestatyczna lipa rośnie w parku miejskim w Kutnie i według lokalnej legendy, Napoleon Bonaparte odpoczywał w jej cieniu podczas kampanii 1807 roku. Drzewo ma obwód pnia około 4,5 metra i jest jednym z najstarszych drzew w mieście. Mieszkańcy Kutna wierzą, że lipa przynosi szczęście zakochanym - młode pary często przychodzą tutaj, aby złożyć przysięgę miłości. Każdego lata, podczas kwitnienia, drzewo wypełnia park cudownym aromatem, przyciągając pszczoły z całej okolicy.',
    author: 'Piotr Wiśniewski',
    image: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    likes: 156,
    treeId: '2'
  },
  {
    id: '3',
    title: 'Buk Królewski w Puszczy Bukowej',
    species: 'Buk zwyczajny',
    location: 'Puszcza Bukowa, województwo zachodniopomorskie',
    region: 'Zachodniopomorskie',
    period: 'Około 400 lat',
    story: 'W sercu Puszczy Bukowej rośnie potężny buk, który miejscowi nazywają "Królewskim". Legenda głosi, że pod tym drzewem król Bolesław Chrobry modlił się przed bitwą pod Cedynią w 972 roku. Drzewo ma obwód pnia ponad 6 metrów i wysokość 35 metrów. Jesienią, gdy liście przybierają złociste barwy, buk wygląda jak prawdziwy król lasu. Leśnicy opowiadają, że w pełnię księżyca można usłyszeć szept dawnych władców, którzy błogosławią ziemię polską. Drzewo jest miejscem pielgrzymek dla miłośników przyrody z całego kraju.',
    author: 'Anna Zielińska',
    image: 'https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg?w=800&h=600&fit=crop',
    likes: 189,
    treeId: '3'
  },
  {
    id: '4',
    title: 'Klon Powstańców Warszawskich',
    species: 'Klon pospolity',
    location: 'Warszawa, Park Skaryszewski',
    region: 'Mazowieckie',
    period: 'Około 80 lat',
    story: 'Ten klon został posadzony w 1945 roku na pamiątkę powstańców warszawskich. Według relacji świadków, sadzonka została zasadzona przez grupę ocalałych powstańców jako symbol nadziei i odrodzenia. Drzewo rośnie w Parku Skaryszewskim i każdego roku 1 sierpnia mieszkańcy Warszawy składają pod nim kwiaty i zapalają znicze. Klon ma charakterystyczną, rozłożystą koronę, która jesienią płonie czerwienią i złotem. Starsi mieszkańcy opowiadają, że w cieniu tego drzewa spotykali się członkowie podziemia, planując akcje sabotażowe. Dziś jest to miejsce pamięci i refleksji.',
    author: 'Jan Kowalski',
    image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?w=800&h=600&fit=crop',
    likes: 298,
    treeId: '4'
  },
  {
    id: '5',
    title: 'Jesion Czarownic z Roztocza',
    species: 'Jesion wyniosły',
    location: 'Roztoczański Park Narodowy',
    region: 'Lubelskie',
    period: 'Około 300 lat',
    story: 'W głębi Roztoczańskiego Parku Narodowego rośnie tajemniczy jesion, który miejscowi nazywają "Jesionem Czarownic". Legenda głosi, że w dawnych czasach pod tym drzewem zbierały się znachorki i zielarki, które przygotowywały lecznicze mikstury z jego kory i liści. Drzewo ma obwód pnia około 5 metrów i charakterystyczną, pokręconą koronę. Według wierzeń ludowych, jesion ma moc uzdrawiającą - chorzy przychodzili tutaj, aby dotknąć jego kory i poprosić o zdrowie. Współcześni badacze potwierdzają, że kora jesionu rzeczywiście ma właściwości lecznicze. Drzewo jest objęte ścisłą ochroną jako pomnik przyrody.',
    author: 'Katarzyna Zielińska',
    image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?w=800&h=600&fit=crop',
    likes: 167,
    treeId: '5'
  }
];

// Current logged-in user (mock)
export const currentUser = mockUsers[0];