(() => {
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const hd = $("header"),
    nav = $("nav"),
    mb = $(".menu");
  const sc = () =>
    hd.classList.toggle("solid", scrollY > 40);
  sc();
  addEventListener("scroll", sc, { passive: true });
  mb &&
    mb.addEventListener("click", () => {
      nav.classList.toggle("open");
      mb.setAttribute(
        "aria-expanded",
        nav.classList.contains("open"),
      );
    });
  $$("nav a").forEach((a) =>
    a.addEventListener("click", () =>
      nav.classList.remove("open"),
    ),
  );
  const io = new IntersectionObserver(
    (e) =>
      e.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          io.unobserve(x.target);
        }
      }),
    { threshold: 0.12 },
  );
  $$(".rv").forEach((el) => io.observe(el));
  // Hero: rising bubbles that pop on touch, glitter, and a cloth-wipe shine sweep
  const cv = $("#hero-canvas");
  if (
    cv &&
    !matchMedia("(prefers-reduced-motion:reduce)").matches
  ) {
    const x = cv.getContext("2d");
    let W,
      H,
      bs = [],
      gl = [],
      t = 0,
      mx = -999,
      my = -999;
    const nb = (i) => ({
      x: Math.random() * W,
      y: i ? Math.random() * H : H + 30,
      r: Math.random() * 18 + 4,
      v: Math.random() * 0.6 + 0.25,
      w: Math.random() * 6,
      a: Math.random() * 0.25 + 0.1,
    });
    const rs = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      bs = Array.from({ length: Math.round(W / 22) }, () =>
        nb(true),
      );
      gl = Array.from({ length: 60 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        p: Math.random() * 6,
        s: Math.random() * 2 + 1,
      }));
    };
    cv.parentElement.addEventListener(
      "pointermove",
      (e) => {
        const b = cv.getBoundingClientRect();
        mx = e.clientX - b.left;
        my = e.clientY - b.top;
      },
    );
    const f = () => {
      t += 0.016;
      x.clearRect(0, 0, W, H);
      bs.forEach((b) => {
        b.y -= b.v;
        b.x += Math.sin(t * 1.5 + b.w) * 0.4;
        const dx = b.x - mx,
          dy = b.y - my;
        if (dx * dx + dy * dy < (b.r + 14) ** 2) b.y = -99;
        if (b.y < -40) Object.assign(b, nb(false));
        const g = x.createRadialGradient(
          b.x - b.r / 3,
          b.y - b.r / 3,
          b.r / 8,
          b.x,
          b.y,
          b.r,
        );
        g.addColorStop(
          0,
          "rgba(255,255,255," + b.a * 2 + ")",
        );
        g.addColorStop(
          1,
          "rgba(232,126,161," + b.a / 2 + ")",
        );
        x.fillStyle = g;
        x.beginPath();
        x.arc(b.x, b.y, b.r, 0, 7);
        x.fill();
        x.strokeStyle = "rgba(255,220,232," + b.a + ")";
        x.stroke();
      });
      gl.forEach((s) => {
        const a = (Math.sin(t * 2 + s.p) + 1) / 2,
          k = s.s * (1 + a * 2);
        x.save();
        x.translate(s.x, s.y);
        x.fillStyle = "rgba(255,236,242," + a * 0.9 + ")";
        x.beginPath();
        x.moveTo(0, -k * 2);
        x.lineTo(k * 0.4, -k * 0.4);
        x.lineTo(k * 2, 0);
        x.lineTo(k * 0.4, k * 0.4);
        x.lineTo(0, k * 2);
        x.lineTo(-k * 0.4, k * 0.4);
        x.lineTo(-k * 2, 0);
        x.lineTo(-k * 0.4, -k * 0.4);
        x.fill();
        x.restore();
      });
      const p = (((t * 0.12) % 1.6) - 0.3) * (W + H);
      x.save();
      x.translate(p, 0);
      x.rotate(0.35);
      const sg = x.createLinearGradient(-90, 0, 90, 0);
      sg.addColorStop(0, "rgba(255,255,255,0)");
      sg.addColorStop(0.5, "rgba(255,210,225,.16)");
      sg.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = sg;
      x.fillRect(-90, -H, 180, H * 3);
      x.restore();
      requestAnimationFrame(f);
    };
    rs();
    addEventListener("resize", rs);
    f();
  }
  $$("[data-n]").forEach((el) => {
    const n = +el.dataset.n;
    new IntersectionObserver((e, o) => {
      if (e[0].isIntersecting) {
        let i = 0;
        const s = setInterval(() => {
          i += Math.ceil(n / 40);
          if (i >= n) {
            i = n;
            clearInterval(s);
          }
          el.textContent = i;
        }, 30);
        o.disconnect();
      }
    }).observe(el);
  });
  $$(".ba").forEach((b) => {
    const r = $("input", b);
    r.addEventListener("input", () =>
      b.style.setProperty("--p", r.value + "%"),
    );
  });
  $$(".filters button").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".filters button").forEach((x) =>
        x.classList.remove("on"),
      );
      btn.classList.add("on");
      $$(".gal figure").forEach(
        (f) =>
          (f.style.display =
            btn.dataset.f === "all" ||
            f.dataset.c === btn.dataset.f
              ? ""
              : "none"),
      );
    }),
  );
  // Booking + quote calculator
  const F = $("#book-form");
  if (F) {
    const base = {
      general: 75,
      deep: 140,
      movein: 150,
      moveout: 170,
      airbnb: 85,
      party: 120,
      construction: 220,
      garage: 90,
      storage: 80,
      organize: 95,
      maid: 75,
    };
    const names = {
      general: "General / maintenance clean",
      deep: "Deep clean",
      movein: "Move-in clean",
      moveout: "Move-out clean",
      airbnb: "Airbnb turnover",
      party: "After-party / event clean",
      construction: "Post-construction clean",
      garage: "Garage cleaning",
      storage: "Storage cleaning",
      organize: "Organization",
      maid: "Mother's helper / maid service",
    };
    const cond = { light: 1, average: 1.15, heavy: 1.4 },
      sq = { s: 0, m: 30, l: 70, xl: 120 },
      fr = {
        once: 0,
        monthly: 0.05,
        biweekly: 0.1,
        weekly: 0.15,
      };
    const money = (n) =>
      "$" + Math.round(n).toLocaleString();
    let est = {};
    const calc = () => {
      const v = (n) => F.elements[n].value,
        ad = $$("[name=addon]:checked", F);
      const rooms =
        Math.max(0, +v("beds") - 1) * 15 +
        Math.max(0, +v("baths") - 1) * 20 +
        sq[v("sqft")];
      const sub =
          (base[v("service")] + rooms) *
          cond[v("condition")],
        add = ad.reduce((s, a) => s + +a.dataset.p, 0),
        disc = sub * fr[v("frequency")];
      const tot = Math.max(75, sub - disc + add);
      est = {
        lo: tot * 0.92,
        hi: tot * 1.12,
        addons: ad.map((a) => a.value),
      };
      $("#q-total").textContent =
        money(est.lo) + " - " + money(est.hi);
      $("#q-lines").innerHTML =
        `<li><span>${names[v("service")]}</span><span>${money(base[v("service")])}</span></li><li><span>Size and rooms</span><span>+${money(rooms)}</span></li><li><span>Condition (${v("condition")})</span><span>x${cond[v("condition")]}</span></li><li><span>Add-ons</span><span>+${money(add)}</span></li><li><span>Recurring savings</span><span>-${money(disc)}</span></li>`;
    };
    F.addEventListener("input", calc);
    calc();
    const d = new Date();
    d.setDate(d.getDate() + 1);
    F.elements.date.min = d.toISOString().slice(0, 10);
    F.addEventListener("submit", async (e) => {
      e.preventDefault();
      calc();
      const C = window.GBT_CONFIG,
        m = $("#form-msg"),
        btn = $("button[type=submit]", F),
        v = (n) => F.elements[n].value;
      const p = {
        client_name: v("name"),
        client_email: v("email"),
        client_phone: v("phone"),
        address:
          v("address") +
          ", " +
          v("city") +
          ", " +
          v("state"),
        service: names[v("service")],
        frequency: $("[name=frequency] option:checked", F)
          .text,
        bedrooms: v("beds"),
        bathrooms: v("baths"),
        size: $("[name=sqft] option:checked", F).text,
        condition: v("condition"),
        addons: est.addons.join(", ") || "None",
        date: v("date"),
        time: v("time"),
        notes: v("notes") || "None",
        quote: money(est.lo) + " - " + money(est.hi),
        owner_name: C.ownerName,
        phone: C.phone,
      };
      btn.disabled = true;
      btn.textContent = "Sending...";
      try {
        if (
          !window.emailjs ||
          C.emailjs.publicKey.startsWith("YOUR")
        )
          throw new Error("cfg");
        emailjs.init({ publicKey: C.emailjs.publicKey });
        await emailjs.send(
          C.emailjs.serviceId,
          C.emailjs.templateId,
          {
            ...p,
            to_email: p.client_email,
            to_name: p.client_name,
            copy_for: "client",
          },
        );
        await emailjs.send(
          C.emailjs.serviceId,
          C.emailjs.templateId,
          {
            ...p,
            to_email: C.ownerEmail,
            to_name: C.ownerName,
            copy_for: "owner",
          },
        );
        m.textContent = `Thank you, ${p.client_name.split(" ")[0]}. Your quote of ${p.quote} has been emailed to ${p.client_email}, and ${C.ownerName} has a copy. She will confirm your appointment shortly.`;
        F.reset();
        calc();
      } catch (err) {
        const body = Object.entries(p)
          .map(([k, x]) => k.replace("_", " ") + ": " + x)
          .join("\n");
        m.innerHTML =
          'Email sending is not set up yet (see README). <a href="mailto:' +
          C.ownerEmail +
          "?subject=Booking request&body=" +
          encodeURIComponent(body) +
          '" style="text-decoration:underline">Send this request by email instead</a>.';
      }
      m.classList.add("show");
      m.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      btn.disabled = false;
      btn.textContent = "Request my booking";
    });
  }
})();
(() => {
  const r = document.querySelector(".rot");
  if (r) {
    const w = [
      "deep cleans",
      "move-outs",
      "Airbnb turnovers",
      "weekly upkeep",
      "post-party resets",
    ];
    let i = 0;
    setInterval(() => {
      r.classList.add("out");
      setTimeout(() => {
        i = (i + 1) % w.length;
        r.textContent = w[i];
        r.classList.remove("out");
      }, 500);
    }, 2600);
  }
  const h = document.querySelector(".hero"),
    s = document.querySelector(".stage");
  if (h && s && matchMedia("(hover:hover)").matches) {
    h.addEventListener("pointermove", (e) => {
      const b = h.getBoundingClientRect();
      s.style.setProperty(
        "--ry",
        ((e.clientX - b.left) / b.width - 0.5) * 10 + "deg",
      );
      s.style.setProperty(
        "--rx",
        (0.5 - (e.clientY - b.top) / b.height) * 8 + "deg",
      );
    });
  }
})();
