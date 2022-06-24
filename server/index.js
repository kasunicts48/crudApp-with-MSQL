const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const port = 3001;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "curddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInset = "INSERT INTO movie (moviename,moviereview) VALUES(?,?);";
  db.query(sqlInset, [movieName, movieReview], (err, result) => {
    console.log(err);
  });
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie WHERE movieName = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate = "UPDATE movie SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
