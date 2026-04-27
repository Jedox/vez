# Златна Нит — Premium Ručni Vez & Peškiri

Luksuzna web aplikacija za online prodavnicu ručno vezenih peškira i proizvoda za venčanja, krštenja i posebne prilike.

## 🚀 Kako Pokrenuti

**Nema potrebe za instalacijom!** Jednostavno otvorite `index.html` u vašem web pregledaču.

### Opcija 1: Direktno otvaranje
1. Otvorite folder `Vez Claude`
2. Dvaput kliknite na `index.html`

### Opcija 2: Sa lokalnim serverom (preporučeno za bolji SEO test)
Ako imate Python instaliran:
```bash
python -m http.server 8000
```
Zatim otvorite http://localhost:8000

### Opcija 3: VS Code Live Server
Instalirajte Live Server ekstenziju u VS Code, pa desni klik na `index.html` → "Open with Live Server"

---

## 📁 Struktura Projekta

```
Vez Claude/
├── index.html              → Početna strana
├── about.html              → O Nama
├── products.html           → Katalog proizvoda
├── product-detail.html     → Detalji proizvoda
├── gallery.html            → Galerija radova
├── contact.html            → Kontakt strana
├── admin/                  → Admin panel
│   ├── index.html          → Login
│   ├── dashboard.html      → Dashboard
│   ├── products.html       → Upravljanje proizvodima
│   ├── orders.html         → Upravljanje porudžbinama
│   └── messages.html       → Poruke korisnika
├── css/
│   ├── variables.css       → Dizajn tokeni
│   ├── base.css            → Reset & tipografija
│   ├── components.css      → Komponente (dugmad, kartice, forme...)
│   ├── layout.css          → Layout (nav, footer, grid)
│   ├── pages.css           → Stilovi za stranice
│   ├── animations.css      → Animacije
│   └── admin.css           → Admin panel stilovi
├── js/
│   ├── data.js             → Podaci & localStorage CRUD
│   ├── app.js              → Tema, navigacija, animacije
│   ├── products.js         → Katalog, pretraga, filteri
│   ├── gallery.js          → Galerija & lightbox
│   └── contact.js          → Kontakt forma
└── README.md               → Ovaj fajl
```

---

## 👤 Admin Panel

Pristupite admin panelu na: `admin/index.html`

### Pristupni podaci:
- **Korisničko ime:** `admin`
- **Lozinka:** `zlatnanit2025`

### Funkcionalnosti:
- 📊 Dashboard sa statistikom
- 📦 Dodavanje, izmena, brisanje proizvoda
- 🛒 Pregled i upravljanje porudžbinama
- 💌 Pregled kontakt poruka
- 🖼️ Upload slika proizvoda

---

## 🎨 Dizajn Sistem

- **Fontovi:** Playfair Display (naslovi), Inter (tekst), Cormorant Garamond (akcenti)
- **Palete:** Zlatna, bež/krem, tamno plava (navy), šumsko zelena
- **Tema:** Light & Dark mode (automatski toggle)
- **Animacije:** Scroll reveal, shimmer efekti, hover lift, parallax

---

## 💾 Podaci

Aplikacija koristi **localStorage** za skladištenje podataka:
- Proizvodi (15 primer proizvoda dolazi pre-instalirano)
- Porudžbine
- Kontakt poruke
- Admin kredencijali

> ⚠️ Podaci se čuvaju u vašem pregledaču. Brisanje podataka pregledača će obrisati i podatke sajta.

---

## 📱 Responsive

Sajt je potpuno responsivan:
- Mobile (375px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large (1400px+)

---

## 🌐 SEO

- Semantic HTML5 struktura
- Meta tagovi za svaku stranicu
- Open Graph tagovi
- Strukturirani naslovi (h1-h6)
- Alt tekst na svim slikama
- `robots` meta na admin stranicama

---

## ⚡ Tehnologije

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- localStorage API
- Google Fonts
- Zero dependencies
