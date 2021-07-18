const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../database");

// all models
router.get("/", (req, res) => {
  console.log("Get all Models!");
  //const mysql = "select * from Models";
  const mysql = `SELECT M.maker,Mo.model,Mo.Makers_id,Mo.year,Mo.id from Square_Tire.Makers M
    inner join Square_Tire.Models Mo on M.id = Mo.Makers_id`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const newModels = results.map((results) => {
        const container = {};
        container[results.id] = results.model;
        container.actions = {
          edit: "/edit/" + results.id,
          delete: "/delete/" + results.id,
        };
        return container;
      });
      console.log(newModels);
      res.json(results);
    } else {
      res.send("No Results");
    }
  });
});

router.get("/:id", (req, results) => {
  const { id } = req.params;
  const mysql = `Select * From Models where id = ${id}`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send("No Results");
    }
  });
});

router.post("/", (req, res) => {
  console.log("Model Created");
  const mysql = "insert into Models set ?";

  const modelObj = {
    model: req.body.model,
    year: req.body.year,
    Makers_id: req.body.maker,
  };
  mysqlConnection.query(mysql, modelObj, (err) => {
    if (err) throw err;
    res.send("Models Created");
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { model } = req.body;
  const mysql = `UPDATE Models set model = '${model}'  where id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Model Updated", success: true });
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Models WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Models deleted", success: true });
  });
});
module.exports = router;
