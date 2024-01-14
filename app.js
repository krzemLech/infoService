var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieSession = require("cookie-session"); // potrzebne do logowania
var mongoose = require("mongoose");
const config = require("./config"); // plik z konfiguracją aplikacji

// połączenie i kontrola połączenia w mongoose
mongoose.connect(process.env.MONGODB_URI || config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});

var indexRouter = require("./routes/index");
var newsRouter = require("./routes/news");
var quizRouter = require("./routes/quiz");
var adminRouter = require("./routes/admin");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: process.env.KEY_SESSION || config.keySession,
    maxAge: parseInt(process.env.MAX_AGE) || config.maxAgeSession, //  24 hours
  })
);

app.use(function (req, res, next) {
  // potrzebne do generowania klasy active w navbarze
  res.locals.path = req.path;

  next();
});

app.use("/", indexRouter);
app.use("/news", newsRouter);
app.use("/quiz", quizRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render("e404");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
