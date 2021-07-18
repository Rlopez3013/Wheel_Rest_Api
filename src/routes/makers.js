const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const mysqlConnection = require("../../database");

// Routes
// router.get('/', (req, res) => {
//   res.send('Cars Page');
// });

// All cars
router.get("/", (req, res) => {
  console.log("Get from Makers");
  const mysql = "SELECT * From Makers";

  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const newMaker = results.map((results) => {
        const container = {};
        container[results.id] = results.maker;
        container.actions = {
          edit: "/edit/" + results.id,
          delete: "/delete/" + results.id,
        };
        return container;
      });
      console.log(newMaker);
      res.json(results);
    } else {
      res.send("No results");
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `SELECT * FROM Makers where id = ${id}`;
  mysqlConnection.query(mysql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      ("No results");
    }
  });
});

router.post("/", (req, res) => {
  console.log("Car created");
  const mysql = "insert into Makers set ?";

  const makeObj = {
    maker: req.body.maker,
  };
  mysqlConnection.query(mysql, makeObj, (err) => {
    if (err) throw err;
    res.send("maker Created!");
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { maker } = req.body;
  const mysql = `UPDATE Makers SET  maker = '${maker}'  WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Maker Updated", success: true });
  });
});
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const mysql = `DELETE FROM Makers WHERE id = ${id}`;

  mysqlConnection.query(mysql, (err) => {
    if (err) throw err;
    res.send({ message: "Maker deleted", success: true });
  });
});

module.exports = router;
