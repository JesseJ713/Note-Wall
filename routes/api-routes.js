const db = require("../models");


// Routes

// GET route to get all notes
module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    // Finding all entries to the tables when used with no options
    db.Note.findAll({}).then(function(dbNotes) {
      res.json(dbNotes);
    });

  });

// POST route to create a new note
  app.post("/api/notes", function (req, res) {

  });

}