const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/checkout", (req, res) => {
  const { cart } = req.app.locals;
  Product.find({ _id: { $in: Object.keys(cart) } })
    .then(products => {
      let total = 0;
      products = products.map(p => {
        total += p.price * cart[p._id];
        let product = {
          product: p,
          quantity: cart[p._id]
        };
        return product;
      });
      res.render("checkout", { products, total });
    })
    .catch(e => console.log(e));
});

module.exports = router;
