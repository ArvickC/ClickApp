let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Person Model
let scoreModel = require('../models/Score');

// CREATE Student
router.route('/create-score').post((req, res, next) => {
    scoreModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      //console.log(data)
      res.json(data)
    }
  })
});

// Delete Student
router.route('/delete-score/:id').delete((req, res, next) => {
    scoreModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Delete Student
router.route('/delete-score').delete((req, res, next) => {
    console.log(req.query.name)
    scoreModel.findOneAndDelete({fname: req.query.name}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Get Students
router.route('/all').get((req, res, next) => {
    console.log(req.query.name)
    scoreModel.find({age: {$gte:2}}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


  router.route('/top10').get((req, res, next) => {
    console.log(req.query.name)
    scoreModel
    .find()
    .sort({clickerCPS: -1})
    .limit(10)
    .exec(((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    }))
  })


// Update Students
router.route('/update-score').put((req, res, next) => {
    console.log(req.body.fname)
    scoreModel.updateOne({fname: req.body.fname}, req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })  


module.exports = router;
