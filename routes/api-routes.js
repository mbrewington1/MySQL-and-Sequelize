const db = require('../models');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get('/api/products', function(req, res) {
    db.Product.findAll({}).then(function(rows) {
      res.json(rows)
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // POST Request
  // Adds a new product to our database
  // Responds with success: true or false if successful
  app.post('/api/products', function(req, res) {
    db.Product.create(req.body).then(function(rows) {
      res.json({ success: true });
    }).catch(function(error) {
      res.json({ error: error })
    });
  });

  // GET Request
  // Responds with just the requested product at the referenced id
  app.get('/api/products/:id', function(req, res) {
    db.Product.find({ where: { id: req.params.id }})
      .then(function(data){
        res.json(data);
      }).catch(function(error) {
        res.json({ error: error });
      });
  });

  // PUT Request
  // Replaces the product info at the referenced id with the one provided
  // Responds with success: true or false if successful
  app.put('/api/products/:id', function(req, res) {
    db.Product.update(
      req.body,
      { where: { id: req.params.id } }
    ).then(function() {
      db.Product.findAll({}).then(function(rows) {
        res.json(rows)});
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // DELETE Request
  // Removes the proudct at the referenced id
  // Responds with success: true or false if successful

  app.delete('/api/products/:id', function(req, res) {
    db.Product.destroy({ 
      where: { id: req.params.id } 
    }).then(function() {
      res.json({ success: true });
    }).catch(function(error) {
      res.json({ error: error });
    });  
  });

};