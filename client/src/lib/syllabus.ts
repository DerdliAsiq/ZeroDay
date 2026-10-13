export type Lesson = {
  no: number;
  date: string;
  dateISO: string;
  title: string;
  focus: string;
  bullets: string[];
};

export type Module = {
  index: string;
  tag: string;
  title: string;
  lessons: Lesson[];
};

export const SYLLABUS_META = {
  title: "Tədris Proqramı",
  term: "Sentyabr – Dekabr 2026 | 15 həftəlik təlim proqramı",
  schedule: "Hər həftənin 3-cü günü (çərşənbə) — 23 sentyabr 2026 → 30 dekabr 2026",
  intro:
    "Bu tədris proqramı 23 sentyabr 2026 – 30 dekabr 2026 tarixləri arasında hər həftənin 3-cü günü (çərşənbə) keçiriləcək 15 dərs üçün sıfırdan başlayan mütənasib mövzu bölgüsünü əhatə edir.",
};

export const SYLLABUS: Module[] = [
  {
    index: "01",
    tag: "MODUL 1",
    title: "Kibertəhlükəsizliyin Əsasları və Sosial Mühəndislik",
    lessons: [
      {
        no: 1,
        date: "23 Sentyabr 2026",
        dateISO: "2026-09-23",
        title: "Kibertəhlükəsizliyə Giriş və Təməl Anlayışlar",
        focus: "CIA Üçbucağı və Rəqəmsal İz",
        bullets: [
          "Kibertəhlükəsizlik nədir? Məlumat təhlükəsizliyinin əhəmiyyəti.",
          "CIA üçbucağı (Məxfilik, Bütövlük, Əlçatanlıq) və praktiki tətbiqi.",
          "Rəqəmsal iz (Digital Footprint) və onlayn təhlükəsizlik qaydaları.",
        ],
      },
      {
        no: 2,
        date: "30 Sentyabr 2026",
        dateISO: "2026-09-30",
        title: "Autentifikasiya, Parol Təhlükəsizliyi və Etika",
        focus: "MFA, Parol İdarəetməsi, Etik Hakerlik",
        bullets: [
          "Parolların düzgün idarə edilməsi və Çoxfaktorlu Autentifikasiya (MFA).",
          "Etik Hakerlik (White-hat) və kibercinayətkarlıq arasındakı hüquqi/etik fərqlər.",
          "Təhlükəsizlik mütəxəssisinin məsuliyyətləri.",
        ],
      },
      {
        no: 3,
        date: "7 Oktyabr 2026",
        dateISO: "2026-10-07",
        title: "Sosial Mühəndislik və Fişinq Hücumları",
        focus: "Phishing, Vishing və Baiting",
        bullets: [
          "Sosial Mühəndislik (Social Engineering) nədir?",
          "Phishing (Fişinq), Vishing və Baiting hücumlarının anatomiyası.",
          "Sosial mühəndislik hücumlarını tanımaq üzrə praktiki nümunələr.",
        ],
      },
    ],
  },
  {
    index: "02",
    tag: "MODUL 2",
    title: "Şəbəkə Təhlükəsizliyi və Trafik Analizi",
    lessons: [
      {
        no: 4,
        date: "14 Oktyabr 2026",
        dateISO: "2026-10-14",
        title: "Şəbəkə Təhlükəsizliyinin Əsasları (Network Basics)",
        focus: "OSI/TCP-IP Modelləri, IP və MAC",
        bullets: [
          "Şəbəkələrə giriş (LAN, WAN, Router, Switch).",
          "OSI və TCP/IP modellərinin quruluşu.",
          "IP və MAC ünvanları, cihazların bir-biri ilə əlaqəsi.",
        ],
      },
      {
        no: 5,
        date: "21 Oktyabr 2026",
        dateISO: "2026-10-21",
        title: "Əsas Şəbəkə və Veb Protokolları",
        focus: "TCP/UDP, HTTP/HTTPS, DNS, Portlar",
        bullets: [
          "Əsas şəbəkə protokolları (TCP və UDP).",
          "Veb protokollar (HTTP/HTTPS, DNS, DHCP).",
          "Məlumat paketlərinin hərəkəti (Packet flow) və portlar.",
        ],
      },
      {
        no: 6,
        date: "28 Oktyabr 2026",
        dateISO: "2026-10-28",
        title: "Şəbəkə Hücumları və Trafik Analizi (Wireshark)",
        focus: "MitM, DDoS, Wireshark Praktikası",
        bullets: [
          "Şəbəkə hücumları: Man-in-the-Middle (MitM) və Spoofing.",
          "DoS və DDoS hücumları necə işləyir?",
          "Wireshark alətinə giriş: şəbəkə trafikini izləmək (Praktika).",
        ],
      },
      {
        no: 7,
        date: "4 Noyabr 2026",
        dateISO: "2026-11-04",
        title: "Şəbəkə Müdafiəsi (Firewall, VPN, IDS/IPS)",
        focus: "Firewall, VPN, IDS/IPS Sistemləri",
        bullets: [
          "Şəbəkə müdafiəsi: Firewall (Qoruyucu divar) konfiqurasiyası.",
          "VPN (Virtual Private Network) və şifrələnmiş tunellər.",
          "IDS və IPS sistemləri (Aşkarlama və qarşısının alınması).",
        ],
      },
    ],
  },
  {
    index: "03",
    tag: "MODUL 3",
    title: "Linux Əməliyyat Sistemi və Sistem İdarəetməsi",
    lessons: [
      {
        no: 8,
        date: "11 Noyabr 2026",
        dateISO: "2026-11-11",
        title: "Linux Əməliyyat Sisteminə Giriş və Terminal",
        focus: "Linux Terminalı və Təməl Əmrlər",
        bullets: [
          "Linux əməliyyat sisteminə giriş və quraşdırılma metodları.",
          "Linux Terminalı ilə tanışlıq və təməl Bash əmrləri (ls, cd, pwd).",
          "Fayl və qovluq naviqasiyası, mətn fayllarının oxunması (cat, grep).",
        ],
      },
      {
        no: 9,
        date: "18 Noyabr 2026",
        dateISO: "2026-11-18",
        title: "Linux-da İcazələr və Proseslərin İdarə Edilməsi",
        focus: "Kullanıcı İdarəsi, chmod, chown, Proseslər",
        bullets: [
          "Linux-da istifadəçi və qrup idarəetməsi.",
          "Fayl icazələri və təhlükəsizliyi (chmod, chown).",
          "Proseslərin idarə edilməsi və şəbəkə əmrləri (ps, top, ping, netstat).",
        ],
      },
    ],
  },
  {
    index: "04",
    tag: "MODUL 4",
    title: "Verilənlər Bazası və Veb Zəiflikləri",
    lessons: [
      {
        no: 10,
        date: "25 Noyabr 2026",
        dateISO: "2026-11-25",
        title: "Veb Təhlükəsizliyi və Təməl Zəifliklər (XSS, CSRF)",
        focus: "OWASP Top 10, XSS, CSRF Əsasları",
        bullets: [
          "Veb tətbiq təhlükəsizliyinə giriş və OWASP Top 10 konsepsiyası.",
          "Cross-Site Scripting (XSS) hücumları: Reflected, Stored və DOM-based XSS.",
          "Cross-Site Request Forgery (CSRF) zəifliyi və qorunma mexanizmləri.",
        ],
      },
      {
        no: 11,
        date: "2 Dekabr 2026",
        dateISO: "2026-12-02",
        title: "Qabaqcıl Veb Zəiflikləri və SQL İnjeksion (SQLi)",
        focus: "SQLi, IDOR və Təhlükəsiz Test",
        bullets: [
          "SQL İnjeksion (SQLi) hücumlarının işləmə prinsipi və növləri.",
          "İcazəsiz Məlumata Çıxış (IDOR) və digər məntiqi veb zəiflikləri.",
          "Veb zəifliklərindən qorunma, təhlükəsiz kodlama və praktiki mini-laboratoriya.",
        ],
      },
    ],
  },
  {
    index: "05",
    tag: "MODUL 5",
    title: "Təhdidlər, Kriptoqrafiya və Avtomatlaşdırma",
    lessons: [
      {
        no: 12,
        date: "9 Dekabr 2026",
        dateISO: "2026-12-09",
        title: "Zərərli Proqramlar (Malware) və Təhdid Modelləri",
        focus: "Malware Növləri, AAA Modeli",
        bullets: [
          "Malware nədir? Virus, Trojan, Worm, Ransomware və Spyware fərqləri.",
          "Təhdidlərin modelləşdirilməsi və risk qiymətləndirməsi.",
          "AAA modeli (Authentication, Authorization, Accounting).",
        ],
      },
      {
        no: 13,
        date: "16 Dekabr 2026",
        dateISO: "2026-12-16",
        title: "Kriptoqrafiya və Şifrələmə Metodları",
        focus: "Şifrələmə, Hashing, Zero Trust",
        bullets: [
          "Kriptoqrafiyaya giriş, Simmetrik və Asimmetrik şifrələmə.",
          "Hashing (MD5, SHA-256) alqoritmləri və məlumatın bütövlüyü.",
          "Rəqəmsal sertifikatlar, PKI və Sıfır Güvən (Zero Trust) arxitekturası.",
        ],
      },
      {
        no: 14,
        date: "23 Dekabr 2026",
        dateISO: "2026-12-23",
        title: "Python ilə Kibertəhlükəsizlikdə Avtomatlaşdırma",
        focus: "Təhlükəsizlik Skriptlərinin Yazılması",
        bullets: [
          "Python proqramlaşdırmasına giriş: Dəyişənlər, məlumat tipləri.",
          "Şərtlər (If/Else), Dövrlər (For/While) və Funksiyalar.",
          "Şəbəkə/təhlükəsizlik tapşırıqları üçün sadə skriptlərin yazılması.",
        ],
      },
    ],
  },
  {
    index: "06",
    tag: "MODUL 6",
    title: "Yekun Qiymətləndirmə",
    lessons: [
      {
        no: 15,
        date: "30 Dekabr 2026",
        dateISO: "2026-12-30",
        title: "Yekun Qiymətləndirmə, CTF və Praktikum",
        focus: "Mini-CTF Yarışması və Təkrar",
        bullets: [
          "Keçirilmiş mövzular üzrə biliklərin ümumi təkrarı.",
          "Daxili mini-CTF (Capture The Flag) yarışması və praktiki laboratoriya qiymətləndirilməsi.",
          "Semestrin yekunlaşdırılması və rəylər.",
        ],
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = SYLLABUS.flatMap((m) => m.lessons);

/** Bugünkü tarixə görə dərs statusu: keçirilib / növbəti / qarşıdadır. */
export function lessonStatus(dateISO: string, nextISO: string | null): "done" | "next" | "todo" {
  if (nextISO === null || dateISO < nextISO) return "done";
  if (dateISO === nextISO) return "next";
  return "todo";
}

export function nextLessonISO(todayISO = new Date().toISOString().slice(0, 10)): string | null {
  const upcoming = ALL_LESSONS.find((l) => l.dateISO >= todayISO);
  return upcoming ? upcoming.dateISO : null;
}
