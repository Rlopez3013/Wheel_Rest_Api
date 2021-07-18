const express = require("express");
const router = express.Router();

const mysqlConnection = require("../../database");

// all models
router.get("/", (req, res) => {
  console.log("Get Tire Name!");
  const mysql = `Select T.id,B.brand, B.id as brandId,T.name,Sn.season, Sn.id as seasonId, S.size, S.id as sizeId from Square_Tire.Tires T 
  inner join Brands B on T.Brands_id = B.id
  inner join Seasons Sn on T.Seasons_id = Sn.id
  inner join Sizes S on T.Sizes_id = S.id`;

  mysqlConnection.query(mysql, (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No Results");
    }
  });
});

router.get("/:id", (req, results) => {
  const { id } = req.params;
  const mysql = `Select * From Tires where id = ${id}`;
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
  console.log("Tires Name Created");
  const mysql = "insert into Tires set ?";

  const tiresObj = {
    name: req.body.name,
    Brands_id: req.body.brand,
    Seasons_id: req.body.season,
    Sizes_id: req.body.size,
  };
  mysqlConnection.query(mysql, tiresObj, (err) => {
    if (err) throw err;
    res.send("Tires Created");
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(req.body);
  const mysql = `UPDATE Square_Tire.Tires set name = '${name}' where id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send("Tires Name Updated!");
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Tires WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send("Tires deleted!");
  });
});

module.exports = router;
