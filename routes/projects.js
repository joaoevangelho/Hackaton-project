const express = require("express");

const router = new express.Router();

const Projects = require("../models/project");
const City = require("./../models/city");

router.get("/form", (req, res, next) => {
  res.render("form/index");
});

router.post("/form", (req, res, next) => {
  // console.log(req.file);
  const name = req.body.name;
  const co2 = req.body.co2;
  const squareMeter = co2 / 0.56 * 0.05;
  console.log(name, co2, squareMeter);
  City.create({
    name,
    co2,
    squareMeter
  })
    .then(form => {
      res.render("form/index", { form });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/", (req, res, next) => {
  Projects.find()
    .sort({
      creationDate: -1
    })
    .then(projects => {
      res.render("projects/list", {
        projects
      });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  res.render("projects/create");
});

router.post("/create", (req, res, next) => {
  // console.log(req.file);
  const name = req.body.name;
  const location = req.body.location;
  const stage = req.body.stage;
  const squaremeter = req.body.squaremeter;

  Projects.create({
    name,
    location,
    stage,
    squaremeter
  })
    .then(res.redirect(`/projects/list`))
    .catch(error => {
      next(error);
    });
});

router.get("/list", (req, res, next) => {
  // res.render('projects/list');
  Projects.find()
    .sort({
      creationDate: -1
    })
    .then(projects => {
      console.log(projects);
      res.render("projects/list", {
        projects
      });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
