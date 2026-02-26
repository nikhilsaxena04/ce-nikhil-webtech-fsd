package main

import (
	"fmt"
	"net/http"
	"runtime"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, "Not found", http.StatusNotFound)
			return
		}

		platform := runtime.GOOS
		arch := runtime.GOARCH

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		fmt.Fprintf(w, `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Go Models</title>
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
      <h1>Go Models</h1>
      <div class="card">
        <div>
          <button class="pill" data-target="platform">Platform</button>
          <div id="platform" class="info">Platform: %s</div>
        </div>
        <div>
          <button class="pill" data-target="arch">Arch</button>
          <div id="arch" class="info">Arch: %s</div>
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
`, platform, arch)
	})

	fmt.Println("Server is listening on http://localhost:3001")
	if err := http.ListenAndServe("localhost:3001", nil); err != nil {
		fmt.Println("Server error:", err)
	}
}
