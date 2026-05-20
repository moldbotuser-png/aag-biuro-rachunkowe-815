import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calculator, 
  FileText, 
  DollarSign, 
  Briefcase, 
  ShieldCheck, 
  Check,
  Send,
  ArrowUp,
  Search,
  BookOpen
} from "lucide-react";

// Structure of image gallery for Unsplash URLs
const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1554224155-8d04cb218406?w=1200&q=80",
    title: "Nowoczesne stanowisko pracy",
    desc: "Precyzja i przejrzystość w codziennej pracy z dokumentacją finansową."
  },
  {
    url: "https://images.unsplash.com/photo-1560472355-ae525752c040?w=1200&q=80",
    title: "Indywidualne konsultacje",
    desc: "Spotkania biznesowe i wspólna analiza strategii podatkowej przedsiębiorstw."
  },
  {
    url: "https://images.unsplash.com/photo-1562575772-a054955a5078?w=1200&q=80",
    title: "Najwyższe standardy IT",
    desc: "Praca na nowoczesnych systemach księgowych klasy ERP gwarantujących bezpieczeństwo."
  },
  {
    url: "https://images.unsplash.com/photo-1507679799977-c934107127c2?w=1200&q=80",
    title: "Zaufanie i partnerstwo",
    desc: "Rodzinne wartości przekładane na stabilne i bezpieczne relacje z klientem."
  },
  {
    url: "https://images.unsplash.com/photo-1579621970563-cd6610a782ed?w=1200&q=80",
    title: "Analityka i detale",
    desc: "Każdy element i kalkulacja są sprawdzane wielopoziomowo."
  },
  {
    url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&q=80",
    title: "Dokumentacja biznesowa",
    desc: "Bezpieczne archiwizowanie i rzetelne księgowanie zgodnie z ustawą o rachunkowości."
  }
];

export default function App() {
  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active review carousel state
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Accordion open states
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]); // default opening the first two

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Contact Form Inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    rodo: false,
    calcDetails: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Interactive Pricing Calculator State
  const [legalForm, setLegalForm] = useState("jdg_kpir"); // jdg_kpir, jdg_ryczalt, spolka_kh
  const [documentCount, setDocumentCount] = useState("11-30"); // 1-10, 11-30, 31-50, 51-100, 100+
  const [employeeCount, setEmployeeCount] = useState("1-5"); // 0, 1-5, 6-15, 16+
  const [calculatedQuote, setCalculatedQuote] = useState(350);

  // Back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Update calculated pricing live based on selected inputs
  useEffect(() => {
    let basePrice = 200;

    // Adjust based on legal form
    if (legalForm === "jdg_ryczalt") basePrice = 180;
    if (legalForm === "jdg_kpir") basePrice = 250;
    if (legalForm === "spolka_kh") basePrice = 900;

    // Adjust based on documents
    let docMultiplier = 1.0;
    if (documentCount === "1-10") docMultiplier = 0.8;
    if (documentCount === "11-30") docMultiplier = 1.0;
    if (documentCount === "31-50") docMultiplier = 1.3;
    if (documentCount === "51-100") docMultiplier = 1.8;
    if (documentCount === "100+") docMultiplier = 2.6;

    // Adjust based on employee count
    let empSurcharge = 0;
    if (employeeCount === "0") empSurcharge = 0;
    if (employeeCount === "1-5") empSurcharge = 120;
    if (employeeCount === "6-15") empSurcharge = 350;
    if (employeeCount === "16+") empSurcharge = 800;

    const total = Math.round((basePrice * docMultiplier) + empSurcharge);
    setCalculatedQuote(total);
  }, [legalForm, documentCount, employeeCount]);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync pricing values to the contact message template
  const applyCalcToForm = () => {
    const legalLabel = legalForm === "jdg_ryczalt" ? "Ryczałt ewidencjonowany" : legalForm === "jdg_kpir" ? "Księga Przychodów i Rozchodów (KPiR)" : "Pełna księgowość (Księgi Handlowe)";
    const calcText = `Dzień dobry, proszę o szczegółową ofertę i kontakt. Interesuje mnie rozliczenie: ${legalLabel}, liczba dokumentów miesięcznie: ${documentCount}, liczba pracowników: ${employeeCount}. Orientacyjna wycena z kalkulatora: ok. ${calculatedQuote} zł netto.`;
    setFormData(prev => ({
      ...prev,
      message: calcText
    }));
    // Scroll smoothly to contact section
    const element = document.getElementById("kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFaq = (index: number) => {
    if (openFaqIndices.includes(index)) {
      setOpenFaqIndices(openFaqIndices.filter(i => i !== index));
    } else {
      setOpenFaqIndices([...openFaqIndices, index]);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.rodo) {
      alert("Proszę zaakceptować zgodę RODO, aby wysłać formularz.");
      return;
    }
    setFormSubmitting(true);
    // Simulate real submission
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      // Reset after success
      setFormData({ name: "", email: "", phone: "", message: "", rodo: false, calcDetails: "" });
    }, 1200);
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % 4);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + 4) % 4);
  };

  const reviews = [
    {
      name: "Anna K.",
      role: "Właścicielka startupu technologicznego",
      date: "Kwiecień 2026",
      text: "Współpraca z AAG Biuro Rachunkowe to czysta przyjemność! Profesjonalizm, terminowość i zawsze pomocna dłoń. Moja firma rozwija się dzięki ich wsparciu. Pomogli mi poukładać sprawy księgowe i zoptymalizować podatki na start.",
      score: 5
    },
    {
      name: "Marek Z.",
      role: "Właściciel firmy budowlanej",
      date: "Marzec 2026",
      text: "Zdecydowanie polecam! Pani Agnieszka i Pan Aleksander to prawdziwi eksperci pod każdym względem. Zawsze rozwiewają wszelkie wątpliwości podatkowe i dbają o każdy szczegół mojej dokumentacji kadrowej i płacowej. Są też niesamowicie cierpliwi.",
      score: 5
    },
    {
      name: "Ewa P.",
      role: "Właścicielka dynamicznego sklepu internetowego",
      date: "Luty 2026",
      text: "Od lat korzystam z usług AAG i nigdy się nie zawiodłam. Ich doradztwo podatkowe jest po prostu nieocenione dla mojej działalności e-commerce, a obsługa kadr i płac bezbłędna. Czuję absolutne bezpieczeństwo przed urzędami.",
      score: 5
    },
    {
      name: "Tomasz R.",
      role: "Projektant & Freelancer",
      date: "Styczeń 2026",
      text: "Rodzinne podejście do klienta to coś, co zdecydowanie wyróżnia AAG na tle innych biur. Zawsze czuję się wysłuchany i dokładnie rozumiem wszystkie zawiłości księgowe, dzięki ich cierpliwym i prostym wyjaśnieniom.",
      score: 5
    }
  ];

  const handleGalleryPrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  const handleGalleryNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-500 selection:text-white relative">
      
      {/* 1. STICKY TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 group">
              <div className="bg-brand-blue text-white w-12 h-12 rounded-lg flex items-center justify-center font-display font-extrabold text-xl tracking-wider shadow-md group-hover:bg-brand-blue-deep transition duration-300">
                AAG
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-slate-900 tracking-tight leading-none text-base sm:text-lg">
                  AAG Biuro Rachunkowe
                </span>
                <span className="text-[10px] text-brand-accent uppercase tracking-widest font-semibold mt-1">
                  Dwa pokolenia rzetelności
                </span>
              </div>
            </a>

            {/* Desktop Nav Links - Rule 8: class="hidden md:flex" */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <a href="#o-nas" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">O nas</a>
              <a href="#uslugi" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">Usługi</a>
              <a href="#zespol" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">Zespół</a>
              <a href="#opinie" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">Opinie</a>
              <a href="#kalkulator" className="px-3 py-2 text-sm font-medium text-amber-600 hover:text-brand-blue transition-colors font-semibold flex items-center gap-1.5 bg-amber-50 rounded-full px-4 py-1">
                <Calculator className="w-4 h-4" /> Kalkulator cen
              </a>
              <a href="#faq" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">FAQ</a>
              <a href="#kontakt" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">Kontakt</a>
              
              <div className="pl-2 lg:pl-4">
                <a 
                  href="#kontakt" 
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-display font-semibold text-white bg-brand-blue hover:bg-brand-blue-deep rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300"
                >
                  Umów wizytę
                </a>
              </div>
            </div>

            {/* Hamburger Button - Rule 8: class="md:hidden" */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                id="hamburger-btn"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  document.getElementById("mobile-menu")?.classList.toggle("hidden");
                }}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition duration-150"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Otwórz menu główne</span>
                <span className="block text-2xl font-mono">
                  {mobileMenuOpen ? "✕" : "☰"}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu - Rule 7: starts with class="hidden" and toggle on "hidden" */}
        <div 
          id="mobile-menu" 
          className="hidden md:hidden bg-white border-t border-slate-200 transition-all duration-300 ease-in-out"
        >
          <div className="px-3 py-4 space-y-1.5 sm:px-4">
            <a 
              href="#o-nas" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              O nas
            </a>
            <a 
              href="#uslugi" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              Usługi
            </a>
            <a 
              href="#zespol" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              Zespół
            </a>
            <a 
              href="#opinie" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              Opinie
            </a>
            <a 
              href="#kalkulator" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center justify-between transition duration-150"
            >
              <span>Wycena & Kalkulator cen</span>
              <Calculator className="w-5 h-5 text-amber-600" />
            </a>
            <a 
              href="#faq" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              FAQ
            </a>
            <a 
              href="#kontakt" 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("mobile-menu")?.classList.add("hidden");
              }}
              className="block px-4 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition duration-150"
            >
              Kontakt
            </a>
            
            <div className="pt-4 pb-2 border-t border-slate-100 px-4">
              <a 
                href="#kontakt" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById("mobile-menu")?.classList.add("hidden");
                }}
                className="w-full text-center flex items-center justify-center px-5 py-3 text-base font-display font-semibold text-white bg-brand-blue hover:bg-brand-blue-deep rounded-lg shadow"
              >
                Umów wizytę w biurze
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      {/* Rule 1: rgba(0,0,0,0.5) dark overlay contrast ratio > 4.5:1. */}
      {/* Rule 2: Background image MUST have mandatory: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(...); */}
      <header 
        id="hero"
        className="relative bg-slate-950 text-white py-24 md:py-36 min-h-[85vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1554224155-8d04cb218406?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-0"></div>
        
        {/* Decorative corner patterns inside bounds */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-brand-accent/30 hidden md:block z-0 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-brand-accent/30 hidden md:block z-0 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 bg-amber-500/15 border border-amber-400/30 rounded-full text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-sm shadow-inner">
            <CheckCircle className="w-4 h-4 text-brand-accent" /> Rodzinne Tradycje od 1995 • Wrocław i cała Polska
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-6xl tracking-tight leading-tight mb-8">
            AAG Biuro Rachunkowe: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              Dwa pokolenia doświadczenia
            </span> <br className="hidden md:inline"/>
            dla Twojego biznesu we Wrocławiu.
          </h1>

          {/* Subheadline - highly contrasted text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-light mb-12">
            Rzetelna księgowość, kompleksowa obsługa kadr i płac, profesjonalne doradztwo – stabilność i rozwój Twojej firmy. Świadczymy usługi stacjonarnie oraz w 100% online dla przedsiębiorstw z całej Polski.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-display font-medium text-slate-900 bg-brand-accent hover:bg-brand-accent-hover active:scale-95 text-center rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Umów bezpłatną konsultację
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </a>
            <a
              href="#uslugi"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-display font-medium text-white bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 border border-slate-600/50 backdrop-blur-sm text-center rounded-lg transition-all duration-300"
            >
              Poznaj naszą ofertę
            </a>
          </div>

          {/* Live stats teaser */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15 max-w-4xl mx-auto">
            <div className="text-center">
              <span className="block text-xl sm:text-2xl font-bold text-amber-400 font-display">1995</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-300">Rok założenia</span>
            </div>
            <div className="text-center border-l border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-amber-400 font-display">2 pokolenia</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-300">Wiedza i tradycja</span>
            </div>
            <div className="text-center border-l border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-amber-400 font-display">200+</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-300">Obsługiwanych firm</span>
            </div>
            <div className="text-center border-l border-white/10">
              <span className="block text-xl sm:text-2xl font-bold text-amber-400 font-display">Orły</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-300">Orły Rachunkowości</span>
            </div>
          </div>

        </div>
      </header>

      {/* 3. TRUST BAR / SECTORS */}
      <section className="bg-white border-b border-slate-200 py-10 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Bezpieczeństwo i prestiż</p>
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">Dlaczego nam zaufano?</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full lg:w-auto flex-1 max-w-5xl justify-items-center">
              
              <div className="flex items-center space-x-3.5 bg-slate-50/80 px-4 py-3 rounded-lg border border-slate-100 w-full max-w-[260px]">
                <div className="bg-brand-blue/10 text-brand-blue p-2.5 rounded-md">
                  <Award className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Orły Rachunkowości</p>
                  <p className="text-sm font-semibold text-slate-800">Laureat Plebiscytu</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-slate-50/80 px-4 py-3 rounded-lg border border-slate-100 w-full max-w-[260px]">
                <div className="bg-brand-blue/10 text-brand-blue p-2.5 rounded-md">
                  <ShieldCheck className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Ubezpieczenie OC</p>
                  <p className="text-sm font-semibold text-slate-800">Pełna ochrona finansowa</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-slate-50/80 px-4 py-3 rounded-lg border border-slate-100 w-full max-w-[260px]">
                <div className="bg-brand-blue/10 text-brand-blue p-2.5 rounded-md">
                  <Clock className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">31 lat na rynku</p>
                  <p className="text-sm font-semibold text-slate-800">Ogromne doświadczenie</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-slate-50/80 px-4 py-3 rounded-lg border border-slate-100 w-full max-w-[260px]">
                <div className="bg-amber-500/10 text-amber-600 p-2.5 rounded-md">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Satysfakcja klienta</p>
                  <p className="text-sm font-semibold text-slate-800">Średnia ocena 4.9/5</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="uslugi" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Nasza Oferta</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Kompleksowe Usługi Księgowe i Kadrowe
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Oferujemy ekspercką wiedzę i skrupulatność we wszystkich obszarach finansowych Twojego przedsiębiorstwa. Sprawdź, jak możemy zabezpieczyć Twój biznes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Pełna księgowość */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  1. Pełna księgowość
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Kompleksowe prowadzenie ksiąg rachunkowych dla spółek z o.o., S.A., komandytowych i dużych przedsiębiorstw. Zapewniamy pełną zgodność z aktualnymi zawiłościami ustawy o rachunkowości, bilanse, rachunki zysków i strat oraz skuteczną optymalizację kosztową płynności finansowej.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Dla spółek z o.o. i S.A.</span>
                <a href="#kalkulator" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Przejdź do wyceny <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Uproszczona księgowość */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  2. Uproszczona księgowość
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Obsługa Księgi Przychodów i Rozchodów (KPiR), ryczałtu od przychodów ewidencjonowanych oraz karty podatkowej dla jednoosobowych działalności gospodarczych (JDG) i małych firm. Kontrolujemy limity VAT, księgujemy koszty, prowadzimy czytelną ewidencję środków trwałych.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Dla firm jednoosobowych</span>
                <a href="#kalkulator" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Przejdź do wyceny <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Obsługa kadr i płac */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  3. Kadry i płace
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Profesjonalne zarządzanie dokumentacją pracowniczą przedsiębiorstwa. Sporządzanie list płac, umów o pracę, umów cywilnoprawnych (zlecenie, o dzieło). Pełna wysyłka deklaracji i rozliczeń z ZUS i US, ewidencja urlopów, zwolnień lekarskich oraz wsparcie w badaniach medycyny pracy.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Dla pracodawców</span>
                <a href="#kalkulator" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Przejdź do wyceny <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4. Doradztwo podatkowe i biznesowe */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  4. Doradztwo podatkowe
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Eksperckie wsparcie w wyborze najkorzystniejszej formy opodatkowania (również na etapie zakładania firmy). Optymalizacja kosztów, audyty podatkowe rzetelności rozliczeń, przygotowywanie wniosków o wiążące interpretacje podatkowe indywidualne przed urzędami.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Optymalizacje podatkowe</span>
                <a href="#kontakt" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Skonsultuj się <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 5. Analiza finansowa i strategiczna */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  5. Analiza finansowa
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Szczegółowa analiza kondycji i bilansowych wyników finansowych Twojej firmy. Audyt rentowności procesów, budowanie budżetów, prognozowanie cashflow i rzetelne wsparcie partnera finansowego w podejmowaniu kluczowych strategicznych decyzji inwestycyjnych lub restrukturyzacyjnych.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Strategie inwestycyjne</span>
                <a href="#kontakt" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Skorzystaj z analizy <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 6. Kontrola księgowa i weryfikacja */}
            <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group">
              <div className="p-8">
                <div className="w-12 h-12 rounded-lg bg-brand-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                  6. Kontrola księgowa
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Regularna, fachowa weryfikacja poprawności uprzednio prowadzonej dokumentacji księgowej, minimalizowanie ryzyka kar skarbowych oraz zapewnienie bezpieczeństwa finansowego Twojej firmy. Nanoszenie wstecznych poprawek i wyprowadzanie zaległości.
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group-hover:bg-brand-blue/5 transition duration-300">
                <span className="text-xs font-mono font-medium text-slate-400">Przegląd poprawności</span>
                <a href="#kontakt" className="text-brand-blue font-semibold text-xs flex items-center gap-1 group-hover:text-brand-accent transition-colors">
                  Zleć audyt wsteczny <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ABOUT US / STORY SECTION */}
      <section id="o-nas" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Nasza Historia</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-6">
                Wielopokoleniowe Biuro Rachunkowe we Wrocławiu
              </h2>
              <div className="w-20 h-1 bg-brand-blue mb-8 rounded-full"></div>
              
              <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-base sm:text-lg leading-relaxed">
                <p>
                  W <strong>AAG Biuro Rachunkowe</strong> wierzymy, że sukces każdego biznesu opiera się na stabilnych fundamentach finansowych, rzetelności i pełnym zaufaniu. Jesteśmy dumną, rodzinną firmą z Wrocławia, która nieprzerwanie od <strong>1995 roku</strong> – czyli już od 31 lat – z ogromną pasją i zaangażowaniem wspiera przedsiębiorców w prowadzeniu ich finansów.
                </p>
                <p>
                  Nasze unikalne doświadczenie to <strong>dwa pokolenia rzetelnej wiedzy i praktyki</strong> przekazywanej z rąk do rąk. Nowoczesność technologiczna doskonale zazębia się u nas z wypracowanymi przez lata konserwatywnymi regułami bezpieczeństwa rozliczeń.
                </p>
                <p className="bg-slate-50 border-l-4 border-amber-500 p-5 rounded-r-lg font-medium italic text-slate-800 my-6 shadow-sm">
                  "Jesteśmy dumni z bycia wielokrotnym laureatem plebiscytu Orły Rachunkowości. To wyróżnienie potwierdza nasz wyjątkowy profesjonalizm i bardzo wysoką jakość usług, której możesz doświadczyć każdego dnia."
                </p>
                <p>
                  Stawiamy na prawdziwie <strong>indywidualne podejście</strong> do każdego z naszych ponad 200 klientów. Doskonale rozumiemy, że każda branża i firma wymaga unikalnych i zrównoważonych rozwiązań podatkowych. Z nami Twoje finanse są w całkowicie bezpiecznych rękach, a Ty możesz się w pełni skupić na rozwoju i skali swojego biznesu.
                </p>
              </div>

              {/* USP Checklist indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 uppercase tracking-wider text-xs font-semibold text-slate-700">
                <div className="flex items-center space-x-2.5">
                  <span className="bg-amber-100 text-amber-600 p-1.5 rounded-full"><Check className="w-4 h-4" /></span>
                  <span>Pełna reprezentacja przed ZUS i US</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="bg-amber-100 text-amber-600 p-1.5 rounded-full"><Check className="w-4 h-4" /></span>
                  <span>Ponad 31 lat zaufania na rynku</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="bg-amber-100 text-amber-600 p-1.5 rounded-full"><Check className="w-4 h-4" /></span>
                  <span>Bezpieczeństwo (Polisa OC)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="bg-amber-100 text-amber-600 p-1.5 rounded-full"><Check className="w-4 h-4" /></span>
                  <span>Nowoczesna wymiana dokumentów</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-brand-blue rounded-3xl rotate-3 scale-95 opacity-5 blur-sm z-0"></div>
              
              {/* Overlay graphics decoration */}
              <div className="absolute top-4 right-4 bg-brand-accent text-slate-900 font-display font-semibold text-xs sm:text-sm px-4.5 py-2.5 rounded-full shadow-lg z-20 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Orły Rachunkowości
              </div>

              {/* Main feature image of office / hands */}
              <div className="relative rounded-2xl overflow-hidden shadow-premium-xl z-10 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=700&q=80" 
                  alt="Dokumenty finansowe i rzetelna księgowość" 
                  className="w-full h-auto object-cover min-h-[400px]"
                />
                
                {/* Visual badge inside image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg">Bezpieczne Finanse</p>
                      <p className="text-xs text-slate-300">Gwarancja rzetelności rodzinnego biura</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5A. TEAM SECTION */}
      <section id="zespol" className="py-20 md:py-28 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Założyciele i Eksperci</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Poznaj Nasz Zespół
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Pracujesz bezpośrednio z ludźmi odpowiedzialnymi za Twój spokój. Jesteśmy zespołem ekspertów z wieloletnim doświadczeniem podatkowym.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 1. Aleksander Główka */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8 flex flex-col items-center md:items-start md:flex-row gap-6 hover:shadow-premium-xl transition-all duration-300">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-100 border-2 border-brand-accent shadow-md shrink-0 flex items-center justify-center">
                {/* Fallback elegant monogram with background for avatar */}
                <div className="w-full h-full bg-brand-blue text-white flex flex-col items-center justify-center font-display font-bold text-3xl">
                  AG
                  <span className="text-[9px] uppercase tracking-widest text-brand-accent mt-0.5">Senior</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                  Założyciel Biura
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-1">
                  Aleksander Główka
                </h3>
                <p className="text-sm font-mono text-slate-500 mb-4">Główny Księgowy (30+ lat doświadczenia)</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Założyciel biura, licencjonowany księgowy z ponad 30-letnim doświadczeniem w finansach oraz prawie podatkowym. Specjalizuje się w doradztwie strategicznym i obsłudze dużych spółek prawa handlowego w Polsce.
                </p>
              </div>
            </div>

            {/* 2. Agnieszka Główka */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8 flex flex-col items-center md:items-start md:flex-row gap-6 hover:shadow-premium-xl transition-all duration-300">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-100 border-2 border-brand-accent shadow-md shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-800 text-white flex flex-col items-center justify-center font-display font-bold text-3xl">
                  AG
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] mt-0.5">Managing</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                  Współwłaścicielka
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-1">
                  Agnieszka Główka
                </h3>
                <p className="text-sm font-mono text-slate-500 mb-4">Ekspert Kadr, Płac i Rozliczeń</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Licencjonowana księgowa, współwłaścicielka. Wybitny ekspert w dziedzinie kadr-płac oraz rozliczeń jednoosobowych działalności. Wdraża drugie pokolenie pasji, rzetelności i pełnego profesjonalizmu w rodzinnym biurze.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5B. INTERACTIVE PRICING CALCULATOR SECTION */}
      <section id="kalkulator" className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Wycena On-line</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Kalkulator Orientacyjnych Cen
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Wybierz formę działalności, szacowaną liczbę dokumentów oraz pracowników, aby otrzymać błyskawiczną orientacyjną cenę abonamentu miesięcznego.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
            
            {/* Configuration side */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-blue" />
                  1. Skonfiguruj warunki rozliczenia
                </h3>

                {/* Question 1: Legal form */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5">Forma prawna i rodzaj ewidencji:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setLegalForm("jdg_ryczalt")}
                      className={`p-4 rounded-xl text-left border text-sm transition-all ${
                        legalForm === "jdg_ryczalt"
                          ? "bg-brand-blue text-white border-brand-blue shadow-md font-medium"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block font-semibold mb-1">Ryczałt</span>
                      <span className="text-xs opacity-80 block">Jednoosobowa działalność</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLegalForm("jdg_kpir")}
                      className={`p-4 rounded-xl text-left border text-sm transition-all ${
                        legalForm === "jdg_kpir"
                          ? "bg-brand-blue text-white border-brand-blue shadow-md font-medium"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block font-semibold mb-1">KPiR</span>
                      <span className="text-xs opacity-80 block">Księga Przychodów i Rozchodów</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLegalForm("spolka_kh")}
                      className={`p-4 rounded-xl text-left border text-sm transition-all ${
                        legalForm === "spolka_kh"
                          ? "bg-brand-blue text-white border-brand-blue shadow-md font-medium"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block font-semibold mb-1">Pełne Księgi</span>
                      <span className="text-xs opacity-80 block">Księgi Handlowe (Spółki)</span>
                    </button>
                  </div>
                </div>

                {/* Question 2: Document Count */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5">Miesięczna liczba dokumentów księgowych:</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {["1-10", "11-30", "31-50", "51-100", "100+"].map((docRange) => (
                      <button
                        key={docRange}
                        type="button"
                        onClick={() => setDocumentCount(docRange)}
                        className={`py-2 px-1 text-center rounded-lg border text-sm transition-all ${
                          documentCount === docRange
                            ? "bg-brand-blue text-white border-brand-blue font-semibold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {docRange}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Employee Count */}
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5">Liczba zatrudnionych pracowników:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: "0", label: "0 (Samo-zatrudnienie)" },
                      { key: "1-5", label: "1-5 pracowników" },
                      { key: "6-15", label: "6-15 pracowników" },
                      { key: "16+", label: "Powyżej 16 osób" }
                    ].map((empObj) => (
                      <button
                        key={empObj.key}
                        type="button"
                        onClick={() => setEmployeeCount(empObj.key)}
                        className={`p-3 rounded-lg border text-center text-xs sm:text-sm transition-all ${
                          employeeCount === empObj.key
                            ? "bg-brand-blue text-white border-brand-blue font-semibold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {empObj.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-200">
                * Przedstawiona kalkulacja ma charakter szacunkowy. Ostateczna wycena zależy od specyfiki branży Twojej działalności oraz indywidualnych uzgodnień.
              </p>
            </div>

            {/* Results side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
              {/* Abs decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none"></div>

              <div>
                <span className="text-brand-accent uppercase tracking-widest text-xs font-bold block mb-2">Szacowana Wycena</span>
                <h3 className="font-display font-semibold text-2xl mb-8">Twój abonament miesięczny:</h3>

                <div className="flex items-baseline mb-6">
                  <span className="text-[14px] text-slate-300 font-medium mr-1">od ok.</span>
                  <span className="text-5xl sm:text-6xl font-display font-extrabold text-brand-accent tracking-tight">{calculatedQuote}</span>
                  <span className="text-xl text-brand-accent font-semibold ml-2">PLN / mies.</span>
                </div>
                
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Cena netto (+ VAT). W pakiecie otrzymujesz prowadzenie kompletu ewidencji księgowych, comiesięczne rozliczenia podatkowe (CIT/PIT/VAT/ZUS) oraz nielimitowany kontakt telefoniczny z Twoim dedykowanym księgowym.
                </p>

                {/* Specification parameters log */}
                <div className="bg-slate-950/40 p-4 rounded-xl space-y-2 text-xs text-slate-200 mb-8 border border-white/5 font-mono">
                  <div className="flex justify-between">
                    <span>Ewidencja:</span>
                    <span className="font-semibold text-brand-accent uppercase">
                      {legalForm === "jdg_ryczalt" ? "Ryczałt" : legalForm === "jdg_kpir" ? "KPiR" : "Spółka KH"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dokumenty:</span>
                    <span className="font-semibold text-white">{documentCount} / mies.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pracownicy:</span>
                    <span className="font-semibold text-white">{employeeCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={applyCalcToForm}
                  className="w-full inline-flex items-center justify-center py-4 px-6 text-slate-900 bg-brand-accent hover:bg-brand-accent-hover active:scale-95 text-center font-display font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" /> Prześlij wycenę do formularza
                </button>
                <p className="text-center text-[10px] text-slate-300 uppercase tracking-widest mt-3">Bezpłatna weryfikacja w 30 minut</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF (GOOGLE REVIEWS SLIDER) */}
      <section id="opinie" className="py-20 md:py-28 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Opinie i Referencje</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Co Mówią o Nas Klienci?
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Poznaj autentyczne zdanie przedsiębiorców z Wrocławia i całej Polski, dla których rzetelność i spokój księgowy mają kluczowe znaczenie.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            
            {/* Carousel Item with shadow styling */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 md:p-12 relative shadow-premium min-h-[300px] flex flex-col justify-between transition-all duration-300">
              
              {/* Background elegant quotes symbol */}
              <div className="absolute top-6 right-8 text-7xl font-serif text-slate-100/90 pointer-events-none">“</div>
              
              <div>
                {/* Gold Stars */}
                <div className="flex space-x-1 mb-5 text-amber-500">
                  {Array.from({ length: reviews[activeReviewIndex].score }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-base sm:text-lg md:text-xl md:leading-relaxed italic font-light mb-8">
                  "{reviews[activeReviewIndex].text}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900 leading-none">
                    {reviews[activeReviewIndex].name}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{reviews[activeReviewIndex].role}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-center">
                  Publikacja: {reviews[activeReviewIndex].date}
                </div>
              </div>

            </div>

            {/* Slider Controls with active indicators */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveReviewIndex(index)}
                    aria-label={`Przejdź do opinii ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeReviewIndex === index ? "w-8 bg-brand-blue" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-2.5">
                <button
                  type="button"
                  onClick={prevReview}
                  className="p-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-brand-blue active:scale-90 transition shadow-sm"
                  aria-label="Poprzednia opinia"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  className="p-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-brand-blue active:scale-90 transition shadow-sm"
                  aria-label="Następna opinia"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* External Call to Reviews */}
            <div className="text-center mt-12">
              <span className="text-sm text-slate-500">Nasze oceny są w pełni zweryfikowane bezpośrednio w Google Business Profile</span>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=AAG Biuro Rachunkowe+Sucharskiego 25, 52-205 Wrocław, Polska&action=reviews" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block mt-2 font-display text-sm font-semibold text-brand-blue hover:underline"
              >
                Przeczytaj wszystkie opinie w Google Maps <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION WITH LIGHTBOX EFFECT */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Nasza Praca</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Galeria Naszego Biura
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Zobacz naszą codzienność – profesjonalny sprzęt, bezpieczne archiwizacja, indywidualne konsultacje z przedsiębiorcami we Wrocławiu. Kliknij zdjęcie, aby powiększyć.
            </p>
          </div>

          {/* Grid Layout of photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((imgObj, index) => (
              <div 
                key={index}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-xl overflow-hidden shadow-premium aspect-4/3 cursor-pointer hover:shadow-premium-xl transition-all duration-300 bg-slate-900"
              >
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/60 transition-all duration-300 z-10 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100">
                  <span className="bg-brand-accent text-slate-900 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded w-fit mb-2.5">
                    Powiększ
                  </span>
                  <h4 className="font-display font-bold text-lg leading-tight mb-1">{imgObj.title}</h4>
                  <p className="text-xs text-slate-300 leading-normal line-clamp-2">{imgObj.desc}</p>
                </div>

                <img 
                  src={imgObj.url} 
                  alt={imgObj.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lightbox-backdrop transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button 
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-brand-accent p-2 rounded-full hover:bg-white/10 text-2xl z-50 transition"
            aria-label="Zamknij galerię"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev button */}
          <button 
            type="button"
            onClick={handleGalleryPrev}
            className="absolute left-4 p-3 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 border border-white/10 z-40 hover:text-brand-accent transition"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button 
            type="button"
            onClick={handleGalleryNext}
            className="absolute right-4 p-3 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 border border-white/10 z-40 hover:text-brand-accent transition"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Content container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] bg-slate-950 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={GALLERY_IMAGES[lightboxIndex].url} 
              alt={GALLERY_IMAGES[lightboxIndex].title} 
              className="object-contain max-h-[70vh] w-auto mx-auto"
            />
            <div className="p-6 bg-slate-900 text-white">
              <span className="text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest block mb-1">
                AAG Galeria • Zdjęcie {lightboxIndex + 1} z {GALLERY_IMAGES.length}
              </span>
              <h3 className="font-display font-bold text-xl mb-1">{GALLERY_IMAGES[lightboxIndex].title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{GALLERY_IMAGES[lightboxIndex].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. FAQ SECTION WITH EXPANDABLE ACCORDION (6 questions) */}
      <section id="faq" className="py-20 md:py-28 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Odpowiedzi i Pomoc</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Często Zadawane Pytania (FAQ)
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Przejrzyj odpowiedzi na najpopularniejsze pytania naszych przyszłych klientów związane z procedurami finansowymi i rozpoczęciem współpracy.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "1. Jakie dokumenty są potrzebne do rozpoczęcia współpracy z biurem rachunkowym?",
                a: "Zazwyczaj potrzebujemy podstawowych danych firmy (NIP, REGON, dane do CEIDG/KRS), historii rozliczeń (jeśli firma już działa, np. deklaracji JPK i KPiR za ubiegłe miesiące), upoważnienia do reprezentacji przed US i ZUS, oraz dokumentów dotyczących pierwszych operacji gospodarczych. Wszystkie szczegóły i dokumenty pełnomocnictw wygodnie uzgadniamy indywidualnie podczas darmowego pierwszego spotkania."
              },
              {
                q: "2. Czy oferujecie obsługę online dla firm spoza Wrocławia?",
                a: "Tak! Świadczymy w pełni zintegrowane, profesjonalne usługi księgowe dla klientów z całej Polski. Wykorzystujemy do współpracy dedykowane, nowoczesne platformy elektroniczne oraz szybkie kanały komunikacji online (np. e-mail, MS Teams). Dokumenty możesz dostarczać w formie skanów o wysokiej czystości lub plików PDF, bez konieczności wychodzenia z domu czy wizyt stacjonarnych."
              },
              {
                q: "3. Jakie są koszty usług księgowych?",
                a: "Ceny naszych usług są ustalane w pełni indywidualnie za każdym razem. Zależą one bezpośrednio od formy prawnej Twojej działalności, szacowanej liczby dokumentów księgowych w ujęciu miesięcznym, wymaganego zakresu usług (same ewidencje podatkowe czy również pełna obsługa kadr i płac) oraz specyfiki branży. Zapraszamy do skorzystania z naszego kalkulatora cen i przesłania zapytania po bezpłatną wycenę."
              },
              {
                q: "4. Czy pomagacie w zakładaniu nowej firmy?",
                a: "Oczywiście! Oferujemy pełne, cierpliwe wsparcie krok po kroku w procesie zakładania jednoosobowej działalności oraz rejestracji spółek. Pomagamy bezpłatnie w doborze najbardziej optymalnej i opłacalnej formy opodatkowania, wskazujemy właściwy kod PKD, oraz wypełniamy niezbędne zgłoszenia CEIDG-1, VAT-R do Urzędu Skarbowego i deklaracje zgłoszeniowe ZUS ZUA."
              },
              {
                q: "5. Jak często muszę dostarczać dokumenty do biura?",
                a: "Standardowo dokumenty rozliczeniowe dostarczane są raz w miesiącu, najczęściej do 5. lub maksymalnie 10. dnia kolejnego miesiąca, tak abyśmy mogli rzetelnie obliczyć zaliczki podatkowe oraz składki ZUS i przesłać Ci gotowe kwoty do opłaty. W przypadku klientów online dokumenty mogą być przesyłane partiami na bieżąco za pomocą poczty elektronicznej lub bezpiecznych serwerów FTP."
              },
              {
                q: "6. Czy zapewniacie wsparcie podczas kontroli skarbowej?",
                a: "Tak, zapewniamy pełną reprezenację i merytoryczne wsparcie naszych ekspertów podczas kontroli skarbowych, kontroli z ZUS czy Państwowej Inspekcji Pracy. Posiadamy odpowiednie pełnomocnictwa, więc wszelki stres i bezpośredni dialog z urzędnikami bierzemy w całości na siebie. Wyjaśnienia oraz kontrole w większości przypadków odbywają się stacjonarnie w naszym biurze we Wrocławiu."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 sm:p-6 text-left font-display font-semibold text-slate-900 hover:bg-slate-50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {/* Accordion container */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 sm:p-6 text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50/50">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section className="relative py-20 bg-brand-blue-deep text-white overflow-hidden">
        {/* Background graphic circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/40 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-brand-accent font-display font-semibold uppercase tracking-widest text-xs sm:text-sm block mb-3">Promocja dla nowych firm</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-6">
            Zyskaj spokój podatkowy już dziś!<br/>
            Pierwszy miesiąc z rabatem -50%
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg mb-10 leading-relaxed font-light">
            Dla wszystkich nowych klientów, którzy zdecydują się na podpisanie z nami umowy o stałą obsługę księgową, oferujemy 50% rabatu na pierwszy miesiąc opieki księgowej oraz bezpłatne doradztwo startowe w cenie.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-slate-900 bg-brand-accent hover:bg-brand-accent-hover text-center font-display font-bold rounded-lg shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Zapytaj o szczegóły oferty
            </a>
            <a
              href="tel:+48512080587"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 font-display font-medium rounded-lg text-center active:scale-95 transition"
            >
              <Phone className="w-4 h-4 mr-2" /> Zadzwoń: +48 512 080 587
            </a>
          </div>
        </div>
      </section>

      {/* 10. CONTACT / MAP SECTION */}
      <section id="kontakt" className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-display font-semibold uppercase tracking-wider text-xs sm:text-sm">Dane i Rezerwacje</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mt-2 mb-4">
              Napisz do Nas lub Zadzwoń!
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Jesteśmy gotowi skrupulatnie odpowiedzieć na Twoje pytania i wspierać dynamiczny rozwój Twojego biznesu we Wrocławiu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-4">
                  Dane teleadresowe biura
                </h3>
                
                <div className="space-y-4">
                  
                  {/* Adres */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-blue/10 text-brand-blue p-3 rounded-lg shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Adres stacjonarny</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=AAG Biuro Rachunkowe+Sucharskiego 25, 52-205 Wrocław, Polska"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-800 font-medium hover:text-brand-blue text-sm sm:text-base"
                      >
                        AAG Biuro Rachunkowe <br />
                        ul. Sucharskiego 25, 52-205 Wrocław, Polska
                      </a>
                    </div>
                  </div>

                  {/* Telefon */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-blue/10 text-brand-blue p-3 rounded-lg shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Zadzwoń do nas</p>
                      <a 
                        href="tel:+48512080587" 
                        className="text-lg sm:text-xl font-bold font-display text-brand-blue hover:text-brand-blue-deep block"
                      >
                        +48 512 080 587
                      </a>
                      <span className="text-xs text-slate-400">Obsługa w języku polskim</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-blue/10 text-brand-blue p-3 rounded-lg shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Adres e-mail</p>
                      <a 
                        href="mailto:kontakt@aagbiuro.pl" 
                        className="text-slate-800 font-semibold hover:text-brand-blue text-sm sm:text-base"
                      >
                        kontakt@aagbiuro.pl
                      </a>
                      <p className="text-xs text-slate-400">Odpowiedź zazwyczaj do 30 min</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-blue/10 text-brand-blue p-3 rounded-lg shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Godziny otwarcia biura</p>
                      <p className="text-slate-800 font-medium text-sm sm:text-base">
                        Poniedziałek - Piątek: 7:00 - 15:00
                      </p>
                      <p className="text-xs text-slate-400">Weekend: Zamknięte (rezerwacje e-mail)</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic Map Frame Integration */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-premium h-64 relative bg-slate-100">
                <iframe 
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed/v1/place?key=REPLACE_ME_OR_FALLBACK_DEFAULT&q=AAG+Biuro+Rachunkowe,+Sucharskiego+25,+52-205+Wroclaw"
                  className="w-full h-full border-none absolute inset-0 z-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  // Use Google search map fallback so it loads without exact Google cloud token
                  onError={(e) => {
                    // Fallback source using open embed
                    (e.target as HTMLIFrameElement).src = "https://maps.google.com/maps?q=AAG%20Biuro%20Rachunkowe%20Sucharskiego%2025%20Wroc%C5%82aw&t=&z=14&ie=UTF8&iwloc=&output=embed";
                  }}
                  srcDoc={`
                    <style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;}</style>
                    <iframe 
                      src="https://maps.google.com/maps?q=AAG%20Biuro%20Rachunkowe%20Sucharskiego%2025%20Wroc%C5%82aw&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
                    </iframe>
                  `}
                ></iframe>
              </div>

            </div>

            {/* Form Container */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-premium">
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                Napisz do nas bezpośrednio
              </h3>
              <p className="text-slate-500 text-sm mb-6 pb-4 border-b border-slate-200">
                Wypełnij formularz. Nasi licencjonowani księgowi odpowiedzą na zapytanie ofertowe niezwłocznie.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center text-slate-800 shadow-sm animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-emerald-900 mb-2">Formularz wysłany pomyślnie!</h4>
                  <p className="text-slate-600 mb-6 text-sm sm:text-base">
                    Dziękujemy za kontakt. Potwierdzenie zostało zarejestrowane, a wykwalifikowany doradca AAG Biuro Rachunkowe oddzwoni do Ciebie w przeciągu najbliższych 30 minut.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-lg text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name-input" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Imię i Nazwisko / Nazwa firmy *</label>
                      <input 
                        type="text" 
                        id="name-input"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                        placeholder="np. Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Adres e-mail *</label>
                      <input 
                        type="email" 
                        id="email-input"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                        placeholder="np. nazwa@firma.pl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Numer telefonu *</label>
                    <input 
                      type="tel" 
                      id="phone-input"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                      placeholder="np. +48 500 600 700"
                    />
                  </div>

                  <div>
                    <label htmlFor="msg-input" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Treść wiadomości *</label>
                    <textarea 
                      id="msg-input"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-lg p-4 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue placeholder:text-slate-400"
                      placeholder="Opisz krótko profil swojej działalności, liczbę dokumentów, a nasz księgowy dobierze dla Ciebie dopasowaną, bezpieczną formę opodatkowania..."
                    ></textarea>
                  </div>

                  {/* RODO Agreement checkbox */}
                  <div className="flex items-start space-x-3.5">
                    <input 
                      type="checkbox" 
                      id="rodo-checkbox" 
                      required
                      checked={formData.rodo}
                      onChange={(e) => setFormData({...formData, rodo: e.target.checked})}
                      className="mt-1.5 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue shrink-0 cursor-pointer"
                    />
                    <label htmlFor="rodo-checkbox" className="text-xs text-slate-500 leading-normal cursor-pointer select-none">
                      Wyrażam dobrowolną zgodę na przetwarzanie moich danych osobowych (imię, naziwsko, telefon, e-mail) przez AAG Biuro Rachunkowe Sucharskiego 25, Wrocław w celu udzielenia odpowiedzi na zapytanie o ofertę księgową, zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych Osobowych (RODO). *
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full inline-flex items-center justify-center py-4 px-6 text-slate-900 bg-brand-accent hover:bg-brand-accent-hover text-center font-display font-bold rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {formSubmitting ? (
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-spinner animate-spin"></i> Wysyłanie zapytania...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Wyślij bezpłatną wycenę
                      </span>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 md:pb-12 border-t border-slate-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-850 pb-12 mb-12">
            
            {/* Column 1 info */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-brand-blue text-white w-10 h-10 rounded-lg flex items-center justify-center font-display font-extrabold text-lg tracking-wider">
                  AAG
                </div>
                <span className="font-display font-bold text-lg tracking-tight">
                  AAG Biuro Rachunkowe
                </span>
              </div>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Rodzinne tradycje od 1995 roku przekładane na bezpieczeństwo finansowe i optymalizacje rozliczeń podatkowych jednoosobowych działalności i spółek kapitałowych. Wrocław, dolnośląskie.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=AAG Biuro Rachunkowe+Sucharskiego 25, 52-205 Wrocław, Polska" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-slate-900 hover:bg-brand-blue hover:text-white transition rounded-full flex items-center justify-center text-slate-300"
                  aria-label="Nasza lokalizacja w Google Maps"
                >
                  <MapPin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:kontakt@aagbiuro.pl" 
                  className="w-10 h-10 bg-slate-900 hover:bg-brand-blue hover:text-white transition rounded-full flex items-center justify-center text-slate-300"
                  aria-label="Napisz e-mail"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2 Map Menu */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Menu Nawigacyjne</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><a href="#o-nas" className="hover:text-amber-400 transition">O nas & Tradycja</a></li>
                <li><a href="#uslugi" className="hover:text-amber-400 transition">Usługi podatkowe</a></li>
                <li><a href="#zespol" className="hover:text-amber-400 transition">Nasi specjaliści</a></li>
                <li><a href="#opinie" className="hover:text-amber-400 transition">Co nas wyróżnia (opinie)</a></li>
                <li><a href="#kalkulator" className="hover:text-amber-400 text-amber-500 font-bold transition">Orientacyjna Wycena</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition">Odpowiedzi FAQ</a></li>
              </ul>
            </div>

            {/* Column 3 Services Quick menu */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Zakres specjalizacji</h4>
              <ul className="space-y-2 text-sm font-light">
                <li><span className="block hover:text-white transition">Pełna Księgowość (Spółki z o.o.)</span></li>
                <li><span className="block hover:text-white transition">Uproszczona Księgowość (KPiR i Ryczałt)</span></li>
                <li><span className="block hover:text-white transition">Profesjonalne Kadry i Płace</span></li>
                <li><span className="block hover:text-white transition">Analizy Finansowo-Biznesowe</span></li>
                <li><span className="block hover:text-white transition">Obsługa ZUS / Deklaracje podatkowe</span></li>
                <li><span className="block hover:text-white transition">Rejestracja Nowych Firm (CEIDG)</span></li>
              </ul>
            </div>

            {/* Column 4 Awards & stars */}
            <div className="lg:col-span-2 space-y-4 text-center md:text-left">
              <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">Prestiż</h4>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl inline-block text-center w-full">
                <div className="text-amber-400 flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white text-xs font-bold leading-tight">Orły Rachunkowości</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Certyfikat laureata</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} AAG Biuro Rachunkowe Wrocław. Wszelkie prawa zastrzeżone.</p>
            <div className="flex space-x-6">
              <span>Zgodność z RODO i standardami GIODO</span>
              <a href="#kontakt" className="hover:text-white transition underline">Polityka prywatności</a>
            </div>
          </div>

        </div>
      </footer>

      {/* STICKY MOBILE BOTTOM BAR - phone icon + message CTA button */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200/95 py-3 px-4 shadow-lg md:hidden flex items-center justify-between gap-4 backdrop-blur-sm">
        <a 
          href="tel:+48512080587" 
          className="flex-1 inline-flex items-center justify-center py-3 bg-brand-blue text-white rounded-lg font-semibold font-display text-sm shadow hover:bg-brand-blue-deep active:scale-95 transition"
        >
          <Phone className="w-4 h-4 mr-2" /> Zadzwoń teraz
        </a>
        <a 
          href="#kontakt" 
          className="flex-1 inline-flex items-center justify-center py-3 bg-brand-accent text-slate-900 rounded-lg font-semibold font-display text-sm shadow hover:bg-brand-accent-hover active:scale-95 transition"
        >
          <Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie
        </a>
      </div>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 md:bottom-8 right-6 p-3 rounded-full bg-brand-blue hover:bg-brand-blue-deep text-white shadow-xl flex items-center justify-center z-40 active:scale-90 transition transform duration-300 border border-white/10"
          aria-label="Wróć na górę strony"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
