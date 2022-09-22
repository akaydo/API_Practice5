module.exports = app => {
    const phones = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new Phone
    router.post("/", phones.create);
  
    // Retrieve all phones
    router.get("/", phones.findAll);
  
    // Retrieve all published phones
    router.get("/published", phones.findAllPublished);
  
    // Retrieve a single phone with id
    router.get("/:id", phones.findOne);
  
    // Update a phone with id
    router.put("/:id", phones.update);
  
    // Delete a phone with id
    router.delete("/:id", phones.delete);
  
    // Create a new phones
    router.delete("/", phones.deleteAll);
  
    app.use("/api/phones", router);
  };