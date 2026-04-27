/* ============================================
   ЗЛАТНА НИТ — Data Layer
   Products, Categories, Gallery, Helpers
   ============================================ */

const CATEGORIES = [
  { id: 'wedding', name: 'Venčanje', icon: '💍', description: 'Peškiri i setovi za venčanje' },
  { id: 'baptism', name: 'Krštenje', icon: '👶', description: 'Peškiri i setovi za krštenje' },
  { id: 'slava', name: 'Slava', icon: '🕯️', description: 'Peškiri za krsnu slavu' },
  { id: 'embroidery', name: 'Sitan Vez', icon: '🧵', description: 'Ručni sitan vez i dekorativni tekstil' },
  { id: 'gifts', name: 'Poklon Setovi', icon: '🎁', description: 'Luksuzni poklon setovi' },
];

const SAMPLE_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'Peškir za Venčanje "Zlatna Harmonija"',
    slug: 'zlatna-harmonija',
    category: 'wedding',
    price: 4500,
    shortDescription: 'Ručno vezen peškir sa zlatnim motivima, savršen za ceremoniju venčanja.',
    description: 'Ovaj izuzetan peškir je plod stručnog ručnog rada naših majstorica sa višedecenijskim iskustvom. Svaki bod je pažljivo postavljen kako bi se stvorila harmonija zlatnih motiva koji simbolizuju večnu ljubav i zajedništvo. Izrađen od najfinijeg pamučnog platna, ovaj peškir nije samo ukras ceremonije — on je nasleđe koje se čuva generacijama.\n\nZlatni konac je pažljivo biran da pruži pravi sjaj bez gubitka elegancije. Dimenzije: 150x40cm.',
    images: [],
    featured: true,
    inStock: true,
    features: ['100% pamuk', 'Ručni rad', 'Zlatni konac', '150x40 cm'],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'prod-002',
    title: 'Peškir za Krštenje "Anđeoska Milost"',
    slug: 'andeoska-milost',
    category: 'baptism',
    price: 3800,
    shortDescription: 'Nežan peškir sa anđeoskim motivima, idealan za svečanost krštenja.',
    description: 'Peškir "Anđeoska Milost" je posebno dizajniran za najlepši dan u životu vašeg deteta. Fini vez sa motivima anđela i nebeski belim tonovima stvara osećaj svetosti i čistote. Svaki peškir je jedinstven jer je u potpunosti ručno izrađen, čineći ga dragocenim poklonom koji se čuva kao porodično blago.\n\nMaterijal je hipoalergenski i nežan za osetljivu bebinu kožu. Dimenzije: 120x35cm.',
    images: [],
    featured: true,
    inStock: true,
    features: ['Hipoalergenski pamuk', 'Ručni rad', 'Nežan za kožu', '120x35 cm'],
    createdAt: '2025-02-01T10:00:00Z'
  },
  {
    id: 'prod-003',
    title: 'Set Peškira za Kumove "Večna Veza"',
    slug: 'vecna-veza',
    category: 'wedding',
    price: 8900,
    shortDescription: 'Luksuzni set od dva peškira za kumove, sa usklađenim zlatnim motivima.',
    description: 'Set "Večna Veza" obuhvata dva prekrasna peškira dizajnirana da simbolizuju nerazrušivu vezu između kumova i mladenaca. Svaki peškir nosi komplementarne motive koji zajedno čine celinu — baš kao što kumstvo spaja dve porodice.\n\nSet dolazi u elegantnoj poklon kutiji sa satenskom trakom, spreman za poklanjanje. Dimenzije svakog peškira: 150x40cm.',
    images: [],
    featured: true,
    inStock: true,
    features: ['Set od 2 peškira', 'Poklon kutija', 'Zlatni konac', '150x40 cm svaki'],
    createdAt: '2025-03-10T10:00:00Z'
  },
  {
    id: 'prod-004',
    title: 'Sitan Vez Jastučić za Burme',
    slug: 'jastucic-za-burme',
    category: 'wedding',
    price: 2500,
    shortDescription: 'Elegantni jastučić za burme sa sitnim vezom i satenskom trakom.',
    description: 'Ovaj ručno izrađeni jastučić za burme donosi dodir tradicije u modernu ceremoniju venčanja. Sitan vez sa delikatnim floralnim motivima okružuje centralni deo gde se postavljaju burme, pričvršćene nežnom satenskom trakom.\n\nJastučić je izrađen od najfinijeg lana, a svaki detalj veza je rezultat satima posvećenog ručnog rada. Dimenzije: 18x18cm.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Fini lan', 'Sitan vez', 'Satenska traka', '18x18 cm'],
    createdAt: '2025-03-15T10:00:00Z'
  },
  {
    id: 'prod-005',
    title: 'Vezena Ikona Bogorodice',
    slug: 'vezena-ikona-bogorodice',
    category: 'embroidery',
    price: 12000,
    shortDescription: 'Unikatna ručno vezena ikona Presvete Bogorodice na svilenoj podlozi.',
    description: 'Ova izuzetna vezena ikona je prava umetnička delo — rezultat stotina sati predanog ručnog rada. Lik Presvete Bogorodice je vezen na svilenoj podlozi sa preko 30 nijansi konca, stvarajući dubinu i realizam koji oduzima dah.\n\nIkona dolazi uramljena u ručno rađeni drveni ram sa zlatnim detaljima. Savršen dar za posebne prilike ili za ukrašavanje svetog kutka vašeg doma. Dimenzije sa ramom: 40x50cm.',
    images: [],
    featured: true,
    inStock: true,
    features: ['Svilena podloga', '30+ nijansi konca', 'Drveni ram', '40x50 cm'],
    createdAt: '2025-04-01T10:00:00Z'
  },
  {
    id: 'prod-006',
    title: 'Poklon Set za Mladence "Blagoslov"',
    slug: 'poklon-set-blagoslov',
    category: 'gifts',
    price: 15000,
    shortDescription: 'Kompletni poklon set za mladence sa peškiricom, jastučićem i stolnjakom.',
    description: 'Set "Blagoslov" je naš najekskluzivniji poklon za mladence. Sadrži tri ručno vezena komada: ceremonijalni peškir sa personalizovanim inicijalioma, jastučić za burme i dekorativni stolnjak — sve usklađeno u istom zlatno-belom motivu.\n\nSvaki set je numerisan i dolazi sa sertifikatom autentičnosti. Pakovan u luksuznu kutiju od nature papira sa zlatnim tiskom. Idealan poklon za par koji ceni tradiciju i kvalitet.',
    images: [],
    featured: true,
    inStock: true,
    features: ['3 komada u setu', 'Sertifikat autentičnosti', 'Luksuzna kutija', 'Personalizacija'],
    createdAt: '2025-04-15T10:00:00Z'
  },
  {
    id: 'prod-007',
    title: 'Peškir za Slavu "Domaćinski"',
    slug: 'peskir-za-slavu-domacinski',
    category: 'slava',
    price: 3200,
    shortDescription: 'Tradicionalni peškir za krsnu slavu sa motivima krsta i vinove loze.',
    description: 'Peškir "Domaćinski" je izrađen poštujući vekove stare tradicije srpskog veza. Motivi krsta i vinove loze simbolizuju veru i plodnost, a pažljiv rad svake naše majstorice osigurava da svaki peškir bude jedinstven.\n\nOvaj peškir nije samo ukras slavske trpeze — on je simbol porodične tradicije koja se prenosi s kolena na koleno. Dimenzije: 140x35cm.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Tradicionalni motivi', 'Pamučno platno', 'Ručni rad', '140x35 cm'],
    createdAt: '2025-05-01T10:00:00Z'
  },
  {
    id: 'prod-008',
    title: 'Sitan Vez Stolnjak "Svečanost"',
    slug: 'stolnjak-svecanost',
    category: 'embroidery',
    price: 7500,
    shortDescription: 'Raskošan stolnjak sa sitnim vezom, savršen za svečane prilike.',
    description: 'Stolnjak "Svečanost" transformiše svaki sto u pravu izložbu lepote i tradicije. Ivice su ukrašene preciznim sitnim vezom sa floralnim motivima koji se prepliću u elegantnom ritmu.\n\nIzrađen od mešavine lana i pamuka, ovaj stolnjak je dovoljno izdržljiv za svakodnevnu upotrebu, ali dovoljno elegantan za najsvečanije prilike. Dimenzije: 150x150cm.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Lan i pamuk', 'Floralni motivi', 'Sitan vez', '150x150 cm'],
    createdAt: '2025-05-15T10:00:00Z'
  },
  {
    id: 'prod-009',
    title: 'Mini Peškir za Goste "Elegancija"',
    slug: 'mini-peskir-elegancija',
    category: 'gifts',
    price: 1800,
    shortDescription: 'Sett malih peškira za goste sa diskretnim zlatnim vezom.',
    description: 'Ovi mali peškiri su savršeni za posebne goste ili kao deo dekoracije na svečanostima. Diskretan ali elegantan zlatni vez na uglu dodaje dodir luksuza koji se oseća pri svakom dodiru.\n\nSet sadrži 3 peškira u koordiniranim bojama. Idealni kao poklon za domaćice koje vole da svaki detalj bude savršen. Dimenzije svakog: 40x60cm.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Set od 3 komada', 'Zlatni detalj', 'Fini pamuk', '40x60 cm'],
    createdAt: '2025-06-01T10:00:00Z'
  },
  {
    id: 'prod-010',
    title: 'Personalizovani Peškir sa Monogramom',
    slug: 'personalizovani-monogram',
    category: 'gifts',
    price: 5500,
    shortDescription: 'Peškir po meri sa vašim inicijalima ili porukom, vezen zlatnim koncem.',
    description: 'Napravite nešto zaista lično — peškir sa vašim monogramom ili kratkom porukom, vezen zlatnim koncem u elegantnom kaligrafskom stilu. Savršen poklon za venčanje, godišnjicu, ili bilo koju posebnu priliku.\n\nMožete izabrati do 3 inicijala ili kratku poruku do 20 karaktera. Naše majstorice će vaše reči pretvoriti u umetničko delo. Dimenzije: 150x40cm.',
    images: [],
    featured: true,
    inStock: true,
    features: ['Personalizacija', 'Zlatni konac', 'Kaligrafski stil', '150x40 cm'],
    createdAt: '2025-06-15T10:00:00Z'
  },
  {
    id: 'prod-011',
    title: 'Set za Krštenje "Nebeska Radost"',
    slug: 'nebeska-radost',
    category: 'baptism',
    price: 11000,
    shortDescription: 'Kompletni set za krštenje: peškir, kapica i pokrivačić sa anđeoskim motivima.',
    description: 'Set "Nebeska Radost" je sve što vam je potrebno za savršeno krštenje. Sadrži peškir, kapicu i mali pokrivačić — sve usklađeno sa nežnim anđeoskim motivima i belim satenskim trakama.\n\nSvaki komad je ručno vezen i pažljivo pakovan u poklon kutiju. Materijali su hipoalergenski i nežni za osetljivu bebinu kožu. Set uključuje mogućnost vezenja imena i datuma krštenja.',
    images: [],
    featured: true,
    inStock: true,
    features: ['3 komada u setu', 'Hipoalergenski', 'Personalizacija', 'Poklon kutija'],
    createdAt: '2025-07-01T10:00:00Z'
  },
  {
    id: 'prod-012',
    title: 'Vez na Platnu — Porodično Stablo',
    slug: 'porodicno-stablo',
    category: 'embroidery',
    price: 9800,
    shortDescription: 'Unikatno porodično stablo vezeno na platnu, sa imenima članova porodice.',
    description: 'Ovaj jedinstveni komad spaja umetnost veza sa porodičnom istorijom. Stablo života vezeno na platnu sadrži imena članova vaše porodice, stvarajući dragocenu uspomenu i dekorativno remek-delo.\n\nPošaljite nam imena i mi ćemo kreirati potpuno personalizovano porodično stablo. Svaki list predstavlja jednog člana porodice, a deblo simbolizuje snagu porodičnih korena. Dimenzije: 50x60cm. Uramljeno.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Potpuno personalizovano', 'Vezeno na platnu', 'Sa ramom', '50x60 cm'],
    createdAt: '2025-07-15T10:00:00Z'
  },
  {
    id: 'prod-013',
    title: 'Peškir za Domaćina "Tradicija"',
    slug: 'peskir-tradicija',
    category: 'slava',
    price: 4200,
    shortDescription: 'Ceremonijalni peškir za domaćina slave, bogato ukrašen tradicionalnim motivima.',
    description: 'Peškir "Tradicija" je dizajniran za domaćina koji želi da njegova slava bude upamćena po lepoti i posvećenosti. Bogati tradicionalni motivi su inspirisani srpskim srednjovekovnim rukopisima i manastirskim vezenjem.\n\nIzrađen od dvostruko tkanog pamuka za extra izdržljivost, ovaj peškir podnosi ceremonijalno korišćenje godinama. Dimenzije: 160x45cm.',
    images: [],
    featured: false,
    inStock: true,
    features: ['Dvostruko tkani pamuk', 'Srednjovekovni motivi', 'Extra izdržljiv', '160x45 cm'],
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'prod-014',
    title: 'Svileni Rubac sa Vezom',
    slug: 'svileni-rubac',
    category: 'embroidery',
    price: 6300,
    shortDescription: 'Elegantan svileni rubac sa ručno vezenim floralnim motivima.',
    description: 'Ovaj svileni rubac je oličenje ženstvenosti i elegancije. Ručno vezeni floralni motivi u pastelnim tonovima pretvaraju običan rubac u pravu modnu izjavu ili svečani aksesoar.\n\nIdealan kao poklon za kumicu, majku mlade ili svaku ženu koja ceni fini ručni rad. Dimenzije: 70x70cm. Dolazi u satenskoj kesici.',
    images: [],
    featured: false,
    inStock: true,
    features: ['100% svila', 'Floralni motivi', 'Satenska kesica', '70x70 cm'],
    createdAt: '2025-08-15T10:00:00Z'
  },
  {
    id: 'prod-015',
    title: 'Poklon Kutija "Zlatni Trenutci"',
    slug: 'zlatni-trenutci',
    category: 'gifts',
    price: 13500,
    shortDescription: 'Premium poklon set u ekskluzivnoj kutiji — peškir, rubac i mirisna sveća.',
    description: 'Set "Zlatni Trenutci" je naš najluksuzniji poklon paket. U elegantnoj kutiji od recikliranog kartona sa zlatnim tiskom, pronaći ćete: ručno vezen peškir, svileni rubac sa vezom i ručno rađenu mirisnu sveću sa notama lavande i vanile.\n\nSvaki element je pažljivo odabran da stvori celinu koja ostavlja bez daha. Idealan za one kojima želite pokazati koliko vam znače.',
    images: [],
    featured: true,
    inStock: true,
    features: ['3 komada u setu', 'Luksuzna kutija', 'Mirisna sveća', 'Poklon spreman'],
    createdAt: '2025-09-01T10:00:00Z'
  }
];

const GALLERY_IMAGES = [
  { id: 'g1', category: 'wedding', alt: 'Venčani peškir sa zlatnim vezom' },
  { id: 'g2', category: 'baptism', alt: 'Set za krštenje' },
  { id: 'g3', category: 'embroidery', alt: 'Detalj sitnog veza' },
  { id: 'g4', category: 'wedding', alt: 'Jastučić za burme' },
  { id: 'g5', category: 'slava', alt: 'Slavski peškir' },
  { id: 'g6', category: 'gifts', alt: 'Poklon set u kutiji' },
  { id: 'g7', category: 'embroidery', alt: 'Majstorica za razboju' },
  { id: 'g8', category: 'wedding', alt: 'Detalj zlatnog veza' },
  { id: 'g9', category: 'baptism', alt: 'Anđeoski motiv' },
  { id: 'g10', category: 'embroidery', alt: 'Floralni sitan vez' },
  { id: 'g11', category: 'gifts', alt: 'Elegantno pakovanje' },
  { id: 'g12', category: 'slava', alt: 'Tradicionalni motivi' }
];

const TESTIMONIALS = [
  {
    text: 'Peškiri za naše venčanje su bili apsolutno savršeni. Svaki gost je bio oduševljen kvalitetom veza. Hvala Zlatnoj Niti na ovom nezaboravnom daru!',
    name: 'Jelena i Marko',
    role: 'Venčanje, jun 2025',
    avatar: ''
  },
  {
    text: 'Naručili smo set za krštenje našeg sina i ostali smo bez reči. Toliko nežnosti i pažnje u svakom bodu — osećaj je neprocenjiv.',
    name: 'Ana Petrović',
    role: 'Krštenje, septembar 2025',
    avatar: ''
  },
  {
    text: 'Poklon set "Zlatni Trenutci" sam poklonila kumici i plakala je od sreće. Kvalitet i elegancija su na nivou koji nisam očekivala. Topla preporuka!',
    name: 'Milica Jovanović',
    role: 'Poklon za kumicu, decembar 2025',
    avatar: ''
  }
];

/* ── Data Management ── */

const DB = {
  _getKey(collection) {
    return `zlatna_nit_${collection}`;
  },

  init() {
    // Initialize products if not present
    if (!localStorage.getItem(this._getKey('products'))) {
      localStorage.setItem(this._getKey('products'), JSON.stringify(SAMPLE_PRODUCTS));
    }
    if (!localStorage.getItem(this._getKey('orders'))) {
      localStorage.setItem(this._getKey('orders'), JSON.stringify([]));
    }
    if (!localStorage.getItem(this._getKey('messages'))) {
      localStorage.setItem(this._getKey('messages'), JSON.stringify([]));
    }
    if (!localStorage.getItem(this._getKey('admin_user'))) {
      localStorage.setItem(this._getKey('admin_user'), JSON.stringify({
        username: 'admin',
        password: 'zlatnanit2025'
      }));
    }
  },

  getAll(collection) {
    const data = localStorage.getItem(this._getKey(collection));
    return data ? JSON.parse(data) : [];
  },

  getById(collection, id) {
    const items = this.getAll(collection);
    return items.find(item => item.id === id);
  },

  getBySlug(collection, slug) {
    const items = this.getAll(collection);
    return items.find(item => item.slug === slug);
  },

  add(collection, item) {
    const items = this.getAll(collection);
    item.id = item.id || 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    item.createdAt = item.createdAt || new Date().toISOString();
    items.push(item);
    localStorage.setItem(this._getKey(collection), JSON.stringify(items));
    return item;
  },

  update(collection, id, updates) {
    const items = this.getAll(collection);
    const idx = items.findIndex(item => item.id === id);
    if (idx > -1) {
      items[idx] = { ...items[idx], ...updates };
      localStorage.setItem(this._getKey(collection), JSON.stringify(items));
      return items[idx];
    }
    return null;
  },

  delete(collection, id) {
    const items = this.getAll(collection);
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(this._getKey(collection), JSON.stringify(filtered));
    return filtered;
  },

  count(collection) {
    return this.getAll(collection).length;
  },

  search(collection, query) {
    const items = this.getAll(collection);
    const q = query.toLowerCase();
    return items.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.shortDescription && item.shortDescription.toLowerCase().includes(q))
    );
  },

  filter(collection, filters) {
    let items = this.getAll(collection);
    
    if (filters.category && filters.category !== 'all') {
      items = items.filter(item => item.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      items = items.filter(item => item.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      items = items.filter(item => item.price <= filters.maxPrice);
    }
    if (filters.featured) {
      items = items.filter(item => item.featured);
    }
    if (filters.inStock) {
      items = items.filter(item => item.inStock);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
      );
    }
    
    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-asc':
          items.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          items.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          items.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'newest':
          items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }
    
    return items;
  },

  // Admin auth
  authenticate(username, password) {
    const user = JSON.parse(localStorage.getItem(this._getKey('admin_user')));
    return user && user.username === username && user.password === password;
  },

  isAdminLoggedIn() {
    return sessionStorage.getItem('zlatna_nit_admin_session') === 'active';
  },

  adminLogin() {
    sessionStorage.setItem('zlatna_nit_admin_session', 'active');
  },

  adminLogout() {
    sessionStorage.removeItem('zlatna_nit_admin_session');
  }
};

/* ── Utility Functions ── */

function formatPrice(price) {
  return price.toLocaleString('sr-RS') + ' RSD';
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/[đ]/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCategoryName(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  return cat ? cat.name : id;
}

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'upravo sada';
  if (seconds < 3600) return Math.floor(seconds / 60) + ' min';
  if (seconds < 86400) return Math.floor(seconds / 3600) + ' h';
  if (seconds < 2592000) return Math.floor(seconds / 86400) + ' dana';
  return date.toLocaleDateString('sr-RS');
}

// Initialize DB on load
DB.init();
