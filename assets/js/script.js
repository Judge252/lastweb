"use strict";

const SUPPORTED_LANGUAGES = Object.freeze(["ar", "en", "he"]);
const LANGUAGE_STORAGE_KEY = "clinic-language";

const LANGUAGE_DIRECTIONS = Object.freeze({
  ar: "rtl",
  en: "ltr",
  he: "rtl",
});

const LANGUAGE_NAMES = Object.freeze({
  ar: "العربية",
  en: "English",
  he: "עברית",
});

const translations = {
  ar: {
    seo: {
      title: "مركز طبي متخصص للمفاصل والعضلات والأعصاب والحركة",
      description:
        "مركز طبي متخصص بمشاكل المفاصل والعضلات والأعصاب والحركة، يقدم استشارات طبية وعلاجاً وتأهيلاً متخصصاً في فرعي طرعان والرملة.",
    },

    common: {
      bookNow: "احجز الآن",
    },

    language: {
      selectorLabel: "اختيار اللغة",
      closeMenuLabel: "إغلاق قائمة اللغات",
    },

    accessibility: {
      mainNavigation: "القائمة الرئيسية",
      backHome: "العودة للرئيسية",
      clinicLogo: "شعار العيادة",
      bookWhatsApp: "احجز الآن عبر واتساب",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      quickBooking: "زر حجز سريع",
    },

    nav: {
      home: "الرئيسية",
      services: "الخدمات العلاجية",
      team: "الفريق الطبي",
      booking: "الحجز",
      contact: "تواصل معنا",
    },

    hero: {
      kicker: "علاج وتأهيل طبي متخصص",
      titlePrimary: "مركز طبي متخصص",
      titleHighlight: "بمشاكل المفاصل والعضلات",
      titleSecondary: "ومشاكل الأعصاب والحركة",
      servicesButton: "استعرض الخدمات",

      images: {
        session: "جلسة علاج وتأهيل طبي داخل العيادة",
        equipment: "معدات مستخدمة في العلاج الطبيعي والتأهيل",
        team: "فريق طبي داخل مركز العلاج والتأهيل",
      },
    },

    services: {
      eyebrow: "الخدمات العلاجية",
      heading: "رعاية متخصصة لمشاكل المفاصل والعضلات",
      description:
        "خدمات طبية وعلاجية وتأهيلية لمشاكل الأعصاب والحركة وفق احتياجات كل حالة.",

      items: {
        consultation: {
          title: "استشارة طبيب متخصص",
          description: "طبيب عظام، طبيب مفاصل، طبيب أعصاب.",
        },

        spine: {
          title: "علاج مشاكل العامود الفقري",
          description: "مشاكل الرقبة، الظهر العلوي والسفلي.",
        },

        joints: {
          title: "علاج مشاكل المفاصل",
          description: "مشاكل الركب، مشاكل الكتف وغيرها.",
        },

        postSurgery: {
          title: "علاج بعد الإصابات والعمليات الجراحية",
          description: "علاج وتأهيل بعد الإصابات والعمليات الجراحية.",
        },

        neuroBalance: {
          title: "علاج المشاكل العصبية والحركية ومشاكل التوازن",
          description:
            "علاج وتأهيل المشاكل العصبية والحركية ومشاكل التوازن.",
        },

        dizziness: {
          title: "علاج الدوخة",
          description: "تقييم وعلاج مشاكل الدوخة والتوازن.",
        },

        cardiorespiratory: {
          title: "علاج المشاكل القلبية التنفسية",
          description: "علاج وتأهيل المشاكل القلبية والتنفسية.",
        },

        massage: {
          title: "مساج طبي",
          description: "جلسات مساج طبي وفق احتياجات الحالة.",
        },

        cupping: {
          title: "حجامة طبية",
          description: "جلسات حجامة طبية يقدمها معالجون مختصون.",
        },
      },
    },

    team: {
      eyebrow: "الفريق الطبي",
      heading: "فريق طبي وعلاجي متكامل",
      description:
        "تعرّف على أعضاء الفريق واضغط على زر التفاصيل لعرض مجالات التخصص والخدمات المتاحة.",
      swipeHint: "اسحب للتعرّف على باقي الفريق",
      showDetails: "عرض التفاصيل",
      hideDetails: "إخفاء التفاصيل",
      showDetailsFor: "عرض تفاصيل {{name}}",
      hideDetailsFor: "إخفاء تفاصيل {{name}}",
      closeDetails: "إغلاق التفاصيل",
      memberFallback: "عضو الفريق",
      memberOf: "عضو الفريق {{current}} من {{total}}",
      avatarOf: "صورة {{name}}",
      fallbackAvatarOf: "صورة بديلة لـ{{name}}",

      labels: {
        position: "المنصب",
        specialties: "مجالات التخصص",
        additionalServices: "خدمات إضافية",
        experience: "الخبرة",
        education: "التعليم",
        services: "الخدمات",
      },

      carousel: {
        navigationLabel: "تنقل أعضاء الفريق الطبي",
        previous: "عضو الفريق السابق",
        next: "عضو الفريق التالي",
      },

      members: {
        salem: {
          name: "سالم محيليه",
          role: "أخصائي علاج طبيعي – فيزيوتربيا",
          position: "مؤسس ومدير المركز",
          specialties:
            "مختص بعلاج مشاكل المفاصل والعامود الفقري، وإعادة التأهيل بعد المشاكل العصبية والعمليات الجراحية.",
          additionalServices: "علاج الرياضيين وعلاج الدوخة.",
        },

        mohamedAdawi: {
          name: "البروفيسور محمد عدوي",
          role: "طبيب عام وباطنية – أخصائي روماتزم ومفاصل",
          experience: "خبرة أكثر من 35 سنة.",
        },

        fatima: {
          name: "الدكتورة فاطمه محيليه",
          role: "طبيبة أعصاب مختصة",
          specialties: "مشاكل الأعصاب، وباركنسون ومشاكل الحركة.",
          education: "خريجة جامعة هامبورغ – ألمانيا.",
        },

        raafat: {
          name: "رأفت حبيب الله",
          role: "أخصائي علاج طبيعي – فيزيوتربيا",
          specialties: "مختص بعلاج مشاكل الفك والدوخة.",
          additionalServices: "علاج وإعادة تأهيل بيتي.",
        },

        tamer: {
          name: "تامر أبو زهره",
          role: "أخصائي علاج طبيعي – فيزيوتربيا",
          position: "مدير عيادة الرملة.",
          specialties:
            "مختص بمشاكل المفاصل والعامود الفقري، وإعادة التأهيل بعد الإصابات والعمليات.",
          additionalServices: "علاج منزلي وغيره.",
        },

        ali: {
          name: "علي سويطي",
          role: "أخصائي علاج طبيعي – فيزيوتربيا",
          specialties:
            "علاج وإعادة تأهيل منزلي لمشاكل الحركة والأعصاب، وعلاج ما بعد العمليات الجراحية للمفاصل.",
        },

        mamoun: {
          name: "مأمون هريش",
          role: "أخصائي علاج طبيعي – فيزيوتربيا",
          specialties: "علاج الدوخة، وإعادة تأهيل الرياضيين.",
        },

        beshara: {
          name: "بشاره ادبيه",
          role: "معالج بالطب البديل",
          specialties: "مختص بالحجامة.",
          additionalServices: "المساج الطبي وغيره.",
        },

        marian: {
          name: "مريان عواوده",
          role: "معالجة للنساء – معالجة بالطب البديل",
          specialties: "مساج طبي، وحجامة طبية وغيره.",
        },

        mohamedGhanaim: {
          name: "محمد غنايم",
          role: "أخصائي أطراف صناعية معتمد",
          services: "ضبانات وأحذية طبية.",
        },
      },
    },

    whyUs: {
      eyebrow: "لماذا نحن؟",
      heading: "تجربة علاج مريحة وواضحة",

      features: {
        expertise: {
          title: "خبرة طبية متخصصة",
          description:
            "فريق من المعالجين ذوي الخبرة في العلاج الطبيعي وإعادة التأهيل.",
        },

        personalized: {
          title: "خطة لكل مريض",
          description:
            "نصمم خطة علاج مخصصة حسب احتياج الحالة وهدف المريض.",
        },

        modern: {
          title: "تقنيات حديثة",
          description:
            "استخدام أساليب علاجية مناسبة لتحسين الحركة وتقليل الألم.",
        },

        results: {
          title: "نتائج فعالة",
          description:
            "متابعة مستمرة لتحسين الأداء الحركي والوصول لأفضل نتيجة ممكنة.",
        },
      },
    },

    booking: {
      eyebrow: "احجز الآن",
      heading: "اختر الفرع واحجز عبر واتساب",
      description:
        "شاهد موقع كل فرع على الخريطة، ويمكنك طلب أقرب موعد متاح مباشرة.",
      whatsAppButton: "احجز عبر واتساب",
      openMaps: "فتح في خرائط جوجل",
    },

    branches: {
      turan: {
        label: "الفرع الأول",
        name: "فرع طرعان",
        address: "طرعان - شارع ابو بكر 13",
        mapTitle: "خريطة فرع طرعان",
        mapLabel: "خريطة موقع فرع طرعان في شارع ابو بكر 13",
        bookLabel: "احجز موعداً في فرع طرعان عبر واتساب",
        directionsLabel: "فتح موقع فرع طرعان في خرائط جوجل",
      },

      ramla: {
        label: "الفرع الثاني",
        name: "فرع اللد والرملة",
        address: "الرملة - شارع Dr Salk 25",
        mapTitle: "خريطة فرع اللد والرملة",
        mapLabel:
          "خريطة موقع فرع اللد والرملة في شارع Dr Salk 25 بالرملة",
        bookLabel: "احجز موعداً في فرع اللد والرملة عبر واتساب",
        directionsLabel: "فتح موقع فرع اللد والرملة في خرائط جوجل",
      },
    },

    testimonials: {
      sectionLabel: "آراء وتجارب المرضى",
      roleDescription: "عارض آراء العملاء",
      eyebrow: "آراء العملاء",
      heading: "تجارب مرضانا",
      swipeHint: "اسحب لقراءة المزيد من تجارب مرضانا",
      fiveStars: "تقييم 5 من 5",
      itemOf: "رأي العميل {{current}} من {{total}}",

      carousel: {
        navigationLabel: "تنقل آراء العملاء",
        previous: "عرض رأي العميل السابق",
        next: "عرض رأي العميل التالي",
      },

      items: {
        first: {
          alt: "عميل راض عن الخدمة",
          text: "تجربة رائعة، تحسن ألم الظهر لدي بشكل كبير بعد عدة جلسات. الفريق محترف جداً والخدمة ممتازة.",
          author: "محمد أحمد",
        },

        second: {
          alt: "عميلة راضية عن الخدمة",
          text: "علاج ممتاز لمشاكل الركبة. المعالجون متخصصون والنتائج واضحة من الجلسات الأولى.",
          author: "سارة محمود",
        },

        third: {
          alt: "عميل يوصي بالعيادة",
          text: "أفضل عيادة علاج طبيعي. ساعدوني في التعافي بعد العملية بسرعة وفعالية. أنصح بها بشدة.",
          author: "علي حسن",
        },
      },
    },

    contact: {
      eyebrow: "تواصل معنا",
      heading: "جاهزون لمساعدتك",
      phone: "الهاتف",
      whatsApp: "واتساب",
      branches: "الفروع",

      form: {
        nameLabel: "الاسم",
        namePlaceholder: "اكتب اسمك الكامل",
        phoneLabel: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك",
        messageLabel: "الرسالة",
        messagePlaceholder: "كيف يمكننا مساعدتك؟",
        submit: "إرسال عبر واتساب",
      },
    },

    footer: {
      description:
        "مركز طبي متخصص بمشاكل المفاصل والعضلات والأعصاب والحركة، يقدم استشارات طبية وخدمات علاج وتأهيل.",
      quickLinks: "روابط سريعة",
      bookAppointment: "احجز موعد",
      branches: "الفروع",
      followUs: "تابعنا",
      copyright: "العيادة. جميع الحقوق محفوظة.",
    },

    social: {
      facebook: "فيسبوك",
      instagram: "إنستغرام",
      whatsApp: "واتساب",
    },

    whatsAppMessages: {
      bookingGreeting: "مرحباً، أريد حجز موعد في العيادة.",
      branch: "الفرع: {{branch}}",
      bookingRequest: "يرجى إرسال أقرب موعد متاح، شكراً.",
      contactGreeting: "مرحباً، أريد التواصل مع العيادة.",
      name: "الاسم: {{name}}",
      phone: "رقم الهاتف: {{phone}}",
      message: "الرسالة:",
    },

    validation: {
      required: "يرجى ملء جميع الحقول قبل الإرسال.",
      invalidPhone: "يرجى إدخال رقم هاتف صحيح.",
    },

    errors: {
      incompleteBranch: "بيانات فرع الحجز غير مكتملة.",
    },
  },

  en: {
    seo: {
      title:
        "Specialized Medical Center for Joint, Muscle, Neurological and Mobility Care",
      description:
        "Specialized medical care for joint, muscle, neurological and mobility conditions, with expert consultations, treatment and rehabilitation at our Tur’an and Ramla branches.",
    },

    common: {
      bookNow: "Book now",
    },

    language: {
      selectorLabel: "Choose language",
      closeMenuLabel: "Close language menu",
    },

    accessibility: {
      mainNavigation: "Main navigation",
      backHome: "Back to home",
      clinicLogo: "Clinic logo",
      bookWhatsApp: "Book now via WhatsApp",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      quickBooking: "Quick booking",
    },

    nav: {
      home: "Home",
      services: "Treatments",
      team: "Medical team",
      booking: "Booking",
      contact: "Contact us",
    },

    hero: {
      kicker: "Specialized treatment and rehabilitation",
      titlePrimary: "A specialized medical center",
      titleHighlight: "for joint and muscle conditions",
      titleSecondary: "and neurological and mobility problems",
      servicesButton: "Explore our services",

      images: {
        session:
          "A medical treatment and rehabilitation session at the clinic",
        equipment: "Equipment used for physiotherapy and rehabilitation",
        team:
          "Medical team at the treatment and rehabilitation center",
      },
    },

    services: {
      eyebrow: "Treatments",
      heading: "Specialized care for joint and muscle conditions",
      description:
        "Medical treatment and rehabilitation for neurological and mobility conditions, tailored to each patient.",

      items: {
        consultation: {
          title: "Specialist physician consultation",
          description:
            "Orthopedic, rheumatology and neurology consultations.",
        },

        spine: {
          title: "Spine condition treatment",
          description:
            "Care for neck, upper-back and lower-back conditions.",
        },

        joints: {
          title: "Joint condition treatment",
          description:
            "Care for knee, shoulder and other joint conditions.",
        },

        postSurgery: {
          title: "Post-injury and post-surgical rehabilitation",
          description:
            "Treatment and rehabilitation following injuries and surgery.",
        },

        neuroBalance: {
          title:
            "Neurological, mobility and balance rehabilitation",
          description:
            "Treatment and rehabilitation for neurological, mobility and balance conditions.",
        },

        dizziness: {
          title: "Dizziness treatment",
          description:
            "Assessment and treatment of dizziness and balance problems.",
        },

        cardiorespiratory: {
          title: "Cardiorespiratory rehabilitation",
          description:
            "Treatment and rehabilitation for cardiac and respiratory conditions.",
        },

        massage: {
          title: "Medical massage",
          description:
            "Medical massage sessions tailored to the patient’s needs.",
        },

        cupping: {
          title: "Medical cupping",
          description:
            "Medical cupping sessions provided by qualified practitioners.",
        },
      },
    },

    team: {
      eyebrow: "Medical team",
      heading: "An integrated medical and therapy team",
      description:
        "Meet our team and select “Show details” to view each practitioner’s specialties and available services.",
      swipeHint: "Swipe to meet the rest of the team",
      showDetails: "Show details",
      hideDetails: "Hide details",
      showDetailsFor: "Show details for {{name}}",
      hideDetailsFor: "Hide details for {{name}}",
      closeDetails: "Close details",
      memberFallback: "Team member",
      memberOf: "Team member {{current}} of {{total}}",
      avatarOf: "Photo of {{name}}",
      fallbackAvatarOf: "Placeholder portrait for {{name}}",

      labels: {
        position: "Position",
        specialties: "Areas of expertise",
        additionalServices: "Additional services",
        experience: "Experience",
        education: "Education",
        services: "Services",
      },

      carousel: {
        navigationLabel: "Medical team navigation",
        previous: "Previous team member",
        next: "Next team member",
      },

      members: {
        salem: {
          name: "Salem Muheileh",
          role: "Physiotherapist",
          position: "Center founder and director",
          specialties:
            "Specializes in joint and spine conditions, as well as rehabilitation following neurological conditions and surgery.",
          additionalServices:
            "Sports rehabilitation and dizziness treatment.",
        },

        mohamedAdawi: {
          name: "Professor Mohammad Adawi",
          role:
            "General and internal medicine physician – Rheumatology specialist",
          experience: "More than 35 years of experience.",
        },

        fatima: {
          name: "Dr. Fatima Muheileh",
          role: "Specialist neurologist",
          specialties:
            "Neurological conditions, Parkinson’s disease and movement disorders.",
          education:
            "Graduate of the University of Hamburg, Germany.",
        },

        raafat: {
          name: "Raafat Habib Allah",
          role: "Physiotherapist",
          specialties:
            "Specializes in temporomandibular joint conditions and dizziness.",
          additionalServices:
            "Home-based treatment and rehabilitation.",
        },

        tamer: {
          name: "Tamer Abu Zahra",
          role: "Physiotherapist",
          position: "Director of the Ramla clinic.",
          specialties:
            "Specializes in joint and spine conditions and rehabilitation following injuries and surgery.",
          additionalServices:
            "Home treatment and other services.",
        },

        ali: {
          name: "Ali Sweiti",
          role: "Physiotherapist",
          specialties:
            "Home-based treatment and rehabilitation for mobility and neurological conditions, including rehabilitation after joint surgery.",
        },

        mamoun: {
          name: "Mamoun Harish",
          role: "Physiotherapist",
          specialties:
            "Dizziness treatment and sports rehabilitation.",
        },

        beshara: {
          name: "Bishara Adabieh",
          role: "Complementary medicine practitioner",
          specialties: "Specializes in cupping therapy.",
          additionalServices:
            "Medical massage and other treatments.",
        },

        marian: {
          name: "Marian Awawdeh",
          role:
            "Complementary medicine practitioner for women",
          specialties:
            "Medical massage, medical cupping and other treatments.",
        },

        mohamedGhanaim: {
          name: "Mohammad Ghanaim",
          role:
            "Certified prosthetics and orthotics specialist",
          services:
            "Medical insoles and orthopedic footwear.",
        },
      },
    },    whyUs: {
      eyebrow: "Why choose us?",
      heading: "A comfortable and transparent care experience",

      features: {
        expertise: {
          title: "Specialized clinical expertise",
          description:
            "An experienced team in physiotherapy and rehabilitation.",
        },

        personalized: {
          title: "A plan for every patient",
          description:
            "We tailor each treatment plan to the patient’s condition and goals.",
        },

        modern: {
          title: "Modern techniques",
          description:
            "Appropriate treatment methods to improve mobility and reduce pain.",
        },

        results: {
          title: "Effective outcomes",
          description:
            "Ongoing follow-up to improve mobility and achieve the best possible outcome.",
        },
      },
    },

    booking: {
      eyebrow: "Book now",
      heading: "Choose a branch and book via WhatsApp",
      description:
        "View each branch on the map and request the earliest available appointment directly.",
      whatsAppButton: "Book via WhatsApp",
      openMaps: "Open in Google Maps",
    },

    branches: {
      turan: {
        label: "First branch",
        name: "Tur’an Branch",
        address: "Tur’an – 13 Abu Bakr Street",
        mapTitle: "Map of the Tur’an Branch",
        mapLabel:
          "Map showing the Tur’an Branch at 13 Abu Bakr Street",
        bookLabel:
          "Book an appointment at the Tur’an Branch via WhatsApp",
        directionsLabel:
          "Open the Tur’an Branch in Google Maps",
      },

      ramla: {
        label: "Second branch",
        name: "Lod and Ramla Branch",
        address: "Ramla – 25 Dr. Salk Street",
        mapTitle: "Map of the Lod and Ramla Branch",
        mapLabel:
          "Map showing the Lod and Ramla Branch at 25 Dr. Salk Street in Ramla",
        bookLabel:
          "Book an appointment at the Lod and Ramla Branch via WhatsApp",
        directionsLabel:
          "Open the Lod and Ramla Branch in Google Maps",
      },
    },

    testimonials: {
      sectionLabel: "Patient reviews and experiences",
      roleDescription: "Customer review carousel",
      eyebrow: "Patient reviews",
      heading: "Our patients’ experiences",
      swipeHint: "Swipe to read more patient experiences",
      fiveStars: "Rated 5 out of 5",
      itemOf: "Review {{current}} of {{total}}",

      carousel: {
        navigationLabel: "Patient review navigation",
        previous: "Show previous review",
        next: "Show next review",
      },

      items: {
        first: {
          alt: "A patient satisfied with the service",
          text:
            "A wonderful experience. My back pain improved significantly after several sessions. The team is highly professional and the service is excellent.",
          author: "Mohammad Ahmad",
        },

        second: {
          alt: "A patient satisfied with her care",
          text:
            "Excellent treatment for my knee problem. The therapists are highly skilled, and I noticed clear results from the first sessions.",
          author: "Sara Mahmoud",
        },

        third: {
          alt: "A patient who recommends the clinic",
          text:
            "The best physiotherapy clinic. They helped me recover quickly and effectively after surgery. I highly recommend them.",
          author: "Ali Hassan",
        },
      },
    },

    contact: {
      eyebrow: "Contact us",
      heading: "We are ready to help",
      phone: "Phone",
      whatsApp: "WhatsApp",
      branches: "Branches",

      form: {
        nameLabel: "Name",
        namePlaceholder: "Enter your full name",
        phoneLabel: "Phone number",
        phonePlaceholder: "Enter your phone number",
        messageLabel: "Message",
        messagePlaceholder: "How can we help?",
        submit: "Send via WhatsApp",
      },
    },

    footer: {
      description:
        "A specialized medical center for joint, muscle, neurological and mobility conditions, providing consultations, treatment and rehabilitation.",
      quickLinks: "Quick links",
      bookAppointment: "Book an appointment",
      branches: "Branches",
      followUs: "Follow us",
      copyright: "The clinic. All rights reserved.",
    },

    social: {
      facebook: "Facebook",
      instagram: "Instagram",
      whatsApp: "WhatsApp",
    },

    whatsAppMessages: {
      bookingGreeting:
        "Hello, I would like to book an appointment at the clinic.",
      branch: "Branch: {{branch}}",
      bookingRequest:
        "Please send me the earliest available appointment. Thank you.",
      contactGreeting:
        "Hello, I would like to contact the clinic.",
      name: "Name: {{name}}",
      phone: "Phone number: {{phone}}",
      message: "Message:",
    },

    validation: {
      required: "Please complete all fields before sending.",
      invalidPhone: "Please enter a valid phone number.",
    },

    errors: {
      incompleteBranch:
        "The booking branch information is incomplete.",
    },
  },

  he: {
    seo: {
      title:
        "מרכז רפואי מומחה למפרקים, שרירים, עצבים ותנועה",
      description:
        "מרכז רפואי מומחה לבעיות מפרקים, שרירים, עצבים ותנועה, המציע ייעוץ רפואי, טיפול ושיקום מקצועי בסניפי טורעאן ורמלה.",
    },

    common: {
      bookNow: "קביעת תור",
    },

    language: {
      selectorLabel: "בחירת שפה",
      closeMenuLabel: "סגירת תפריט השפות",
    },

    accessibility: {
      mainNavigation: "ניווט ראשי",
      backHome: "חזרה לדף הבית",
      clinicLogo: "לוגו המרפאה",
      bookWhatsApp: "קביעת תור ב-WhatsApp",
      openMenu: "פתיחת התפריט",
      closeMenu: "סגירת התפריט",
      quickBooking: "קביעת תור מהירה",
    },

    nav: {
      home: "דף הבית",
      services: "שירותי טיפול",
      team: "הצוות הרפואי",
      booking: "קביעת תור",
      contact: "יצירת קשר",
    },

    hero: {
      kicker: "טיפול ושיקום רפואי מקצועי",
      titlePrimary: "מרכז רפואי מומחה",
      titleHighlight: "לבעיות מפרקים ושרירים",
      titleSecondary: "ולבעיות עצבים ותנועה",
      servicesButton: "לשירותים שלנו",

      images: {
        session: "טיפול ושיקום רפואי במרפאה",
        equipment: "ציוד לפיזיותרפיה ולשיקום",
        team: "הצוות הרפואי במרכז הטיפול והשיקום",
      },
    },

    services: {
      eyebrow: "שירותי טיפול",
      heading: "טיפול מקצועי בבעיות מפרקים ושרירים",
      description:
        "טיפול רפואי ושיקומי בבעיות עצבים ותנועה, בהתאמה לצרכים של כל מטופל ומטופלת.",

      items: {
        consultation: {
          title: "ייעוץ עם רופא מומחה",
          description:
            "ייעוץ באורתופדיה, ראומטולוגיה ונוירולוגיה.",
        },

        spine: {
          title: "טיפול בבעיות עמוד השדרה",
          description:
            "טיפול בבעיות צוואר, גב עליון וגב תחתון.",
        },

        joints: {
          title: "טיפול בבעיות מפרקים",
          description:
            "טיפול בבעיות ברכיים, כתפיים ומפרקים נוספים.",
        },

        postSurgery: {
          title: "שיקום לאחר פציעות וניתוחים",
          description:
            "טיפול ושיקום לאחר פציעות וניתוחים.",
        },

        neuroBalance: {
          title: "שיקום נוירולוגי, תנועתי ושיווי משקל",
          description:
            "טיפול ושיקום בבעיות נוירולוגיות, תנועתיות ושיווי משקל.",
        },

        dizziness: {
          title: "טיפול בסחרחורת",
          description:
            "אבחון וטיפול בסחרחורת ובבעיות שיווי משקל.",
        },

        cardiorespiratory: {
          title: "שיקום לב-ריאה",
          description:
            "טיפול ושיקום במצבים לבביים ונשימתיים.",
        },

        massage: {
          title: "עיסוי רפואי",
          description:
            "טיפולי עיסוי רפואי המותאמים לצורכי המטופל.",
        },

        cupping: {
          title: "כוסות רוח רפואיות",
          description:
            "טיפולי כוסות רוח רפואיים בידי מטפלים מוסמכים.",
        },
      },
    },

    team: {
      eyebrow: "הצוות הרפואי",
      heading: "צוות רפואי וטיפולי משולב",
      description:
        "הכירו את חברי הצוות ולחצו על „הצגת פרטים” כדי לראות תחומי מומחיות ושירותים זמינים.",
      swipeHint: "החליקו כדי להכיר את שאר חברי הצוות",
      showDetails: "הצגת פרטים",
      hideDetails: "הסתרת פרטים",
      showDetailsFor: "הצגת פרטים על {{name}}",
      hideDetailsFor: "הסתרת פרטים על {{name}}",
      closeDetails: "סגירת הפרטים",
      memberFallback: "חבר צוות",
      memberOf: "חבר צוות {{current}} מתוך {{total}}",
      avatarOf: "תמונה של {{name}}",
      fallbackAvatarOf: "תמונה חלופית של {{name}}",

      labels: {
        position: "תפקיד",
        specialties: "תחומי מומחיות",
        additionalServices: "שירותים נוספים",
        experience: "ניסיון",
        education: "השכלה",
        services: "שירותים",
      },

      carousel: {
        navigationLabel: "ניווט בין חברי הצוות הרפואי",
        previous: "חבר הצוות הקודם",
        next: "חבר הצוות הבא",
      },

      members: {
        salem: {
          name: "סאלם מחילייה",
          role: "פיזיותרפיסט",
          position: "מייסד ומנהל המרכז",
          specialties:
            "מומחה לטיפול בבעיות מפרקים ועמוד השדרה ולשיקום לאחר בעיות נוירולוגיות וניתוחים.",
          additionalServices:
            "שיקום ספורטאים וטיפול בסחרחורת.",
        },

        mohamedAdawi: {
          name: "פרופ׳ מוחמד עדווי",
          role:
            "רופא כללי ופנימאי – מומחה לראומטולוגיה ולמחלות מפרקים",
          experience: "יותר מ-35 שנות ניסיון.",
        },

        fatima: {
          name: "ד״ר פאטמה מחילייה",
          role: "נוירולוגית מומחית",
          specialties:
            "בעיות נוירולוגיות, מחלת פרקינסון והפרעות תנועה.",
          education:
            "בוגרת אוניברסיטת המבורג, גרמניה.",
        },

        raafat: {
          name: "ראפת חביבאללה",
          role: "פיזיותרפיסט",
          specialties:
            "מומחה לטיפול בבעיות מפרק הלסת ובסחרחורת.",
          additionalServices:
            "טיפול ושיקום בבית המטופל.",
        },

        tamer: {
          name: "תאמר אבו זהרה",
          role: "פיזיותרפיסט",
          position: "מנהל מרפאת רמלה.",
          specialties:
            "מומחה לבעיות מפרקים ועמוד השדרה ולשיקום לאחר פציעות וניתוחים.",
          additionalServices:
            "טיפול ביתי ושירותים נוספים.",
        },

        ali: {
          name: "עלי סוויטי",
          role: "פיזיותרפיסט",
          specialties:
            "טיפול ושיקום בבית בבעיות תנועה ונוירולוגיה, כולל שיקום לאחר ניתוחי מפרקים.",
        },

        mamoun: {
          name: "מאמון הריש",
          role: "פיזיותרפיסט",
          specialties:
            "טיפול בסחרחורת ושיקום ספורטאים.",
        },

        beshara: {
          name: "בשארה אדבייה",
          role: "מטפל ברפואה משלימה",
          specialties: "מומחה לטיפול בכוסות רוח.",
          additionalServices:
            "עיסוי רפואי וטיפולים נוספים.",
        },

        marian: {
          name: "מריאן עוואוודה",
          role: "מטפלת ברפואה משלימה לנשים",
          specialties:
            "עיסוי רפואי, כוסות רוח רפואיות וטיפולים נוספים.",
        },

        mohamedGhanaim: {
          name: "מוחמד גנאים",
          role: "אורתוטיסט-פרותטיסט מוסמך",
          services: "מדרסים ונעליים אורתופדיות.",
        },
      },
    },    whyUs: {
      eyebrow: "למה לבחור בנו?",
      heading: "חוויית טיפול נוחה וברורה",

      features: {
        expertise: {
          title: "מומחיות רפואית מקצועית",
          description: "צוות מנוסה בפיזיותרפיה ובשיקום.",
        },

        personalized: {
          title: "תוכנית לכל מטופל",
          description:
            "אנו מתאימים את תוכנית הטיפול למצבו ולמטרותיו של כל מטופל.",
        },

        modern: {
          title: "שיטות טיפול מתקדמות",
          description:
            "שיטות טיפול מתאימות לשיפור התנועה ולהפחתת כאב.",
        },

        results: {
          title: "תוצאות יעילות",
          description:
            "מעקב רציף לשיפור התפקוד התנועתי ולהשגת התוצאה הטובה ביותר.",
        },
      },
    },

    booking: {
      eyebrow: "קביעת תור",
      heading: "בחרו סניף וקבעו תור ב-WhatsApp",
      description:
        "צפו במיקום של כל סניף במפה ובקשו ישירות את התור הקרוב ביותר.",
      whatsAppButton: "קביעת תור ב-WhatsApp",
      openMaps: "פתיחה ב-Google Maps",
    },

    branches: {
      turan: {
        label: "הסניף הראשון",
        name: "סניף טורעאן",
        address: "טורעאן – רחוב אבו בכר 13",
        mapTitle: "מפת סניף טורעאן",
        mapLabel:
          "מפת מיקום סניף טורעאן ברחוב אבו בכר 13",
        bookLabel:
          "קביעת תור בסניף טורעאן באמצעות WhatsApp",
        directionsLabel:
          "פתיחת מיקום סניף טורעאן ב-Google Maps",
      },

      ramla: {
        label: "הסניף השני",
        name: "סניף לוד ורמלה",
        address: "רמלה – רחוב ד״ר סאלק 25",
        mapTitle: "מפת סניף לוד ורמלה",
        mapLabel:
          "מפת מיקום סניף לוד ורמלה ברחוב ד״ר סאלק 25 ברמלה",
        bookLabel:
          "קביעת תור בסניף לוד ורמלה באמצעות WhatsApp",
        directionsLabel:
          "פתיחת מיקום סניף לוד ורמלה ב-Google Maps",
      },
    },

    testimonials: {
      sectionLabel: "חוות דעת וחוויות של מטופלים",
      roleDescription: "קרוסלת חוות דעת",
      eyebrow: "חוות דעת",
      heading: "החוויות של המטופלים שלנו",
      swipeHint:
        "החליקו לקריאת חוויות נוספות של מטופלים",
      fiveStars: "דירוג 5 מתוך 5",
      itemOf: "חוות דעת {{current}} מתוך {{total}}",

      carousel: {
        navigationLabel: "ניווט בין חוות דעת",
        previous: "הצגת חוות הדעת הקודמת",
        next: "הצגת חוות הדעת הבאה",
      },

      items: {
        first: {
          alt: "מטופל מרוצה מהשירות",
          text:
            "חוויה מצוינת. כאבי הגב שלי השתפרו משמעותית לאחר כמה טיפולים. הצוות מקצועי מאוד והשירות מעולה.",
          author: "מוחמד אחמד",
        },

        second: {
          alt: "מטופלת מרוצה מהטיפול",
          text:
            "טיפול מצוין בבעיה בברך. המטפלים מקצועיים, וכבר מהטיפולים הראשונים ראיתי תוצאות ברורות.",
          author: "סארה מחמוד",
        },

        third: {
          alt: "מטופל שממליץ על המרפאה",
          text:
            "מרפאת הפיזיותרפיה הטובה ביותר. הם עזרו לי להחלים במהירות וביעילות לאחר הניתוח. ממליץ בחום.",
          author: "עלי חסן",
        },
      },
    },

    contact: {
      eyebrow: "יצירת קשר",
      heading: "אנחנו כאן כדי לעזור",
      phone: "טלפון",
      whatsApp: "WhatsApp",
      branches: "סניפים",

      form: {
        nameLabel: "שם",
        namePlaceholder: "הקלידו שם מלא",
        phoneLabel: "מספר טלפון",
        phonePlaceholder: "הקלידו מספר טלפון",
        messageLabel: "הודעה",
        messagePlaceholder: "כיצד נוכל לעזור?",
        submit: "שליחה ב-WhatsApp",
      },
    },

    footer: {
      description:
        "מרכז רפואי מומחה לבעיות מפרקים, שרירים, עצבים ותנועה, המציע ייעוץ רפואי, טיפול ושיקום.",
      quickLinks: "קישורים מהירים",
      bookAppointment: "קביעת תור",
      branches: "סניפים",
      followUs: "עקבו אחרינו",
      copyright: "המרפאה. כל הזכויות שמורות.",
    },

    social: {
      facebook: "Facebook",
      instagram: "Instagram",
      whatsApp: "WhatsApp",
    },

    whatsAppMessages: {
      bookingGreeting:
        "שלום, ברצוני לקבוע תור במרפאה.",
      branch: "סניף: {{branch}}",
      bookingRequest:
        "אשמח לקבל את המועד הקרוב ביותר. תודה.",
      contactGreeting:
        "שלום, ברצוני ליצור קשר עם המרפאה.",
      name: "שם: {{name}}",
      phone: "מספר טלפון: {{phone}}",
      message: "הודעה:",
    },

    validation: {
      required: "יש למלא את כל השדות לפני השליחה.",
      invalidPhone: "יש להזין מספר טלפון תקין.",
    },

    errors: {
      incompleteBranch:
        "פרטי הסניף לקביעת התור אינם מלאים.",
    },
  },
};

function resolveTranslation(language, key) {
  return key.split(".").reduce((value, part) => {
    if (
      value &&
      Object.prototype.hasOwnProperty.call(value, part)
    ) {
      return value[part];
    }

    return undefined;
  }, translations[language]);
}

function interpolateTranslation(value, replacements = {}) {
  return String(value).replace(
    /\{\{(\w+)\}\}/g,
    (match, name) => {
      if (
        Object.prototype.hasOwnProperty.call(
          replacements,
          name,
        )
      ) {
        return String(replacements[name]);
      }

      return match;
    },
  );
}

function t(key, replacements = {}) {
  const translatedValue = resolveTranslation(
    currentLanguage,
    key,
  );

  const fallbackValue = resolveTranslation("ar", key);
  const value = translatedValue ?? fallbackValue ?? key;

  return interpolateTranslation(value, replacements);
}

function enrichTranslationData() {
  SUPPORTED_LANGUAGES.forEach((language) => {
    const locale = translations[language];

    Object.values(locale.services.items).forEach(
      (service) => {
        service.alt = service.alt || service.title;
      },
    );

    Object.values(locale.team.members).forEach(
      (member) => {
        member.alt = interpolateTranslation(
          locale.team.avatarOf,
          {
            name: member.name,
          },
        );

        member.showDetailsLabel = interpolateTranslation(
          locale.team.showDetailsFor,
          {
            name: member.name,
          },
        );
      },
    );
  });
}

enrichTranslationData();

function getSavedLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    );

    return SUPPORTED_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : null;
  } catch (error) {
    return null;
  }
}

// The default language for a new visitor is always Arabic. Browser/device
// language is intentionally never used to choose the initial language --
// only an explicit, previously saved user selection (see getSavedLanguage)
// may override the Arabic default.
const DEFAULT_LANGUAGE = "ar";

function getInitialLanguage() {
  const savedLanguage = getSavedLanguage();

  if (savedLanguage) {
    return savedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

let currentLanguage = getInitialLanguage();

/* =========================================================
   Helpers
========================================================= */

const qs = (selector, parent = document) =>
  parent.querySelector(selector);

const qsa = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

function debounce(callback, delay = 120) {
  let timeoutId;

  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function throttle(callback, delay = 100) {
  let waiting = false;

  return (...args) => {
    if (waiting) {
      return;
    }

    callback(...args);
    waiting = true;

    window.setTimeout(() => {
      waiting = false;
    }, delay);
  };
}

function prefersReducedMotion() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function getHeaderOffset() {
  const header = qs("#header");

  return header ? header.offsetHeight + 24 : 96;
}

function openSecureWindow(url) {
  const openedWindow = window.open(
    url,
    "_blank",
    "noopener,noreferrer",
  );

  if (openedWindow) {
    openedWindow.opener = null;
  }
}

/* =========================================================
   Translation Application and Language Selector
========================================================= */

const TRANSLATED_ATTRIBUTES = Object.freeze({
  "data-i18n-aria-label": "aria-label",
  "data-i18n-aria-roledescription":
    "aria-roledescription",
  "data-i18n-placeholder": "placeholder",
  "data-i18n-alt": "alt",
  "data-i18n-title": "title",
  "data-i18n-data-branch": "data-branch",
});

function applyTranslations() {
  qsa("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (key) {
      element.textContent = t(key);
    }
  });

  Object.entries(TRANSLATED_ATTRIBUTES).forEach(
    ([dataAttribute, targetAttribute]) => {
      qsa(`[${dataAttribute}]`).forEach((element) => {
        const key = element.getAttribute(dataAttribute);

        if (key) {
          element.setAttribute(
            targetAttribute,
            t(key),
          );
        }
      });
    },
  );

  document.title = t("seo.title");

  const descriptionMeta = qs(
    'meta[name="description"]',
  );

  if (descriptionMeta) {
    descriptionMeta.setAttribute(
      "content",
      t("seo.description"),
    );
  }
}

function updateMobileNavigationLabel() {
  const hamburger = qs("#hamburger");

  if (!hamburger) {
    return;
  }

  const isOpen =
    hamburger.getAttribute("aria-expanded") === "true";

  hamburger.setAttribute(
    "aria-label",
    t(
      isOpen
        ? "accessibility.closeMenu"
        : "accessibility.openMenu",
    ),
  );
}

function updateLanguageSelectorUI() {
  const selector = qs("#languageSelector");
  const toggle = qs("#languageToggle");
  const activeLabel = qs("#activeLanguageLabel");

  const isOpen = Boolean(
    selector?.classList.contains("is-open"),
  );

  if (activeLabel) {
    activeLabel.textContent =
      LANGUAGE_NAMES[currentLanguage];

    activeLabel.lang = currentLanguage;
    activeLabel.dir =
      LANGUAGE_DIRECTIONS[currentLanguage];
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      t(
        isOpen
          ? "language.closeMenuLabel"
          : "language.selectorLabel",
      ),
    );
  }

  qsa(".language-option[data-language]").forEach(
    (option) => {
      const isActive =
        option.dataset.language === currentLanguage;

      option.classList.toggle("is-active", isActive);
      option.setAttribute(
        "aria-checked",
        String(isActive),
      );
    },
  );
}

function getDocumentScrollPosition() {
  return {
    left: window.pageXOffset || window.scrollX || 0,
    top: window.pageYOffset || window.scrollY || 0,
  };
}

function restoreDocumentScrollPosition(
  scrollPosition,
) {
  if (!scrollPosition) {
    return;
  }

  window.scrollTo({
    left: scrollPosition.left,
    top: scrollPosition.top,
    behavior: "auto",
  });
}

function refreshDirectionDependentState(
  onAfterLayout,
) {
  window.requestAnimationFrame(() => {
    if (
      isMobileViewport() &&
      specialistCardsList.length
    ) {
      scrollSpecialistCardToView(
        specialistCarouselIndex,
      );
    }

    if (
      isMobileViewport() &&
      testimonialsCardsList.length
    ) {
      scrollToTestimonial(testimonialsCarouselIndex);
    }

    if (typeof onAfterLayout === "function") {
      onAfterLayout();
    }
  });
}

function refreshDynamicTranslations() {
  updateMobileNavigationLabel();
  updateSpecialistInterfaceLanguage();

  updateSpecialistCarouselState(
    specialistCarouselIndex,
  );

  updateTestimonialsCarouselState(
    testimonialsCarouselIndex,
  );

  updateFooterYear();
  updateLanguageSelectorUI();
}

function setLanguage(
  language,
  { save = true, dispatchEvent = true } = {},
) {
  const normalizedLanguage = String(
    language || "",
  ).toLowerCase();

  if (
    !SUPPORTED_LANGUAGES.includes(normalizedLanguage)
  ) {
    return false;
  }

  const documentScrollPosition =
    getDocumentScrollPosition();

  currentLanguage = normalizedLanguage;

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    LANGUAGE_DIRECTIONS[currentLanguage];

  if (save) {
    try {
      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        currentLanguage,
      );
    } catch (error) {
      // The language still changes if storage is unavailable.
    }
  }

  applyTranslations();
  refreshDynamicTranslations();
  refreshDirectionDependentState(() => {
    restoreDocumentScrollPosition(
      documentScrollPosition,
    );
  });

  document.documentElement.dataset.languageReady =
    "true";

  if (dispatchEvent) {
    document.dispatchEvent(
      new CustomEvent("clinic:languagechange", {
        detail: {
          language: currentLanguage,
          direction:
            LANGUAGE_DIRECTIONS[currentLanguage],
        },
      }),
    );
  }

  return true;
}

function closeLanguageMenu(
  { returnFocus = false } = {},
) {
  const selector = qs("#languageSelector");
  const toggle = qs("#languageToggle");
  const menu = qs("#languageMenu");

  if (!selector || !toggle || !menu) {
    return;
  }

  selector.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");

  menu.hidden = true;
  updateLanguageSelectorUI();

  if (returnFocus) {
    try {
      toggle.focus({
        preventScroll: true,
      });
    } catch (error) {
      toggle.focus();
    }
  }
}

function openLanguageMenu(
  { focusActive = true } = {},
) {
  const selector = qs("#languageSelector");
  const toggle = qs("#languageToggle");
  const menu = qs("#languageMenu");

  if (!selector || !toggle || !menu) {
    return;
  }

  selector.classList.add("is-open");
  toggle.setAttribute("aria-expanded", "true");

  menu.hidden = false;
  updateLanguageSelectorUI();

  const activeOption =
    qs(
      `.language-option[data-language="${currentLanguage}"]`,
      menu,
    ) || qs(".language-option", menu);

  if (focusActive) {
    window.requestAnimationFrame(() => {
      activeOption?.focus({
        preventScroll: true,
      });
    });
  }
}

function initLanguageSelector() {
  const selector = qs("#languageSelector");
  const toggle = qs("#languageToggle");
  const menu = qs("#languageMenu");

  if (
    !selector ||
    !toggle ||
    !menu ||
    selector.dataset.languageInitialized === "true"
  ) {
    return;
  }

  selector.dataset.languageInitialized = "true";

  const getOptions = () =>
    qsa(".language-option[data-language]", menu);

  const focusOption = (optionIndex) => {
    const options = getOptions();

    if (!options.length) {
      return;
    }

    const normalizedIndex =
      ((optionIndex % options.length) +
        options.length) %
      options.length;

    options[normalizedIndex].focus();
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeLanguageMenu();
    } else {
      openLanguageMenu();
    }
  });

  toggle.addEventListener("keydown", (event) => {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp"
    ) {
      return;
    }

    event.preventDefault();

    openLanguageMenu({
      focusActive: false,
    });

    const options = getOptions();

    const activeIndex = Math.max(
      0,
      options.findIndex(
        (option) =>
          option.dataset.language === currentLanguage,
      ),
    );

    focusOption(
      event.key === "ArrowDown"
        ? activeIndex
        : activeIndex - 1,
    );
  });

  getOptions().forEach((option) => {
    option.addEventListener("click", () => {
      const language = option.dataset.language;

      if (setLanguage(language)) {
        closeLanguageMenu({
          returnFocus: true,
        });
      }
    });
  });

  menu.addEventListener("keydown", (event) => {
    const options = getOptions();

    const currentIndex = options.indexOf(
      document.activeElement,
    );

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
      focusOption(currentIndex + 1);
    } else if (
      event.key === "ArrowUp" ||
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();
      focusOption(currentIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(options.length - 1);
    } else if (event.key === "Escape") {
      event.preventDefault();

      closeLanguageMenu({
        returnFocus: true,
      });
    } else if (event.key === "Tab") {
      closeLanguageMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!selector.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") ===
        "true"
    ) {
      event.preventDefault();

      closeLanguageMenu({
        returnFocus: true,
      });
    }
  });

  updateLanguageSelectorUI();
}

function initializeInternationalization() {
  initLanguageSelector();

  setLanguage(currentLanguage, {
    save: false,
    dispatchEvent: false,
  });
}

window.clinicI18n = Object.freeze({
  setLanguage,
  t,
  getLanguage: () => currentLanguage,
  supportedLanguages: [...SUPPORTED_LANGUAGES],
});

/* =========================================================
   Mobile Navigation
========================================================= */

function initMobileNavigation() {
  const hamburger = qs("#hamburger");
  const navMenu = qs("#navMenu");

  if (!hamburger || !navMenu) {
    return;
  }

  const desktopQuery = window.matchMedia(
    "(min-width: 900px)",
  );

  function setMenuState(
    isOpen,
    { returnFocus = false } = {},
  ) {
    hamburger.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);

    hamburger.setAttribute(
      "aria-expanded",
      String(isOpen),
    );

    hamburger.setAttribute(
      "aria-label",
      t(
        isOpen
          ? "accessibility.closeMenu"
          : "accessibility.openMenu",
      ),
    );

    if (isOpen) {
      closeLanguageMenu();
    }

    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    if (returnFocus) {
      hamburger.focus();
    }
  }

  function closeMenu(options) {
    setMenuState(false, options);
  }

  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      hamburger.getAttribute("aria-expanded") ===
      "true";

    setMenuState(!isOpen);

    if (!isOpen) {
      const firstLink = qs("a", navMenu);

      if (firstLink) {
        firstLink.focus({
          preventScroll: true,
        });
      }
    }
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.classList.contains("active")) {
      return;
    }

    const clickedInsideMenu = navMenu.contains(
      event.target,
    );

    const clickedHamburger = hamburger.contains(
      event.target,
    );

    if (!clickedInsideMenu && !clickedHamburger) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navMenu.classList.contains("active")
    ) {
      closeMenu({
        returnFocus: true,
      });
    }
  });

  const handleDesktopChange = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  if (
    typeof desktopQuery.addEventListener ===
    "function"
  ) {
    desktopQuery.addEventListener(
      "change",
      handleDesktopChange,
    );
  } else {
    desktopQuery.addListener(handleDesktopChange);
  }
}

/* =========================================================
   Smooth Internal Navigation
========================================================= */

function initSmoothScroll() {
  qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      let target;

      try {
        target = qs(targetId);
      } catch (error) {
        return;
      }

      if (!target) {
        return;
      }

      event.preventDefault();

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: Math.max(
          0,
          targetTop - getHeaderOffset(),
        ),
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth",
      });
    });
  });
}

/* =========================================================
   Header Scroll State
========================================================= */

function initHeaderScrollState() {
  const header = qs("#header");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 20,
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    throttle(updateHeader, 80),
    {
      passive: true,
    },
  );
}

/* =========================================================
   Active Navigation Link
========================================================= */

function initActiveNavigation() {
  const sectionLinks = qsa(
    '.nav-link[href^="#"]',
  );

  if (
    !sectionLinks.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const sectionMap = new Map();

  sectionLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    let section;

    try {
      section = qs(href);
    } catch (error) {
      return;
    }

    if (section) {
      sectionMap.set(section, link);
    }
  });

  if (!sectionMap.size) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (firstEntry, secondEntry) =>
            secondEntry.intersectionRatio -
            firstEntry.intersectionRatio,
        )[0];

      if (!visibleEntry) {
        return;
      }

      sectionLinks.forEach((link) => {
        const isActive =
          link === sectionMap.get(visibleEntry.target);

        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute(
            "aria-current",
            "page",
          );
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      threshold: [0.2, 0.35, 0.5],
      rootMargin: "-18% 0px -58% 0px",
    },
  );

  sectionMap.forEach((link, section) => {
    observer.observe(section);
  });
}

/* =========================================================
   Specialist Experience
   Carousel + Bottom Sheet + Accordion
========================================================= */
let specialistCarouselIndex = 0;
let specialistCardsList = [];
let activeSpecialistTriggerBtn = null;
let previousBodyOverflow = "";

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getSpecialistInitials(card, name = "") {
  const avatar = qs("[data-specialist-avatar]", card);

  const savedInitials =
    avatar?.dataset.specialistInitials?.trim();

  const savedInitialsLanguage =
    avatar?.dataset.specialistInitialsLanguage;

  if (
    savedInitials &&
    savedInitialsLanguage === currentLanguage
  ) {
    return savedInitials;
  }

  const ignoredWords = new Set([
    "البروفيسور",
    "الدكتور",
    "الدكتورة",
    "الأستاذ",
    "الأستاذة",
    "Professor",
    "Prof.",
    "Doctor",
    "Dr.",
    "פרופ׳",
    "פרופ'",
    "ד״ר",
    'ד"ר',
  ]);

  return name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(
      (part) => part && !ignoredWords.has(part),
    )
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join(" ");
}

function convertSpecialistAvatarToFallback(card) {
  const avatar = qs(
    "[data-specialist-avatar]",
    card,
  );

  const name =
    qs(".team-name", card)?.textContent.trim() ||
    t("team.memberFallback");

  if (!avatar) {
    return;
  }

  const initials = getSpecialistInitials(card, name);

  avatar.dataset.specialistAvatarType = "fallback";
  avatar.dataset.specialistInitials = initials;
  avatar.dataset.specialistInitialsLanguage =
    currentLanguage;

  avatar.classList.add("team-avatar-fallback");
  avatar.setAttribute("role", "img");

  avatar.setAttribute(
    "aria-label",
    t("team.fallbackAvatarOf", {
      name,
    }),
  );

  const image = qs(
    "[data-specialist-image], img",
    avatar,
  );

  if (image) {
    image.remove();
  }

  if (!qs(".fa-user-doctor", avatar)) {
    const icon = document.createElement("i");

    icon.className = "fa-solid fa-user-doctor";
    icon.setAttribute("aria-hidden", "true");

    avatar.append(icon);
  }

  let initialsElement = qs(
    ".team-avatar-initials",
    avatar,
  );

  if (!initialsElement) {
    initialsElement =
      document.createElement("span");

    initialsElement.className =
      "team-avatar-initials";

    initialsElement.setAttribute(
      "aria-hidden",
      "true",
    );

    avatar.append(initialsElement);
  }

  initialsElement.textContent = initials;
}

function initSpecialistAvatar(card) {
  const avatar = qs(
    "[data-specialist-avatar]",
    card,
  );

  const image = qs(
    "[data-specialist-image]",
    card,
  );

  if (
    !avatar ||
    avatar.dataset.specialistAvatarType !==
      "image" ||
    !image
  ) {
    return;
  }

  const handleImageError = () => {
    convertSpecialistAvatarToFallback(card);
  };

  image.addEventListener(
    "error",
    handleImageError,
    {
      once: true,
    },
  );

  if (image.complete && image.naturalWidth === 0) {
    handleImageError();
  }
}

function initSpecialistExperience() {
  specialistCardsList = qsa(
    "[data-specialist-card]",
  );

  if (!specialistCardsList.length) {
    return;
  }

  specialistCardsList.forEach((card) => {
    const button = qs(
      "[data-specialist-toggle]",
      card,
    );

    const drawer = qs(".team-drawer", card);

    const name =
      qs(".team-name", card)?.textContent.trim() ||
      t("team.memberFallback");

    initSpecialistAvatar(card);

    if (!button || !drawer) {
      return;
    }

    const controlsId =
      button.getAttribute("aria-controls");

    if (controlsId && drawer.id !== controlsId) {
      drawer.id = controlsId;
    }

    button.setAttribute("aria-expanded", "false");

    button.setAttribute(
      "aria-label",
      t("team.showDetailsFor", {
        name,
      }),
    );

    drawer.setAttribute("aria-hidden", "true");
    card.classList.remove("is-expanded");

    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (isMobileViewport()) {
        openSpecialistSheet(card, button);
        return;
      }

      const isExpanded =
        card.classList.contains("is-expanded");

      if (!isExpanded) {
        specialistCardsList.forEach(
          (otherCard) => {
            if (otherCard !== card) {
              setDesktopSpecialistState(
                otherCard,
                false,
              );
            }
          },
        );
      }

      setDesktopSpecialistState(
        card,
        !isExpanded,
      );
    });
  });

  initMobileSpecialistCarousel();
  attachSpecialistModalListeners();

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      const overlay = qs(
        "#specialistModalOverlay",
      );

      if (
        overlay?.getAttribute("aria-hidden") ===
        "false"
      ) {
        closeSpecialistSheet();
        return;
      }

      if (!isMobileViewport()) {
        const expandedCard =
          specialistCardsList.find((card) =>
            card.classList.contains(
              "is-expanded",
            ),
          );

        if (expandedCard) {
          const button = qs(
            "[data-specialist-toggle]",
            expandedCard,
          );

          setDesktopSpecialistState(
            expandedCard,
            false,
          );

          button?.focus();
        }
      }
    },
  );

  const desktopQuery = window.matchMedia(
    "(min-width: 768px)",
  );

  const handleViewportChange = (event) => {
    if (event.matches) {
      closeSpecialistSheet({
        returnFocus: false,
      });
    } else {
      specialistCardsList.forEach((card) => {
        setDesktopSpecialistState(card, false);
      });

      updateSpecialistCarouselFromPosition();
    }
  };

  if (
    typeof desktopQuery.addEventListener ===
    "function"
  ) {
    desktopQuery.addEventListener(
      "change",
      handleViewportChange,
    );
  } else {
    desktopQuery.addListener(
      handleViewportChange,
    );
  }
}

function setDesktopSpecialistState(
  card,
  expanded,
) {
  const button = qs(
    "[data-specialist-toggle]",
    card,
  );

  const drawer = qs(".team-drawer", card);

  const label = qs(".expand-btn-label", card);

  const name =
    qs(".team-name", card)?.textContent.trim() ||
    t("team.memberFallback");

  if (!button || !drawer) {
    return;
  }

  card.classList.toggle(
    "is-expanded",
    expanded,
  );

  button.setAttribute(
    "aria-expanded",
    String(expanded),
  );

  button.setAttribute(
    "aria-label",
    t(
      expanded
        ? "team.hideDetailsFor"
        : "team.showDetailsFor",
      {
        name,
      },
    ),
  );

  drawer.setAttribute(
    "aria-hidden",
    String(!expanded),
  );

  if (label) {
    label.textContent = t(
      expanded
        ? "team.hideDetails"
        : "team.showDetails",
    );
  }
}

function updateSpecialistInterfaceLanguage() {
  const cards = specialistCardsList.length
    ? specialistCardsList
    : qsa("[data-specialist-card]");

  cards.forEach((card) => {
    const name =
      qs(".team-name", card)?.textContent.trim() ||
      t("team.memberFallback");

    setDesktopSpecialistState(
      card,
      card.classList.contains("is-expanded"),
    );

    const avatar = qs(
      "[data-specialist-avatar]",
      card,
    );

    if (
      avatar?.dataset.specialistAvatarType ===
      "fallback"
    ) {
      const initials = getSpecialistInitials(
        card,
        name,
      );

      avatar.dataset.specialistInitials =
        initials;

      avatar.dataset.specialistInitialsLanguage =
        currentLanguage;

      avatar.setAttribute(
        "aria-label",
        t("team.fallbackAvatarOf", {
          name,
        }),
      );

      const initialsElement = qs(
        ".team-avatar-initials",
        avatar,
      );

      if (initialsElement) {
        initialsElement.textContent = initials;
      }
    }
  });

  const overlay = qs("#specialistModalOverlay");

  const activeCard =
    activeSpecialistTriggerBtn?.closest(
      "[data-specialist-card]",
    );

  if (
    overlay?.getAttribute("aria-hidden") ===
      "false" &&
    activeCard
  ) {
    const name =
      qs(
        ".team-name",
        activeCard,
      )?.textContent.trim() ||
      t("team.memberFallback");

    const role =
      qs(
        ".team-role",
        activeCard,
      )?.textContent.trim() || "";

    const modalName = qs("#specialistModalName");
    const modalRole = qs("#specialistModalRole");

    const modalDetails = qs(
      "#specialistModalDetails",
    );

    const detailsList = qs(
      ".team-details-list",
      activeCard,
    );

    if (modalName) {
      modalName.textContent = name;
    }

    if (modalRole) {
      modalRole.textContent = role;
    }

    if (modalDetails) {
      modalDetails.replaceChildren();

      if (detailsList) {
        Array.from(detailsList.children).forEach(
          (detailItem) => {
            modalDetails.append(
              detailItem.cloneNode(true),
            );
          },
        );
      }
    }

    populateSpecialistModalAvatar(
      activeCard,
      name,
    );
  }
}

function initMobileSpecialistCarousel() {
  const teamGrid = qs(".team-grid");
  const prevBtn = qs("#teamCarouselPrev");
  const nextBtn = qs("#teamCarouselNext");

  if (!teamGrid || !specialistCardsList.length) {
    return;
  }

  updateSpecialistCarouselState(0);

  prevBtn?.addEventListener("click", () => {
    scrollSpecialistCardToView(
      specialistCarouselIndex - 1,
    );
  });

  nextBtn?.addEventListener("click", () => {
    scrollSpecialistCardToView(
      specialistCarouselIndex + 1,
    );
  });

  teamGrid.addEventListener(
    "scroll",
    throttle(
      updateSpecialistCarouselFromPosition,
      80,
    ),
    {
      passive: true,
    },
  );

  window.addEventListener(
    "resize",
    debounce(() => {
      if (isMobileViewport()) {
        updateSpecialistCarouselFromPosition();
      }
    }, 140),
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isMobileViewport()) {
          return;
        }

        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio -
              firstEntry.intersectionRatio,
          )[0];

        if (!mostVisibleEntry) {
          return;
        }

        const index =
          specialistCardsList.indexOf(
            mostVisibleEntry.target,
          );

        if (index !== -1) {
          updateSpecialistCarouselState(index);
        }
      },
      {
        root: teamGrid,
        threshold: [0.55, 0.7, 0.85],
      },
    );

    specialistCardsList.forEach((card) => {
      observer.observe(card);
    });
  }
}

function updateSpecialistCarouselFromPosition() {
  const teamGrid = qs(".team-grid");

  if (
    !teamGrid ||
    !isMobileViewport() ||
    !specialistCardsList.length
  ) {
    return;
  }

  const gridRect =
    teamGrid.getBoundingClientRect();

  const gridCenter =
    gridRect.left + gridRect.width / 2;

  let nearestIndex = 0;
  let nearestDistance =
    Number.POSITIVE_INFINITY;

  specialistCardsList.forEach(
    (card, index) => {
      const cardRect =
        card.getBoundingClientRect();

      const cardCenter =
        cardRect.left + cardRect.width / 2;

      const distance = Math.abs(
        cardCenter - gridCenter,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    },
  );

  updateSpecialistCarouselState(nearestIndex);
}

function scrollCarouselItemIntoView(
  container,
  item,
  { behavior = "auto" } = {},
) {
  if (!container || !item) {
    return;
  }

  const containerRect =
    container.getBoundingClientRect();

  const itemRect = item.getBoundingClientRect();

  const containerCenter =
    containerRect.left + containerRect.width / 2;

  const itemCenter =
    itemRect.left + itemRect.width / 2;

  const delta = itemCenter - containerCenter;

  // Do not clamp this ourselves: the valid scrollLeft range is [0, max]
  // in LTR but is negative (or reversed) in RTL depending on the
  // browser's convention. Passing the raw target lets the browser clamp
  // it against whichever range it actually uses, so this works correctly
  // in Arabic and Hebrew (RTL) as well as English (LTR).
  const nextLeft = container.scrollLeft + delta;

  if (typeof container.scrollTo === "function") {
    container.scrollTo({
      left: nextLeft,
      top: 0,
      behavior,
    });
    return;
  }

  container.scrollLeft = nextLeft;
}

function scrollSpecialistCardToView(index) {
  if (
    index < 0 ||
    index >= specialistCardsList.length
  ) {
    return;
  }

  const teamGrid = qs(".team-grid");
  const targetCard = specialistCardsList[index];

  if (!teamGrid || !targetCard) {
    return;
  }

  scrollCarouselItemIntoView(teamGrid, targetCard, {
    behavior: prefersReducedMotion()
      ? "auto"
      : "smooth",
  });

  updateSpecialistCarouselState(index);
}

function updateSpecialistCarouselState(index) {
  const total = specialistCardsList.length;

  if (!total) {
    return;
  }

  const safeIndex = Math.min(
    Math.max(index, 0),
    total - 1,
  );

  const prevBtn = qs("#teamCarouselPrev");
  const nextBtn = qs("#teamCarouselNext");
  const indicator = qs("#teamCarouselIndicator");

  specialistCarouselIndex = safeIndex;

  if (indicator) {
    indicator.textContent =
      `${safeIndex + 1} / ${total}`;

    indicator.setAttribute(
      "aria-label",
      t("team.memberOf", {
        current: safeIndex + 1,
        total,
      }),
    );
  }

  if (prevBtn) {
    const isDisabled = safeIndex === 0;

    prevBtn.disabled = isDisabled;

    prevBtn.setAttribute(
      "aria-disabled",
      String(isDisabled),
    );
  }

  if (nextBtn) {
    const isDisabled =
      safeIndex === total - 1;

    nextBtn.disabled = isDisabled;

    nextBtn.setAttribute(
      "aria-disabled",
      String(isDisabled),
    );
  }
}

function populateSpecialistModalAvatar(
  card,
  name,
) {
  const modalImg = qs("#specialistModalImg");

  const modalFallback = qs(
    "#specialistModalFallback",
  );

  const modalInitials = qs(
    "#specialistModalInitials",
  );

  const avatar = qs(
    "[data-specialist-avatar]",
    card,
  );

  const avatarImage = qs(
    "[data-specialist-image]",
    card,
  );

  const avatarType =
    avatar?.dataset.specialistAvatarType ||
    "fallback";

  const initials = getSpecialistInitials(
    card,
    name,
  );

  const showFallback = () => {
    if (modalImg) {
      modalImg.hidden = true;
      modalImg.removeAttribute("src");
      modalImg.alt = "";
      modalImg.onerror = null;
    }

    if (modalFallback) {
      modalFallback.hidden = false;

      modalFallback.setAttribute(
        "aria-label",
        t("team.fallbackAvatarOf", {
          name,
        }),
      );
    }

    if (modalInitials) {
      modalInitials.textContent = initials;
    }
  };

  if (
    avatarType === "image" &&
    avatarImage &&
    modalImg
  ) {
    if (modalFallback) {
      modalFallback.hidden = true;

      modalFallback.setAttribute(
        "aria-label",
        "",
      );
    }

    modalImg.hidden = false;

    modalImg.alt =
      avatarImage.alt ||
      t("team.avatarOf", {
        name,
      });

    modalImg.onerror = showFallback;

    modalImg.src =
      avatarImage.currentSrc || avatarImage.src;
  } else {
    showFallback();
  }
}

function openSpecialistSheet(
  card,
  triggerButton,
) {
  const overlay = qs("#specialistModalOverlay");
  const modalName = qs("#specialistModalName");
  const modalRole = qs("#specialistModalRole");

  const modalDetails = qs(
    "#specialistModalDetails",
  );

  const closeBtn = qs(
    "#specialistSheetCloseBtn",
  );

  const nameElement = qs(".team-name", card);
  const roleElement = qs(".team-role", card);

  const detailsList = qs(
    ".team-details-list",
    card,
  );

  if (!overlay || !card || !nameElement) {
    return;
  }

  const name = nameElement.textContent.trim();

  const role =
    roleElement?.textContent.trim() || "";

  activeSpecialistTriggerBtn =
    triggerButton || null;

  if (modalName) {
    modalName.textContent = name;
  }

  if (modalRole) {
    modalRole.textContent = role;
  }

  if (modalDetails) {
    modalDetails.replaceChildren();

    if (detailsList) {
      Array.from(detailsList.children).forEach(
        (detailItem) => {
          modalDetails.append(
            detailItem.cloneNode(true),
          );
        },
      );
    }
  }

  populateSpecialistModalAvatar(card, name);

  previousBodyOverflow =
    document.body.style.overflow;

  document.body.style.overflow = "hidden";

  overlay.setAttribute(
    "aria-hidden",
    "false",
  );

  overlay.classList.add("is-open");

  window.setTimeout(() => {
    closeBtn?.focus();
  }, 50);
}

function attachSpecialistModalListeners() {
  const overlay = qs("#specialistModalOverlay");

  const closeBtn = qs(
    "#specialistSheetCloseBtn",
  );

  const backdrop = qs(
    "#specialistModalBackdrop",
  );

  if (
    !overlay ||
    overlay.dataset.listenersAttached === "true"
  ) {
    return;
  }

  overlay.dataset.listenersAttached = "true";

  closeBtn?.addEventListener(
    "click",
    closeSpecialistSheet,
  );

  backdrop?.addEventListener(
    "click",
    closeSpecialistSheet,
  );

  overlay.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = qsa(
        [
          "button:not([disabled])",
          "[href]",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(","),
        overlay,
      ).filter(
        (element) =>
          !element.hidden &&
          element.offsetParent !== null,
      );

      if (!focusableElements.length) {
        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        lastElement.focus();
        event.preventDefault();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        firstElement.focus();
        event.preventDefault();
      }
    },
  );
}

function closeSpecialistSheet(
  { returnFocus = true } = {},
) {
  const overlay = qs("#specialistModalOverlay");

  if (
    !overlay ||
    overlay.getAttribute("aria-hidden") ===
      "true"
  ) {
    return;
  }

  overlay.classList.remove("is-open");

  overlay.setAttribute(
    "aria-hidden",
    "true",
  );

  document.body.style.overflow =
    previousBodyOverflow;

  if (
    returnFocus &&
    activeSpecialistTriggerBtn?.isConnected
  ) {
    activeSpecialistTriggerBtn.focus();
  }

  activeSpecialistTriggerBtn = null;
}

/* =========================================================
   Testimonials Carousel
========================================================= */

let testimonialsCarouselIndex = 0;
let testimonialsCardsList = [];

function initTestimonialsCarousel() {
  const track =
    qs("[data-testimonials-track]") ||
    qs(".testimonials-grid");

  const container = qs("#testimonials");

  if (!track || !container) {
    return;
  }

  testimonialsCardsList = qsa(
    "[data-testimonial-card]",
    track,
  );

  if (!testimonialsCardsList.length) {
    testimonialsCardsList = qsa(
      ".testimonial-card",
      track,
    );
  }

  if (!testimonialsCardsList.length) {
    return;
  }

  const prevBtn = qs(
    "[data-testimonials-prev]",
    container,
  );

  const nextBtn = qs(
    "[data-testimonials-next]",
    container,
  );

  updateTestimonialsCarouselState(0);

  prevBtn?.addEventListener("click", () => {
    if (testimonialsCarouselIndex > 0) {
      scrollToTestimonial(
        testimonialsCarouselIndex - 1,
      );
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (
      testimonialsCarouselIndex <
      testimonialsCardsList.length - 1
    ) {
      scrollToTestimonial(
        testimonialsCarouselIndex + 1,
      );
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isMobileViewport()) {
          return;
        }

        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index =
            testimonialsCardsList.indexOf(
              entry.target,
            );

          if (index !== -1) {
            updateTestimonialsCarouselState(
              index,
            );
          }
        });
      },
      {
        root: track,
        threshold: 0.55,
      },
    );

    testimonialsCardsList.forEach((card) => {
      observer.observe(card);
    });
  } else {
    const handleScroll = throttle(() => {
      if (!isMobileViewport()) {
        return;
      }

      const currentIndex =
        getActiveTestimonialIndex();

      if (
        currentIndex !==
        testimonialsCarouselIndex
      ) {
        updateTestimonialsCarouselState(
          currentIndex,
        );
      }
    }, 100);

    track.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );
  }

  const desktopQuery = window.matchMedia(
    "(min-width: 768px)",
  );

  const handleViewportChange = (event) => {
    if (!event.matches) {
      updateTestimonialsCarouselState(
        testimonialsCarouselIndex,
      );
    }
  };

  if (
    typeof desktopQuery.addEventListener ===
    "function"
  ) {
    desktopQuery.addEventListener(
      "change",
      handleViewportChange,
    );
  } else {
    desktopQuery.addListener(
      handleViewportChange,
    );
  }
}

function scrollToTestimonial(index) {
  if (
    index < 0 ||
    index >= testimonialsCardsList.length
  ) {
    return;
  }

  const targetCard =
    testimonialsCardsList[index];

  const track =
    qs("[data-testimonials-track]") ||
    qs(".testimonials-grid");

  if (!targetCard || !track) {
    return;
  }

  scrollCarouselItemIntoView(track, targetCard, {
    behavior: prefersReducedMotion()
      ? "auto"
      : "smooth",
  });

  updateTestimonialsCarouselState(index);
}

function getActiveTestimonialIndex() {
  const track =
    qs("[data-testimonials-track]") ||
    qs(".testimonials-grid");

  if (!track || !testimonialsCardsList.length) {
    return 0;
  }

  const trackRect = track.getBoundingClientRect();

  const trackCenter =
    trackRect.left + trackRect.width / 2;

  let closestIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  testimonialsCardsList.forEach(
    (card, index) => {
      const cardRect =
        card.getBoundingClientRect();

      const cardCenter =
        cardRect.left + cardRect.width / 2;

      const distance = Math.abs(
        trackCenter - cardCenter,
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    },
  );

  return closestIndex;
}

function updateTestimonialsCarouselState(index) {
  if (!testimonialsCardsList.length) {
    return;
  }

  testimonialsCarouselIndex = Math.max(
    0,
    Math.min(
      index,
      testimonialsCardsList.length - 1,
    ),
  );

  const container = qs("#testimonials");

  const prevBtn = qs(
    "[data-testimonials-prev]",
    container,
  );

  const nextBtn = qs(
    "[data-testimonials-next]",
    container,
  );

  const indicator = qs(
    "[data-testimonials-indicator]",
    container,
  );

  const total = testimonialsCardsList.length;

  if (indicator) {
    indicator.textContent =
      `${testimonialsCarouselIndex + 1} / ${total}`;

    indicator.setAttribute(
      "aria-label",
      t("testimonials.itemOf", {
        current: testimonialsCarouselIndex + 1,
        total,
      }),
    );
  }

  if (prevBtn) {
    const isDisabled =
      testimonialsCarouselIndex <= 0;

    prevBtn.disabled = isDisabled;

    prevBtn.setAttribute(
      "aria-disabled",
      String(isDisabled),
    );
  }

  if (nextBtn) {
    const isDisabled =
      testimonialsCarouselIndex >= total - 1;

    nextBtn.disabled = isDisabled;

    nextBtn.setAttribute(
      "aria-disabled",
      String(isDisabled),
    );
  }
}

/* =========================================================
   WhatsApp Booking
========================================================= */

function buildBookingMessage(branchName) {
  return [
    t("whatsAppMessages.bookingGreeting"),
    "",
    t("whatsAppMessages.branch", {
      branch: branchName,
    }),
    "",
    t("whatsAppMessages.bookingRequest"),
  ].join("\n");
}

function initWhatsAppBooking() {
  qsa("[data-booking-button]").forEach(
    (button) => {
      button.addEventListener("click", () => {
        const branchName = String(
          button.dataset.branch || "",
        ).trim();

        const phoneNumber = String(
          button.dataset.phone || "",
        ).replace(/\D/g, "");

        if (!branchName || !phoneNumber) {
          console.error(
            t("errors.incompleteBranch"),
            {
              branchName,
              phoneNumber,
            },
          );

          return;
        }

        const message =
          buildBookingMessage(branchName);

        openSecureWindow(
          `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message,
          )}`,
        );
      });
    },
  );
}

/* =========================================================
   Contact Form
========================================================= */

function validatePhoneNumber(phoneNumber) {
  return /^[0-9+\-\s()]{7,20}$/.test(
    String(phoneNumber || "").trim(),
  );
}

function initContactForm() {
  const contactForm = qs("#contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const nameInput = qs(
        "#name",
        contactForm,
      );

      const phoneInput = qs(
        "#phone",
        contactForm,
      );

      const messageInput = qs(
        "#message",
        contactForm,
      );

      const name =
        nameInput?.value.trim() || "";

      const phone =
        phoneInput?.value.trim() || "";

      const message =
        messageInput?.value.trim() || "";

      if (!name || !phone || !message) {
        window.alert(t("validation.required"));

        [
          nameInput,
          phoneInput,
          messageInput,
        ]
          .find(
            (input) =>
              !input?.value.trim(),
          )
          ?.focus();

        return;
      }

      if (!validatePhoneNumber(phone)) {
        window.alert(
          t("validation.invalidPhone"),
        );

        phoneInput?.focus();
        return;
      }

      const whatsappMessage = [
        t("whatsAppMessages.contactGreeting"),
        "",
        t("whatsAppMessages.name", {
          name,
        }),
        t("whatsAppMessages.phone", {
          phone,
        }),
        "",
        t("whatsAppMessages.message"),
        message,
      ].join("\n");

      openSecureWindow(
        `https://wa.me/972526020026?text=${encodeURIComponent(
          whatsappMessage,
        )}`,
      );

      contactForm.reset();

      qsa(".form-group", contactForm).forEach(
        (group) => {
          group.classList.remove(
            "focused",
            "has-value",
          );
        },
      );
    },
  );
}

function initFormFieldStates() {
  qsa(
    ".form-group input, .form-group textarea",
  ).forEach((input) => {
    const group = input.closest(".form-group");

    if (!group) {
      return;
    }

    const updateValueState = () => {
      group.classList.toggle(
        "has-value",
        Boolean(input.value.trim()),
      );
    };

    input.addEventListener("focus", () => {
      group.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      group.classList.remove("focused");
      updateValueState();
    });

    input.addEventListener(
      "input",
      updateValueState,
    );

    updateValueState();
  });
}

/* =========================================================
   Scroll Reveal
========================================================= */

function initScrollReveal() {
  const revealItems = qsa(
    [
      ".section-heading",
      ".service-card",
      ".treatment-card",
      ".team-card",
      ".feature-card",
      ".booking-card",
      ".testimonial-card",
      ".contact-item",
      ".contact-form",
    ].join(","),
  );

  if (!revealItems.length) {
    return;
  }

  if (
    !("IntersectionObserver" in window) ||
    prefersReducedMotion()
  ) {
    revealItems.forEach((item) => {
      item.classList.add("fade-in");
    });

    return;
  }

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(28px)";
  });

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const item = entry.target;

        item.classList.add("fade-in");
        item.style.opacity = "";
        item.style.transform = "";

        revealObserver.unobserve(item);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay =
      `${45 * Math.min(index % 6, 5)}ms`;

    observer.observe(item);
  });
}

/* =========================================================
   Interaction Feedback
========================================================= */

function initInteractionFeedback() {
  qsa(
    [
      ".btn",
      ".whatsapp-btn",
      ".language-toggle",
      ".language-option",
      ".social-link",
      ".floating-cta-btn",
      ".team-expand-btn",
    ].join(","),
  ).forEach((element) => {
    const removePressedState = () => {
      element.classList.remove("is-pressed");
    };

    element.addEventListener(
      "pointerdown",
      () => {
        element.classList.add("is-pressed");
      },
    );

    element.addEventListener(
      "pointerup",
      removePressedState,
    );

    element.addEventListener(
      "pointerleave",
      removePressedState,
    );

    element.addEventListener(
      "pointercancel",
      removePressedState,
    );

    element.addEventListener(
      "keyup",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          element.classList.add(
            "keyboard-active",
          );

          window.setTimeout(() => {
            element.classList.remove(
              "keyboard-active",
            );
          }, 180);
        }
      },
    );
  });
}

/* =========================================================
   Floating Mobile CTA
========================================================= */

function initFloatingCTA() {
  const floatingCta = qs(".floating-cta");

  const floatingButton = floatingCta
    ? qs(".floating-cta-btn", floatingCta)
    : null;

  const bookingSection = qs("#booking");
  const footer = qs(".footer");

  if (!floatingCta || !floatingButton) {
    return;
  }

  const updateFloatingCTA = () => {
    if (
      window.matchMedia(
        "(min-width: 768px)",
      ).matches
    ) {
      floatingCta.style.display = "none";
      return;
    }

    floatingCta.style.display = "";

    const bookingRect =
      bookingSection?.getBoundingClientRect();

    const footerRect =
      footer?.getBoundingClientRect();

    const bookingIsVisible = Boolean(
      bookingRect &&
        bookingRect.top <
          window.innerHeight * 0.78 &&
        bookingRect.bottom >
          window.innerHeight * 0.18,
    );

    const footerIsVisible = Boolean(
      footerRect &&
        footerRect.top <
          window.innerHeight - 72,
    );

    const shouldHide =
      bookingIsVisible || footerIsVisible;

    floatingCta.style.opacity = shouldHide
      ? "0"
      : "1";

    floatingCta.style.transform = shouldHide
      ? "translateY(20px)"
      : "translateY(0)";

    floatingCta.style.pointerEvents =
      shouldHide ? "none" : "auto";

    floatingButton.setAttribute(
      "aria-hidden",
      String(shouldHide),
    );

    floatingButton.tabIndex = shouldHide
      ? -1
      : 0;
  };

  updateFloatingCTA();

  window.addEventListener(
    "scroll",
    throttle(updateFloatingCTA, 120),
    {
      passive: true,
    },
  );

  window.addEventListener(
    "resize",
    debounce(updateFloatingCTA, 160),
  );
}

/* =========================================================
   Image Handling
========================================================= */

function initImages() {
  const fallbackImages = [
    "assets/images/hero/hero.jpeg",
    "assets/images/hero/hero-2.jpg",
    "assets/images/hero/hero-3.jpg",
    "assets/images/services/medical-massage.jpg",
    "assets/images/services/dry-cupping.jpg",
  ];

  qsa("img").forEach((image, index) => {
    if (
      !image.hasAttribute("loading") &&
      !image.hasAttribute("fetchpriority")
    ) {
      image.loading = "lazy";
    }

    const markAsLoaded = () => {
      image.classList.add("is-loaded");
    };

    if (
      image.complete &&
      image.naturalWidth > 0
    ) {
      markAsLoaded();
    } else {
      image.addEventListener(
        "load",
        markAsLoaded,
        {
          once: true,
        },
      );
    }

    if (
      image.matches(
        "[data-specialist-image], #specialistModalImg",
      )
    ) {
      return;
    }

    image.addEventListener("error", () => {
      if (
        image.dataset.fallbackApplied ===
        "true"
      ) {
        return;
      }

      image.dataset.fallbackApplied = "true";

      image.src =
        fallbackImages[
          index % fallbackImages.length
        ];
    });
  });
}

/* =========================================================
   External Link Security
========================================================= */

function secureExternalLinks() {
  qsa('a[target="_blank"]').forEach((link) => {
    const relValues = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean),
    );

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute(
      "rel",
      Array.from(relValues).join(" "),
    );
  });
}

/* =========================================================
   Footer Year
========================================================= */

function updateFooterYear() {
  const footerText = qs(".footer-bottom p");

  if (!footerText) {
    return;
  }

  const yearElement = qs(
    "#currentYear",
    footerText,
  );

  const copyrightElement = qs(
    '[data-i18n="footer.copyright"]',
    footerText,
  );

  if (yearElement) {
    yearElement.textContent = String(
      new Date().getFullYear(),
    );
  }

  if (copyrightElement) {
    copyrightElement.textContent = t(
      "footer.copyright",
    );
  }
}

/* =========================================================
   Desktop Card Tilt
========================================================= */

function initDesktopCardTilt() {
  if (prefersReducedMotion()) {
    return;
  }

  if (
    !window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches
  ) {
    return;
  }

  qsa(
    [
      ".service-card",
      ".treatment-card",
      ".feature-card",
    ].join(","),
  ).forEach((card) => {
    card.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY =
          -4 * (x / rect.width - 0.5);

        const rotateX =
          4 * (y / rect.height - 0.5);

        card.style.transform =
          `translateY(-5px) ` +
          `rotateX(${rotateX}deg) ` +
          `rotateY(${rotateY}deg)`;
      },
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.style.transform = "";
      },
    );
  });
}

/* =========================================================
   Initialization
========================================================= */

function initializeWebsite() {
  initializeInternationalization();
  initMobileNavigation();
  initSmoothScroll();
  initHeaderScrollState();
  initActiveNavigation();
  initSpecialistExperience();
  initTestimonialsCarousel();
  initWhatsAppBooking();
  initContactForm();
  initFormFieldStates();
  initScrollReveal();
  initInteractionFeedback();
  initFloatingCTA();
  initImages();
  secureExternalLinks();
  updateFooterYear();
  initDesktopCardTilt();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite,
    {
      once: true,
    },
  );
} else {
  initializeWebsite();
}

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});