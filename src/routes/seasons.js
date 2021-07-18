const express = require("express");
const router = express.Router();

// This need to be test
const mysqlConnection = require("../../database");

// all Tires has Models
router.get("/", (req, res) => {
  console.log("Seasons!");
  const mysql = `SELECT * FROM Seasons`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results");
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `SELECT * FROM Seasons where id = '${id}'`;
  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results");
    }
  });
});

router.post("/", (req, res) => {
  console.log("Season created");
  const mysql = "insert into Seasons set ?";

  const seasonsObj = {
    season_id: req.body.season_id,
    season: req.body.season,
    
  };
  mysqlConnection.query(mysql, seasonsObj, (err) => {
    if (err) throw err;
    res.send("Season Created!");
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { season_id } = req.body;
  const mysql = `UPDATE Seasons SET  season_id = '${season_id}' WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send("Season Updated!");
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Seasons WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send("Season deleted!");
  });
});
module.exports = router;