const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "password",
    database: "movies_db",
  },
  console.log(`Connected to the movies_db database.`)
);


// Query database

app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    console.log(results);
    res.json(results);
  });
});

app.post("/api/add-movies", (req, res) => {
//   db.query(`INSERT INTO movies (id, movie_name) VALUES (${movieId}, ${movieName})`, function (err, results) {
  db.query('INSERT INTO movies (id, movie_name) VALUES (8, "hercules")', function (err, results) {
      console.log(results);
      res.send("post api movies hit");
    });
});

app.put("/api/update-movies", (req, res) => {
    db.query('UPDATE movies SET movie_name = "Harry Potter" WHERE id = 1', function (err, results) {
        console.log(results);
      res.send("put api movies hit");
    });
});

app.delete("/api/movie/:id", (req, res) => {
  db.query(
    `DELETE FROM movies WHERE id = ?`, req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
    }
    console.log(result);
    res.send("delete api movies hit");
});
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
