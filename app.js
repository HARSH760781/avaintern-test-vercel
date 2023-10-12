require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var http = require("http");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
const flash = require("connect-flash");
const { log } = require("console");
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const hostname = "cluster0.hvg2loc.mongodb.net";
const databaseName = "details";
const db = `mongodb+srv://${username}:${password}@${hostname}/${databaseName}`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const courseScheme = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  course: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  college: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const signupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // validate: {
    //   validator: function (v) {
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    //   },
    //   message: "Please enter a valid email address",
    // },
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // validate: {
    //   validator: function (v) {
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    //   },
    //   message: "Please enter a valid email address",
    // },
  },
  mobile: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Course = new mongoose.model("Course", courseScheme);
const Contact = new mongoose.model("Contact", contactSchema);
const Signup = new mongoose.model("Signup", signupSchema);

var app = express();
const port = process.env.PORT || 8080;

const templatePath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "./public/stylesheets")));
app.use(express.static(path.join(__dirname, "./public/javascripts")));
app.use(express.static(path.join(__dirname, "./public/images")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.json());
app.use(express.urlencoded());
// view engine setup
app.set("views", templatePath);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  res.render("index");
});
app.get("/faq", (req, res) => {
  res.render("faq");
});
app.get("/career", (req, res) => {
  res.render("career");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/career", (req, res) => {
  res.render("career");
});
app.get("/course", (req, res) => {
  res.render("course");
});
app.get("/course/ds", (req, res) => {
  res.render("ds");
});
app.get("/course/cad", (req, res) => {
  res.render("cad");
});
app.get("/course/bda", (req, res) => {
  res.render("bda");
});
app.get("/course/bde", (req, res) => {
  res.render("bde");
});
app.get("/course/bda", (req, res) => {
  res.render("bda");
});
app.get("/course/technical", (req, res) => {
  res.render("technical");
});
app.get("/course/non_technical", (req, res) => {
  res.render("non_technical");
});
app.get("/course/java", (req, res) => {
  res.render("java");
});
app.get("/course/marketing", (req, res) => {
  res.render("marketing");
});
app.get("/course/web", (req, res) => {
  res.render("web");
});
app.get("/course/human", (req, res) => {
  res.render("human");
});
app.get("/course/business", (req, res) => {
  res.render("business");
});
app.get("/course/finance", (req, res) => {
  res.render("finance");
});
app.get("/course/ui-ux", (req, res) => {
  res.render("ux");
});
app.get("/course/dsa", (req, res) => {
  res.render("dsa");
});
app.get("/course/ai", (req, res) => {
  res.render("ai");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/course/vlsi", (req, res) => {
  res.render("vlsi");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/technical", (req, res) => {
  res.render("technical");
});
app.get("/non_technical", (req, res) => {
  res.render("non_technical");
});
app.get("*", (req, res) => {
  res.status(404).render("error404");
});

app.post("/thanku", (req, res) => {
  var myData = new Course(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).render("thanku");
    })
    .catch(() => {
      res.status(404).render("error");
    });
});
app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      console.log(myData);
      res.status(200).render("contact");
    })
    .catch((err) => {
      res.send('<script>alert("Enter a valid  Information");</script>');
    });
});
app.post("/signup", (req, res) => {
  var myData = new Signup(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).render("index");
    })
    .catch((err) => {
      res.send('<script>alert("Enter a valid  Information");</script>');
    });
});

app.listen(8080, () => {
  console.log("Connection running");
});
