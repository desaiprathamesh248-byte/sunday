const slides = [...document.querySelectorAll(".slide")];
const progressFill = document.getElementById("progressFill");
const currentNum = document.getElementById("currentNum");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");
let current = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (index === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsWrap.appendChild(dot);
});
const dots = [...dotsWrap.children];

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  currentNum.textContent = String(current + 1).padStart(2, "0");
  progressFill.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
}
prevBtn.addEventListener("click", () => showSlide(current - 1));
nextBtn.addEventListener("click", () => showSlide(current + 1));
document.getElementById("startBtn").addEventListener("click", () => showSlide(1));
document.getElementById("restartBtn").addEventListener("click", () => showSlide(0));
document.getElementById("revealBtn").addEventListener("click", () => {
  document.getElementById("envelope").classList.add("open");
  document.getElementById("revealMessage").classList.add("show");
  document.getElementById("revealBtn").textContent = "A message just for you ♡";
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showSlide(current + 1);
  if (event.key === "ArrowLeft") showSlide(current - 1);
});

// Gentle original synthesized melody. No music file or copyrighted song is included.
let audioContext = null;
let melodyTimer = null;
let noteIndex = 0;
const musicBtn = document.getElementById("musicBtn");
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];

function playNote(frequency) {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.48);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}
function stopMusic() {
  if (melodyTimer) clearInterval(melodyTimer);
  melodyTimer = null;
  musicBtn.classList.remove("playing");
  musicBtn.innerHTML = "♫ <span>Music</span>";
}
musicBtn.addEventListener("click", async () => {
  if (melodyTimer) return stopMusic();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    alert("Your browser does not support audio playback.");
    return;
  }
  audioContext = audioContext || new AudioCtx();
  if (audioContext.state === "suspended") await audioContext.resume();
  noteIndex = 0;
  playNote(notes[noteIndex++]);
  melodyTimer = setInterval(() => {
    playNote(notes[noteIndex % notes.length]);
    noteIndex++;
  }, 520);
  musicBtn.classList.add("playing");
  musicBtn.innerHTML = "♫ <span>Music on</span>";
});
showSlide(0);
