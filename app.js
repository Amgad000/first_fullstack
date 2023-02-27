// [app.js] is the file which controlls the whole website.

const express = require("express");
const app = express();
const port = 3000;

const allArticlesRoute = require("./routes/all-articles");

// using helmet for security
const helmet = require("helmet");
app.use(helmet());

app.set("view engine", "pug");
//if you want to change views Name!!! => app.set("views", "Name");

app.use(express.static("public")); // reach any file inside public directly with /(fileName)

// For POST method
app.use(express.urlencoded({extended: true}));

/* For live reload */
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

/* Mongoose */
const mongoose = require("mongoose");
const exp = require("constants");
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://almuhamady:gB8TY0Rc0Naalk7j@cluster0.6bu2e4h.mongodb.net/aoooooll?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* End Mongoose */

// Home page
app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

// all-articles path
app.use("/all-articles", allArticlesRoute);

//  /add-new-article
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", {pageTitle: "Adding Articles"});
});

// ex. of under development page
app.get("/amgad", (req, res) => {
  res.send(
    `<h1>Hi You !</h1> 
    <p style="font-size:1.5rem; background-color:#ccc; padding:5px; text-align:center;">
    أستغفر الله الذى لا إله إلا هو الحى القيوم وأتوب إليه</p>`
  );
});

// handling 404 pages ==> app.use
app.use((req, res) => {
  // res.status(404).send("Sorry, we cannot find that!");
  res.status(404).redirect("/");
});
