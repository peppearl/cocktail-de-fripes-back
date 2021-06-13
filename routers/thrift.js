const express = require('express');
const router = express.Router();
const thrift = require("../controllers/thrift.controller.js");

// Create a new Thrift Store
router.post("/", thrift.create); //not working -> req.body === undefined

// Retrieve all Thrift Stores
router.get("/", thrift.findAll); //working / working with style

// Retrieve a single Thrift Store with id
router.get("/:id", thrift.findOne); //working

// Update a Thrift Store with id
router.put("/:id", thrift.update); //not working -> req.body === undefined

// Delete a Thrift Store with id
router.delete("/:id", thrift.delete); //working

// Delete all Thrift Stores
router.delete("/", thrift.deleteAll); //working

module.exports = router;
