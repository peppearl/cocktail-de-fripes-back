const db = require("../models");
const News = db.news;
const {Op} = require("sequelize");


// Create and Save a new Article
exports.create = (req, res) => {

    console.log('reponse :');
    console.log(res.body);

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Le contenu ne peut être vide."
        });
        return;
    } else if (!req.body.category) {
        res.status(400).send({
            message: "Category can not be empty!"
        });
        return;
    }


    const desc = req.body.content.substr(0, 100) + '...';

    // Create an Article
    const news = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        desc: desc,
        thumbnail: req.body.thumbnail,
        date: req.body.date
    };

    // Save Article in the database
    News.create(news)
        .then(data => {
            res.send(data);
            //res.json({ success: true, message: 'Article créé avec succès !' });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création de l\'article."
            });
        });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {

    const category = req.query.category;
    let condition = category ? {category: {[Op.like]: `%${category}%`}} : null;

    News.findAll({where: condition})
        .then(data => {
            res.send(data);
            res.json({success: true, news: data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des articles"
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: 'Article' + id + 'non trouvée !'
                });
            }

            res.send(data);

        })
        .catch(err => {
            res.status(404).send({
                message: 'Article' + id + 'non trouvée !' || err.message
            });
        });
};

// Update an Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    News.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "L\'article a été modifié avec succès"
                });
            } else {
                res.status(404).send({
                    message: `Impossible de modifier l\'article avec l\'id=${id}.
                    Peut-être que l\'article n'a pas été trouvée ou req.body est vide !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier l\'article avec l\'id=" + id || err.message
            });
        });
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "L\'article a été effacé avec succès!"
                });
            } else {
                res.status(404).send({
                    message: `Impossible de supprimer l\'article avec l\'id=${id}.
                    Peut-être que l\'article n'a pas été trouvée !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer l\'article avec l\'id=" + id || err.message
            });
        });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} articles ont été supprimés !`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lor de la suppression des articles !"
            });
        });
};