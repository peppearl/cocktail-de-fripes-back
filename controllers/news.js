const News = require('../news/news');
const imageProcess = require('../util/imageProcess');

const news = new News();

const createNews = async (req, res) => {
  const id = news.createId();

  try {
    const imageName = await imageProcess(req, id);
    news.create(req.body, id, imageName); // http://localhost:3000/image-name
    res.json({ success: true, message: 'Article créé avec succès !' });
  } catch (error) {
    res.json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la création de l\'article.', error.message);
  }
};

const getAllNews = async (req, res) => {
  try {
    const data = await news.getAll();
    res.json({ success: true, news: data });
  } catch (error) {
    res.json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération des articles', error.message);
  }
};

const getSingleNews = async (req, res) => {
  try {
    const data = await news.getSingle(req.params.id);
    if (!data) {
      return res.json({
        success: false,
        message: 'Article non trouvé !',
      });
    }

    res.json({
      success: true,
      news: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération de l\'article.', error.message);
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const { category, qty } = req.params;
    const data = await news.getByCategory(category);
    if (!data) {
      return res.json({ success: false, message: 'Articles non trouvés !' });
    }

    if (qty) {
      return res.json({ success: true, news: [...data].splice(0, qty) });
    }

    res.json({ success: true, news: data });
  } catch (error) {
    res.json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log('Une erreur est survenue lors de la récupération des articles par catégories !', error.message);
  }
};

const searchPosts = async (req, res) => {
  try {
    const { query } = req.params;
    if (query.trim()) {
      const response = await news.searchPosts(req.params.query);
      if (response.length === 0)
        return res.json({ success: false, message: 'Aucun résultat trouvé' });
      res.json({ success: true, news: response });
    }

    res.json({ success: false, message: 'Aucun résultat trouvé' });
  } catch (error) {
    res.json({
      success: false,
      message: 'Une erreur est survenue sur le serveur !',
    });
    console.log(error);
  }
};

module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  getNewsByCategory,
  searchPosts,
};
