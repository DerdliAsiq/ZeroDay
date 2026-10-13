export type MLSection = {
  subtitle?: string;
  points: string[];
};

export type MLModule = {
  index: string;
  tag: string;
  title: string;
  focus: string;
  sections: MLSection[];
};

export const ML_META = {
  title: "Tətbiqi Riyaziyyat və Maşın Öyrənməsi",
  term: "DSCTP#2 | 16 həftəlik intensiv proqram",
  schedule: "Həftənin 2-ci və ya 4-cü günləri",
  source: "Proqram: DSCTP#2 — Samir T. Mammadov",
  intro:
    "Məlumat elminin əsasları, Python proqramlaşdırması, kəşfiyyat xarakterli məlumat təhlili, vizuallaşdırma və maşın öyrənməsi üzrə praktikaya yönəlmiş 16 həftəlik proqram: 12 həftə tədris və praktika, 3 həftə kurs layihəsi, 1 həftə yekun təqdimat.",
};

export const ML_MODULES: MLModule[] = [
  {
    index: "01",
    tag: "MODUL 1",
    title: "Məlumat elminə giriş",
    focus: "Məlumat, EDA, Vizuallaşdırmaya giriş",
    sections: [
      {
        points: [
          "Məlumat nədir? Məlumatların növləri və mənbələri.",
          "Strukturlaşdırılmış və strukturlaşdırılmamış məlumatlar.",
          "Məlumat elmi nədir? Tətbiq sahələri və iş axını.",
          "Kəşfiyyat xarakterli məlumat təhlilinə və vizuallaşdırmaya giriş.",
        ],
      },
    ],
  },
  {
    index: "02",
    tag: "MODUL 2",
    title: "Python proqramlaşdırması",
    focus: "Sintaksis, Strukturlar, Funksiyalar",
    sections: [
      {
        points: [
          "Python-a giriş və proqramlaşdırma mühitləri.",
          "Dəyişənlər, əsas məlumat tipləri, operatorlar və ifadələr.",
          "Siyahılar, kortejlər, lüğətlər və çoxluqlar.",
          "Şərt operatorları, dövrlər, sətirlər üzərində əməliyyatlar.",
          "Funksiyalar, modulların idxalı, əsas xəta emalı.",
          "Təkrar istifadə oluna bilən və oxunaqlı kodun yazılması.",
        ],
      },
    ],
  },
  {
    index: "03",
    tag: "MODUL 3",
    title: "NumPy ilə ədədi hesablamalar",
    focus: "Massivlər, Vektorlaşdırma",
    sections: [
      {
        points: [
          "NumPy massivləri: yaradılma, xüsusiyyətlər, indeksləmə və dilimləmə.",
          "Vektorlaşdırılmış hesablamalar, riyazi və statistik əməliyyatlar.",
          "Formanın dəyişdirilməsi, birləşdirilmə, məntiqi filtrləmə.",
          "Çatışmayan və etibarsız qiymətlərin emalı.",
        ],
      },
    ],
  },
  {
    index: "04",
    tag: "MODUL 4",
    title: "Pandas ilə məlumatların manipulyasiyası",
    focus: "DataFrame, Təmizləmə, Aqreqasiya",
    sections: [
      {
        points: [
          "Series və DataFrame-lər, fayl formatlarından idxal, yoxlanılma.",
          "Seçilmə, filtrləmə, sütunların yaradılması, sıralama və indeksləmə.",
          "Çatışmayan qiymətlər, təkrarlanan qeydlər, tip çevrilməsi.",
          "Sətir və tarix-vaxt əməliyyatları, qruplaşdırma və aqreqasiya.",
          "Məlumat dəstlərinin birləşdirilməsi, pivot cədvəlləri, təmizlənmə.",
        ],
      },
    ],
  },
  {
    index: "05",
    tag: "MODUL 5",
    title: "Kəşfiyyat xarakterli təhlil və vizuallaşdırma",
    focus: "Statistika, Qrafiklər",
    sections: [
      {
        points: [
          "Paylanmalar, xülasə statistikaları, mərkəzi meyl və dəyişkənlik.",
          "Kənar müşahidələr, korrelyasiya və assosiasiya.",
          "Bir, iki və çoxdəyişənli təhlil.",
          "Effektiv vizuallaşdırma prinsipləri, Python ilə qrafiklər.",
          "Nəticələrin qrafik və mətnlə çatdırılması.",
        ],
      },
    ],
  },
  {
    index: "06",
    tag: "MODUL 6",
    title: "Maşın öyrənməsinə giriş",
    focus: "Növlər, Overfitting, Həyat dövrü",
    sections: [
      {
        points: [
          "Maşın öyrənməsi nədir? Ənənəvi proqramlaşdırma ilə müqayisə.",
          "Növləri: əlamətlər, hədəflər, təlim/validasiya/test dəstləri.",
          "Ümumiləşdirmə, natamam və həddindən artıq öyrənmə.",
          "Qərəz–dispersiya kompromisi, məlumat sızması.",
          "Layihənin həyat dövrünə giriş.",
        ],
      },
    ],
  },
  {
    index: "07",
    tag: "MODUL 7",
    title: "Nəzarətli öyrənmə",
    focus: "Reqressiya, Təsnifat, Ensembl",
    sections: [
      {
        subtitle: "Xətti reqressiya",
        points: [
          "Sadə və çoxdəyişənli reqressiya, əmsalların şərhi, fərziyyələr.",
          "Metrikalar: MAE, MSE, RMSE, determinasiya əmsalı (R²).",
        ],
      },
      {
        subtitle: "Logistik reqressiya və metriklər",
        points: [
          "İkili təsnifat, ehtimallar, təsnifat hədləri.",
          "Qarışıqlıq matrisi, Accuracy, Precision, Recall, F1, ROC/AUC.",
          "Siniflərin balanssızlığı və metrika seçimi.",
        ],
      },
      {
        subtitle: "Qərar ağacları və ensembl",
        points: [
          "Bölünmə meyarları: entropiya, Gini, informasiya qazancı.",
          "Dərinlik, budama, reqressiya və təsnifatda tətbiq.",
          "Bagging, təsadüfi meşələr, boosting, səsvermə.",
        ],
      },
    ],
  },
  {
    index: "08",
    tag: "MODUL 8",
    title: "Nəzarətsiz öyrənmə",
    focus: "Klasterləşdirmə, PCA",
    sections: [
      {
        subtitle: "Klasterləşdirmə",
        points: [
          "K-means, klaster sayının seçimi, dirsək və siluet metodu.",
          "İyerarxik və sıxlığa əsaslanan klasterləşdirmə.",
        ],
      },
      {
        subtitle: "Ölçülərin azaldılması",
        points: [
          "PCA, izah olunan dispersiya, komponent sayının seçimi.",
          "Yüksəkölçülü məlumatların vizuallaşdırılması.",
        ],
      },
    ],
  },
  {
    index: "09",
    tag: "MODUL 9",
    title: "Scikit-learn ilə maşın öyrənməsi",
    focus: "Pipeline, Validasiya, Tuning",
    sections: [
      {
        points: [
          "Estimatorlar, təlim-test bölgüsü, proqnoz və qiymətləndirmə.",
          "Miqyaslandırma, kodlaşdırma, pipeline-lar (conveyor).",
          "Çarpaz validasiya, hiperparametrlərin sazlanması.",
          "Modellərin müqayisəsi, saxlanması və yenidən istifadəsi.",
        ],
      },
    ],
  },
];

export const ML_GRADING: { component: string; weight: string }[] = [
  { component: "Davamiyyət və iştirak", weight: "10%" },
  { component: "Qısa testlər (4 testdən ən yaxşı 3-ü)", weight: "15%" },
  { component: "Python tapşırığı", weight: "15%" },
  { component: "Kaggle müsabiqəsi", weight: "30%" },
  { component: "Kurs layihəsi", weight: "30%" },
];

export const ML_TECH: string[] = [
  "Python",
  "Jupyter",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "Scikit-learn",
  "Kaggle",
];

export const ML_RULES: string[] = [
  "Davamiyyət: bütün sessiyalarda iştirak gözlənilir, buraxılan materiala görə iştirakçı məsuliyyət daşıyır.",
  "Gec təhvil: son tarixdən sonra təqdimata cərimə tətbiq oluna bilər.",
  "Akademik dürüstlük: köçürmə və mənbəsiz istifadəyə icazə yoxdur, süni intellekt istifadəsi açıqlanmalıdır.",
  "Sertifikat: minimum davamiyyət + testlər + Kaggle həlli + kurs layihəsi + yekun təqdimat.",
];
