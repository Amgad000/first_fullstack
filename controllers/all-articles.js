const Article = require("../models/articlesSchema");

const article_post = (req, res) => {
  const article = new Article(req.body);

  article
    .save()
    .then((result) => {
      res.redirect("/all-articles");
    })
    .catch((err) => {
      console.log(err);
    });
};

const articles_index_get = (req, res) => {
  /**
   * Getting data from DB before rendering: model.find()
   * model.find() which return a promise like model.save()
   */
  Article.find()
    .then((result) => {
      // console.log(result);
      res.render("index", {pageTitle: "Home Page", articlesArr: result});
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Using [1] :(variable) [2] req.params.(variable)
 * [1] /:(variable) will instore any value following the mentioned /
 * [2] req.params.(variable) will take this value from [1]
 */
const article_detailed_get = (req, res) => {
  // id will be more relevant than variable
  Article.findById(req.params.variable)
    .then((result) => {
      // console.log(result);
      res.render("detailed-article", {
        pageTitle: "Article's details",
        choosenArticle: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Deleting using fetch and app.delete
 */
const article_delete = (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((result) => {
      /**
       * res.redirect("/all-articles"); [redirect does not work inside delete method]
       */
      res.json({homeUrl: "/all-articles"});
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  article_post,
  articles_index_get,
  article_detailed_get,
  article_delete,
};
