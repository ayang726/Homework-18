const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function (app) {

    app.get("/scrape", (req, res) => {
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
                            // console.log(err);
                        });
                }

            })
            res.send("Scraping complete");
        });
    });

    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then(response => {
                console.log(resposne);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });;
    })

    app.get("/article/:id", (req, res) => {
        console.log(req.params.id);

        db.SavedArticle.findOne({ _id: req.params.id })
            .populate('note')
            .then(response => {

                console.log(response);
                res.json(response);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/article/:id", (req, res) => {
        console.log(req.body.note);

        db.Note.create({ body: req.body.note })
            .then(dbNote => {
                return db.SavedArticle.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/save/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id }).then(response => {
            console.log(response);
            db.SavedArticle.create({ _id: response._id, title: response.title, body: response.body, link: response.link })
                .then(response => {
                    res.json(response);
                })
                .catch(function (err) {
                    console.log(err);

                    res.json(err);
                });
        });
    });

    app.delete("/delete/:id", (req, res) => {

        db.Article.deleteOne({ _id: req.params.id })
            .then(response => {
                res.send("Article Deleted")
            })
            .catch(err => {
                console.log(err)
                res.json(err);
            });
    });
    app.delete("/clear", (req, res) => {
        // console.log("called");
        db.Article.deleteMany({})
            .then((response) => {

                res.send("Articles Cleared")
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    })
    app.delete("/deleteSaved/:id", (req, res) => {

        db.SavedArticle.deleteOne({ _id: req.params.id })
            .then(response => {
                res.send("Saved Article Deleted")
            })
            .catch(err => {
                console.log(err)
                res.json(err);
            });
    });
    app.delete("/clearSaved", (req, res) => {
        db.SavedArticle.deleteMany({})
            .then((response) => {

                res.send("Saved Articles Cleared")
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    })
};