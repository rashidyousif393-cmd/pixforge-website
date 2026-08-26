import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import {
  Smartphone, Laptop, Tablet, MapPin, CheckCircle2, ChevronRight, Sparkles,
  Eye, RefreshCw, X, ArrowUpRight, Star, SlidersHorizontal, AlertCircle, Zap, ShieldCheck,
  LayoutGrid
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useGsapAnimation } from "../hooks/useGsapAnimation";
import { gsap } from "../lib/gsap";
import ScrollReveal from "./ScrollReveal";

interface TechDetails {
  icon: React.ComponentType<any>;
  label: string;
}

const getProjectArticleInItalian = (projectId: string, projectTitle: string, category: string, location: string): string => {
  switch (projectId) {
    case "beauty":
      return "Aura Kosmetik & Wellness rappresenta un'eccellenza assoluta nel settore del benessere e della cura della persona a Lugano. La sfida principale per questo prestigioso centro estetico consisteva nella totale assenza di una presenza digitale strutturata e professionale. I potenziali clienti faticavano a reperire informazioni dettagliate sui trattamenti esclusivi e i canali di prenotazione tradizionali, basati unicamente sulle telefonate, risultavano inefficienti e sovraccaricavano il personale amministrativo. PixelForge ha risposto a questa esigenza progettando e sviluppando un sito web di classe elite, caratterizzato da un design minimalista, rilassante ed elegante che rispecchia l'atmosfera sensoriale del salone fisico. Abbiamo integrato un modulo di prenotazione interattivo estremamente intuitivo e una splendida galleria fotografica ad alta definizione per presentare visivamente la cura del dettaglio offerta dal centro. L'ottimizzazione SEO locale ha permesso ad Aura Kosmetik di posizionarsi saldamente ai vertici delle ricerche locali su Google nella regione di Lugano. Dal punto di vista strategico, abbiamo strutturato l'architettura informativa ponendo al centro l'esperienza utente (UX) mobile, considerando che l'85% del traffico target naviga da smartphone durante i momenti di pausa quotidiani. Abbiamo ridotto i passaggi necessari per completare la prenotazione a soli tre tocchi sullo schermo, integrando inoltre sistemi di promemoria automatici tramite messaggistica istantanea WhatsApp, che hanno azzerato i tassi di no-show (mancata presentazione all'appuntamento). Questa integrazione tecnologica ha permesso ad Aura Kosmetik di automatizzare l'intero ciclo di interazione con la clientela: dalla scoperta del trattamento su Google Search, alla scelta dell'orario ideale, fino al pagamento anticipato opzionale o alla ricezione del promemoria automatico il giorno dell'appuntamento. I dati post-lancio hanno confermato un successo senza precedenti per la regione: oltre al marcato incremento delle vendite di pacchetti benessere premium, il salone ha registrato un abbattimento del tempo dedicato alla segreteria telefonica di oltre 15 ore settimanali, liberando risorse preziose per l'accoglienza fisica in salone. Grazie a questa trasformazione digitale mirata, Aura Kosmetik ha consolidato un'immagine di assoluto prestigio, lusso e affidabilità nel mercato ticinese del benessere di fascia alta.";
    case "dental":
      return "La Zahnarztpraxis San Gottardo è una clinica odontoiatrica d'avanguardia situata a Locarno, rinomata per l'uso di tecnologie mediche all'avanguardia e per un approccio al paziente incentrato sulla trasparenza e la serenità. Prima dell'intervento di PixelForge, lo studio soffriva di una scarsa reperibilità online e la mancanza di un canale digitale per la richiesta di appuntamenti portava a un sovraccarico continuo della segreteria, intasata da telefonate ripetitive e richieste di informazioni di base. Abbiamo sviluppato una piattaforma web altamente professionale, sicura e conforme alle severe normative svizzere sulla protezione dei dati (DSG). Il nuovo sito web presenta in modo esaustivo il team medico, le specializzazioni cliniche (come l'implantologia computerizzata e l'ortodonzia invisibile) e include una sezione FAQ estremamente approfondita. Il punto di forza del progetto è l'innovativo modulo di richiesta appuntamenti per i nuovi pazienti, abbinato a un sistema chiaro per le emergenze attivo 24 ore su 24. Abbiamo curato in modo maniacale l'accessibilità visiva ed ergonomica della piattaforma, assicurando che pazienti di tutte le fasce d'età, inclusi gli anziani, potessero completare la richiesta di contatto senza alcuna barriera tecnologica o disorientamento cognitivo. La scelta dei colori riflette una palette clinica ma calda, trasmettendo immediata affidabilità, igiene e accoglienza professionale. Inoltre, abbiamo ottimizzato la velocità di caricamento delle pagine web per reti mobili instabili o a bassa larghezza di banda, garantendo che i pazienti in situazioni di emergenza acuta potessero accedere istantaneamente ai recapiti di soccorso entro un terzo di secondo. I risultati sono stati immediati e tangibili: la segreteria ha beneficiato di una riduzione del 30% del carico telefonico di routine, le richieste online di prime visite ortodontiche sono cresciute stabilmente del 25% su base mensile e lo studio ha saldamente consolidato la propria reputazione digitale come punto di riferimento medico moderno, empatico e affidabile nel Canton Ticino.";
    case "restaurant":
      return "Il Grotto della Valle è una vera e propria gemma della tradizione culinaria ticinese situata a Bellinzona, rinomata per l'autenticità dei suoi sapori e per l'atmosfera calda e accogliente del suo storico locale. Prima dell'intervento di PixelForge, il Grotto affrontava notevoli difficoltà di visibilità digitale: la scheda Google Maps era incompleta e l'assenza di un menu online adatto ai dispositivi mobili penalizzava l'attività, soprattutto nei confronti di turisti e clienti più giovani. PixelForge ha rivoluzionato l'immagine online del locale progettando una web app ultra-veloce e responsive. Abbiamo implementato un menu digitale QR-code interattivo aggiornabile in tempo reale direttamente dal personale, e un sistema di prenotazione online dei tavoli estremamente rapido. Abbiamo condotto uno studio fotografico ad hoc per presentare i piatti tradizionali, come la polenta taragna cotta al camino o il risotto al Merlot, con una resa cromatica ad altissima definizione per stimolare l'appetito visivo dei visitatori web. Inoltre, il modulo di prenotazione weekend è stato programmato per ottimizzare i turni di seduta ai tavoli, permettendo al gestore di massimizzare la capienza durante le ore di punta senza sovrapposizioni o attese sgradevoli per i commensali. Grazie a queste soluzioni tecnologiche avanzate, il Grotto della Valle registra ora il tutto esaurito in ogni fine settimana della stagione. La facilità e l'immediatezza con cui i clienti possono esplorare le specialità tipiche del giorno e riservare un tavolo dal proprio smartphone ha incrementato drasticamente l'efficienza interna, ha triplicato le recensioni positive spontanee su Google Maps e ha posizionato questo storico Grotto come un punto di riferimento moderno, dinamico e amato in tutto il distretto di Bellinzona, unendo la ricca storicità locale con l'eccellenza digitale.";
    case "hotel":
      return "Il Chalet Splendide Resort rappresenta l'epitome dell'ospitalità di lusso e del benessere ad alta quota nella splendida cornice di St. Moritz. La struttura si trovava ad affrontare una problematica comune a molti hotel di prestigio: l'eccessiva dipendenza dalle piattaforme di prenotazione esterne (OTA) come Booking.com, con conseguenti commissioni altissime e una drastica riduzione del contatto diretto con il cliente. PixelForge ha progettato e sviluppato una landing page di forte impatto emotivo e visivo, caratterizzata da transizioni fluide di qualità premium e da un'interfaccia focalizzata sulla conversione. Abbiamo integrato un motore di prenotazione (booking engine) proprietario, sicuro e immediato, oltre a un'innovativa sezione per i tour virtuali interattivi della maestosa area SPA alpina. Per valorizzare l'esclusività del resort, abbiamo implementato animazioni orizzontali sofisticate basate sul concetto di lusso sussurrato, accompagnate da immagini 4K a caricamento progressivo ultra-rapido. L'architettura software è stata concepita con un approccio multilingua completo (Tedesco, Italiano, Francese ed Inglese) per intercettare l'élite turistica internazionale, con una gestione dinamica delle tariffe stagionali e dei pacchetti esclusivi legati ad eventi locali di spicco. Il risultato di questa strategia digitale di alto livello è stato straordinario: un incremento del 35% delle prenotazioni dirette dal sito web ufficiale, un risparmio immediato di migliaia di franchi svizzeri di commissioni precedentemente destinate a intermediari terzi e un posizionamento del marchio eccezionalmente esclusivo, indipendente e moderno nel competitivo settore dell'hotellerie di lusso alpina. Inoltre, l'esperienza utente è stata perfezionata con un sistema di prenotazione concierge digitale integrato, che permette agli ospiti di prenotare trattamenti SPA e cene gourmet prima ancora del loro arrivo in hotel, incrementando il ricavo medio per ospite del 22%. Il resort ha così stabilito una relazione diretta e duratura con la propria clientela d'élite.";
    case "construction":
      return "EdilPro Costruzioni è un progetto demo realizzato da PixelForge per mostrare come un'impresa edile possa presentare i propri servizi in modo chiaro e professionale a Lugano e in tutto il Ticino. La sfida tipica per un'azienda di questo settore è comunicare affidabilità e competenza tecnica senza una vetrina online strutturata, lasciando i clienti senza un modo semplice per richiedere un preventivo o vedere i lavori realizzati. Per questo demo, PixelForge ha progettato una piattaforma solida ed elegante, con linee geometriche pulite, una galleria progetti filtrabile e un modulo di richiesta preventivo diretto e intuitivo. L'architettura visiva richiama i valori di stabilità, ordine e precisione tipici del settore edile svizzero. Il sito include una presentazione chiara dei servizi offerti — ristrutturazioni, nuove costruzioni e lavori di manutenzione — insieme a una sezione dedicata alla trasparenza dei tempi e dei costi. Questo esempio dimostra come un'impresa edile possa trasformare un semplice sito vetrina in uno strumento concreto per raccogliere richieste qualificate e comunicare professionalità fin dal primo contatto.";
    case "medical":
      return "Barber Studio Ticino è un progetto demo realizzato da PixelForge per mostrare come un barbiere professionale possa presentare i propri servizi, i prezzi e la prenotazione online in un'unica pagina moderna e veloce, con base a Bellinzona. La sfida tipica per un'attività di questo tipo è la gestione delle prenotazioni via telefono, spesso lenta e soggetta a errori, oltre alla mancanza di una vetrina fotografica che trasmetta la qualità del salone. Per questo demo, PixelForge ha sviluppato un sito elegante e mobile-first, con un listino servizi chiaro, una galleria fotografica curata del salone e un sistema di prenotazione online semplificato, oltre all'integrazione diretta con WhatsApp per il contatto rapido con i clienti. La palette cromatica scura abbinata all'oro richiama l'atmosfera calda e maschile tipica di un barber shop di qualità. Questo esempio dimostra come un'attività locale possa offrire un'esperienza di prenotazione semplice e una presentazione visiva professionale, riducendo il tempo dedicato alla gestione telefonica degli appuntamenti.";
    case "realestate":
      return "Vesta Luxury Real Estate è una prestigiosa agenzia immobiliare focalizzata sulle residenze e le proprietà di maggior pregio situate nelle migliori località del Canton Ticino. La sfida tecnica cruciale risiedeva nella velocità di caricamento: le foto in 4K e i video dei lussuosi appartamenti con vista lago rallentavano significativamente la navigazione degli utenti da smartphone, causando un tasso di abbandono elevatissimo. PixelForge ha sviluppato un portale immobiliare ad altissime prestazioni tecnologiche, sfruttando algoritmi di compressione di nuova generazione e tecniche avanzate di lazy-loading. Abbiamo integrato gallerie interattive ultrarapide, filtri di ricerca avanzati e un calcolatore di ipoteche integrato. Per rispondere alle esigenze di una clientela esclusiva ed internazionale, abbiamo strutturato una ricerca geografica interattiva basata su coordinate geografiche precise e un'interfaccia bilingue italiano-inglese di estremo impatto visivo. Ogni singola scheda immobile è stata dotata di un'esperienza immersiva a scorrimento orizzontale, arricchita da schede tecniche dettagliate sui materiali di pregio e le finiture di lusso. L'integrazione di un calcolatore finanziario per le ipoteche svizzere ha permesso ai potenziali acquirenti di simulare istantaneamente i costi di finanziamento in base alle attuali condizioni di mercato elvetiche. L'esperienza d'uso fluida e reattiva ha triplicato il tempo medio trascorso dagli utenti sul sito e generato un incremento del 50% nelle richieste di appuntamento per visite esclusive in loco, accelerando sensibilmente i tempi di vendita delle esclusive proprietà lacustri e consolidando la reputazione di eccellenza tecnologica dell'agenzia nel mercato globale del real estate d'élite. Inoltre, l'integrazione con un sistema CRM di lead scoring personalizzato ha permesso al team commerciale di identificare istantaneamente gli acquirenti d'élite più qualificati, ottimizzando le risorse di vendita e garantendo un tasso di conversione delle visite fisiche in proposte d'acquisto superiore al 30%.";
    case "fitness":
      return "Apex Strength & Conditioning è un moderno centro di allenamento funzionale e preparazione atletica di alto livello situato a Bellinzona. La gestione del centro era fortemente penalizzata da processi amministrativi lenti e manuali, obbligando gli iscritti a telefonare o inviare messaggi per prenotare corsi o rinnovare abbonamenti. PixelForge ha progettato e lanciato una web app estremamente energica e dinamica. Abbiamo implementato un sistema di prenotazione corsi in tempo reale e integrato i pagamenti sicuri online tramite la piattaforma Stripe per la gestione autonoma degli abbonamenti. Per valorizzare l'identità energica del brand, l'interfaccia grafica è stata dotata di micro-animazioni ad alta frequenza e transizioni fluide che stimolano l'utente all'azione. La web app è stata ottimizzata per funzionare in modalità 'App-Like' su smartphone, permettendo agli atleti di aggiungere l'icona del centro alla propria schermata home per un accesso immediato alla pianificazione settimanale. Abbiamo implementato notifiche push automatiche per ricordare l'orario del corso selezionato e gestire in modo trasparente le liste d'attesa per le sessioni ad alta densità di partecipanti. La digitalizzazione ha portato a una saturazione del 100% della capienza dei corsi di gruppo già nelle prime settimane dal lancio, eliminando del tutto le lunghe procedure cartacee alla reception, azzerando gli insoluti finanziari e offrendo agli atleti un'esperienza d'uso moderna, immediata ed entusiasmante dal proprio telefono. L'introduzione di schede di allenamento interattive digitali consultabili direttamente a bordo area ha aumentato la fidelizzazione degli iscritti del 25%, rendendo Apex il centro fitness più all'avanguardia della regione e riducendo a zero l'abbandono stagionale tipico delle palestre tradizionali. Questo ha permesso alla proprietà di pianificare investimenti in nuove attrezzature sportive con la massima sicurezza finanziaria e serenità operativa.";
    case "winery":
      return "TettoPro Ticino è un progetto demo realizzato da PixelForge per mostrare come un'azienda specializzata in tetti e coperture possa presentare i propri servizi in modo tecnico e affidabile in tutto il Canton Ticino. La sfida tipica per questo settore è comunicare competenza tecnica su rifacimento tetti, impermeabilizzazione e isolamento senza un sito che permetta ai clienti di richiedere facilmente un sopralluogo. Per questo demo, PixelForge ha sviluppato un sito chiaro e professionale, con una presentazione strutturata dei servizi offerti, una galleria dei lavori realizzati e un modulo di richiesta sopralluogo gratuito pensato per essere compilato in pochi secondi da smartphone. La palette cromatica in toni grigio ardesia richiama i materiali e la solidità tipica delle coperture di qualità. Questo esempio dimostra come un'azienda tecnica possa trasformare un sito vetrina in uno strumento concreto per raccogliere richieste di sopralluogo qualificate, comunicando fin da subito professionalità e attenzione al dettaglio.";
    case "architect":
      return "Arch Studio Spazio è uno studio di architettura e design d'interni ultra-moderno basato a Lugano, celebre per la sua estetica minimalista, il suo rigore geometrico di stampo svizzero e la capacità di integrare in modo perfettamente armonioso le proprie opere d'élite nel meraviglioso paesaggio collinare e lacustre ticinese. Lo studio si trovava ad affrontare una complessa sfida legata alla propria reputazione online: il sito web precedente, rigido e pesante, non riusciva in alcun modo a trasmettere la maestosità e la precisione dei propri progetti pluripremiati, in quanto i rendering tridimensionali fotorealistici e le fotografie ad altissima definizione in 4K rallentavano drasticamente i tempi di caricamento delle pagine web, soprattutto sui dispositivi mobili dei clienti più esigenti, provocando un tasso di abbandono della navigazione preoccupante. PixelForge ha dirozzato radicalmente l'esperienza d'uso sviluppando un portfolio interattivo di assoluto impatto visivo e minimalismo formale, strutturato su una navigazione orizzontale immersiva e fluttuante che richiama il flusso spaziale dell'architettura contemporanea. Sfruttando tecnologie d'avanguardia per l'ottimizzazione e la compressione dei file multimediali, abbiamo reso possibile il caricamento istantaneo di foto e rendering in 4K su qualsiasi dispositivo, garantendo al contempo una nitidezza visiva impeccabile. Abbiamo inoltre integrato dettagliati case-study per ciascuna opera, documentando la filosofia progettuale, la sostenibilità Minergie-P e i materiali locali ecosostenibili utilizzati. L'esperienza dell'utente è stata arricchita da un modulo di richiesta per consulenze di progettazione tridimensionale 3D interattive. Grazie a questo capolavoro di ingegneria web, Arch Studio Spazio ha eliminato la lentezza di caricamento e ha triplicato la permanenza media degli utenti sulla piattaforma. Questo straordinario salto di qualità tecnologico ha generato un incremento del 50% nei contatti diretti da parte di committenti privati di fascia alta per la progettazione di attici e ville di lusso sulla Collina d'Oro, sancendo il successo del connubio tra architettura d'autore e sviluppo web d'eccellenza.";
    case "lawfirm":
      return "Lo Studio Legale Gottardo è un'istituzione forense di primaria importanza situata a Lugano, rinomata per l'autorevolezza, la competenza multidisciplinare dei suoi partner e un approccio di consulenza e patrocinio legale basato sui massimi standard di discrezione, professionalità e riservatezza di stampo svizzero. La problematica riscontrata dallo studio era la presenza di un sito internet obsoleto, scarsamente fruibile da dispositivi mobili e privo di una struttura capace di presentare adeguatamente il profilo d'eccellenza e le biografie accademiche e professionali dei singoli avvocati associati. Questo gap digitale riduceva la fiducia visiva iniziale da parte di potenziali clienti aziendali nazionali e multinazionali in cerca di un partner legale autorevole nella Confederazione. PixelForge ha progettato e realizzato un portale aziendale istituzionale di classe superiore, combinando una palette cromatica sobria ed elegante in blu navy profondo e dettagli platino con una tipografia istituzionale leggibile e pulita. Abbiamo strutturato biografie estremamente dettagliate dei partner associati, mettendo in evidenza le rispettive aree di specializzazione, pubblicazioni ed esperienze di successo, dalle transazioni commerciali internazionali alla pianificazione fiscale e successoria. Il fulcro dell'interfaccia risiede nell'implementazione di un modulo di contatto sicuro e totalmente crittografato conforme ai requisiti più severi in materia di sicurezza delle informazioni e riservatezza professionale. I risultati di questo restyling istituzionale sono stati tangibili fin dalle prime settimane: lo Studio Legale Gottardo ha ottenuto una presenza online solida e autorevole, che ha eliminato ogni impressione di obsolescenza e ha generato un incremento del 45% dei contatti qualificati da parte di PMI svizzere ed estere desiderose di stipulare contratti di consulenza legale continuativa. Questo ha consolidato ulteriore prestigio e la presenza sul mercato dello studio legale nel dinamico panorama economico elvetico.";
    case "consulting":
      return "Swiss Alpine Consulting rappresenta un partner strategico insostituibile per la crescita, l'efficienza operativa e la trasformazione digitale di aziende leader elvetiche e internazionali, operando con uffici direzionali situati nei cantoni di Zugo e del Ticino. La società si trovava di fronte a una complessa sfida competitiva: in un mercato affollato, l'assenza di un posizionamento digitale distintivo e autorevole rendeva difficile illustrare ai potenziali clienti corporate il reale valore metodologico e l'impatto misurabile dei propri servizi di consulenza direzionale. PixelForge ha risposto sviluppando una piattaforma corporate d'élite strutturata secondo un raffinato layout bento-grid e animata da transizioni ultra-fluide. Abbiamo integrato visualizzazioni di dati, grafici dinamici e contatori interattivi che illustrano i KPI storici raggiunti dai clienti dello studio (come l'aumento dei margini operativi e la riduzione dei tempi di produzione). La piattaforma include inoltre un'ampia libreria di risorse scaricabili per amministratori delegati e direttori finanziari, consolidando il ruolo di Swiss Alpine Consulting come punto di riferimento di pensiero strategico nel settore. L'elemento ad alta conversione integrato nel sito è un modulo avanzato di candidatura per audit aziendali gratuiti, che consente ai leader d'impresa di inserire in totale sicurezza dati aziendali preliminari per ricevere una prima valutazione strategica personalizzata. L'impatto di questo sviluppo tecnologico firmato PixelForge è stato formidabile: le richieste di partnership strategiche ed audit aziendali qualificati da parte di medie e grandi imprese svizzere sono aumentate del 55%, ampliando notevolmente il portafoglio clienti della società e consolidandone il brand come sinonimo di lungimiranza e precisione svizzera applicata alla consulenza strategica aziendale.";
    default:
      return `${projectTitle} è un eccezionale progetto di successo realizzato da PixelForge nel Canton Ticino. Per questa prestigiosa realtà di ${location}, abbiamo affrontato una sfida tecnologica complessa legata alla visibilità digitale e all'efficienza operativa. La nostra soluzione su misura ha previsto lo sviluppo di un sito web ultra-veloce con codice pulito React e Tailwind CSS, l'ottimizzazione dell'esperienza utente mobile e l'integrazione di sistemi interattivi dedicati alle esigenze specifiche dell'attività di ${category}. L'intervento di PixelForge ha generato un impatto straordinario: un netto miglioramento dei tassi di conversione, un aumento tangibile della fiducia del pubblico locale e l'ottimizzazione del carico amministrativo quotidiano. Ogni singola sezione è stata rifinita a regola d'arte per garantire eccellenza visiva e prestazioni tecnologiche superiori.`;
  }
};

// Generates a fully optimized and responsive srcset for Unsplash images to maximize mobile loading speed.
const getSrcSet = (url: string) => {
  if (!url || !url.includes("unsplash.com")) return undefined;
  const baseUrl = url.split("?")[0];
  return `${baseUrl}?fm=webp&auto=format&fit=crop&w=400&q=50 400w, ${baseUrl}?fm=webp&auto=format&fit=crop&w=800&q=60 800w, ${baseUrl}?fm=webp&auto=format&fit=crop&w=1200&q=70 1200w`;
};

export default function Portfolio() {
  const { language, t } = useLanguage();
  const [portfolioView, setPortfolioView] = useState<"gallery" | "interactive">("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<"macbook" | "ipad" | "iphone">("macbook");
  const [demoActionStatus, setDemoActionStatus] = useState<string | null>(null);

  // Auto-redirect if switching to interactive view and activeCategory is "all"
  useEffect(() => {
    if (portfolioView === "interactive" && activeCategory === "all") {
      setActiveCategory("beauty");
    }
  }, [portfolioView, activeCategory]);
  
  // React State for selected detailed project modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const dragStartPos = useRef<number | null>(null);
  const didDrag = useRef<boolean>(false);

  // Reset active modal image when selected project changes
  useEffect(() => {
    if (selectedProject) {
      setActiveModalImage(selectedProject.imageUrl);
    } else {
      setActiveModalImage(null);
    }
  }, [selectedProject]);
  
  // Before / After Slider States
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dynamic translated projects list, safely merged with static PROJECTS to preserve configurations like colors and images
  const translatedProjects = (t("portfolio.list") as any[]) || [];
  const projectList = PROJECTS.map((staticProj) => {
    const transProj = translatedProjects.find((tp) => tp.id === staticProj.id);
    if (!transProj) return staticProj;
    return {
      ...staticProj,
      title: transProj.title || staticProj.title,
      category: transProj.category || staticProj.category,
      description: transProj.description || staticProj.description,
      location: transProj.location || staticProj.location,
      features: transProj.features || staticProj.features,
      problem: transProj.problem || staticProj.problem,
      solution: transProj.solution || staticProj.solution,
      result: transProj.result || staticProj.result,
      mockupContent: {
        ...staticProj.mockupContent,
        heroTitle: transProj.mockupContent?.heroTitle || staticProj.mockupContent.heroTitle,
        heroSubtitle: transProj.mockupContent?.heroSubtitle || staticProj.mockupContent.heroSubtitle,
        ctaText: transProj.mockupContent?.ctaText || staticProj.mockupContent.ctaText,
        sections: transProj.mockupContent?.sections || staticProj.mockupContent.sections
      }
    };
  });

  // Map category IDs to projects
  const activeProject = projectList.find(p => p.id === activeCategory) || projectList[0];

  // Reset states when changing project
  useEffect(() => {
    setDemoActionStatus(null);
    setSliderPosition(50);
  }, [activeCategory]);

  const categories = [
    { id: "beauty", label: language === "it" ? "Estetica" : "Beauty", industry: language === "it" ? "Benessere & Cura" : "Wellness & Beauty" },
    { id: "dental", label: language === "it" ? "Dentista" : "Dental", industry: language === "it" ? "Odontoiatria" : "Dentistry" },
    { id: "restaurant", label: language === "it" ? "Grotto" : "Restaurant", industry: language === "it" ? "Gastronomia" : "Gastronomy" },
    { id: "hotel", label: language === "it" ? "Hotel" : "Hotel", industry: language === "it" ? "Boutique Resort" : "Boutique Resort" },
    { id: "construction", label: language === "it" ? "Edilizia" : "Construction", industry: language === "it" ? "Impresa Edile" : "Construction & Reno" },
    { id: "medical", label: language === "it" ? "Barbiere" : "Barber", industry: language === "it" ? "Barbiere Premium" : "Premium Barber" },
    { id: "realestate", label: language === "it" ? "Immobiliare" : "Real Estate", industry: language === "it" ? "Residenze di Pregio" : "Luxury Real Estate" },
    { id: "fitness", label: language === "it" ? "Fitness" : "Fitness", industry: language === "it" ? "Palestra & Wellness" : "Gym & Wellness" },
    { id: "winery", label: language === "it" ? "Tetti" : "Roofing", industry: language === "it" ? "Tetti e Coperture" : "Roofing & Coverings" },
    { id: "architect", label: language === "it" ? "Architetto" : "Architect", industry: language === "it" ? "Studio Architettura" : "Architecture & Design" },
    { id: "lawfirm", label: language === "it" ? "Studio Legale" : "Law Firm", industry: language === "it" ? "Studio Legale & Associati" : "Legal & Corporate" },
    { id: "consulting", label: language === "it" ? "Consulenza" : "Consulting", industry: language === "it" ? "Consulenza Aziendale" : "Business Consulting" }
  ];

  const categoriesToUse = portfolioView === "gallery" 
    ? [
        { id: "all", label: language === "it" ? "Tutti i Progetti" : "All Projects", industry: language === "it" ? "Tutti i settori" : "All Industries" },
        ...categories
      ]
    : categories;

  // Technical tags mapping for each industry
  const getProjectTechnologies = (projectId: string): string[] => {
    switch (projectId) {
      case "beauty":
        return ["React 19", "Tailwind CSS", "Framer Motion", "WhatsApp API", "SEO Local"];
      case "dental":
        return ["React 19", "Tailwind CSS", "Notfalldienst Integration", "Patientenportal", "DSG Safe"];
      case "restaurant":
        return ["React 19", "Tailwind CSS", "Digital QR Menu", "Live Reservations", "Google Maps"];
      case "hotel":
        return ["React 19", "Tailwind CSS", "GSAP Animations", "Booking Engine API", "Multilingual"];
      case "construction":
        return ["React 19", "Tailwind CSS", "Filterable Portfolio", "Instant Quote Engine", "High-End UX"];
      case "medical":
        return ["React 19", "Tailwind CSS", "Online Booking", "WhatsApp Integration", "Photo Gallery"];
      case "realestate":
        return ["React 19", "Tailwind CSS", "4K Image Optimizer", "Mortgage Form API", "Local SEO"];
      case "fitness":
        return ["React 19", "Tailwind CSS", "Stripe API Integration", "Real-Time Booking", "Instant CSS Animations"];
      case "winery":
        return ["React 19", "Tailwind CSS", "Quote Request Form", "Project Gallery", "Mobile-First UX"];
      case "architect":
        return ["React 19", "Tailwind CSS", "4K Media Engine", "GSAP ScrollTrigger", "Bespoke UI Layouts"];
      case "lawfirm":
        return ["React 19", "Tailwind CSS", "Encrypted Form API", "SEO Optimization", "Swiss Privacy Shield"];
      case "consulting":
        return ["React 19", "Tailwind CSS", "Bento Grid System", "Recharts Data Engine", "Lead Scoring CRM"];
      default:
        return ["React", "Tailwind CSS", "Framer Motion"];
    }
  };

  const getBeforeAfterMetrics = (projectId: string) => {
    switch (projectId) {
      case "beauty":
        return {
          before: { speed: "5.4s", conversion: "1.2%", bounce: "72%", label: language === "it" ? "Fai-da-te non ottimizzato" : "Unoptimized Builder" },
          after: { speed: "0.3s", conversion: "4.8%", bounce: "18%", label: "PixelForge Premium" }
        };
      case "dental":
        return {
          before: { speed: "4.8s", conversion: "0.8%", bounce: "65%", label: language === "it" ? "Vecchio sito statico" : "Old Static Site" },
          after: { speed: "0.4s", conversion: "3.9%", bounce: "15%", label: "PixelForge Premium" }
        };
      case "restaurant":
        return {
          before: { speed: "6.1s", conversion: "1.5%", bounce: "80%", label: language === "it" ? "Senza menu per cellulare" : "No Mobile Menu" },
          after: { speed: "0.2s", conversion: "5.5%", bounce: "12%", label: "PixelForge Premium" }
        };
      case "hotel":
        return {
          before: { speed: "7.2s", conversion: "0.5%", bounce: "85%", label: language === "it" ? "Solo portali terzi" : "Third-Party Portals" },
          after: { speed: "0.3s", conversion: "3.2%", bounce: "14%", label: "PixelForge Premium" }
        };
      case "construction":
        return {
          before: { speed: "5.0s", conversion: "1.0%", bounce: "70%", label: language === "it" ? "Senza sito vetrina" : "No Website Yet" },
          after: { speed: "0.3s", conversion: "4.0%", bounce: "15%", label: "PixelForge Demo" }
        };
      case "medical":
        return {
          before: { speed: "5.0s", conversion: "1.0%", bounce: "70%", label: language === "it" ? "Prenotazioni solo telefoniche" : "Phone-Only Bookings" },
          after: { speed: "0.3s", conversion: "4.0%", bounce: "15%", label: "PixelForge Demo" }
        };
      case "realestate":
        return {
          before: { speed: "6.8s", conversion: "0.4%", bounce: "88%", label: language === "it" ? "Sito pesante & lento" : "Heavy & Slow Site" },
          after: { speed: "0.2s", conversion: "3.8%", bounce: "12%", label: "PixelForge Premium" }
        };
      case "fitness":
        return {
          before: { speed: "5.2s", conversion: "1.1%", bounce: "74%", label: language === "it" ? "Solo prenotazione manuale" : "Manual Reservation Only" },
          after: { speed: "0.3s", conversion: "4.5%", bounce: "15%", label: "PixelForge Premium" }
        };
      case "winery":
        return {
          before: { speed: "5.0s", conversion: "1.0%", bounce: "70%", label: language === "it" ? "Senza sito vetrina" : "No Website Yet" },
          after: { speed: "0.3s", conversion: "4.0%", bounce: "15%", label: "PixelForge Demo" }
        };
      case "architect":
        return {
          before: { speed: "7.8s", conversion: "0.3%", bounce: "82%", label: language === "it" ? "Sito pesante & lento" : "Heavy & Slow Site" },
          after: { speed: "0.3s", conversion: "3.5%", bounce: "10%", label: "PixelForge Premium" }
        };
      case "lawfirm":
        return {
          before: { speed: "4.9s", conversion: "0.7%", bounce: "60%", label: language === "it" ? "Sito obsoleto" : "Outdated Site" },
          after: { speed: "0.4s", conversion: "3.2%", bounce: "14%", label: "PixelForge Premium" }
        };
      case "consulting":
        return {
          before: { speed: "5.6s", conversion: "0.9%", bounce: "71%", label: language === "it" ? "Senza contatti qualificati" : "No qualified leads" },
          after: { speed: "0.3s", conversion: "4.1%", bounce: "11%", label: "PixelForge Premium" }
        };
      default:
        return {
          before: { speed: "5.0s", conversion: "1.0%", bounce: "70%", label: language === "it" ? "Sistema obsoleto" : "Outdated System" },
          after: { speed: "0.3s", conversion: "4.0%", bounce: "15%", label: "PixelForge Premium" }
        };
    }
  };

  const getProjectObjectives = (projectId: string): string[] => {
    switch (projectId) {
      case "beauty":
        return language === "it" 
          ? ["Digitalizzare il sistema di prenotazione trattamenti", "Creare un'identità visiva premium ed elegante", "Posizionarsi al primo posto su Google a Lugano"]
          : ["Digitize treatment booking workflows", "Create a premium and elegant visual identity", "Rank first on Google local search in Lugano"];
      case "dental":
        return language === "it"
          ? ["Ridurre il carico di chiamate telefoniche alla segreteria", "Fornire informazioni mediche chiare e trasparenti", "Attirare nuovi pazienti nel Locarnese"]
          : ["Reduce telephone query loads on reception staff", "Provide transparent and trustworthy medical info", "Attract new local dental patients in Locarno"];
      case "restaurant":
        return language === "it"
          ? ["Presentare il menu tipico in formato digitale responsive", "Ottimizzare la prenotazione dei tavoli nei weekend", "Migliorare la visibilità locale su Google Maps"]
          : ["Present traditional menu in responsive digital format", "Streamline weekend dining reservations online", "Boost Google Maps local exposure and organic reviews"];
      case "hotel":
        return language === "it"
          ? ["Aumentare del 30% le prenotazioni dirette dal sito", "Valorizzare la lussuosa area SPA e i pacchetti stagionali", "Ridurre le commissioni pagate a Booking.com"]
          : ["Increase direct web reservations by 30%+", "Showcase the luxury SPA and premium packages", "Minimize reliance and commission fees to third-party portals"];
      case "construction":
        return language === "it"
          ? ["Presentare i servizi edili in modo chiaro e professionale", "Fornire un modulo preventivo rapido e intuitivo", "Trasmettere solidità, precisione e qualità svizzera"]
          : ["Present construction services clearly and professionally", "Offer an intuitive custom estimation form", "Communicate structural stability, rigor, and Swiss quality"];
      case "medical":
        return language === "it"
          ? ["Presentare listino servizi e prezzi in modo chiaro", "Digitalizzare la prenotazione degli appuntamenti", "Offrire una galleria fotografica professionale del salone"]
          : ["Present service list and pricing clearly", "Digitize appointment booking", "Offer a professional photo gallery of the salon"];
      case "realestate":
        return language === "it"
          ? ["Caricare gallerie fotografiche 4K in modo istantaneo", "Integrare un calcolatore di ipoteche svizzere", "Raccogliere contatti di acquirenti qualificati e d'élite"]
          : ["Enable instant loading of high-resolution 4K asset photos", "Integrate a modern, interactive Swiss mortgage calculator", "Capture hot inquiries from high-end premium buyers"];
      case "fitness":
        return language === "it"
          ? ["Digitalizzare la vendita di abbonamenti con pagamenti Stripe", "Saturare la capienza dei corsi di gruppo in app", "Fornire schede di allenamento interattive mobile-friendly"]
          : ["Digitize membership checkouts using Stripe gateway", "Fill group training class roster capacity automatically", "Deliver interactive workout sheets optimized for mobile"];
      case "winery":
        return language === "it"
          ? ["Presentare i servizi di rifacimento tetti e coperture", "Fornire un modulo per richiedere un sopralluogo gratuito", "Mostrare una galleria dei lavori realizzati"]
          : ["Present roofing and covering services clearly", "Provide a form to request a free on-site inspection", "Showcase a gallery of completed projects"];
      case "architect":
        return language === "it"
          ? ["Caricamento ultrarapido di foto 4K e rendering d'autore", "Interfaccia minimalista e geometrica d'impatto svizzero", "Acquisizione di committenti privati per ville di lusso"]
          : ["Deliver instant 4K portfolio photo & render loading", "Design minimalist, high-contrast grid layouts", "Aquire direct premium briefs from elite private villa builders"];
      case "lawfirm":
        return language === "it"
          ? ["Presentare le biografie accademiche e professionali dei partner", "Garantire un canale di contatto crittografato sicuro al 100%", "Attrarre PMI e partner commerciali di rilievo in Ticino"]
          : ["Present academic & operational profiles of corporate partners", "Ensure absolute end-to-end encrypted interaction pathways", "Attract prestigious Swiss corporate accounts and SMEs"];
      case "consulting":
        return language === "it"
          ? ["Illustrare l'impatto metodologico e i KPI storici raggiunti", "Integrare un sistema avanzato di lead scoring per audit gratuiti", "Consolidare il posizionamento come opinion leader a livello nazionale"]
          : ["Map historic operational client KPI increases transparently", "Implement structured lead scoring for free initial audits", "Solidify authoritative corporate presence throughout Switzerland"];
      default:
        return language === "it"
          ? ["Ottimizzare le prestazioni web su tutti i dispositivi", "Incrementare il tasso di conversione dei visitatori locali", "Garantire conformità legale e sicurezza elvetica"]
          : ["Optimize responsive web performance across all channels", "Elevate conversion rates of local web visitors", "Guarantee robust compliance, DPA rules, and speed"];
    }
  };

  const getProjectResults = (projectId: string): string[] => {
    switch (projectId) {
      case "beauty":
        return language === "it"
          ? ["+40% di prenotazioni online dirette nei primi 2 mesi", "Tasso di rimbalzo ridotto dal 72% al 18%", "+150 recensioni a 5 stelle via QR-code"]
          : ["+40% direct online bookings within 60 days of launch", "Bounce rate reduced from 72% down to 18%", "+150 five-star ratings collected via in-salon QR codes"];
      case "dental":
        return language === "it"
          ? ["Riduzione del 30% delle chiamate telefoniche in reception", "Incremento del 25% di nuovi pazienti registrati online", "Primi posti su Google per parole chiave di ortodonzia locale"]
          : ["30% drop in receptionist administrative telephone workload", "25% surge in newly acquired patients registering online", "Top 3 spots on Google Search for regional dental terms"];
      case "restaurant":
        return language === "it"
          ? ["Fine settimana costantemente al completo con prenotazioni automatiche", "Consultazione menu raddoppiata grazie ai codici QR sui tavoli", "Soddisfazione clienti incrementata grazie all'efficienza del servizio"]
          : ["Weekend bookings consistently fully booked automatically", "Menu consults doubled via instant QR codes printed on tables", "Significantly elevated visitor delight due to zero waiting time"];
      case "hotel":
        return language === "it"
          ? ["+35% di prenotazioni dirette risparmiando migliaia di franchi di commissione", "Tempo di navigazione salito da 1.2 a 4.5 minuti di media", "Afflusso costante di nuovi turisti svizzero-tedeschi"]
          : ["+35% direct bookings saving thousands of CHF in agency fees", "Average session duration skyrocketed from 1.2 to 4.5 minutes", "Strong, organic flow of premium Swiss-German bookings"];
      case "construction":
        return language === "it"
          ? ["Modulo di richiesta preventivo online funzionante", "Portfolio progetti filtrabile e facile da consultare", "Presentazione chiara e professionale dei servizi offerti"]
          : ["Working online quote request form", "Filterable, easy-to-browse project portfolio", "Clear, professional presentation of services offered"];
      case "medical":
        return language === "it"
          ? ["Sistema di prenotazione online funzionante", "Galleria fotografica del salone caricata istantaneamente", "Design ottimizzato per la consultazione da smartphone"]
          : ["Working online booking system", "Salon photo gallery loads instantly", "Design optimized for mobile browsing"];
      case "realestate":
        return language === "it"
          ? ["Permanenza media triplicata grazie al caricamento istantaneo delle foto 4K", "+50% di richieste per visite private di ville di lusso", "Accelerazione dei tempi di vendita delle esclusive proprietà lacustre"]
          : ["Average time-on-site tripled due to zero latency 4K media", "50% increase in requests for private premium asset walk-throughs", "Significantly accelerated deal-closure cycle for luxury lake estates"];
      case "fitness":
        return language === "it"
          ? ["Corsi di gruppo costantemente sani e prenotati al 100% in app", "Segreteria libera da compiti contabili e amministrativi di rinnovo", "Transazioni ricorrenti automatiche gestite con successo via Stripe"]
          : ["100% class roster utilization managed smoothly inside the app", "Administrative staff fully relieved of manual billing tasks", "Secure automated monthly recurring Stripe payouts with zero friction"];
      case "winery":
        return language === "it"
          ? ["Modulo di richiesta sopralluogo semplice e veloce", "Galleria lavori realizzati ben strutturata", "Presentazione tecnica chiara dei servizi di copertura"]
          : ["Simple, fast on-site inspection request form", "Well-structured gallery of completed projects", "Clear, technical presentation of roofing services"];
      case "architect":
        return language === "it"
          ? ["Navigazione fluida e istantanea di render pesanti in 4K su mobile", "+50% di leads qualificati per la progettazione di nuove ville", "Forte interesse espresso da investitori istituzionali e privati"]
          : ["Instantaneous 4K image loads on low-bandwidth smartphone networks", "50% increase in luxury private construction inquiries", "Unprecedented high engagement across premium residential listings"];
      case "lawfirm":
        return language === "it"
          ? ["Immediato senso di fiducia istituzionale trasmesso a importanti PMI", "+45% di contatti commerciali tramite modulo criptato sicuro", "Consolidamento del prestigio sul mercato rispetto ai competitor"]
          : ["Immediate trust signal established with prominent Swiss SMEs", "45% increase in highly strategic, confidential advisory leads", "Strengthened brand authority over competing regional legal chambers"];
      case "consulting":
        return language === "it"
          ? ["+55% di richieste per audit aziendali strategici gratuiti", "Tasso di conversione dei lead corporate salito al 4.1%", "Consolidata reputazione di leadership strategica in tutta la Svizzera"]
          : ["55% surge in direct strategic corporate audit requests", "Corporate visitor-to-lead conversion rate reached 4.1%", "Expanded market leadership spanning Lugano, Zug, and Zürich"];
      default:
        return language === "it"
          ? ["Miglioramento sensibile delle metriche Google PageSpeed (Score > 95)", "Aumento misurabile dei contatti commerciali via web", "Esperienza d'uso fluida su smartphone, tablet e computer"]
          : ["Google PageSpeed metrics raised beyond 95 score on mobile", "Measurable increase in direct commercial interactions", "Absolute seamless performance spanning phone, tablet, and PC"];
    }
  };

  const getProjectGallery = (projectId: string): string[] => {
    switch (projectId) {
      case "beauty":
        return [
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "dental":
        return [
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1447433589675-4adf56d3c093?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "restaurant":
        return [
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "hotel":
        return [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "construction":
        return [
          "/images/portfolio/edilpro-costruzioni.webp",
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "medical":
        return [
          "/images/portfolio/barber-studio-ticino.webp",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "realestate":
        return [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "fitness":
        return [
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1571731956622-9a040b0870d4?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "winery":
        return [
          "/images/portfolio/tettopro-ticino.webp",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "architect":
        return [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "lawfirm":
        return [
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1450133064473-71024230f91b?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      case "consulting":
        return [
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
      default:
        return [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=webp&auto=format&fit=crop&w=400&q=60",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?fm=webp&auto=format&fit=crop&w=400&q=60"
        ];
    }
  };

  const metrics = getBeforeAfterMetrics(activeProject.id);

  // Before / After Drag Logic
  const handleMouseDown = (clientX: number) => {
    setIsDragging(true);
    dragStartPos.current = clientX;
    didDrag.current = false;
  };

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    
    if (dragStartPos.current !== null && Math.abs(clientX - dragStartPos.current) > 5) {
      didDrag.current = true;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const triggerDemoAction = () => {
    setDemoActionStatus("loading");
    setTimeout(() => {
      setDemoActionStatus("success");
    }, 1500);
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contatti");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Slow ambient float on the decorative background glows (continuous, not a
  // one-time reveal, so it stays GSAP-driven). The header block (badge/title/
  // subtitle/switcher/tabs) now reveals via <ScrollReveal> -- see the JSX below.
  const sectionRef = useGsapAnimation<HTMLElement>((scope, { reducedMotion, isTouch }) => {
    if (reducedMotion || !scope.current) return;

    const glows = scope.current.querySelectorAll('[data-anim="glow"]');

    if (isTouch) return;

    if (glows.length) {
      gsap.to(Array.from(glows), {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-16, 16),
        duration: () => gsap.utils.random(7, 10),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1.2, from: "random" },
      });
    }
  }, []);

  // Card-grid entrance now runs through <ScrollReveal> per card (see the JSX below) --
  // each card is a freshly-keyed DOM node whenever the category filter/gallery-view
  // toggle changes, so remounting naturally re-triggers its own reveal.

  // Lightweight GSAP opacity/scale-in for the case-study modal, tied purely to
  // the existing selectedProject open/close state (no trigger-logic changes).
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!selectedProject) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const backdrop = modalBackdropRef.current;
    const panel = modalPanelRef.current;
    if (!backdrop || !panel) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [selectedProject]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div data-anim="glow" className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 pointer-events-none blur-3xl" />
      <div data-anim="glow" className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full radial-glow-blue opacity-10 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title -- one of the page's few "giant statement" moments
            (section-title--display), reserved for Portfolio precisely because
            the work itself is the thing being announced. */}
        <ScrollReveal effect="fade-up" className="text-center max-w-4xl mx-auto mb-10 space-y-6">
          <div className="kicker kicker--blue justify-center">
            {language === "it" ? "STORIE DI SUCCESSO & PROGETTI" : "ERFOLGSSTORYS & PROJEKTE"}
          </div>
          <h2 className="section-title--display">
            {language === "it" ? "Il nostro Portfolio" : "Unser Portfolio"} <br />
            <span className="text-gradient-gold">{language === "it" ? "Artigianato Digitale d'Elite" : "Digitales Elite-Handwerk"}</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            {language === "it"
              ? "Esplora i nostri capolavori di sviluppo web. Passa dalla galleria fotografica ad alta risoluzione al simulatore di dispositivi interattivo."
              : "Entdecken Sie unsere Webentwicklungs-Meisterwerke. Wechseln Sie zwischen der hochauflösenden Fotogalerie und dem interaktiven Gerätesimulator."}
          </p>
        </ScrollReveal>

        {/* View Switcher: Gallery vs Interactive Simulator */}
        <ScrollReveal effect="fade-up" delay={100} className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-zinc-950/85 border border-zinc-900 rounded-2xl shadow-xl backdrop-blur-md">
            <button
              onClick={() => {
                setPortfolioView("gallery");
                setActiveCategory("all");
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                portfolioView === "gallery"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{language === "it" ? "Galleria Progetti" : "Projektgalerie"}</span>
            </button>
            <button
              onClick={() => {
                setPortfolioView("interactive");
                setActiveCategory("beauty");
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                portfolioView === "interactive"
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === "it" ? "Simulatore Interattivo" : "Interaktiver Simulator"}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Categories Tab Bar */}
        <ScrollReveal effect="fade-up" delay={180} className="flex flex-wrap items-center justify-center gap-2.5 max-w-5xl mx-auto mb-16 p-2 rounded-2xl bg-zinc-950/65 border border-zinc-900 backdrop-blur-md">
          {categoriesToUse.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 min-w-[110px] sm:min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer text-center relative overflow-hidden select-none ${
                  isActive
                    ? "text-dark-bg font-extrabold"
                    : "text-zinc-400 hover:text-white bg-transparent"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-amber-500 rounded-xl" />
                )}
                <span className="relative z-10 block">{cat.label}</span>
                <span className={`relative z-10 text-[9px] block font-mono font-normal opacity-70 ${isActive ? "text-dark-bg" : "text-zinc-400"}`}>
                  {cat.industry}
                </span>
              </button>
            );
          })}
        </ScrollReveal>

        {portfolioView === "gallery" ? (
          /* Cinematic editorial showcase: the image leads, chrome/metrics follow.
             Large-format cover with a curtain-mask reveal + a slow, GPU-cheap
             scale on hover (.project-card-frame/.project-card-image, see
             index.css) instead of the previous browser-mockup-style card. */
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {(activeCategory === "all" ? projectList : projectList.filter(p => p.id === activeCategory)).map((project, projectIndex) => {
                  const projectMetrics = getBeforeAfterMetrics(project.id);
                  const technologies = getProjectTechnologies(project.id);
                  const projectGallery = getProjectGallery(project.id);
                  const cardCoverImage = projectGallery[0] || project.imageUrl;

                  return (
                    <ScrollReveal key={project.id} effect="fade-up" delay={(projectIndex % 3) * 100} className="h-full">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="card-glow-hover group relative flex flex-col h-full bg-zinc-950/80 border border-zinc-900 rounded-[1.75rem] overflow-hidden shadow-xl hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 cursor-pointer"
                    >
                      {/* Large-format cover image, curtain-mask reveal on scroll, slow
                          scale on hover -- the project's visual IS the entry point. */}
                      <ScrollReveal
                        effect="image-cinematic"
                        duration={900}
                        className="project-card-frame relative h-80 sm:h-96 w-full"
                      >
                        <img
                          src={cardCoverImage}
                          srcSet={getSrcSet(cardCoverImage)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          alt={`PixelForge Project - ${project.title}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                          style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
                          className="project-card-image"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                          }}
                        />

                        {/* Permanent gradient scrim so the overlaid title/badges stay
                            legible against any photo -- never hides the image itself. */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                        {/* Top badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          <div className="px-2.5 py-1 bg-black/75 border border-zinc-800 rounded-lg backdrop-blur-md flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold-500 shrink-0" />
                            <span className="text-[9px] font-mono font-bold text-zinc-300 tracking-wider uppercase">
                              {project.location}
                            </span>
                          </div>
                          {project.isDemo ? (
                            <div className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 rounded-lg backdrop-blur-md flex items-center gap-1 text-gold-400">
                              <Sparkles className="w-3 h-3 shrink-0" />
                              <span className="text-[9px] font-mono font-bold tracking-wider uppercase">
                                {language === "it" ? "Progetto Demo" : "Demo Project"}
                              </span>
                            </div>
                          ) : (
                            <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-md flex items-center gap-1 text-emerald-400">
                              <ShieldCheck className="w-3 h-3 shrink-0" />
                              <span className="text-[9px] font-mono font-bold tracking-wider uppercase">100% DSG</span>
                            </div>
                          )}
                        </div>

                        {/* Title lives on the image, magazine-cover style -- the single
                            biggest visual change from the old chrome-first card. */}
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                          <span className="text-[9px] font-mono font-bold text-gold-400 uppercase tracking-widest block mb-1.5">
                            {project.category}
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-[0.98] tracking-tight">
                            {project.title}
                          </h3>
                        </div>

                        {/* Hover reveal: "read case study" cue, quiet until interaction */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1.5 bg-black/70 px-4 py-2 border border-white/15 rounded-full backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                            {language === "it" ? "Leggi Caso Studio" : "Read Case Study"}
                          </span>
                        </div>
                      </ScrollReveal>

                      {/* Compact info strip below the image -- description + hard
                          metrics + tech, same data as before, tightened for rhythm. */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed text-left line-clamp-2">
                          {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-[#09090b] border border-zinc-900/60 rounded-2xl">
                          <div className="text-left space-y-0.5">
                            <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">{language === "it" ? "VELOCITÀ" : "SPEED"}</span>
                            <span className="text-xs font-mono font-extrabold text-emerald-400 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-emerald-400" />
                              {projectMetrics.after.speed}
                            </span>
                          </div>
                          <div className="text-left space-y-0.5 border-l border-zinc-900 pl-3">
                            <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">{language === "it" ? "CONVERSIONI" : "CONVERSIONS"}</span>
                            <span className="text-xs font-mono font-extrabold text-emerald-400 flex items-center gap-1">
                              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                              {projectMetrics.after.conversion}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t border-zinc-900 pt-3.5">
                          <div className="flex flex-wrap gap-1.5">
                            {technologies.slice(0, 2).map((tech, idx) => (
                              <span key={idx} className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-900">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-gold-500 flex items-center gap-1 shrink-0 group-hover:gap-1.5 transition-all">
                            {language === "it" ? "Dettagli" : "Details"}
                            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>

                    </div>
                    </ScrollReveal>
                  );
                })}
            </div>
          </div>
        ) : (
          /* Main Content Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Case Study Details & Interactive Before/After (Col-6) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Industry, Location & Title Header */}
            <div 
              className="space-y-3 p-5 sm:p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:border-gold-500/30 hover:bg-zinc-950/60 transition-all duration-300 cursor-pointer group shadow-lg"
              onClick={() => setSelectedProject(activeProject)}
            >
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                    {language === "it" ? "Settore" : "Branche"}: {activeProject.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1 uppercase font-bold">
                    <MapPin className="w-3.5 h-3.5 text-gold-500" />
                    {activeProject.location}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gold-500/80 group-hover:text-gold-400 transition-colors flex items-center gap-1 font-bold">
                  {language === "it" ? "Leggi Articolo" : "Artikel lesen"} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-gold-400 transition-colors">
                {activeProject.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Interactive Before / After Drag Slider widget */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
                  {language === "it" ? "CONFRONTO INTERATTIVO PRIMA / DOPO" : "INTERAKTIVER VORHER / NACHHER VERGLEICH"}
                </span>
                <span className="text-[10px] font-mono text-gold-500 font-bold animate-pulse">
                  {language === "it" ? "← Clicca per dettagli | Trascina il cursore →" : "← Klick für Details | Ziehen Sie den Regler →"}
                </span>
              </div>

              {/* Slider Container */}
              <div 
                ref={sliderRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={(e) => handleMouseDown(e.clientX)}
                onTouchStart={(e) => {
                  if (e.touches[0]) {
                    handleMouseDown(e.touches[0].clientX);
                  }
                }}
                className="relative h-[250px] sm:h-[300px] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950/80 cursor-pointer select-none shadow-2xl"
              >
                {/* AFTER image (Full reveal / right side) */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!didDrag.current) {
                      setSelectedProject(activeProject);
                    }
                  }}
                >
                  <img 
                    src={activeProject.imageUrl} 
                    srcSet={getSrcSet(activeProject.imageUrl)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    alt="Nachher PixelForge Design" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                    }}
                  />
                  {/* Glowing text inside After area */}
                  <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-emerald-950/90 border border-emerald-500/30 rounded-lg backdrop-blur-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      {language === "it" ? "DOPO (PixelForge 100% Score) • Clicca per articolo" : "NACHHER (PixelForge 100% Score) • Klick für Artikel"}
                    </span>
                  </div>
                </div>

                {/* BEFORE image (Left side, clipped by sliderPosition) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden z-10 transition-all duration-75"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden cursor-pointer" 
                    style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!didDrag.current) {
                        setSelectedProject(activeProject);
                      }
                    }}
                  >
                    <img 
                      src={activeProject.imageUrl} 
                      srcSet={getSrcSet(activeProject.imageUrl)}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                      alt="Vorher Unoptimiertes Design" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover filter grayscale blur-[6px] brightness-50 transition-transform duration-500 hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                      }}
                    />
                    {/* Warning badge inside Before area */}
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-rose-950/95 border border-rose-500/30 rounded-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[10px] font-mono font-bold text-rose-400">
                        {language === "it" ? "PRIMA (Lento e obsoleto)" : "VORHER (Langsam & veraltet)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Handle bar dividing Before/After */}
                <div 
                  className="absolute inset-y-0 w-1 bg-gradient-to-b from-gold-500 via-amber-400 to-gold-500 z-20 flex items-center justify-center cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-950 border border-gold-400 shadow-xl flex items-center justify-center -ml-3.5 active:scale-110 transition-transform">
                    <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                  </div>
                </div>
              </div>

              {/* Hard Metrics Compare Panels */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                {/* Outdated Metric */}
                <div className="p-3.5 rounded-xl border border-rose-950/20 bg-rose-950/5 text-left space-y-2">
                  <div className="text-[9px] font-mono font-bold text-rose-400 tracking-wider uppercase">
                    {metrics.before.label}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "VELOCITÀ" : "LADEZEIT"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-rose-400/85">{metrics.before.speed}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "CONVERSIONE" : "CONVERSION"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-rose-400/85">{metrics.before.conversion}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "RIMBALZO" : "BOUNCE RATE"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-rose-400/85">{metrics.before.bounce}</span>
                    </div>
                  </div>
                </div>

                {/* PixelForge Metric */}
                <div className="p-3.5 rounded-xl border border-emerald-900/20 bg-emerald-950/5 text-left space-y-2">
                  <div className="text-[9px] font-mono font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    {metrics.after.label}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "VELOCITÀ" : "LADEZEIT"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-emerald-400">{metrics.after.speed}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "CONVERSIONE" : "CONVERSION"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-emerald-400">{metrics.after.conversion}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 block">
                        {language === "it" ? "RIMBALZO" : "BOUNCE RATE"}
                      </span>
                      <span className="text-sm font-mono font-extrabold text-emerald-400">{metrics.after.bounce}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem / Solution Narrative Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  {language === "it" ? "LA SFIDA" : "HERAUSFORDERUNG"}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{activeProject.problem}</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
                  {language === "it" ? "LA SOLUZIONE" : "DURCHFÜHRUNG"}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{activeProject.solution}</p>
              </div>
            </div>

            {/* Technologies tags */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                {language === "it" ? "TECNOLOGIE UTILIZZATE & INTEGRAZIONI" : "EINGESETZTE TECHNOLOGIEN & SCHNITTSTELLEN"}
              </span>
              <div className="flex flex-wrap gap-2">
                {getProjectTechnologies(activeProject.id).map((tech, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project CTA Row */}
            <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold text-xs rounded-xl uppercase tracking-wider shadow-lg shadow-gold-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{language === "it" ? "Richiedi demo" : "Demo anfordern"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={triggerDemoAction}
                className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${demoActionStatus === "loading" ? "animate-spin text-gold-500" : ""}`} />
                {demoActionStatus === "success" 
                  ? (language === "it" ? "✓ Simulazione avviata" : "✓ Testlauf gestartet") 
                  : (language === "it" ? "Avvia simulazione live" : "Echtzeit-Simulation laden")}
              </button>
            </div>
          </div>

          {/* Right Column: Premium Realistic Device Simulator (Col-6) */}
          <div className="lg:col-span-6 w-full sticky top-28 space-y-6">
            
            {/* Device Type Selector Controls */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-zinc-950/80 border border-zinc-900 max-w-sm mx-auto shadow-inner">
              <button
                onClick={() => setSelectedDevice("macbook")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedDevice === "macbook"
                    ? "bg-gold-500 text-dark-bg font-extrabold shadow"
                    : "text-zinc-400 hover:text-zinc-300 bg-transparent"
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>MacBook</span>
              </button>

              <button
                onClick={() => setSelectedDevice("ipad")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedDevice === "ipad"
                    ? "bg-gold-500 text-dark-bg font-extrabold shadow"
                    : "text-zinc-400 hover:text-zinc-300 bg-transparent"
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>iPad</span>
              </button>

              <button
                onClick={() => setSelectedDevice("iphone")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedDevice === "iphone"
                    ? "bg-gold-500 text-dark-bg font-extrabold shadow"
                    : "text-zinc-400 hover:text-zinc-300 bg-transparent"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>iPhone</span>
              </button>
            </div>

            {/* Inner Interactive Device View Wrapper */}
            <div className="min-h-[420px] sm:min-h-[480px] flex flex-col justify-center items-center">

                {/* 1. MACBOOK MOCKUP */}
                {selectedDevice === "macbook" && (
                  <div
                    key="device-macbook"
                    className="w-full flex flex-col items-center"
                  >
                    {/* Screen Bezel */}
                    <div className="relative w-full max-w-[500px] sm:max-w-[530px] aspect-[16/10] bg-[#0c0c0d] rounded-t-2xl border-t-[12px] border-x-[12px] border-zinc-800 shadow-2xl p-1 overflow-hidden flex flex-col justify-between">
                      {/* Top bezel notch/camera */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-900 rounded-full z-30" />
                      
                      {/* Interactive Website Content */}
                      <div 
                        className="relative w-full h-full rounded-sm overflow-hidden flex flex-col p-4 transition-all duration-500 text-left"
                        style={{ backgroundColor: activeProject.mockupContent.colors.bg }}
                      >
                        {/* Dynamic glow in background */}
                        <div 
                          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none blur-3xl"
                          style={{ backgroundColor: activeProject.mockupContent.colors.primary }}
                        />

                        {/* Top bar */}
                        <div className="flex items-center justify-between border-b pb-2 mb-3 mt-1" style={{ borderBottomColor: `${activeProject.mockupContent.colors.primary}15` }}>
                          <span className="text-[10px] font-display font-extrabold flex items-center gap-1" style={{ color: activeProject.mockupContent.colors.text }}>
                            <span 
                              className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold"
                              style={{ 
                                backgroundColor: `${activeProject.mockupContent.colors.primary}20`,
                                color: activeProject.mockupContent.colors.primary 
                              }}
                            >
                              ★
                            </span>
                            {activeProject.title}
                          </span>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex gap-2 text-[8px] font-mono opacity-60 text-zinc-400">
                              <span>Services</span>
                              <span>Projekte</span>
                              <span>Kontakt</span>
                            </div>
                            <span className="text-[7px] font-mono text-gold-500 font-bold bg-gold-500/10 border border-gold-500/20 px-1.5 py-0.5 rounded">
                              PROTOTYP
                            </span>
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar text-left">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
                            
                            {/* Main Title and subtile */}
                            <div className="md:col-span-7 space-y-2">
                              <h4 className="text-xs sm:text-sm font-display font-extrabold leading-tight" style={{ color: activeProject.mockupContent.colors.text }}>
                                {activeProject.mockupContent.heroTitle}
                              </h4>
                              <p className="text-[9px] text-zinc-400 leading-relaxed font-light">
                                {activeProject.mockupContent.heroSubtitle}
                              </p>
                            </div>

                            {/* Unsplash portrait */}
                            <div className="md:col-span-5 rounded-lg overflow-hidden h-20 border border-zinc-800">
                              <img 
                                src={activeProject.imageUrl} 
                                srcSet={getSrcSet(activeProject.imageUrl)}
                                sizes="(max-width: 640px) 100vw, 300px"
                                alt={activeProject.title} 
                                referrerPolicy="no-referrer" 
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                                }}
                              />
                            </div>
                          </div>

                          {/* Render Sections side-by-side */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeProject.mockupContent.sections.map((sec, idx) => (
                              <div 
                                key={idx} 
                                className="p-2.5 rounded-xl border text-left"
                                style={{ 
                                  backgroundColor: `${activeProject.mockupContent.colors.secondary}`,
                                  borderColor: `${activeProject.mockupContent.colors.primary}10`
                                }}
                              >
                                <h5 className="text-[9px] font-bold mb-1 font-display" style={{ color: activeProject.mockupContent.colors.primary }}>
                                  {sec.title}
                                </h5>
                                <p className="text-[8px] text-zinc-400 whitespace-pre-line leading-relaxed font-light">
                                  {sec.content}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Dynamic Action response bar */}
                          <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded-lg flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-[8px] text-emerald-400 font-medium">Schweizer Server-Hosting (DSG-Konform) & SSL Verschlüsselt</span>
                          </div>
                        </div>

                        {/* Interactive Footer CTA inside MacBook */}
                        <div className="pt-2.5 border-t mt-2 flex items-center justify-between" style={{ borderTopColor: `${activeProject.mockupContent.colors.primary}15` }}>
                          <span className="text-[7px] text-zinc-400 font-mono">
                            PixelForge.ch • Schweizer Handwerkskunst
                          </span>
                          
                          <div className="w-36">
                            {demoActionStatus === "success" ? (
                              <div className="w-full py-1.5 bg-emerald-500 text-dark-bg font-extrabold text-[8px] rounded-lg text-center flex items-center justify-center gap-1">
                                ✓ Bestaetigt
                              </div>
                            ) : demoActionStatus === "loading" ? (
                              <div className="w-full py-1.5 bg-zinc-800 text-zinc-300 font-bold text-[8px] rounded-lg text-center flex items-center justify-center gap-1">
                                <RefreshCw className="w-2 animate-spin text-gold-500" />
                                Verbindet...
                              </div>
                            ) : (
                              <button
                                onClick={triggerDemoAction}
                                className="w-full text-white font-extrabold text-[8px] py-1.5 rounded-lg shadow-md hover:opacity-90 active:scale-99 transition-all cursor-pointer"
                                style={{ backgroundColor: activeProject.mockupContent.colors.primary }}
                              >
                                {activeProject.mockupContent.ctaText}
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Keyboard Base Base */}
                    <div className="relative w-full max-w-[570px] sm:max-w-[600px] h-3 bg-zinc-800 rounded-b-xl border-b border-zinc-950 shadow-xl flex justify-center z-20">
                      <div className="w-20 h-1 bg-zinc-900 rounded-b-md" />
                    </div>
                  </div>
                )}

                {/* 2. IPAD MOCKUP */}
                {selectedDevice === "ipad" && (
                  <div
                    key="device-ipad"
                    className="w-full max-w-[390px] aspect-[4/3] bg-zinc-950 rounded-[28px] border-[12px] border-zinc-800 shadow-2xl p-1 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Camera */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-950 z-30" />
                    
                    {/* Inner Tablet Website Content */}
                    <div 
                      className="relative w-full h-full rounded-[14px] overflow-hidden flex flex-col p-4 transition-all duration-500 text-left cursor-pointer"
                      style={{ backgroundColor: activeProject.mockupContent.colors.bg }}
                      onClick={() => setSelectedProject(activeProject)}
                    >
                      {/* Top header */}
                      <div className="flex items-center justify-between border-b pb-2 mb-3 mt-1" style={{ borderBottomColor: `${activeProject.mockupContent.colors.primary}15` }}>
                        <span className="text-[10px] font-display font-extrabold flex items-center gap-1" style={{ color: activeProject.mockupContent.colors.text }}>
                          <span 
                            className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold"
                            style={{ 
                              backgroundColor: `${activeProject.mockupContent.colors.primary}20`,
                              color: activeProject.mockupContent.colors.primary 
                            }}
                          >
                            ★
                          </span>
                          {activeProject.title}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[6px] font-mono text-zinc-400 bg-zinc-850 px-1 py-0.5 rounded">TABLET MODE</span>
                        </div>
                      </div>

                      {/* Content scroll area */}
                      <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar text-left">
                        <div className="space-y-1">
                          <h4 className="text-xs font-display font-extrabold leading-tight" style={{ color: activeProject.mockupContent.colors.text }}>
                            {activeProject.mockupContent.heroTitle}
                          </h4>
                          <p className="text-[8.5px] text-zinc-400 leading-relaxed font-light">
                            {activeProject.mockupContent.heroSubtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {activeProject.mockupContent.sections.map((sec, idx) => (
                            <div 
                              key={idx} 
                              className="p-2 rounded-xl border text-left"
                              style={{ 
                                backgroundColor: `${activeProject.mockupContent.colors.secondary}`,
                                borderColor: `${activeProject.mockupContent.colors.primary}10`
                              }}
                            >
                              <h5 className="text-[8.5px] font-bold mb-0.5 font-display" style={{ color: activeProject.mockupContent.colors.primary }}>
                                {sec.title}
                              </h5>
                              <p className="text-[8px] text-zinc-400 whitespace-pre-line leading-relaxed font-light">
                                {sec.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer booking section */}
                      <div className="pt-2 border-t mt-2" style={{ borderTopColor: `${activeProject.mockupContent.colors.primary}15` }}>
                        {demoActionStatus === "success" ? (
                          <div className="w-full py-1.5 bg-emerald-500 text-dark-bg font-extrabold text-[8.5px] rounded-lg text-center">
                            ✓ Verbindung hergestellt!
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerDemoAction();
                            }}
                            className="w-full text-white font-extrabold text-[8.5px] py-1.5 rounded-lg shadow-md cursor-pointer animate-pulse hover:opacity-90 active:scale-95 transition-all"
                            style={{ backgroundColor: activeProject.mockupContent.colors.primary }}
                          >
                            {activeProject.mockupContent.ctaText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. IPHONE MOCKUP */}
                {selectedDevice === "iphone" && (
                  <div
                    key="device-iphone"
                    className="relative w-[240px] sm:w-[260px] aspect-[9/18.2] bg-zinc-950 rounded-[40px] border-[8px] border-zinc-800 shadow-2xl p-1.5 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Camera notch / Dynamic island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-850 rounded-full z-30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 mr-2" />
                      <div className="w-5 h-0.5 bg-zinc-950 rounded-full" />
                    </div>

                    {/* Smartphone Content */}
                    <div 
                      className="relative w-full h-full rounded-[28px] overflow-hidden flex flex-col p-3.5 transition-all duration-500 text-left cursor-pointer"
                      style={{ backgroundColor: activeProject.mockupContent.colors.bg }}
                      onClick={() => setSelectedProject(activeProject)}
                    >
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between border-b pb-2 mb-3 mt-4" style={{ borderBottomColor: `${activeProject.mockupContent.colors.primary}15` }}>
                        <span className="text-[9px] font-display font-extrabold flex items-center gap-1" style={{ color: activeProject.mockupContent.colors.text }}>
                          {activeProject.title}
                        </span>
                        <span className="text-[6px] font-mono text-zinc-400 bg-zinc-800 px-1 rounded font-bold">DEMO</span>
                      </div>

                      {/* Scroll Area */}
                      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 no-scrollbar text-left">
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-display font-extrabold leading-tight" style={{ color: activeProject.mockupContent.colors.text }}>
                            {activeProject.mockupContent.heroTitle}
                          </h4>
                          <p className="text-[7.5px] text-zinc-400 leading-relaxed font-light">
                            {activeProject.mockupContent.heroSubtitle}
                          </p>
                        </div>

                        {/* Mobile Sections stacked */}
                        {activeProject.mockupContent.sections.slice(0, 1).map((sec, idx) => (
                          <div 
                            key={idx} 
                            className="p-2 rounded-xl border text-left"
                            style={{ 
                              backgroundColor: `${activeProject.mockupContent.colors.secondary}`,
                              borderColor: `${activeProject.mockupContent.colors.primary}10`
                            }}
                          >
                            <h5 className="text-[8px] font-bold mb-0.5 font-display" style={{ color: activeProject.mockupContent.colors.primary }}>
                              {sec.title}
                            </h5>
                            <p className="text-[7px] text-zinc-400 whitespace-pre-line leading-relaxed font-light">
                              {sec.content}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Mobile floating Action */}
                      <div className="pt-2 border-t mt-2" style={{ borderTopColor: `${activeProject.mockupContent.colors.primary}15` }}>
                        {demoActionStatus === "success" ? (
                          <div className="w-full py-1.5 bg-emerald-500 text-dark-bg font-extrabold text-[8px] rounded-lg text-center">
                            ✓ Anfrage gesendet!
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerDemoAction();
                            }}
                            className="w-full text-white font-extrabold text-[8px] py-1.5 rounded-lg shadow-md cursor-pointer animate-pulse hover:opacity-90 active:scale-95 transition-all"
                            style={{ backgroundColor: activeProject.mockupContent.colors.primary }}
                          >
                            {activeProject.mockupContent.ctaText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

            </div>

            <p className="text-[10px] text-zinc-400 font-mono tracking-wide text-center">
              * Klicken Sie auf die Buttons im Simulator, um Formular-Feeds und Antworten live zu testen.
            </p>
          </div>

        </div>
        )}
      </div>

      {/* CASE STUDY DETAIL MODAL */}
      {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            style={{ pointerEvents: "auto" }}
          >
            {/* Backdrop with dark overlay */}
            <div
              ref={modalBackdropRef}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/92 backdrop-blur-lg"
            />

            {/* Modal Body -- redesigned as a premium mini case study: a full-bleed
                cinematic banner leads (image + overlaid title, magazine-spread
                style), the data-rich two-column body follows below it. Same
                open/close GSAP animation as before (modalBackdropRef/modalPanelRef). */}
            <div
              ref={modalPanelRef}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#09090b] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-50 my-8"
            >
              {/* Close Button -- sits over the banner image, so it gets its own scrim chip */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/70 hover:bg-black/90 text-zinc-200 hover:text-white rounded-full transition-all cursor-pointer border border-white/10 shadow-md flex items-center justify-center backdrop-blur-md"
                aria-label="Chiudi"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[88vh] overflow-y-auto">

                {/* Cinematic banner: full-bleed cover image with title overlay */}
                <div className="case-study-banner relative h-64 sm:h-80 w-full">
                  <img
                    src={activeModalImage || selectedProject.imageUrl}
                    srcSet={getSrcSet(activeModalImage || selectedProject.imageUrl)}
                    sizes="(max-width: 1024px) 100vw, 900px"
                    alt={`PixelForge Project - ${selectedProject.title}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&auto=format&fit=crop&w=400&q=60";
                    }}
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-gold-500/15 border border-gold-500/25 rounded-lg backdrop-blur-md">
                    <span className="text-[9px] font-mono font-bold text-gold-400 tracking-wider uppercase">
                      {selectedProject.location}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block mb-1.5">
                      Case Study: {selectedProject.category}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-[0.96] tracking-tight max-w-2xl">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12">

                {/* Left Column: Gallery, Objectives & Metadata (Col-5) */}
                <div className="md:col-span-5 p-6 sm:p-8 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-900/80 flex flex-col justify-between space-y-6">

                  <div className="space-y-5">
                    {/* Interactive Photo Gallery Thumbnails */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-gold-500 uppercase tracking-wider block">
                        {language === "it" ? "Galleria Fotografica" : "Project Photo Gallery"}
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {/* 1st thumbnail: Main project mockup image */}
                        <button
                          onClick={() => setActiveModalImage(selectedProject.imageUrl)}
                          className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${
                            (activeModalImage === selectedProject.imageUrl || !activeModalImage)
                              ? "border-gold-500 ring-1 ring-gold-500/50 scale-[1.03]"
                              : "border-zinc-900 hover:border-zinc-700 hover:scale-[1.02]"
                          }`}
                        >
                          <img
                            src={selectedProject.imageUrl}
                            srcSet={getSrcSet(selectedProject.imageUrl)}
                            sizes="150px"
                            alt="Mockup Thumbnail"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                        
                        {/* Next thumbnails from getProjectGallery */}
                        {getProjectGallery(selectedProject.id).map((imgUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModalImage(imgUrl)}
                            className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${
                              activeModalImage === imgUrl
                                ? "border-gold-500 ring-1 ring-gold-500/50 scale-[1.03]"
                                : "border-zinc-900 hover:border-zinc-700 hover:scale-[1.02]"
                            }`}
                          >
                            <img
                              src={imgUrl}
                              srcSet={getSrcSet(imgUrl)}
                              sizes="150px"
                              alt={`Gallery Thumbnail ${idx + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Objectives */}
                    <div className="p-4 bg-[#0a0a0c] border border-zinc-900 rounded-2xl text-left space-y-3">
                      <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        {language === "it" ? "Obiettivi del Progetto" : "Project Objectives"}
                      </span>
                      <ul className="space-y-2">
                        {getProjectObjectives(selectedProject.id).map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300 font-light leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-1.5" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metadata boxes */}
                    <div className="space-y-2.5">
                      <div className="p-3 bg-[#0d0d10] border border-zinc-900 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Tempo di sviluppo</span>
                        <span className="text-xs font-bold text-gold-400 font-mono">
                          {selectedProject.id === "beauty" || selectedProject.id === "hotel" || selectedProject.id === "fitness" ? "3 Settimane" : selectedProject.id === "restaurant" ? "2 Settimane" : "4 Settimane"}
                        </span>
                      </div>
                      <div className="p-3 bg-[#0d0d10] border border-zinc-900 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          {selectedProject.isDemo ? (language === "it" ? "Tipo di Progetto" : "Project Type") : "Garanzia Svizzera"}
                        </span>
                        {selectedProject.isDemo ? (
                          <span className="text-xs font-bold text-gold-400 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> {language === "it" ? "Progetto Demo" : "Demo Project"}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% DSG
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge info */}
                  <div className="p-4 bg-gold-500/5 border border-gold-500/10 rounded-2xl space-y-1 text-left hidden md:block">
                    <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest block">PIXELFORGE QUALITY</span>
                    <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                      Ogni progetto è studiato nei minimi dettagli con codice pulito, ottimizzazione SEO svizzera e web-vitals score massimo.
                    </p>
                  </div>
                </div>

                {/* Right Column: Case Study Article Content (Col-7) */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  
                  {/* Main Header & Article Text */}
                  <div className="space-y-5 text-left">
                    <div>
                      <span className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[9px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                        Case Study: {selectedProject.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-2.5 leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <div className="border-t border-zinc-900 pt-4">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                        {language === "it" ? "La Storia del Successo" : "The Success Story"}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                        {getProjectArticleInItalian(selectedProject.id, selectedProject.title, selectedProject.category, selectedProject.location)}
                      </p>
                    </div>

                    {/* Technologies Used */}
                    <div className="space-y-2.5 pt-3 border-t border-zinc-900">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        {language === "it" ? "Tecnologie d'Avanguardia" : "Cutting-Edge Technologies"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getProjectTechnologies(selectedProject.id).map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 bg-[#0a0a0c] border border-zinc-900 rounded-lg text-[10px] font-mono text-zinc-400 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results Achieved */}
                    <div className="space-y-2.5 pt-3 border-t border-zinc-900">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {language === "it" ? "Risultati Concreti Ottenuti" : "Concrete Results Achieved"}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {getProjectResults(selectedProject.id).map((res, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl">
                            <span className="text-xs font-bold text-emerald-400 font-mono shrink-0 mt-0.5">✓</span>
                            <span className="text-[11px] text-zinc-300 font-sans leading-relaxed">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services Included */}
                    <div className="space-y-2.5 pt-3 border-t border-zinc-900">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        Servizi inclusi nel progetto
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(selectedProject.id === "beauty" 
                          ? ["UI/UX Custom Design", "Sviluppo React & Tailwind", "Ottimizzazione SEO locale", "Sistema di Prenotazione"]
                          : selectedProject.id === "dental"
                          ? ["UI/UX Design Medico", "Sviluppo Web Conforme DSG", "Integrazione FAQ Strutturata", "Modulo Richiesta Appuntamenti"]
                          : selectedProject.id === "restaurant"
                          ? ["UI/UX Mobile-First Design", "Sviluppo Web App Fast-Load", "Menu Digitale QR-Code", "Sistema Prenotazione Tavoli"]
                          : selectedProject.id === "hotel"
                          ? ["UI/UX Premium Design", "Landing Page ad Alta Conversione", "Integrazione Booking Engine", "Tour Virtuale Area SPA"]
                          : selectedProject.id === "construction"
                          ? ["UI/UX Corporate Design", "Portfolio Lavori Filtrabile", "Sistema Preventivi Online", "SEO & Copywriting Svizzero"]
                          : selectedProject.id === "medical"
                          ? ["UI/UX Design Moderno", "Prenotazione Online Appuntamenti", "Galleria Fotografica Salone", "Integrazione WhatsApp"]
                          : selectedProject.id === "realestate"
                          ? ["UI/UX Premium Real Estate", "Ottimizzazione Media 4K", "Filtri Ricerca Immobili", "Calcolatore Ipoteche Integrato"]
                          : selectedProject.id === "winery"
                          ? ["UI/UX Design Tecnico", "Modulo Richiesta Sopralluogo", "Galleria Lavori Realizzati", "Presentazione Servizi Copertura"]
                          : selectedProject.id === "architect"
                          ? ["UI/UX Minimalista 4K", "Sviluppo React Ultra-veloce", "Ottimizzazione Render 3D", "Sezione Case Studies"]
                          : selectedProject.id === "lawfirm"
                          ? ["UI/UX Portale Istituzionale", "Canale Contatto Crittografato", "Ottimizzazione SEO Avvocati", "Conformità DSG Svizzera"]
                          : selectedProject.id === "consulting"
                          ? ["UI/UX Bento Layout", "Visualizzazioni Dati Recharts", "Modulo Candidatura Audit", "Sviluppo Piattaforma CEO"]
                          : ["UI/UX High-Energy Design", "Piattaforma Web Dinamica", "Prenotazione Corsi Live", "Integrazione Pagamenti Stripe"]
                        ).map((srv, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#0c0c0e] border border-zinc-900 p-2 rounded-xl">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                            <span className="text-[11px] text-zinc-300 font-medium font-sans">{srv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        handleScrollToContact();
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-gold-500 to-amber-500 text-dark-bg font-extrabold text-xs rounded-xl uppercase tracking-wider shadow-lg shadow-gold-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                    >
                      <span>{language === "it" ? "Richiedi un preventivo" : "Request a Quote"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center"
                    >
                      {language === "it" ? "Torna al Portfolio" : "Back to Portfolio"}
                    </button>
                  </div>

                </div>

              </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
