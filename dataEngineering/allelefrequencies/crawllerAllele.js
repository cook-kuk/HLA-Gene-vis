const Crawler = require("crawler");
const fs = require("fs");

// country region ethnic
const meta = process.argv[2];
console.log(meta);

const existOutDir = fs.existsSync("./out");
if (!existOutDir) {
  fs.mkdirSync("./out");
}

const existMetaDir = fs.existsSync(`./out/${meta}`);
if (!existMetaDir) {
  fs.mkdirSync(`./out/${meta}`);
}

const requst = {
  country: "",
  region: "",
  ethnic: "",
  sample_year: ""
};

const list = JSON.parse(fs.readFileSync(`./out/${meta}.json`));

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

      $(`#hla_${meta} option`).each(function(i, ele) {
        if (i !== 0) {
          list.push($(ele).text());
        }
      });

      $("table.tblNormal tr").each(function(i, ele) {
        if (i !== 0) {
          let allele = {
            name: textParse($($(ele).children()[1]).text()),
            population: textParse($($(ele).children()[3]).text()),
            potential: textParse($($(ele).children()[4]).text()),
            frequency: textParse($($(ele).children()[5]).text()),
            sample: textParse($($(ele).children()[7]).text())
          };

          alleleList.push(allele);
        }
      });

      fs.writeFileSync(`./out/${meta}/${res.options.fileName}.json`, JSON.stringify(alleleList));
      console.log(res.options.fileName);
    }
    done();
  }
});

const url1 =
  "http://www.allelefrequencies.net/hla6006a.asp?hla_locus_type=Classical&hla_locus=&hla_allele1=&hla_allele2=&hla_selection=&hla_pop_selection=&hla_population=&hla_country=";
const url2 =
  "&hla_dataset=&hla_region=&hla_ethnic=&hla_study=&hla_order=order_1&hla_sample_size_pattern=equal&hla_sample_size=&hla_sample_year_pattern=equal&hla_sample_year=&hla_level_pattern=equal&hla_level=&standard=a&hla_show=";

const urls = [];

for (let i = 0; i < list.length; i++) {
  requst[meta] = list[i].replace(" ", "+");

  const url = `http://www.allelefrequencies.net/hla6006a.asp?hla_locus_type=Classical&hla_locus=&hla_allele1=&hla_allele2=&hla_selection=&hla_pop_selection=&hla_population=&hla_country=${requst.country}&hla_dataset=&hla_region=${requst.region}&hla_ethnic=${requst.ethnic}&hla_study=&hla_order=order_1&hla_sample_size_pattern=equal&hla_sample_size=&hla_sample_year_pattern=equal&hla_sample_year=${requst.sample_year}&hla_level_pattern=equal&hla_level=&standard=a&hla_show=`;
  urls.push({
    uri: url,
    fileName: list[i]
  });
}

const res = c.queue(urls);
