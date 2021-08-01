const google = require("googlethis");
const express = require("express");

const googleRouter = express.Router();

googleRouter.post("/", (req, res) => {
  const { transcript } = req.body;
  console.log(req.body);
  if (!transcript) {
    return res.status(400).send("Nothing to process");
  }

  async function start() {
    const options = {
      page: 0,
      safe: false, // show explicit results?
      additional_params: {
        // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
        hl: "en",
      },
    };
    const response = await google.search(transcript, options);
    if (!response) {
      return res.send(404).send("I could not find anything to help you");
    }
    console.log(response);
    res.json(response);
  }

  start();
});

module.exports = googleRouter;
