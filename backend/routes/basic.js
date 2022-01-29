const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const basicRouter = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// dummy endpoint for getting courses, required for middleware
basicRouter.route("/get_courses").get(function (req, res) {
    let db_connect = dbo.getDb("dev-pub-data");
    db_connect
      .collection("course_data")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    });

module.exports = basicRouter