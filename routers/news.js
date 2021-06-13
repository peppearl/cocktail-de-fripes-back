const express = require('express');
const router = express.Router();

const news = require("../controllers/news.controller.js");


// Create a new Article
router.post("/", news.create); //not working -> req.body === undefined

// Retrieve all Articles
router.get("/", news.findAll); //working / working with category

// Retrieve a single Article with id
router.get("/:id", news.findOne); //working

// Update an Article with id
router.put("/:id", news.update); //not working -> req.body === undefined

// Delete an Article with id
router.delete("/:id", news.delete); //working

// Delete all Articles
router.delete("/", news.deleteAll); //working

module.exports = router;