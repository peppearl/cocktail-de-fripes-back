const { check, validationResult } = require('express-validator');

const exceptedStyle = [
  'vintage',
  'streetwear',
  'original',
  'elegant',
];

const validator = [
  check('name').trim().not().isEmpty().withMessage('Le nom de la friperie est obligatoire!'),
  check('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Il doit y avoir du contenu!'),
  check('style')
    .isIn(exceptedStyle)
    .withMessage('Tu dois sélectionner une catégorie!'),
  check('city').trim().not().isEmpty().withMessage('La ville est obligatoire!'),
  check('address').trim().not().isEmpty().withMessage('L\'adresse est obligatoire!'),
  check('hours').trim().not().isEmpty().withMessage('Les horaires d\'ouverture sont obligatoires!'),
  check('tel').trim().not().isEmpty().withMessage('Le numéro de téléphone est obligatoire!'),
];

const result = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    const error = result.array()[0].msg;
    res.json({ success: false, message: error });
  }

  next();
};

const validateFile = (req, res, next) => {
  const exceptedFileType = ['png', 'jpg', 'jpeg'];
  if (!req.file) {
    return res.json({ success: false, message: 'L\'image est obligatoire!' });
  }

  const fileExtension = req.file.mimetype.split('/').pop();
  if (!exceptedFileType.includes(fileExtension)) {
    return res.json({ success: false, message: 'Le fichier n\'est pas valide!' });
  }

  next();
};

module.exports = {
  validator,
  result,
  validateFile,
};
