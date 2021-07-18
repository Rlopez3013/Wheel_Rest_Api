const express = require("express");
const router = express.Router();

// This need to be test
const mysqlConnection = require("../../database");

// all Tires has Models
router.get("/", (req, res) => {
  console.log("models and tires!");
  const mysql = `SELECT * FROM Models_Tires`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results");
    }
  });
});
// create anoth[er router for Models
router.get("/:brand/:season/:size?", (req, res) => {
  const { brand, season, size } = req.params;
  //const { Tires_id } = req.params;

  console.log(brand, season, size);
  const mySqlExt = "";
  const mysql = `SELECT B.brand, Sn.season, S.size
  from Models_Tires 
  inner join Brands B on Mt.Tires_id = B.id
  inner join Seasons Sn on Mt.Tires_id = Sn.id
  inner join Sizes S on Mt.Tires_id = S.id
  where B.Name = '${brands}'`;

  if (season != "all") {
    mysql += ` and Sn.Name='${season}'`;
  }

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results");
    }
  }); //create add button for cars and tires.
});

router.get("/:maker/:model", (req, res) => {
  const { maker, model } = req.params;
  //const { Tires_id } = req.params;

  console.log(maker, model);

  const mysql = `SELECT * FROM Models_Tires`;
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
  console.log("Models Tires created");
  const mysql = "insert into Models_Tires set ?";

  const wheelsObj = {
    Tires_id: req.body.Tires_id,
    Models_id: req.body.Models_id,
  };
  mysqlConnection.query(mysql, wheelsObj, (err) => {
    if (err) throw err;
    res.send("Wheels Created!");
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { Models_id } = req.body;
  const { Tires_id } = req.body;
  const mysql = `UPDATE Model SET  Models_id = '${Models_id}' '${Tires_id}' WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Models Tires updated", success: true });
  });
});
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Models_Tires WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Models Tires Deleted", success: true });
  });
});
module.exports = router;
