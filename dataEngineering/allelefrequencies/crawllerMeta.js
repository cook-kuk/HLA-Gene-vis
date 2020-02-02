const Crawler = require("crawler");
const fs = require("fs");

const meta = process.argv[2]; // country region ethnic

const c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;

      const list = [];

      $(`#hla_${meta} option`).each(function(i, ele) {
        const text = $(ele).text();

        if (i !== 0 && text.trim() !== "") {
          list.push(text);
        }
      });

      if (!fs.existsSync("./out/meta")) {
        fs.mkdirSync("./out/meta");
      }

      fs.writeFileSync(`./out/meta/${meta}.json`, JSON.stringify(list));
    }
    done();
  }
});

const url = "http://www.allelefrequencies.net/hla6006a.asp";

const res = c.queue(url);
