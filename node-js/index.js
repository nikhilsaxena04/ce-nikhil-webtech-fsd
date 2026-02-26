const http = require("http");
const preferredPort = Number(process.env.PORT) || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verdant Roast | Bean Science Journal</title>
  <style>
    :root {
      --bg: #f1f7f2;
      --surface: #ffffff;
      --text: #1a271f;
      --muted: #5f7467;
      --accent: #2f7a5b;
      --accent-soft: #daf0e3;
      --line: #d7e6dc;
      --ink-soft: #31453a;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Trebuchet MS", "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 10% 8%, #e3f1e8 0, transparent 32%),
        radial-gradient(circle at 90% 0%, #def3ec 0, transparent 28%),
        var(--bg);
      line-height: 1.65;
      padding: 24px 16px 56px;
    }

    .page {
      max-width: 1040px;
      margin: 0 auto;
      background: color-mix(in srgb, var(--surface) 95%, #ebf8f2 5%);
      border: 1px solid var(--line);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 22px 42px rgba(25, 44, 34, 0.08);
    }

    .nav {
      position: sticky;
      top: 0;
      z-index: 4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--line);
      padding: 14px 20px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(130deg, #86b79e, #2f7a5b);
    }

    .links {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .links a {
      text-decoration: none;
      color: var(--ink-soft);
      border: 1px solid transparent;
      padding: 7px 11px;
      border-radius: 999px;
      font-size: 0.92rem;
      transition: 0.2s ease;
    }

    .links a:hover {
      border-color: var(--line);
      background: #f6fbf8;
    }

    .hero {
      padding: 56px 56px 44px;
      background: linear-gradient(145deg, #f8fffb 0%, #e7f6ef 100%);
      border-bottom: 1px solid var(--line);
    }

    .hero-media {
      width: 100%;
      height: clamp(180px, 34vw, 290px);
      object-fit: cover;
      border-radius: 16px;
      border: 1px solid #d7e8dd;
      margin-bottom: 22px;
      filter: saturate(0.92) contrast(1.03);
      box-shadow: 0 14px 28px rgba(37, 66, 51, 0.12);
    }

    .tag {
      display: inline-block;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 999px;
      padding: 8px 12px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 14px;
    }

    .intro {
      max-width: 700px;
      color: var(--muted);
      font-size: 1.05rem;
    }

    .content {
      padding: 38px 56px 56px;
      display: grid;
      gap: 24px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 24px;
    }

    h2 {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1rem;
      margin-bottom: 6px;
    }

    p {
      color: #37463d;
      margin-bottom: 10px;
    }

    .meta {
      color: var(--muted);
      font-size: 0.92rem;
      margin-bottom: 14px;
    }

    .pill {
      border: 1px solid var(--line);
      background: #f7fcf8;
      border-radius: 999px;
      padding: 7px 12px;
      font-size: 0.86rem;
      color: #2f4d3f;
    }

    .panel-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .bean-grid {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-top: 10px;
    }

    .bean {
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 14px;
      background: #fbfefa;
    }

    .bean img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 10px;
      border: 1px solid #d7e5db;
      filter: saturate(0.95);
    }

    .bean small {
      color: var(--muted);
      display: block;
      margin-bottom: 6px;
    }

    .nutri {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 0.95rem;
    }

    .nutri th,
    .nutri td {
      text-align: left;
      padding: 8px 10px;
      border-bottom: 1px solid var(--line);
    }

    .nutri th {
      color: var(--muted);
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .control {
      display: grid;
      gap: 8px;
      margin: 8px 0 12px;
    }

    label {
      font-size: 0.88rem;
      color: #4e6357;
    }

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid #c8dbce;
      border-radius: 10px;
      padding: 10px 12px;
      font: inherit;
      color: var(--text);
      background: #ffffff;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    button {
      border: 1px solid #236447;
      background: linear-gradient(140deg, #2f7a5b, #245f46);
      color: #f4fff8;
      padding: 10px 14px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
    }

    .result {
      margin-top: 8px;
      border-radius: 12px;
      border: 1px dashed #b7d5c2;
      background: #f2fbf5;
      padding: 12px;
      color: #274636;
    }

    .health-list {
      display: grid;
      gap: 10px;
      margin-top: 10px;
    }

    .health-item {
      padding: 10px 12px;
      border-left: 3px solid #9bc6ae;
      background: #f8fcf9;
      border-radius: 8px;
    }

    footer {
      padding: 18px 56px 30px;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .bean-grid {
        grid-template-columns: 1fr;
      }

      .panel-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 760px) {
      .nav {
        padding: 12px 14px;
      }

      .links {
        gap: 4px;
      }

      .links a {
        font-size: 0.82rem;
        padding: 6px 9px;
      }

      .hero,
      .content {
        padding: 26px 18px;
      }

      footer {
        padding: 16px 18px 24px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <nav class="nav">
      <div class="brand"><span class="dot"></span> Verdant Roast</div>
      <div class="links">
        <a href="#launch">Launch</a>
        <a href="#explore">Explore Beans</a>
        <a href="#science">Science</a>
        <a href="#choose">Choose Coffee</a>
        <a href="#login">Login</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>

    <section class="hero">
      <img
        class="hero-media"
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80"
        alt="Aesthetic coffee setup with cup and beans"
      />
      <span class="tag">New Brand Launch</span>
      <h1>Fresh coffee, backed by bean science.</h1>
      <p class="intro">
        Verdant Roast combines minimal roast design with practical nutrition and
        health knowledge. Explore bean origins, compare caffeine profiles, and
        find your best cup based on your body and routine.
      </p>
    </section>

    <section class="content">
      <article id="launch" class="card">
        <p class="meta">February 23, 2026 • Launch Journal</p>
        <h2>Why this launch matters</h2>
        <p>
          We built Verdant Roast for people who want coffee that feels clean and
          intentional. Every launch batch includes roast transparency, brewing
          guidance, and origin data so taste is easy to trust.
        </p>
        <p>
          Our first collection is designed around three needs: high-focus work,
          calm daily sipping, and gentle digestion-friendly options.
        </p>
      </article>

      <article id="explore" class="card">
        <h2>Explore Coffee Beans</h2>
        <div class="bean-grid">
          <div class="bean">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80"
              alt="Arabica coffee beans"
            />
            <h3>Arabica</h3>
            <small>Higher altitude, smoother acidity</small>
            <p>Flavor: floral, fruit-forward, mild bitterness.</p>
            <span class="pill">Caffeine: medium</span>
          </div>
          <div class="bean">
            <img
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80"
              alt="Robusta coffee beans"
            />
            <h3>Robusta</h3>
            <small>Hardier plant, bold intensity</small>
            <p>Flavor: earthy, nutty, stronger body.</p>
            <span class="pill">Caffeine: high</span>
          </div>
          <div class="bean">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
              alt="Liberica coffee beans"
            />
            <h3>Liberica</h3>
            <small>Rare bean, aromatic profile</small>
            <p>Flavor: smoky fruit, woody sweetness.</p>
            <span class="pill">Caffeine: low to medium</span>
          </div>
        </div>
      </article>

      <article id="science" class="card">
        <h2>Nutrients + Science Snapshot</h2>
        <p class="meta">Average values for black coffee, per 240 ml cup</p>
        <table class="nutri">
          <thead>
            <tr>
              <th>Component</th>
              <th>Role</th>
              <th>Typical Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caffeine</td>
              <td>Alertness, reduced fatigue perception</td>
              <td>80-120 mg</td>
            </tr>
            <tr>
              <td>Polyphenols</td>
              <td>Antioxidant support</td>
              <td>200-550 mg</td>
            </tr>
            <tr>
              <td>Potassium</td>
              <td>Nerve and muscle function</td>
              <td>100-150 mg</td>
            </tr>
            <tr>
              <td>Niacin (B3)</td>
              <td>Energy metabolism</td>
              <td>0.4-0.6 mg</td>
            </tr>
          </tbody>
        </table>
        <div class="health-list">
          <div class="health-item">Moderate intake is linked with improved focus and reaction time.</div>
          <div class="health-item">Filtered brews are generally preferred when tracking cholesterol response.</div>
          <div class="health-item">Sensitive users should reduce late-day caffeine to protect sleep quality.</div>
        </div>
      </article>

      <section class="panel-grid">
        <article id="choose" class="card">
          <h2>Choose Your Coffee</h2>
          <p>Pick your preference and get a quick recommendation.</p>
          <div class="control">
            <label for="goal">Your goal</label>
            <select id="goal">
              <option value="focus">Deep focus</option>
              <option value="balanced">Balanced daily cup</option>
              <option value="gentle">Gentle digestion</option>
            </select>
          </div>
          <div class="control">
            <label for="strength">Preferred strength</label>
            <select id="strength">
              <option value="light">Light</option>
              <option value="medium" selected>Medium</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <button id="pickBtn" type="button">Recommend My Coffee</button>
          <div id="pickResult" class="result">Recommendation will appear here.</div>
        </article>

        <article id="login" class="card">
          <h2>Member Login</h2>
          <p>Track your blends, tasting notes, and nutrition insights.</p>
          <div class="control">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="name@verdantroast.com" />
          </div>
          <div class="control">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter password" />
          </div>
          <button id="loginBtn" type="button">Login</button>
          <div id="loginResult" class="result">Use demo values to continue.</div>
        </article>
      </section>

      <article id="contact" class="card">
        <h2>Contact Us</h2>
        <p>Ask about origins, roast data, or health-friendly brewing plans.</p>
        <div class="control">
          <label for="name">Your name</label>
          <input id="name" type="text" placeholder="Nikhil" />
        </div>
        <div class="control">
          <label for="message">Message</label>
          <textarea id="message" placeholder="Tell us what kind of coffee suits your routine."></textarea>
        </div>
        <button id="contactBtn" type="button">Send Message</button>
        <div id="contactResult" class="result">We usually reply in 24 hours.</div>
      </article>
    </section>

    <footer>
      Verdant Roast launch edition • Minimal flavor design + evidence-aware coffee guidance
    </footer>
  </main>

  <script>
    const pickBtn = document.getElementById("pickBtn");
    const goal = document.getElementById("goal");
    const strength = document.getElementById("strength");
    const pickResult = document.getElementById("pickResult");

    const loginBtn = document.getElementById("loginBtn");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginResult = document.getElementById("loginResult");

    const contactBtn = document.getElementById("contactBtn");
    const nameInput = document.getElementById("name");
    const contactResult = document.getElementById("contactResult");

    pickBtn.addEventListener("click", function () {
      const map = {
        focus: {
          light: "Robusta-forward espresso shot, short extraction for high alertness.",
          medium: "Arabica + Robusta blend, medium roast for focus with smoother finish.",
          bold: "Double-origin Robusta blend, bold roast for maximum intensity."
        },
        balanced: {
          light: "Washed Arabica, light roast with floral acidity.",
          medium: "House Bloom Blend, balanced body and citrus brightness.",
          bold: "Medium-dark Arabica blend with cocoa note and lower sharpness."
        },
        gentle: {
          light: "Low-acid Arabica cold brew, slow steep for softer stomach response.",
          medium: "Swiss-water decaf Arabica with mild nut profile.",
          bold: "Half-caf blend with medium-dark roast and milk-friendly body."
        }
      };
      pickResult.textContent = map[goal.value][strength.value];
    });

    loginBtn.addEventListener("click", function () {
      if (!email.value || !password.value) {
        loginResult.textContent = "Please enter both email and password.";
        return;
      }
      loginResult.textContent = "Welcome back. Bean dashboard is ready.";
    });

    contactBtn.addEventListener("click", function () {
      const n = nameInput.value.trim() || "there";
      contactResult.textContent = "Thanks, " + n + ". Your message has been queued for our roast team.";
    });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Port ${preferredPort} is in use. Retrying on ${preferredPort + 1}...`);
    server.listen(preferredPort + 1);
    return;
  }
  throw error;
});

server.on("listening", () => {
  const address = server.address();
  if (address && typeof address === "object") {
    console.log(`Server is running at http://localhost:${address.port}`);
  }
});

server.listen(preferredPort);
