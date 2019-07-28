const db = require("../models");

module.exports = function (app) {
    app.get("/", (req, res) => {
        db.Article.find({})
            .then(response => {
                // console.log(response);
                articles = response;
                res.render("home", { articles });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                console.log(err);
                res.json(err);
            });;
    });
    app.get("/savedArticles", (req, res) => {
        db.SavedArticle.find({})
            .then(response => {
                // console.log(response);
                articles = response;
                res.render("saved", { articles });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                console.log(err);
                res.json(err);
            });;
    });
};