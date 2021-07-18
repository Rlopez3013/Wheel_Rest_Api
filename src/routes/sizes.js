const express = require("express");
const router = express.Router();

const mysqlConnection = require("../../database");

// All Tires Sizes
router.get("/", (req, res) => {
  console.log("Get all Sizes");
  const mysql = "Select * From Sizes";

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      results.send("No results");
    }
  });
});

router.get("/:id", (req, res) => {
  console.log("Size by id");
  const mysql = `Select * from Sizes where id = ${id}`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      results.send("No results");
    }
  });
});

router.post("/", (req, results) => {
  console.log("Sizes Posted");
  const mysql = `insert into Sizes set ?`;

  const sizeObj = {
    size: req.body.size,
  };
  mysqlConnection.query(mysql, sizeObj, (err) => {
    if (err) throw err;
    results.send("size posted!");
  });
});

router.put("/update/:id", (req, res) => {
  console.log("Size Updated!");
  const { id } = req.params;
  const { size } = req.body;
  const mysql = `update Sizes set size = '${size}' where id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Size Updated", success: true });
  });
});

router.delete("/delete/:id", (req, res) => {
  console.log("Size Deleted!");
  const { id } = req.params;
  const mysql = `Delete  From Sizes where  id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Size Deleted", success: true });
  });
});

module.exports = router;
