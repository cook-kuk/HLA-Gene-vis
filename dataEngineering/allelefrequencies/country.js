const Crawler = require("crawler");
const fs = require("fs");

const c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;

      const country = [];

      $("#hla_country option").each(function(i, ele) {
        if (i !== 0) {
          country.push($(ele).text());
        }
      });

      fs.writeFileSync("./out/country.json", JSON.stringify(country));
    }
    done();
  }
});

const url = "http://www.allelefrequencies.net/hla6006a.asp";

const res = c.queue(url);
