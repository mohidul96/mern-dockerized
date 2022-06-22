const express = require('express');
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');
// This section will help you get a list of all the documents.
recordRoutes.route("/openings").get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("openings")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          console.log("anything comming from here..........")
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });
  });

// This section will help you create a new record.
recordRoutes.route('/openings').post(function (req, res) {
  const dbConnect = dbo.getDb();
  console.log(req.body);
  const openingDocument = {
    title: req.body.title,
    position: req.body.position,
    department: req.body.department
  };
  res.status(201).send();
  dbConnect
    .collection('openings')
    .insertOne(openingDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting opening!');
      } else {
        console.log(`Added a new opening with id ${result.insertedId}`);
        res.status(201).send();
      }
    });
});


module.exports = recordRoutes;
