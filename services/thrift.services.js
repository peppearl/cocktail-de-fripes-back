const dao = require('../dao/thrift.dao')

exports.create = (req, res) => {
    dao.create(req, res);
}

exports.findAll = (req, res) => {
    dao.findAll(req, res);
}

exports.findOne = (req, res) => {
    dao.findOne(req, res);
}

exports.update = (req, res) => {
    dao.update(req, res);
}

exports.delete = (req, res) => {
    dao.delete(req, res);
}

exports.deleteAll = (req, res) => {
    dao.deleteAll(req, res);
}