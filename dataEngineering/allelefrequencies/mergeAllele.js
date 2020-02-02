const fs = require("fs");

const meta = process.argv[2];

const fileList = fs.readdirSync(`./out/${meta}`);

const data = {};

fileList.forEach(file => {
  data[file] = JSON.parse(fs.readFileSync(`./out/${meta}/${file}`));
});

fs.writeFileSync(`./out/${meta}.json`, JSON.stringify(data));
