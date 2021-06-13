const db = require("../models");
const Thrift = db.thrift;
const {Op} = require("sequelize");


// Create and Save a new Thrift Store
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Le contenu ne peut être vide."
        });
        return;
    }

    const desc = req.body.content.substr(0, 200) + '...';

    // Create a Tutorial
    const thrift = {
        name: req.body.name,
        content: req.body.content,
        city: req.body.city,
        address: req.body.address,
        hours: req.body.hours,
        tel: req.body.tel,
        style: req.body.style,
        desc: desc,
        thumbnail: req.body.thumbnail,
        instagram: req.body.instagram ? req.body.instagram : false,
        facebook: req.body.facebook ? req.body.facebook : false,
        pic1: req.body.pic1 ? req.body.pic1 : false,
        pic2: req.body.pic2 ? req.body.pic2 : false,
        pic3: req.body.pic3 ? req.body.pic3 : false,
        pic4: req.body.pic4 ? req.body.pic4 : false
    };

    // Save Tutorial in the database
    Thrift.create(thrift)
        .then(data => {
            res.send(data);
            res.json({success: true, message: 'Friperie créée avec succès !'});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création de la friperie."
            });
            res.status(500).json({
                success: false,
                message: 'Une erreur est survenue sur le serveur !',
            });

        });
};

// Retrieve all Thrift Stores from the database.
exports.findAll = (req, res) => {

    const style = req.query.style;
    let condition1 = style ? {style: {[Op.like]: `%${style}%`}} : null;

    //const city = req.query.city;
    //let condition2 = city ? { city: { [Op.like]: `%${city}%` } } : null;

    Thrift.findAll(
        {
            where:
            condition1,
            //condition2
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des friperies"
            });
        });
};

// Find a single Thrift Store with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Thrift.findByPk(id)
        .then(data => {
            res.send(data);
            res.json({
                success: true,
                thrift: data,
            });

        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Friperie' + id + 'non trouvée !'
            });
        });
};

// Update a Thrift Store by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Thrift.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "La friperie a été modifiée avec succès"
                });
            } else {
                res.send({
                    message: `Impossible de modifier la friperie avec l\'id=${id}.
                    Peut-être que la friperie n'a pas été trouvée ou req.body est vide !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Impossible de modifier la friperie avec l\'id=" + id
            });
        });
};

// Delete a Thrift Store with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Thrift.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "La friperie a été effacée avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer la friperie avec l\'id=${id}.
                    Peut-être que la friperie n'a pas été trouvée !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer la friperie avec l\'id=" + id || err.message
            });
        });
};

// Delete all Thrift Stores from the database.
exports.deleteAll = (req, res) => {
    Thrift.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} friperies ont été supprimées!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lor de la suppression des friperies !"
            });
        });
};