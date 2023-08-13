import ejs, { render } from "ejs"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import express from "express";
import dotenv from "dotenv"
dotenv.config()


const app = express();
const port = 3000;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


//const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_CLUSTERNAME}.${process.env.DB_HOST}/wikiDB`;
const url = "mongodb://127.0.0.1:27017/wikiDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = new mongoose.model("article", articleSchema);



app.get("/", function (req, res) {
    res.render("index.ejs");
})
/////////////////////////Request Targeting all Article\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.route("/articles")

    .get(function (req, res) {
        Article.find({})
            .then(function (foundArticles) {
                if (foundArticles) {
                    res.send(foundArticles);
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })

    .post(function (req, res) {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save();
        res.send(req.body);
    })

    .delete(function (req, res) {
        Article.deleteMany({})
            .then(function () {
                console.log("Delete All Articles Successfully! ")
            })
            .catch(function (err) {
                res.send(err);
            })
    });
/////////////////////////Request Targeting A Specific Article\\\\\\\\\\\\\\\\\\\\\\\\

app.route("/articles/:articleTitle")

    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle })
            .then(function (foundArticle) {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that title was found. ")
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })

    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content }
        )
            .then(function (foundArticle) {
                if (foundArticle.matchedCount == 1) {
                    res.send("foundArticle and Update it");
                } else {
                    res.send("No articles matching that title was found. ")
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })

    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body }
        )
            .then(function (foundArticle) {
                if (foundArticle.matchedCount == 1) {
                    res.send("foundArticle and Update it");
                } else {
                    res.send("No articles matching that title was found. ")
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })

    .delete(function (req, res) {
        Article.deleteOne(
            { title: req.params.articleTitle },
        )
            .then(function (foundArticle) {
                if (foundArticle.deletedCount == 1) {
                    res.send("foundArticle and Delete it");
                } else {
                    res.send("No articles matching that title was found. ")
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })


app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})



// app.get("/articles", function (req, res) {

//     Article.find({})
//         .then(function (foundArticles) {
//             if (foundArticles) {
//                 res.send(foundArticles);
//                 // res.render("index.ejs");
//             }
//         })
//         .catch(function (err) {
//             res.send(err);
//         })
// })

// app.post("/articles", function (req, res) {
//     const article = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });
//     article.save();
//     res.send(req.body);
// })

// app.delete("/articles", function (req, res) {
//     Article.deleteMany({})
//         .then(function () {
//             console.log("Delete All Articles Successfully! ")
//         })
//         .catch(function (err) {
//             res.send(err);
//         })
// })

// [
//     {
//         "_id": "64d73ad85c9b8572965c7922",
//         "title": "REST",
//         "content": "REST is short for REpresenaional state Transfer"
//     },
//     {
//         "_id": "5c139771d79ac8eac11e754a",
//         "title": "API",
//         "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
//     },
//     {
//         "_id": "5c1398ecd79ac8eac11e7567",
//         "title": "DOM",
//         "content": "The Document Object Model is like an API for interacting with our HTML"
//     },
//     {
//         "_id": "5c1398aad79ac8eac11e7561",
//         "title": "Bootstrap",
//         "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
//     },
//     {
//         "_id": "64d762bab91c960a44ff149c",
//         "title": "jack Bauer",
//         "content": "There are two hands that can beat a royal flush. Jack Bauer's right hand and Jack Bauer's left hand. 69 7.52\n",
//         "__v": 0
//     }
// ]
