const fs = require("fs");

async function main() {
  fs.writeFileSync("sample.txt", "Hi\n");

  //await fs.promises.copyFile("sample.txt", "sample.copy.txt");
  //fs.cpSync("sample.txt", "sample.copy.sync.txt");

  fs.appendFileSync("yohoho.txt", `and we are done\n`);
  const content = fs.readFileSync("yohoho.txt", "utf-8");
  console.log(content);
  
  fs.unlinkSync("yohoho.txt");
  console.log("Done");
}

main().catch(console.error);