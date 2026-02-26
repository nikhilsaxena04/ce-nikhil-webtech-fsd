const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "class.json");

app.use(express.json());

// Global middleware: runs for every request
app.use((req, res, next) => {
  console.log(`[GLOBAL] ${req.method} ${req.url}`);
  next();
});

// Route middleware: runs only for /secret route
function checkPasscode(req, res, next) {
  const passcode = req.query.passcode;
  if (passcode !== "1234") {
    return res.status(401).send("No passcode. Try /secret?passcode=1234");
  }
  next();
}

class ClassStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.classes = this.read();
  }

  read() {
    const raw = fs.readFileSync(this.filePath, "utf8");
    return JSON.parse(raw);
  }

  write() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.classes, null, 2));
  }

  getAll() {
    return this.classes;
  }

  getById(id) {
    return this.classes.find((item) => item.id === id);
  }

  create(payload) {
    const newItem = {
      id: this.classes.length ? Math.max(...this.classes.map((item) => item.id)) + 1 : 1,
      className: payload.className,
      section: payload.section,
      teacher: payload.teacher
    };
    this.classes.push(newItem);
    this.write();
    return newItem;
  }

  update(id, payload) {
    const index = this.classes.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.classes[index] = {
      ...this.classes[index],
      className: payload.className ?? this.classes[index].className,
      section: payload.section ?? this.classes[index].section,
      teacher: payload.teacher ?? this.classes[index].teacher
    };
    this.write();
    return this.classes[index];
  }

  remove(id) {
    const index = this.classes.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.classes.splice(index, 1);
    this.write();
    return true;
  }
}

const classStore = new ClassStore(dataFile);

app.get("/", (req, res) => {
  res.send("Hello this is my first server!");
});

app.get("/image", (req, res) => {
  const seed = Math.floor(Math.random() * 1000000);
  res.redirect(`https://picsum.photos/seed/${seed}/600/400`);
});

app.get("/abes", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ABES Logo</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 40px;">
        <h1>ABES Engineering College</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/ABES_Engineering_College_04.jpg"
          alt="ABES Campus Photo"
          width="700"
        />
        <p>This is a basic page with an ABES campus photo.</p>
      </body>
    </html>
  `);
});

app.get("/classes", (req, res) => {
  res.json(classStore.getAll());
});

app.get("/secret", checkPasscode, (req, res) => {
  res.send("Welcome! You passed the middleware check.");
});

app.get("/classes/:id", (req, res) => {
  const id = Number(req.params.id);
  const classItem = classStore.getById(id);
  if (!classItem) {
    return res.status(404).json({ message: "Class not found" });
  }
  res.json(classItem);
});

app.post("/classes", (req, res) => {
  const { className, section, teacher } = req.body;
  if (!className || !section || !teacher) {
    return res.status(400).json({ message: "className, section and teacher are required" });
  }
  const created = classStore.create({ className, section, teacher });
  res.status(201).json(created);
});

app.put("/classes/:id", (req, res) => {
  const id = Number(req.params.id);
  const updated = classStore.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Class not found" });
  }
  res.json(updated);
});

app.delete("/classes/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = classStore.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Class not found" });
  }
  res.json({ message: "Class deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
