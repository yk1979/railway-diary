require("dotenv").config();

module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID
  }
};
