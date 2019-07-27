const express = require("express");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
var logger = require("morgan");

const app = express();
const PORT = 3000;

const db = require("./models")

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(logger("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



axios.get("https://www.nytimes.com/").then(response => {
    const $ = cheerio.load(response.data);
    $("article").each((index, article) => {
        const title = $(article).find("h2").text();
        const body = $(article).find("p").text();
        let link = $(article).find("a").attr("href");

        if (title && body && link) {
            let result = {}
            // console.log(title);
            // console.log(body);
            // console.log(link);
            link = link.indexOf("http") < 0 ? "https://www.nytimes.com" + link : link;
            result = { title, body, link };
            // console.log(result);
            db.Article.create(result)
                .then(response => {

                })
                .catch(err => {
                    console.log(err);
                });
        }

    })
});

// app.listen(PORT, () => {
//     console.log("Server listening at http://localhost:" + PORT);
// });