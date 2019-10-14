const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    const cartIndex = user.cart.findIndex(e => e.id == +id);

    if (cartIndex === -1) {
      const selectedSwag = swag.find(e => e.id == +id);
      user.cart.push(selectedSwag);
      user.total += selectedSwag.price;
    }
    res.status(200).send(user);
  },

  delete: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    const cartIndex = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (cartIndex !== -1) {
      user.cart.splice(cartIndex, 1);
      user.total -= selectedSwag.price;
    }

    res.status(200).send(user);
  },

  checkout: (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(user);
  }
};
