const Thrifts = require('../thrift/thrift');
const imageProcess = require('../util/imageProcessThrift');

const thrift = new Thrifts();

const createThrift = async (req, res) => {
  const id = thrift.createId();

  try {
    const imageName = await imageProcess(req, id);
    thrift.create(req.body, id, imageName); // http://localhost:3000/image-name
    res.json({ success: true, message: 'Friperie créée avec succès !' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la création de la friperie.', error.message);
  }
};

const getAllThrifts = async (req, res) => {
  try {
    const data = await thrift.getAll();
    res.json({ success: true, thrift: data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération des friperies', error.message);
  }
};

const getSingleThrift = async (req, res) => {
  try {
    const data = await thrift.getSingle(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Friperie non trouvée !',
      });
    }

    res.json({
      success: true,
      thrift: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération de la friperie.', error.message);
  }
};

const getThriftByCity = async (req, res) => {
  try {
    const { city, qty } = req.params;
    const data = await thrift.getByCity(city);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Friperies non trouvées !' });
    }

    if (qty) {
      return res.json({ success: true, thrift: [...data].splice(0, qty) });
    }

    res.json({ success: true, thrift: data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération des friperies par ville !', error.message);
  }
};

const getThriftByStyle = async (req, res) => {
  try {
    const { style, qty } = req.params;
    const data = await thrift.getByStyle(style);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Friperies non trouvés !' });
    }

    if (qty) {
      return res.json({ success: true, thrift: [...data].splice(0, qty) });
    }

    res.json({ success: true, thrift: data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération des friperies par style !', error.message);
  }
};

const searchThriftStore = async (req, res) => {
  try {
    const { query } = req.params;
    if (query.trim()) {
      const response = await thrift.searchThriftStore(req.params.query);
      if (response.length === 0)
        return res.status(404).json({ success: false, message: 'Aucun résultat trouvé' });
      res.json({ success: true, thrift: response });
    }

    res.status(404).json({ success: false, message: 'Aucun résultat trouvé' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log(error);
  }
};

module.exports = {
  createThrift,
  getAllThrifts,
  getSingleThrift,
  getThriftByCity,
  getThriftByStyle,
  searchThriftStore,
};
