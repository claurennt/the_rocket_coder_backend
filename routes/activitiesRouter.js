const express = require("express");
const activitiesRouter = express.Router();

const activitiesControllers = require("../controllers/activitiesControllers");
// import controllers for activities
const {
  get_all_activities,
  get_one_activity_by_id,
  get_activities_by_param_value_match,
  create_new_activity,
  update_entire_activity,
  update_one_field_in_activity,
  delete_one_activity,
  delete_many_activities,
} = activitiesControllers;

activitiesRouter
  .route("/")
  .get(get_all_activities)
  .post(create_new_activity)
  .delete(delete_many_activities);

activitiesRouter
  .route("/:id")
  .get(get_one_activity_by_id)
  .put(update_entire_activity)
  .patch(update_one_field_in_activity)
  .delete(delete_one_activity);

activitiesRouter.route("/:word").get(get_activities_by_param_value_match);

module.exports = activitiesRouter;
