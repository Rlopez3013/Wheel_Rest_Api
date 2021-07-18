const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../database");

// // Routes
// app.get('/', (req, res) => {
//   res.send('Tire Homepage');

router.get("/", (req, res ) => {
  console.log("Get all Brands!");
  const mysql = "select * from Brands";

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const newBrands = results.map((results) => {
        const container = {};

        container[results.id] = results.brand;
        container.actions = {
          edit: "/edit/" + results.id,
          delete: "/delete/" + results.id,
        };

        return container;
      });
      console.log(newBrands);

      res.json(results);
    } else {
      res.send("No Results");
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `Select * From Brands where id = ${id}`;
  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    console.log(results);
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      results.send("No Results");
    }
  });
});

router.post("/", (req, results) => {
  console.log("Brands Created");
  const mysql = "insert into Brands set ?";

  const brandObj = {
    brand: req.body.brand,
  };
  mysqlConnection.query(mysql, brandObj, (err) => {
    if (err) throw err;
    results.send("Brand Created");
  });
});

router.put("/update/:id", (req, results) => {
  const { id } = req.params;
  const { brand } = req.body;
  const mysql = `UPDATE Brands set brand = '${brand}' where id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    results.send({ message: "brand update", success: true });
  });
});

router.delete("/delete/:id", (req, results) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Brands WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    results.send({ mesage: "Brand Deleted", success: true });
  });
});

module.exports = router;
