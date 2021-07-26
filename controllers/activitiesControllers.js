const express = require("express");

const activities = require("../activities.json");

const get_all_activities = (req, res) => {
  res.json(activities);
};

const get_one_activity = (req, res) => {
  const { id } = req.params;

  const activity = activities.find((activity) => activity.id === Number(id));
  res.json(activity);
};

module.exports = { get_all_activities, get_one_activity };
