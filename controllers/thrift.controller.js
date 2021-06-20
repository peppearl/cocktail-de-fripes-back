const service = require("../services/thrift.services")


// Create and Save a new Thrift Store
exports.create = (req, res) => {
    service.create(req, res)
};

// Retrieve all Thrift Stores from the database.
exports.findAll = (req, res) => {
    service.findAll(req, res)
};

// Find a single Thrift Store with an id
exports.findOne = (req, res) => {
    service.findOne(req, res)
};

// Update a Thrift Store by the id in the request
exports.update = (req, res) => {
    service.update(req, res)
};

// Delete a Thrift Store with the specified id in the request
exports.delete = (req, res) => {
    service.delete(req, res)
};

// Delete all Thrift Stores from the database.
exports.deleteAll = (req, res) => {
    service.deleteAll(req, res)
};