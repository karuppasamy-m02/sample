// ============================================
// ✏️ EDIT HERE
// ============================================

const CONFIG = {
  // Birthday Girl's Name
  girlName: "Swathi",

  // Password for Step 1 (Case-insensitive)
  password: "Swathi",

  // Sender's Name / Signature
  senderName: "Your Fav Person",

  // EXACTLY 3 Personal Photos (No other images used)
  photos: {
    photo1: "assets/photo1.jpg",
    photo2: "assets/photo2.jpg",
    photo3: "assets/photo3.jpg"
  },

  // Music Configuration
  music: {
    title: "Oorum Blood Unplugged",
    artist: "Sai Abhyankkar & Paal Dabba (From 'Dude')",
    file: "assets/birthday-song.mp3",
    cover: "assets/photo2.jpg"
  }
};

/* ==========================================================================
   CENTRALIZED 10-STEP NAVIGATION ENGINE
   ========================================================================== */

let currentStep = 1;
const TOTAL_STEPS = 10;
let isMusicPlaying = false;
let trackDuration = 80;
let scratchCompleted = false;

document.addEventListener("DOMContentLoaded", () => {
  injectConfig();
  initBackgroundFloatingHearts();
  initStep1Password();
  initStep2Gift();
  initStep3Music();
  initStep4HeartGame();
  initStep5ScratchCard();
  initStep6MemoryGame();
  initStep7Photos();
  initStep8Letter();
  initStep9CakeCutting();
  initStep10Finale();
  initMusicFab();

  // Initialize Step 1
  showStep(1);
});

/* --------------------------------------------------------------------------
   STEP CONTROLLER (STRICTLY ONE STEP AT A TIME)
   -------------------------------------------------------------------------- */
function showStep(stepNum) {
  if (stepNum < 1 || stepNum > TOTAL_STEPS) return;

  const allSteps = document.querySelectorAll(".step");
  allSteps.forEach((el) => el.classList.remove("active"));

  const target = document.querySelector(`[data-step="${stepNum}"]`);
  if (target) {
    target.classList.add("active");
  }

  currentStep = stepNum;
  updateProgress();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Step 10 Finale Trigger
  if (currentStep === 10) {
    triggerFinaleSequence();
  }
}

function nextStep() {
  if (currentStep >= TOTAL_STEPS) return;
  showStep(currentStep + 1);
}

function previousStep() {
  if (currentStep <= 1) return;
  showStep(currentStep - 1);
}

function updateProgress() {
  const stepText = document.getElementById("stepNumberText");
  const fillBar = document.getElementById("progressFillBar");

  if (stepText) {
    stepText.textContent = `STEP ${currentStep} OF ${TOTAL_STEPS}`;
  }

  if (fillBar) {
    const pct = ((currentStep / TOTAL_STEPS) * 100).toFixed(1);
    fillBar.style.width = `${pct}%`;
  }
}

/* --------------------------------------------------------------------------
   CONFIG INJECTION
   -------------------------------------------------------------------------- */
function injectConfig() {
  // Photos
  const p1 = document.getElementById("galleryPhoto1");
  const p2 = document.getElementById("galleryPhoto2");
  const p3 = document.getElementById("galleryPhoto3");
  const musicCover = document.getElementById("musicCoverArt");

  if (p1 && CONFIG.photos.photo1) p1.src = CONFIG.photos.photo1;
  if (p2 && CONFIG.photos.photo2) p2.src = CONFIG.photos.photo2;
  if (p3 && CONFIG.photos.photo3) p3.src = CONFIG.photos.photo3;
  if (musicCover && CONFIG.photos.photo2) musicCover.src = CONFIG.photos.photo2;

  // Music Meta
  const trackTitle = document.getElementById("musicTrackTitle");
  const trackArtist = document.getElementById("musicTrackArtist");
  if (trackTitle) trackTitle.textContent = CONFIG.music.title;
  if (trackArtist) trackArtist.textContent = CONFIG.music.artist;

  // Recipient & Senders
  const recipient = document.getElementById("letterRecipientName");
  if (recipient) recipient.textContent = CONFIG.girlName;

  const sign = document.getElementById("letterSignName");
  if (sign) sign.textContent = `— From ${CONFIG.senderName}`;

  const header = document.getElementById("finalBirthdayHeader");
  if (header) header.textContent = `HAPPY BIRTHDAY, ${CONFIG.girlName.toUpperCase()} 🎂✨`;

  const finalSig = document.getElementById("finalFriendSig");
  if (finalSig) finalSig.textContent = `— ${CONFIG.senderName}`;

  // Audio setup
  const audio = document.getElementById("nativeAudio");
  if (audio && CONFIG.music.file) {
    audio.src = CONFIG.music.file;
    audio.volume = 1.0;
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }
}

/* --------------------------------------------------------------------------
   FLOATING CIRCULAR MUSIC BUTTON (FAB — 56px x 56px)
   -------------------------------------------------------------------------- */
function initMusicFab() {
  const fab = document.getElementById("musicFabBtn");
  const audio = document.getElementById("nativeAudio");

  if (!fab || !audio) return;

  function toggleAudio() {
    if (audio.paused) {
      audio.play().then(() => {
        isMusicPlaying = true;
        fab.classList.add("playing");
        updateMusicStepUI(true);
      }).catch(() => {
        isMusicPlaying = true;
        fab.classList.add("playing");
        updateMusicStepUI(true);
      });
    } else {
      audio.pause();
      isMusicPlaying = false;
      fab.classList.remove("playing");
      updateMusicStepUI(false);
    }
  }

  fab.addEventListener("click", toggleAudio);
}

function startAudioIfAvailable() {
  const audio = document.getElementById("nativeAudio");
  const fab = document.getElementById("musicFabBtn");
  if (audio && audio.paused) {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (fab) fab.classList.add("playing");
      updateMusicStepUI(true);
    }).catch(() => {});
  }
}

function updateMusicStepUI(playing) {
  const playBtnText = document.getElementById("playSongBtnText");
  const discWrap = document.getElementById("musicDiscWrap");
  const waveAnim = document.getElementById("waveformAnim");
  const fab = document.getElementById("musicFabBtn");

  if (playBtnText) playBtnText.textContent = playing ? "⏸ PAUSE SONG" : "▶ PLAY THE SONG";
  if (discWrap) {
    if (playing) discWrap.classList.add("playing");
    else discWrap.classList.remove("playing");
  }
  if (waveAnim) {
    if (playing) waveAnim.classList.add("playing");
    else waveAnim.classList.remove("playing");
  }
  if (fab) {
    if (playing) fab.classList.add("playing");
    else fab.classList.remove("playing");
  }
}

/* --------------------------------------------------------------------------
   STEP 1: 🔐 PASSWORD ENTRY
   -------------------------------------------------------------------------- */
function initStep1Password() {
  const form = document.getElementById("passwordForm");
  const input = document.getElementById("passwordInput");
  const unlockBtn = document.getElementById("unlockBtn");
  const errorMsg = document.getElementById("passwordErrorMsg");
  const successMsg = document.getElementById("passwordSuccessMsg");
  const card = document.getElementById("passwordCard");
  const lockIcon = document.getElementById("lockIcon");
  const nextWrap = document.getElementById("step1NextWrap");
  const nextBtn = document.getElementById("step1NextBtn");

  function verifyPassword() {
    const val = (input ? input.value : "").trim().toLowerCase();
    const correct = (CONFIG.password || "Swathi").trim().toLowerCase();

    if (val === correct) {
      if (errorMsg) errorMsg.classList.add("hidden");
      if (successMsg) successMsg.classList.remove("hidden");
      if (lockIcon) lockIcon.textContent = "🔓";
      if (unlockBtn) unlockBtn.classList.add("hidden");
      if (nextWrap) nextWrap.classList.remove("hidden");
      triggerConfetti();
    } else {
      if (errorMsg) errorMsg.classList.remove("hidden");
      if (successMsg) successMsg.classList.add("hidden");
      if (card) {
        card.classList.remove("shake-anim");
        void card.offsetWidth;
        card.classList.add("shake-anim");
      }
    }
  }

  if (form) form.addEventListener("submit", verifyPassword);
  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 2: 🎁 OPEN SURPRISE
   -------------------------------------------------------------------------- */
function initStep2Gift() {
  const trigger = document.getElementById("giftBoxTrigger");
  const openBtn = document.getElementById("openGiftBtn");
  const initialBtnWrap = document.getElementById("giftInitialBtnWrap");
  const openedWrap = document.getElementById("giftOpenedWrap");
  const nextBtn = document.getElementById("step2NextBtn");

  let giftOpened = false;

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    const box = document.querySelector(".gift-box-3d");
    if (box) box.classList.add("opened");
    triggerConfetti();

    // Start background music seamlessly
    startAudioIfAvailable();

    if (initialBtnWrap) initialBtnWrap.classList.add("hidden");
    if (openedWrap) openedWrap.classList.remove("hidden");
  }

  if (trigger) trigger.addEventListener("click", openGift);
  if (openBtn) openBtn.addEventListener("click", openGift);
  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 3: 🎵 DEDICATED MUSIC STEP
   -------------------------------------------------------------------------- */
function initStep3Music() {
  const audio = document.getElementById("nativeAudio");
  const playBtn = document.getElementById("playSongMainBtn");
  const progressBar = document.getElementById("musicProgressBar");
  const progressFill = document.getElementById("musicProgressFill");
  const curTime = document.getElementById("musicCurrentTime");
  const totTime = document.getElementById("musicTotalTime");
  const nextBtn = document.getElementById("step3NextBtn");

  if (audio) {
    audio.addEventListener("loadedmetadata", () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        trackDuration = Math.floor(audio.duration);
        if (totTime) {
          const m = Math.floor(trackDuration / 60);
          const s = (trackDuration % 60).toString().padStart(2, "0");
          totTime.textContent = `${m}:${s}`;
        }
      }
    });

    audio.addEventListener("timeupdate", () => {
      if (!isNaN(audio.currentTime)) {
        if (progressFill) {
          const pct = Math.min(100, Math.max(0, (audio.currentTime / trackDuration) * 100));
          progressFill.style.width = `${pct}%`;
        }
        if (curTime) {
          const m = Math.floor(audio.currentTime / 60);
          const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
          curTime.textContent = `${m}:${s}`;
        }
      }
    });
  }

  function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        isMusicPlaying = true;
        updateMusicStepUI(true);
      }).catch(() => {
        isMusicPlaying = true;
        updateMusicStepUI(true);
      });
    } else {
      audio.pause();
      isMusicPlaying = false;
      updateMusicStepUI(false);
    }
  }

  if (playBtn) playBtn.addEventListener("click", togglePlay);

  if (progressBar) {
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (audio && !isNaN(audio.duration)) audio.currentTime = ratio * trackDuration;
    });
  }

  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 4: ❤️ CATCH THE HEARTS GAME
   -------------------------------------------------------------------------- */
function initStep4HeartGame() {
  const startBtn = document.getElementById("startHeartBtn");
  const arena = document.getElementById("heartGameArena");
  const scoreVal = document.getElementById("heartScoreVal");
  const timerVal = document.getElementById("heartTimerVal");
  const startOverlay = document.getElementById("heartStartOverlay");
  const resultOverlay = document.getElementById("heartResultOverlay");
  const resultHeader = document.getElementById("heartResultHeader");
  const resultDesc = document.getElementById("heartResultDesc");
  const retryBtn = document.getElementById("heartRetryBtn");
  const nextWrap = document.getElementById("step4NextWrap");
  const nextBtn = document.getElementById("step4NextBtn");

  let score = 0;
  let timeLeft = 20;
  let gameInterval = null;
  let spawnInterval = null;
  let isRunning = false;

  function startGame() {
    score = 0;
    timeLeft = 20;
    isRunning = true;
    if (scoreVal) scoreVal.textContent = "0";
    if (timerVal) timerVal.textContent = "20";
    if (startOverlay) startOverlay.classList.add("hidden");
    if (resultOverlay) resultOverlay.classList.add("hidden");
    if (retryBtn) retryBtn.classList.add("hidden");
    if (nextWrap) nextWrap.classList.add("hidden");

    gameInterval = setInterval(() => {
      timeLeft--;
      if (timerVal) timerVal.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);

    spawnInterval = setInterval(() => {
      if (!isRunning) return;
      spawnHeart();
    }, 600);
  }

  function spawnHeart() {
    if (!arena) return;
    const heart = document.createElement("div");
    heart.className = "falling-heart-item";
    heart.textContent = Math.random() > 0.3 ? "❤️" : "🌸";

    const maxLeft = arena.clientWidth - 40;
    heart.style.left = `${Math.floor(Math.random() * Math.max(10, maxLeft))}px`;
    const fallDuration = (Math.random() * 1.5 + 2.0).toFixed(1);
    heart.style.animationDuration = `${fallDuration}s`;

    function onCatch(e) {
      e.stopPropagation();
      if (!isRunning) return;
      score++;
      if (scoreVal) scoreVal.textContent = score;
      heart.remove();

      if (score >= 10) {
        endGame(true);
      }
    }

    heart.addEventListener("click", onCatch);
    heart.addEventListener("touchstart", onCatch, { passive: true });

    arena.appendChild(heart);

    setTimeout(() => {
      if (heart && heart.parentNode) heart.remove();
    }, parseFloat(fallDuration) * 1000);
  }

  function endGame(won) {
    isRunning = false;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);

    arena.querySelectorAll(".falling-heart-item").forEach((h) => h.remove());

    if (resultOverlay) resultOverlay.classList.remove("hidden");

    if (won) {
      triggerConfetti();
      if (resultHeader) resultHeader.textContent = "YOU DID IT! 🎉";
      if (resultDesc) resultDesc.textContent = "You caught all 10 hearts!";
      if (nextWrap) nextWrap.classList.remove("hidden");
    } else {
      if (resultHeader) resultHeader.textContent = "Almost! Try again 😄";
      if (resultDesc) resultDesc.textContent = `You caught ${score} hearts. You need 10 to continue.`;
      if (retryBtn) retryBtn.classList.remove("hidden");
    }
  }

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (retryBtn) retryBtn.addEventListener("click", startGame);
  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 5: 🃏 SCRATCH CARD
   -------------------------------------------------------------------------- */
function initStep5ScratchCard() {
  const canvas = document.getElementById("scratchCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const pctLabel = document.getElementById("scratchPctLabel");
  const nextWrap = document.getElementById("step5NextWrap");
  const nextBtn = document.getElementById("step5NextBtn");

  let isScratching = false;
  let lastX = 0;
  let lastY = 0;

  function initSurface() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#ffd1e4");
    grad.addColorStop(0.5, "#ff9fc3");
    grad.addColorStop(1, "#f3c7dc");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 15px 'Outfit', sans-serif";
    ctx.fillStyle = "#a82d61";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", canvas.width / 2, canvas.height / 2 + 5);
  }

  initSurface();

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function doScratch(e) {
    if (!isScratching || scratchCompleted) return;
    e.preventDefault();

    const pt = getCoords(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (lastX && lastY) {
      ctx.lineWidth = 44;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    }

    lastX = pt.x;
    lastY = pt.y;
    checkScratch();
  }

  function checkScratch() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let clear = 0;
    const step = 24;

    for (let i = 3; i < data.length; i += step * 4) {
      if (data[i] === 0) clear++;
    }

    const total = data.length / (step * 4);
    const pct = Math.round((clear / total) * 100);

    if (pctLabel) pctLabel.textContent = `Scratched: ${pct}%`;

    if (pct >= 45 && !scratchCompleted) {
      scratchCompleted = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (pctLabel) pctLabel.textContent = "🎉 REVEALED! ✨";
      if (nextWrap) nextWrap.classList.remove("hidden");
      triggerConfetti();
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    isScratching = true;
    const pt = getCoords(e);
    lastX = pt.x;
    lastY = pt.y;
    doScratch(e);
  });
  window.addEventListener("mousemove", doScratch);
  window.addEventListener("mouseup", () => {
    isScratching = false;
    lastX = 0;
    lastY = 0;
  });

  canvas.addEventListener("touchstart", (e) => {
    isScratching = true;
    const pt = getCoords(e);
    lastX = pt.x;
    lastY = pt.y;
    doScratch(e);
  }, { passive: false });
  window.addEventListener("touchmove", doScratch, { passive: false });
  window.addEventListener("touchend", () => {
    isScratching = false;
    lastX = 0;
    lastY = 0;
  });

  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 6: 🧩 MEMORY MATCH GAME
   -------------------------------------------------------------------------- */
function initStep6MemoryGame() {
  const grid = document.getElementById("memoryCardsGrid");
  const movesLabel = document.getElementById("memoryMovesLabel");
  const successMsg = document.getElementById("memorySuccessMsg");
  const nextWrap = document.getElementById("step6NextWrap");
  const nextBtn = document.getElementById("step6NextBtn");

  const icons = ["🌸", "🌸", "🎂", "🎂", "✨", "✨"];
  icons.sort(() => Math.random() - 0.5);

  let flipped = [];
  let matches = 0;
  let moves = 0;

  if (grid) {
    grid.innerHTML = "";
    icons.forEach((icon) => {
      const tile = document.createElement("div");
      tile.className = "memory-tile";
      tile.dataset.icon = icon;
      tile.textContent = "?";

      tile.addEventListener("click", () => {
        if (tile.classList.contains("flipped") || tile.classList.contains("matched") || flipped.length >= 2) {
          return;
        }

        tile.classList.add("flipped");
        tile.textContent = icon;
        flipped.push(tile);

        if (flipped.length === 2) {
          moves++;
          if (movesLabel) movesLabel.textContent = `Moves: ${moves}`;

          const [t1, t2] = flipped;
          if (t1.dataset.icon === t2.dataset.icon) {
            t1.classList.add("matched");
            t2.classList.add("matched");
            matches++;
            flipped = [];

            if (matches === 3) {
              triggerConfetti();
              if (successMsg) successMsg.classList.remove("hidden");
              if (nextWrap) nextWrap.classList.remove("hidden");
            }
          } else {
            setTimeout(() => {
              t1.classList.remove("flipped");
              t1.textContent = "?";
              t2.classList.remove("flipped");
              t2.textContent = "?";
              flipped = [];
            }, 700);
          }
        }
      });

      grid.appendChild(tile);
    });
  }

  if (nextBtn) nextBtn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 7: 📸 MEMORY PHOTOS (3-PHOTO INTERACTIVE & AUTO-SLIDESHOW)
   -------------------------------------------------------------------------- */
function initStep7Photos() {
  const slides = document.querySelectorAll("#photoSliderTrack .photo-slide");
  const dots = document.querySelectorAll("#sliderPagination .slide-dot");
  const prevBtn = document.getElementById("sliderPrevBtn");
  const nextBtn = document.getElementById("sliderNextBtn");
  const step7Btn = document.getElementById("step7NextBtn");
  const container = document.getElementById("photoSliderContainer");

  let currentSlide = 0;
  const totalSlides = slides.length || 3;
  let autoSlideInterval = null;

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    slides.forEach((s, idx) => {
      if (idx === currentSlide) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });

    dots.forEach((d, idx) => {
      if (idx === currentSlide) {
        d.classList.add("active");
      } else {
        d.classList.remove("active");
      }
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      if (currentStep === 7) {
        showSlide(currentSlide + 1);
      }
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
      resetAutoSlide();
    });
  }

  dots.forEach((d) => {
    d.addEventListener("click", () => {
      const idx = parseInt(d.dataset.index, 10);
      if (!isNaN(idx)) {
        showSlide(idx);
        resetAutoSlide();
      }
    });
  });

  // Mobile Touch Swipe & Auto-Slide Pause/Resume
  if (container) {
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener("touchstart", (e) => {
      stopAutoSlide();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        showSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + 40) {
        showSlide(currentSlide - 1);
      }
      startAutoSlide();
    }, { passive: true });

    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);
  }

  // Start auto slideshow
  startAutoSlide();

  if (step7Btn) step7Btn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 8: 💌 SECRET LETTER (CLEAN & RELIABLE NAVIGATION)
   -------------------------------------------------------------------------- */
function initStep8Letter() {
  const openLetterBtn = document.getElementById("openLetterBtn");
  const envWrap = document.getElementById("letterEnvelopeWrap");
  const unfoldedCard = document.getElementById("unfoldedLetterCard");
  const letterInitialWrap = document.getElementById("letterInitialBtnWrap");
  const step8NextWrap = document.getElementById("step8NextWrap");
  const step8Btn = document.getElementById("step8NextBtn");

  function openLetter() {
    if (envWrap) envWrap.classList.add("hidden");
    if (unfoldedCard) unfoldedCard.classList.remove("hidden");
    if (letterInitialWrap) letterInitialWrap.classList.add("hidden");
    if (step8NextWrap) step8NextWrap.classList.remove("hidden");
    triggerConfetti();
  }

  if (openLetterBtn) openLetterBtn.addEventListener("click", openLetter);
  if (envWrap) envWrap.addEventListener("click", openLetter);
  if (step8Btn) step8Btn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 9: 🎂 CAKE CUTTING MOMENT
   -------------------------------------------------------------------------- */
function initStep9CakeCutting() {
  const btnMakeWish = document.getElementById("btnMakeWish");
  const btnBlowCandles = document.getElementById("btnBlowCandles");
  const btnCutCake = document.getElementById("btnCutCake");
  const cakeHeading = document.getElementById("cakeStepHeading");
  const cakeSubheading = document.getElementById("cakeStepSubheading");
  const cakeStatus = document.getElementById("cakeStatusText");
  const knife = document.getElementById("cakeKnifeElem");
  const cutLine = document.getElementById("cakeCutLine");
  const frontSlice = document.getElementById("cakeFrontSlice");
  const hiddenNote = document.getElementById("cakeHiddenNote");
  const step9NextWrap = document.getElementById("step9NextWrap");
  const step9Btn = document.getElementById("step9NextBtn");

  const flames = document.querySelectorAll("#candlesRow .candle-flame");
  const smokes = document.querySelectorAll("#candlesRow .smoke-fx");

  // Phase 1: Make A Wish
  if (btnMakeWish) {
    btnMakeWish.addEventListener("click", () => {
      btnMakeWish.classList.add("hidden");
      if (cakeStatus) cakeStatus.textContent = "Make your wish... 🤍";

      triggerConfetti();

      setTimeout(() => {
        if (cakeHeading) cakeHeading.textContent = "Let's cut the cake 🎂";
        if (cakeSubheading) cakeSubheading.textContent = "Blow out the candles first ✨";
        if (btnBlowCandles) btnBlowCandles.classList.remove("hidden");
        if (cakeStatus) cakeStatus.textContent = "";
      }, 2000);
    });
  }

  // Phase 2: Blow Candles
  if (btnBlowCandles) {
    btnBlowCandles.addEventListener("click", () => {
      btnBlowCandles.classList.add("hidden");
      if (cakeStatus) cakeStatus.textContent = "Blowing candles...";

      flames.forEach((flame, idx) => {
        setTimeout(() => {
          flame.classList.add("extinguished");
          if (smokes[idx]) smokes[idx].classList.add("rise");
        }, idx * 180);
      });

      setTimeout(() => {
        if (cakeStatus) cakeStatus.textContent = "WISH MADE ✨";
        triggerConfetti();

        setTimeout(() => {
          if (cakeStatus) cakeStatus.textContent = "";
          if (btnCutCake) btnCutCake.classList.remove("hidden");
        }, 1500);
      }, 1100);
    });
  }

  // Phase 3: Cut Cake
  if (btnCutCake) {
    btnCutCake.addEventListener("click", () => {
      btnCutCake.classList.add("hidden");
      if (cakeStatus) cakeStatus.textContent = "Cutting the cake...";

      if (knife) knife.classList.add("cutting");

      setTimeout(() => {
        if (cutLine) cutLine.classList.add("visible");
        if (frontSlice) frontSlice.classList.add("separated");
        if (hiddenNote) hiddenNote.classList.add("revealed");

        triggerConfettiCascade();
        if (cakeStatus) cakeStatus.textContent = "CAKE CUT! 🎂✨";

        setTimeout(() => {
          if (step9NextWrap) step9NextWrap.classList.remove("hidden");
        }, 1200);
      }, 1200);
    });
  }

  if (step9Btn) step9Btn.addEventListener("click", nextStep);
}

/* --------------------------------------------------------------------------
   STEP 10: 🎉 FINALE & CELEBRATION
   -------------------------------------------------------------------------- */
function initStep10Finale() {
  const enjoyBtn = document.getElementById("enjoyMomentBtn");
  if (enjoyBtn) {
    enjoyBtn.addEventListener("click", () => {
      triggerConfettiCascade();
    });
  }
}

function triggerFinaleSequence() {
  const lines = document.querySelectorAll(".tribute-lines .t-line");
  lines.forEach((line, idx) => {
    setTimeout(() => {
      line.classList.add("show-line");
    }, (idx + 1) * 700);
  });

  setTimeout(() => {
    triggerConfettiCascade();
  }, 3500);
}

/* --------------------------------------------------------------------------
   CONFETTI UTILITIES
   -------------------------------------------------------------------------- */
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#ff4f9a", "#ff78a8", "#ffd1e4", "#ffffff"]
    });
  }
}

function triggerConfettiCascade() {
  if (typeof confetti !== "function") return;

  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      spread: 70,
      origin: { x: 0.2 + Math.random() * 0.6, y: 0.6 },
      colors: ["#ff4f9a", "#ff78a8", "#ffd1e4", "#ffffff", "#f2e9ff"]
    });
  }, 350);
}

/* --------------------------------------------------------------------------
   FLOATING BACKGROUND HEARTS (SUBTLE & BEAUTIFUL)
   -------------------------------------------------------------------------- */
function initBackgroundFloatingHearts() {
  const container = document.getElementById("floatingHeartsBg");
  if (!container) return;

  const heartIcons = ["❤️", "🌸", "🤍", "✨", "💖"];
  const totalFloating = 14;

  for (let i = 0; i < totalFloating; i++) {
    createBgHeart(container, heartIcons, true);
  }

  setInterval(() => {
    if (container.children.length < 18) {
      createBgHeart(container, heartIcons, false);
    }
  }, 2200);
}

function createBgHeart(container, icons, isInitial) {
  const heart = document.createElement("span");
  heart.className = "bg-heart";
  heart.textContent = icons[Math.floor(Math.random() * icons.length)];

  const leftPos = Math.random() * 96;
  const animDuration = Math.random() * 8 + 9;
  const size = (Math.random() * 0.7 + 0.8).toFixed(2);
  const delay = isInitial ? -(Math.random() * animDuration) : 0;

  heart.style.left = `${leftPos}%`;
  heart.style.fontSize = `${size}rem`;
  heart.style.animationDuration = `${animDuration}s`;
  heart.style.animationDelay = `${delay}s`;

  container.appendChild(heart);

  setTimeout(() => {
    if (heart && heart.parentNode) {
      heart.remove();
    }
  }, (animDuration + Math.abs(delay)) * 1000);
}
