// in controllers/stuff.js

const sauce = require("../models/sauces");

exports.createSauce = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.sauce);
  console.log(objetSauce);
  delete objetSauce._id;
  delete objetSauce._userId;
  const sauces = new sauce({
    ...objetSauce,
    _userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce enregistrée",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllSauce = (req, res, next) => { sauce
    .find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
    };

exports.getOneSauce = (req, res, next) => {
      sauce
        .findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
    };