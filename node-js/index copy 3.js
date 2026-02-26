const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.join(__dirname, "students.json");

function readStudents() {
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

function writeStudents(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2), "utf-8");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Choose mode (r/w/d): ", (modeInput) => {
  const mode = modeInput.trim().toLowerCase();

  if (mode === "r") {
    const students = readStudents();
    console.log("\nStudents:");
    console.table(students);
    rl.close();
    return;
  }

  if (mode === "w") {
    rl.question("Enter name: ", (name) => {
      rl.question("Enter course: ", (course) => {
        const students = readStudents();

        const newStudent = {
          id: students.length + 1,
          name: name.trim(),
          course: course.trim(),
        };

        students.push(newStudent);
        writeStudents(students);

        const updatedStudents = readStudents();
        console.log("\nUpdated students:");
        console.table(updatedStudents);

        rl.close();
      });
    });
    return;
  }

  if (mode === "d") {
    const students = readStudents();
    console.log("\nCurrent students:");
    console.table(students);

    rl.question("Enter id to delete: ", (idInput) => {
      const idToDelete = Number(idInput.trim());

      if (!Number.isInteger(idToDelete)) {
        console.log("Invalid id.");
        rl.close();
        return;
      }

      const updatedStudents = students.filter((student) => student.id !== idToDelete);

      if (updatedStudents.length === students.length) {
        console.log("No student found with that id.");
        rl.close();
        return;
      }

      writeStudents(updatedStudents);
      console.log("\nAfter delete:");
      console.table(updatedStudents);
      rl.close();
    });
    return;
  }

  console.log("Invalid mode. Use 'r' for read, 'w' for write, or 'd' for delete.");
  rl.close();
});
