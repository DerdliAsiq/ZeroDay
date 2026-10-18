export type PythonLesson = {
  no: number;
  title: string;
  focus: string;
  bullets: string[];
};

export const PYTHON_META = {
  title: "Python Proqramlaşdırma Dili Əsasları",
  term: "12 həftəlik proqram | 1 dərs/həftə",
  schedule: "Həftənin 1-ci günü",
  mentor: "Təlimçi / Mentor: Aytac Cəlil",
  intro:
    "Python proqramlaşdırma dilinin əsaslarını, dəyişənlərdən funksiyalara, siyahılardan hazır kitabxanalarına qədər 12 dərsdə öyrən. Nəzəriyyə + interaktiv praktika (Canlı tətbiq) formatında.",
};

export const PYTHON_LESSONS: PythonLesson[] = [
  {
    no: 1,
    title: "Python proqramlaşdırma dili, üstünlükləri və print() funksiyası",
    focus: "Proqramlaşdırma, IDE, String, print()",
    bullets: [
      "Proqramlaşdırmaya giriş və Python dilinin yaranma tarixi.",
      "Python-un digər dillərdən fərqli və üstün cəhətləri (sintaksis sadəliyi, oxunabilirlik).",
      "İş mühitinin (IDE/Compiler: Thonny, Pydroid 3) tanınması və sazlanması.",
      "Mətn tipləri (String) və ilk funksiyamız: print() üzərində canlı praktika.",
    ],
  },
  {
    no: 2,
    title: "Dəyişənlər (Variables) və İstifadəçi ilə Dialoq (input() funksiyası)",
    focus: "Variables, input(), Formatlaşdırma",
    bullets: [
      "Dəyişənlər anlayışı: Məlumatların yaddaşda saxlanması və adlandırılması qaydaları.",
      "input() funksiyası vasitəsilə istifadəçidən məlumatların alınması.",
      "Mətn formatlaşdırılması və verilənlerin print() daxilində birləşdirilməsi.",
      "Praktika: İstifadəçinin adını soruşub fərdiləşdirilmiş salamlaşma yazan interaktiv skript.",
    ],
  },
  {
    no: 3,
    title: "Əsas Verilən Tipləri (Data Types) və Tip Dönüşümləri (Type Casting)",
    focus: "int, float, str, bool, type(), Casting",
    bullets: [
      "Ədəd tipləri: Tam ədədlər (int) və Kəsr ədədlər (float).",
      "Mətn (str) və Məntiqi (bool) verilən tipləri.",
      "type() funksiyası ilə tiplərin təyini.",
      "Tip dönüşümləri: int(), str(), float() funksiyalarının tətbiqi.",
      "Praktika: Yaş hesablayan və ya sadə toplama əməliyyatı edən proqram.",
    ],
  },
  {
    no: 4,
    title: "Riyazi və Məntiqi Operatorlar (Operators)",
    focus: "Riyazi, Müqayisə, Məntiqi operatorlar",
    bullets: [
      "Riyazi operatorlar (+, -, *, /, //, %, **).",
      "Müqayisə operatorları (==, !=, >, <, >=, <=).",
      "Məntiqi operatorlar (and, or, not).",
      "Praktika: Sadə kalkulyator proqramının yazılması.",
    ],
  },
  {
    no: 5,
    title: "Şərt Operatorları I — if və else Strukturu",
    focus: "if/else, Indentation, Qərarvermə",
    bullets: [
      "Proqramda qərarvermə mexanizmləri.",
      "if və else bloklarının yazılış qaydaları (Tab / Indentation anlayışı).",
      "Praktika: İstifadəçinin daxil etdiyi rəqəmin müsbət/mənfi olduğunu və ya yaş həddini yoxlayan proqram.",
    ],
  },
  {
    no: 6,
    title: "Şərt Operatorları II — Multi-şərtlər (elif) və Mürəkkəb Qərarlar",
    focus: "elif, Mürəkkəb şərtlər, Qiymətləndirmə",
    bullets: [
      "Çoxşaxəli şərtlər zamanı elif blokunun tətbiqi.",
      "Məntiqi bağlayıcılarla mürəkkəb şərtlərin qurulması.",
      "Praktika: Tələbə balına uyğun olaraq qiymətləndirmə (A, B, C, D, F) sisteminin qurulması.",
    ],
  },
  {
    no: 7,
    title: "Təkrarlanan Proseslər I — while Dövrü",
    focus: "while, Sayğaclar, Sonsuz dövrü",
    bullets: [
      "Dövr (Loop) anlayışı və while operatorunun məntiqi.",
      "Dövrün idarə olunması: Sayğaclar (Counters) və şərtin yenilənməsi.",
      "Sonsuz dövrü (Infinite loop) xətası və ondan yayınma yolları.",
      "Praktika: Şifrə yoxlamaq və ya təkrar sorğu edən proqram.",
    ],
  },
  {
    no: 8,
    title: "Təkrarlanan Proseslər II — for Dövrü və range() Funksiyası",
    focus: "for, range(), break/continue",
    bullets: [
      "for dövrüünün işləmə prinsipi.",
      "range(start, stop, step) funksiyasının parametrləri və istifadəsi.",
      "Dövr idarəetmə operatorları: break və continue.",
      "Praktika: \"Ədədi tap\" interaktiv oyununun yazılması.",
    ],
  },
  {
    no: 9,
    title: "Siyahılar (Lists) və Metodlar",
    focus: "List, İndeks, Metodlar (append/pop/len)",
    bullets: [
      "Çoxlu məlumatlarla iş: Siyahı (list) nədir?",
      "Siyahı elementləri, indeksleşmə (0-dan başlayan indekslər) və mənfi indekslər.",
      "Əsas siyahı metodları: append(), remove(), pop(), len().",
      "Praktika: İnteraktiv \"To-Do List\" (Görüləcək işlər) tətbiqi.",
    ],
  },
  {
    no: 10,
    title: "Kodun Təkrarından Qaçış — Funksiyalar (def)",
    focus: "DRY, def, Parametrlər, return",
    bullets: [
      "Proqramlaşdırmada DRY (Don't Repeat Yourself) prinsipi.",
      "Funksiyanın təyin olunması (def) və çağırılması.",
      "Funksiyaya arqument və parametrlərin ötürülməsi, return ifadəsi.",
      "Praktika: Riyazi əməliyyatları funksiyalarla qruplaşdırmaq.",
    ],
  },
  {
    no: 11,
    title: "Hazır Kitabxanalar (random və math)",
    focus: "import, math, random, Oyun",
    bullets: [
      "Python-da hazır modulların qoşulması (import).",
      "math modulunun funksiyaları (kökaltı, yuvarlaqlaşdırma).",
      "random modulu ilə təsadüfi ədədlər və seçimlər etmək.",
      "Praktika: \"Daş-Qayçı-Kağız\" oyunu.",
    ],
  },
  {
    no: 12,
    title: "Yekun Layihə Müdafiəsi və Qiymətləndirmə",
    focus: "Yekun layihə, Təqdimat, Sertifikat",
    bullets: [
      "Kurs ərzində öyrənilənlərin ümumiləşdirilməsi və təkrarlanması.",
      "Tələbələrin fərdi və ya komanda şəklində hazırladıqları yekun konsol oyununun/tətbiqinin canlı təqdimatı.",
      "Geri bildirim (Feedback) və sertifikatların təqdim olunması.",
    ],
  },
];
