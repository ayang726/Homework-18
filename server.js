const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
var logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger("dev"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, () => {
    console.log("Server listening at http://localhost:" + PORT);
});

