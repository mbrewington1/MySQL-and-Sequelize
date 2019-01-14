const db = require("../models");

const items = [
  {
    product_name: "Uncharted 4",
    department_name: "Video Games",
    price: 49,
    stock_quantity: 150
  },
  {
    product_name: "DOOM",
    department_name: "Video Games",
    price: 59,
    stock_quantity: 200
  },
  {
    product_name: "Crate of Spam",
    department_name: "Food and Drink",
    price: 24,
    stock_quantity: 50
  },
  {
    product_name: "Cool Shades",
    department_name: "Apparel",
    price: 75,
    stock_quantity: 5
  },
  {
    product_name: "Worn Denim Jeans",
    department_name: "Apparel",
    price: 54,
    stock_quantity: 35
  },
  {
    product_name: "Survival Towel",
    department_name: "Necessities",
    price: 42,
    stock_quantity: 42
  },
  {
    product_name: "Bill and Ted's Excellent Adventure",
    department_name: "Films",
    price: 15,
    stock_quantity: 25
  },
  {
    product_name: "Mad Max: Fury Road",
    department_name: "Films",
    price: 25,
    stock_quantity: 57
  },
  {
    product_name: "Monopoly",
    department_name: "Board Games",
    price: 30,
    stock_quantity: 35
  },
  {
    product_name: "Yahtzee",
    department_name: "Board Games",
    price: 19,
    stock_quantity: 23
  }
];

db.sequelize.sync({ force: true }).then(function() {
  db.Product.bulkCreate(items)
    .then(function(rows) {
      console.log("\n\nINSERTED\n\n");
      db.sequelize.close();
    })
    .catch(function(err) {
      console.log("\n\nError:", err);
      db.sequelize.close();
    });
});