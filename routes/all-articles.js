const express = require("express");
const router = express.Router();

const Article = require("../models/articlesSchema");

const ArticlesControllers = require("../controllers/all-articles");
/*---
POST ===> sending data to mongoDB
---*/

router.post("/", ArticlesControllers.article_post);
/* End POST */

router.get("/", ArticlesControllers.articles_index_get);

/**
 * Using [1] :(variable) [2] req.params.(variable)
 * [1] /:(variable) will instore any value following the mentioned /
 * [2] req.params.(variable) will take this value from [1]
 */
router.get("/:variable", ArticlesControllers.article_detailed_get);

/**
 * Deleting using fetch and app.delete
 */
router.delete("/:id", ArticlesControllers.article_delete);

module.exports = router;
