const express = require("express");

const Activities = require("../DB/models/ActivitiesModel");

//POST -- create new activity
const create_new_activity = async (req, res) => {
  const { id, author, quote, activity } = req.body;

  try {
    const newActivity = await Activities.create({
      id,
      quote,
      author,
      activity,
    });

    res.json(newActivity);
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET -- find all activities in the db
const get_all_activities = async (req, res) => {
  try {
    const allActivities = await Activities.find({});
    console.log(allActivities);
    res.json(allActivities);
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET -- find one activity by id
const get_one_activity_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await activities.find(
      (activity) => activity.id === Number(id)
    );
    if (!activity) {
      return res
        .status(404)
        .send(`Please provide a valid id between 1 and ${activities.length}`);
    }
    res.json(activity);
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET -- find all activities that match a specific param value
const get_activities_by_param_value_match = async (req, res) => {
  const { word } = req.params;
  console.log(req.params);
  const matchWord = new RegExp(word, "i"); //i = case insensitive

  try {
    // find activity by param value match
    const activitiesContainingWord = await Activities.find({
      activity: { $regex: matchWord },
    });

    if (!activitiesContainingWord) {
      return res
        .status(404)
        .send(
          `Unfortunately, we could not find any activity(/ies) matching '${word}'`
        );
    }
    res.json(activitiesContainingWord);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//PUT update entire activity(i.e. PUT op)
const update_entire_activity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedActivity = await Activities.findOneAndUpdate(
      id,
      { ...req.body },
      { new: true } //option for displaying new activity as response
    );

    if (!updatedActivity) res.status(404).send("Activity not found");
    res.json(updatedActivity);
  } catch (err) {
    res.status(500).send(err);
  }
};

//PATCH update one field in activity(i.e. PATCH op)
const update_one_field_in_activity = async (req, res) => {
  const { id } = req.params;

  const { field, value } = req.body;
  try {
    const { n } = await Activities.updateOne(id, {
      [field]: value,
    });
    if (!n) res.status(404).send("Activity not found");
    res.send("Activity updated successfully.");
  } catch (err) {
    res.status(500).send(err);
  }
};

//DELETE -- delete activity by id
const delete_one_activity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedActivity = await Activities.findOneAndDelete(id);

    if (!deletedActivity) res.status(404).send("Activity not found");
    res.json(deletedActivity);
  } catch (err) {
    res.status(500).send(err);
  }
};

const delete_many_activities = async (req, res) => {
  const { condition } = req.body;

  try {
    // without condition, i.e. key value pair filter for the query method, we deleted all activities
    if (!condition) {
      const deletedActivities = await Activities.deleteMany();
      res.send("You have successfully deleted all the activities");
    }
    const { key, value } = condition;

    if (!key || !value) {
      res.status(404).send("Please provide a key/value pair as filter");
    }
    const { deletedCount } = await Activities.deleteMany({ [key]: value });
    if (!deletedCount) res.status(404).send("No activity matches your filter");
    res.send(
      `You have successfully deleted all items (${deletedCount}) from the DB whose field "${key}" matches the value "${value}"`
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  create_new_activity,
  get_all_activities,
  get_one_activity_by_id,
  get_activities_by_param_value_match,
  update_entire_activity,
  update_one_field_in_activity,
  delete_one_activity,
  delete_many_activities,
};
