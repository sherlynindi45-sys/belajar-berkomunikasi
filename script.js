const scenarios = [
  {
    category: "Kerja Kelompok",
    text: "Rekan satu timmu belum mengumpulkan bagian tugasnya padahal tenggat waktu tinggal 3 jam lagi. Apa yang kamu katakan?",
    options: [
      {
        text: "Kamu selalu menunda pekerjaan! Kalau nilai kita jelek, ini salahmu.",
        isBest: false,
        feedback: "Respons ini bersifat agresif dan menyudutkan (menggunakan 'You-Statement'), yang justru memicu sikap defensif."
      },
      {
        text: "Hai, saya khawatir kita kehabisan waktu untuk menyatukan file. Bagian mana yang masih perlu dibantu supaya bisa selesai tepat waktu?",
        isBest: true,
        feedback: "Tepat! Menggunakan 'I-Statement' untuk menyampaikan kekhawatiran secara objektif sekaligus menawarkan solusi kolaboratif."
      },
      {
        text: "Ya sudah tidak apa-apa, biar saya saja yang kerjakan semuanya sekarang.",
        isBest: false,
        feedback: "Ini adalah respons pasif. Mengambil alih semua beban tanpa komunikasi membuat masalah tidak terselesaikan dan memicu kelelahan."
      }
    ]
  },
  {
    category: "Mendengar Aktif",
    text: "Temanmu bercerita dengan nada kecewa karena presentasinya tadi kurang berjalan lancar. Respons terbaikmu adalah...",
    options: [
      {
        text: "Wajar sih, tadi kamu memang terlihat kurang persiapan dan bicaranya terlalu cepat.",
        isBest: false,
        feedback: "Memberikan kritik langsung saat lawan bicara sedang emosional membuat mereka merasa tidak didengarkan."
      },
      {
        text: "Ah, santai saja. Saya dulu pernah mengalami hal yang jauh lebih buruk dari itu.",
        isBest: false,
        feedback: "Membandingkan pengalaman justru mengalihkan fokus pembicaraan dari perasaan temanmu ke dirimu sendiri."
      },
      {
        text: "Kedengarannya kamu kecewa karena hasilnya belum sesuai harapanmu. Bagian mana yang paling membuatmu merasa kurang puas?",
        isBest: true,
        feedback: "Sangat baik! Kamu melakukan validasi emosi dan membuka ruang agar ia merasa aman bercerita."
      }
    ]
  },
  {
    category: "Menolak Permintaan",
    text: "Teman meminta bantuanmu mengedit desain malam ini, sementara kamu harus istirahat karena besok ada ujian pagi.",
    options: [
      {
        text: "Maaf, malam ini saya belum bisa bantu karena harus istirahat untuk ujian besok. Bagaimana kalau saya bantu cek besok siang?",
        isBest: true,
        feedback: "Asertif dan sopan! Kamu menolak dengan alasan yang jelas tanpa rasa bersalah berlebihan, serta memberi alternatif waktu."
      },
      {
        text: "Hmm, lihat nanti ya (padahal dalam hati tidak mau dan berniat mengabaikan pesannya).",
        isBest: false,
        feedback: "Memberi harapan palsu atau menghindar dapat merusak kepercayaan dalam jangka panjang."
      },
      {
        text: "Bisa tidak sih kamu kerjakan sendiri? Saya juga sibuk.",
        isBest: false,
        feedback: "Nada bicara yang ketus dapat melukai hubungan pertemanan meski maksudmu ingin menolak."
      }
    ]
  }
];

let currentIndex = 0;
let score = 0;

const counterEl = document.getElementById("question-counter");
const scoreEl = document.getElementById("score-display");
const categoryEl = document.getElementById("scenario-category");
const textEl = document.getElementById("scenario-text");
const optionsEl = document.getElementById("options-container");
const feedbackBox = document.getElementById("feedback-box");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");

function loadScenario() {
  const current = scenarios[currentIndex];
  counterEl.textContent = `Skenario ${currentIndex + 1} dari ${scenarios.length}`;
  categoryEl.textContent = current.category;
  textEl.textContent = current.text;

  optionsEl.innerHTML = "";
  feedbackBox.classList.add("hidden");

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option.text;
    btn.addEventListener("click", () => selectOption(btn, option));
    optionsEl.appendChild(btn);
  });
}

function selectOption(selectedBtn, option) {
  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach((btn) => (btn.disabled = true));

  feedbackBox.classList.remove("hidden", "best", "improve");

  if (option.isBest) {
    score += 10;
    scoreEl.textContent = `Skor: ${score}`;
    selectedBtn.classList.add("selected-best");
    feedbackBox.classList.add("best");
    feedbackTitle.textContent = "Respons Asertif & Tepat!";
  } else {
    selectedBtn.classList.add("selected-other");
    feedbackBox.classList.add("improve");
    feedbackTitle.textContent = "Bisa Ditingkatkan";
  }

  feedbackText.textContent = option.feedback;
  nextBtn.textContent =
    currentIndex < scenarios.length - 1 ? "Skenario Berikutnya" : "Lihat Hasil Akhir";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < scenarios.length) {
    loadScenario();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  categoryEl.textContent = "Selesai";
  textEl.textContent = `Kamu telah menyelesaikan seluruh simulasi dengan skor ${score} dari ${scenarios.length * 10}. Terus latih empati dan kejelasan pesan dalam percakapan sehari-hari!`;
  optionsEl.innerHTML = "";
  feedbackBox.classList.add("hidden");

  const restartBtn = document.createElement("button");
  restartBtn.className = "btn-primary";
  restartBtn.textContent = "Ulangi Simulasi";
  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = "Skor: 0";
    loadScenario();
  });
  optionsEl.appendChild(restartBtn);
}

loadScenario();
