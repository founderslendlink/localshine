// Lightweight before/after drag slider. No dependencies.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ba-slider").forEach((el) => {
    const beforeWrap = el.querySelector(".ba-before-wrap");
    const handle = el.querySelector(".ba-handle");
    const beforeImg = el.querySelector(".ba-before-wrap img");

    const setImgWidth = () => {
      const w = el.getBoundingClientRect().width;
      beforeImg.style.width = w + "px";
    };
    setImgWidth();
    window.addEventListener("resize", setImgWidth);

    let dragging = false;

    const setPos = (clientX) => {
      const rect = el.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      beforeWrap.style.width = pct + "%";
      handle.style.left = pct + "%";
    };

    const start = (e) => {
      dragging = true;
      el.classList.add("dragging");
    };
    const end = () => { dragging = false; };
    const move = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(clientX);
    };

    handle.addEventListener("mousedown", start);
    el.addEventListener("mousedown", (e) => { start(e); setPos(e.clientX); });
    window.addEventListener("mouseup", end);
    window.addEventListener("mousemove", move);

    handle.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchstart", (e) => { start(e); setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("touchend", end);
    window.addEventListener("touchmove", move, { passive: true });

    // click anywhere to jump
    el.addEventListener("click", (e) => {
      if (e.target === handle) return;
      setPos(e.clientX);
    });
  });
});
