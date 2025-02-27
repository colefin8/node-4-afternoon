const swag = require("../models/swag");

module.exports = {
  search: (req, res) => {
    const { category } = req.query;
    if (!category) {
      res.status(200).send(swag);
    } else {
      const filtered = swag.filter(e => e.category === category);
      res.status(200).send(filtered);
    }
  }
};
