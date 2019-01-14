const db = require("../models");

const items = [
  {
    product_name: "NBA 2K",
    department_name: "Video Games",
    price: 50,
    stock_quantity: 150
  },
  {
    product_name: "Grand Theft Auto V",
    department_name: "Video Games",
    price: 60,
    stock_quantity: 200
  },
  {
    product_name: "Chips and Salsa",
    department_name: "Food and Drink",
    price: 15,
    stock_quantity: 50
  },
  {
    product_name: "Men's Falcons Pajama bottoms",
    department_name: "Apparel",
    price: 25,
    stock_quantity: 5
  },
  {
    product_name: "Women's black leggings",
    department_name: "Apparel",
    price: 25,
    stock_quantity: 35
  },
  {
    product_name: "Shower Gel",
    department_name: "Toiletries",
    price: 42,
    stock_quantity: 42
  },
  {
    product_name: "Kill Bill",
    department_name: "Movies",
    price: 15,
    stock_quantity: 25
  },
  {
    product_name: "This Christmas",
    department_name: "Movies",
    price: 25,
    stock_quantity: 57
  },
  {
    product_name: "Scattergories",
    department_name: "Board Games",
    price: 30,
    stock_quantity: 35
  },
  {
    product_name: "Operation",
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