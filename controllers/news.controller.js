const service = require("../services/news.services")


// Create and Save a new Article
exports.create = (req, res) => {
    service.create(req, res)
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    service.findAll(req, res)
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    service.findOne(req, res)
};

// Update an Article by the id in the request
exports.update = (req, res) => {
    service.update(req, res)
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
    service.delete(req, res)
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    service.deleteAll(req, res)

};