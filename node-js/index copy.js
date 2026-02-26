const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  const platform = process.platform;
  const memory = os.totalmem();
  const host = os.hostname();
  const arch = os.arch();

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Node JS Models</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          nav { background: #111; color: #fff; padding: 12px 20px; }
          nav a { color: #fff; text-decoration: none; font-weight: bold; }
          main { padding: 24px; }
          h1 { margin: 0 0 16px; }
          .card { border: 1px solid #ddd; padding: 16px; border-radius: 8px; max-width: 520px; display: flex; gap: 10px; flex-wrap: wrap; }
          .pill { border: 1px solid #111; background: #fff; padding: 8px 12px; border-radius: 999px; cursor: pointer; }
          .pill:active { transform: translateY(1px); }
          .info { display: none; margin-top: 8px; font-size: 14px; }
          .info.show { display: block; }
        </style>
      </head>
      <body>
        <nav><a href="/">Home</a></nav>
        <main>
          <h1>Node JS Models</h1>
          <div class="card">
            <div>
              <button class="pill" data-target="platform">Platform</button>
              <div id="platform" class="info">Platform: ${platform}</div>
            </div>
            <div>
              <button class="pill" data-target="memory">Memory</button>
              <div id="memory" class="info">Memory: ${memory}</div>
            </div>
            <div>
              <button class="pill" data-target="host">Host name</button>
              <div id="host" class="info">Host name: ${host}</div>
            </div>
            <div>
              <button class="pill" data-target="arch">Arch</button>
              <div id="arch" class="info">Arch: ${arch}</div>
            </div>
          </div>
          <script>
            document.querySelectorAll(".pill").forEach((btn) => {
              btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-target");
                const panel = document.getElementById(id);
                panel.classList.toggle("show");
              });
            });
          </script>
        </main>
      </body>
    </html>
  `);
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on http://localhost:3000");
});
