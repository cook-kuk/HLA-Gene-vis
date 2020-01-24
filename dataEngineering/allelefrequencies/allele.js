const Crawler = require("crawler");
const fs = require("fs");

const country = JSON.parse(fs.readFileSync("./out/country.json"));

const c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;

      const alleleList = [];

      const textParse = str =>
        str
          .trim()
          .replace("\r", "")
          .replace("\n", "");

      $("table.tblNormal tr").each(function(i, ele) {
        if (i !== 0) {
          let allele = {
            name: textParse($($(ele).children()[1]).text()),
            population: textParse($($(ele).children()[3]).text()),
            potential: textParse($($(ele).children()[4]).text()),
            frequency: textParse($($(ele).children()[5]).text()),
            sample: textParse($($(ele).children()[6]).text())
          };

          alleleList.push(allele);
        }
      });

      const country = alleleList[0].population.split(" ")[0];

      fs.writeFileSync(`./out/country/${country}.json`, JSON.stringify(alleleList));
    }
    done();
  }
});

const url1 =
  "http://www.allelefrequencies.net/hla6006a.asp?hla_locus_type=Classical&hla_locus=&hla_allele1=&hla_allele2=&hla_selection=&hla_pop_selection=&hla_population=&hla_country=";
const url2 =
  "&hla_dataset=&hla_region=&hla_ethnic=&hla_study=&hla_order=order_1&hla_sample_size_pattern=equal&hla_sample_size=&hla_sample_year_pattern=equal&hla_sample_year=&hla_level_pattern=equal&hla_level=&standard=a&hla_show=";

const urls = [];

for (let i = 0; i < country.length; i++) {
  console.log(country[i]);

  const url = url1 + country[i] + url2;
  urls.push(url);
}

const res = c.queue(urls);
