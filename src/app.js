const express = require("express");
const nunjucks = require("nunjucks");
const sha256 = require("js-sha256");

const app = express();

const db = require("./database/db.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

nunjucks.configure("src/views", {
  express: app,
  noCache: true
});

const state = {
  userId: ""
};

function isLogged() {
  if (state.userId.length === 0) {
    return false;
  }

  return true;
}

app.get("/login", (req, res) => {
  return res.render("login.html");
});

app.post("/login", (req, res) => {
  state.userId = "";

  var username = req.body.username;
  var hash = sha256(req.body.password);
  
  const query = `
    SELECT * FROM users WHERE username = ?;
  `;

  db.all(query, [username], (err, rows) => {
    if (err) {
      console.log(err);
    }

    if (rows.length !== 1) {
      return res.render("login.html", { error: "User does not exist"});
    }

    if (rows[0].hash != hash) {
      return res.render("login.html", { error: "Password Wrong"});
    }

    state.userId = rows[0].id;
    console.log(state);

    return res.redirect("/");
  })
});

app.get("/register", (req, res) => {
  state.userId = "";
  return res.render("register.html");
});

app.post("/register", (req, res) => {
  var fullname = req.body.fullName;
  var username = req.body.username;
  var password = req.body.password;
  var passConfirm = req.body.passwordConfirmation;
  var hash = sha256(password);

  if (password !== passConfirm) {
    return res.render("register.html", { error: `Password and password confirmation must be equal` });
  }

  const params =  [
    fullname,
    username,
    hash
  ];

  const sql = `
    INSERT INTO users (
      name,
      username,
      hash
    ) VALUES (?, ?, ?);
  `;

  db.all("SELECT * FROM users WHERE username = ?;", [username],
  (err, rows) => {
    if (err) {
      return console.log(err);
    }

    if (rows.length !== 0) {
      return res.render("register.html", { error: "User already exist, please  login" })
    }

    db.run(sql, params, (err) => {
      if (err) {
        console.log(err);
      }
    })

    db.all(`
      SELECT id FROM  users WHERE username = ?;
    `, [username], (err, rows) => {
      if (err) {
        console.log(err);
      }

      state.userId = rows[0];

      return res.redirect("/");
    })
  });
});

app.get("/", (req, res) => {
  if (isLogged() === true) {
    return res.render("dashboard.html");
  }

  return res.redirect("/login");
});

app.get("/createPath", (req, res) => {
  return res.render("createPath.html");
});

app.listen(3000);