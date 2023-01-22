//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "We are a team of passionate writers and bloggers who love to share our thoughts and experiences on a wide range of topics.Whether you're looking for inspiration, tips, or just some interesting reads, you've come to the right place. We cover everything from travel and lifestyle to technology and business, and we're always on the lookout for the latest trends and innovations.Our goal is to provide high-quality content that is both informative and engaging. We strive to create a community where readers can come to learn, be inspired, and connect with others who share similar interests.So, grab a cup of coffee, make yourself comfortable, and start exploring our blog today. Don't forget to check back often for new articles, tips and tricks, and interesting reads. We also welcome feedback and suggestions from our readers, so don't hesitate to reach out to us with any questions or comments.";
const aboutContent = "Our team is made up of a diverse group of writers and bloggers who bring a wealth of experience and expertise to our blog. We're passionate about sharing our knowledge and insights on a wide range of topics, and we're always on the lookout for new and exciting trends and innovations to share with our readers.We are constantly updating our blog with fresh content, so be sure to check back often for new articles, tips and tricks, and interesting reads. We also welcome feedback and suggestions from our readers, so don't hesitate to reach out to us with any questions or comments. Thanks for visiting our blog, we hope you enjoy your stay!"
const contactContent = "You can contact for us for any queries regarding blogs on blogspoint@gmail.com. KEEP WRITING AND KEEP HUSTLING"


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

