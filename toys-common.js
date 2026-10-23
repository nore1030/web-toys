/* 玩具铺公共组件：合成背景音乐 + 解说员气泡
 * 用法（页面 </body> 前加一行）：
 * <script src="../toys-common.js" data-bgm="chill"
 *         data-lines='["开场解说1","开场解说2"]'></script>
 * 页面逻辑里随时：window.Toy && Toy.say("实时解说")
 * data-bgm: chill | playful | retro | ambient | off（off = 只要解说）
 */
(function () {
  const me = document.currentScript;
  const mood = (me && me.dataset.bgm) || "chill";
  let lines = [];
  try { lines = JSON.parse((me && me.dataset.lines) || "[]"); } catch (e) { lines = []; }

  /* ---------------- 解说员气泡 ---------------- */
  const bubble = document.createElement("div");
  bubble.style.cssText =
    "position:fixed;left:14px;bottom:66px;z-index:9999;max-width:min(300px,74vw);" +
    "background:rgba(18,20,28,.9);color:#f2f0ff;font:600 13px/1.65 -apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;" +
    "padding:10px 14px;border-radius:14px 14px 14px 3px;box-shadow:0 6px 18px rgba(0,0,0,.4);" +
    "opacity:0;transform:translateY(8px);transition:all .35s;pointer-events:none;backdrop-filter:blur(4px);";
  const bIcon = document.createElement("span");
  bIcon.textContent = "🎙️ ";
  const bText = document.createElement("span");
  bubble.appendChild(bIcon);
  bubble.appendChild(bText);
  document.body.appendChild(bubble);

  let bubbleTimer = null;
  function say(text) {
    if (!text) return;
    bText.textContent = text;
    bubble.style.opacity = "1";
    bubble.style.transform = "none";
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubble.style.opacity = "0";
      bubble.style.transform = "translateY(8px)";
    }, 5200);
  }

  let lineIdx = Math.floor(Math.random() * Math.max(1, lines.length) * 7);
  if (lines.length) {
    setTimeout(() => say(lines[lineIdx % lines.length]), 1600);
    setInterval(() => { lineIdx++; say(lines[lineIdx % lines.length]); }, 27000);
  }

  /* ---------------- 合成背景音乐 ---------------- */
  const MOODS = {
    chill:   { bpm: 74,  wave: "sine",     root: 220,   scale: [0, 3, 5, 7, 10],    bassPat: [0, -4, 3, -2], bassEvery: 8, arpEvery: 2, hat: false, vol: 0.06 },
    playful: { bpm: 104, wave: "triangle", root: 261.6, scale: [0, 2, 4, 7, 9],     bassPat: [0, 0, 5, 7],   bassEvery: 8, arpEvery: 2, hat: true,  vol: 0.065 },
    retro:   { bpm: 126, wave: "square",   root: 261.6, scale: [0, 2, 4, 5, 7, 9, 11], bassPat: [0, 0, 7, 5], bassEvery: 8, arpEvery: 2, hat: true,  vol: 0.045 },
    ambient: { bpm: 56,  wave: "sine",     root: 174.6, scale: [0, 3, 7, 10, 12],   bassPat: [0, -2],        bassEvery: 16, arpEvery: 4, hat: false, vol: 0.07 },
  };
  const m = MOODS[mood] || MOODS.chill;
  let ctx = null, master = null, noiseBuf = null;
  let step = 0, nextTime = 0, schedTimer = null;

  function ensureCtx() {
    if (ctx) return true;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = m.vol;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.1), ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      return true;
    } catch (e) { return false; }
  }
  const freq = (semi, oct) => m.root * Math.pow(2, (semi + 12 * oct) / 12);
  function note(f, t, dur, wave, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = wave; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function hat(t) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const g = ctx.createGain(); const f = ctx.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = 6500;
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    s.connect(f).connect(g).connect(master);
    s.start(t); s.stop(t + 0.06);
  }
  function schedule() {
    const eighth = 60 / m.bpm / 2;
    while (nextTime < ctx.currentTime + 0.32) {
      const s = step % 32;
      if (s % m.bassEvery === 0) {
        const pat = m.bassPat[(s / m.bassEvery) % m.bassPat.length];
        note(freq(pat, 0), nextTime, eighth * 3.4, "sine", 0.5);
      }
      if (s % m.arpEvery === 0 && Math.random() < 0.78) {
        const deg = m.scale[Math.floor(Math.random() * m.scale.length)];
        note(freq(deg, Math.random() < 0.3 ? 2 : 1), nextTime, eighth * 1.5, m.wave, m.wave === "square" ? 0.1 : 0.16);
      }
      if (m.hat && s % 4 === 2) hat(nextTime);
      if (s === 0 && Math.random() < 0.5) note(freq(m.scale[0], 1), nextTime, eighth * 2, "sine", 0.1);
      nextTime += eighth;
      step++;
    }
  }
  function start() {
    if (!ensureCtx()) return;
    if (ctx.state === "suspended") ctx.resume();
    nextTime = ctx.currentTime + 0.12;
    if (!schedTimer) schedTimer = setInterval(schedule, 110);
    btn.textContent = "🎵";
  }
  function stop() {
    if (schedTimer) { clearInterval(schedTimer); schedTimer = null; }
    if (ctx && ctx.state === "running") ctx.suspend();
    btn.textContent = "🔇";
  }

  const btn = document.createElement("button");
  btn.style.cssText =
    "position:fixed;left:14px;bottom:14px;z-index:9999;width:44px;height:44px;border-radius:50%;" +
    "border:1px solid rgba(255,255,255,.28);background:rgba(18,20,28,.82);color:#fff;font-size:19px;" +
    "cursor:pointer;backdrop-filter:blur(4px);box-shadow:0 4px 14px rgba(0,0,0,.35);" +
    "display:flex;align-items:center;justify-content:center;padding:0;";
  btn.title = "背景音乐开关";
  const prefOn = localStorage.getItem("toy_bgm") === "1";
  btn.textContent = prefOn && mood !== "off" ? "🎵" : "🔇";
  btn.addEventListener("click", () => {
    const nowOn = btn.textContent === "🔇";
    localStorage.setItem("toy_bgm", nowOn ? "1" : "0");
    if (mood === "off") { say("这个玩具自己会发声，就不配伴奏啦。"); return; }
    if (nowOn) { start(); say("音乐开～再点一下可以关。"); }
    else { stop(); }
  });
  document.body.appendChild(btn);

  // 上次开着音乐的用户：本次页面里第一次点击页面任意处时自动响起
  if (prefOn && mood !== "off") {
    const once = () => {
      if (btn.textContent === "🔇") start();
      removeEventListener("pointerdown", once);
    };
    addEventListener("pointerdown", once);
  }

  // 返回主菜单按钮（首页不显示：首页引用本文件时不带 ../）
  const onHome = !((me && me.getAttribute("src")) || "").startsWith("../");
  if (!onHome) {
    const home = document.createElement("button");
    home.style.cssText =
      "position:fixed;left:66px;bottom:14px;z-index:9999;width:44px;height:44px;border-radius:50%;" +
      "border:1px solid rgba(255,255,255,.28);background:rgba(18,20,28,.82);color:#fff;font-size:19px;" +
      "cursor:pointer;backdrop-filter:blur(4px);box-shadow:0 4px 14px rgba(0,0,0,.35);" +
      "display:flex;align-items:center;justify-content:center;padding:0;";
    home.title = "回玩具铺";
    home.textContent = "🏠";
    home.addEventListener("click", () => { location.href = "../"; });
    document.body.appendChild(home);
  }

  window.Toy = {
    say,
    get bgmOn() { return !!(ctx && ctx.state === "running"); },
    startBgm: start,
    stopBgm: stop,
  };
})();
