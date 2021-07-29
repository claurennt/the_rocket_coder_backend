const express = require("express");
const activitiesRouter = express.Router();

const activitiesControllers = require("../controllers/activitiesControllers");
// import controllers for activities
const { get_all_activities, get_one_activity } = activitiesControllers;
/* GET users listing. */

activitiesRouter.route("/").get(get_all_activities);

activitiesRouter.route("/:id").get(get_one_activity);

module.exports = activitiesRouter;
