
module.exports = {
  index: function (req, res) {
    res.view('adminHome', {layout: 'admin'})
  },
  getProduct: function(req,res){
  
    Product.find().exec(function (err, products){
      if (err) return res.serverError(err);
      res.json(products);
    });
  },
  createProduct: function(req,res){
    Product.create(req.body).exec(function (err, product){
      if (err) return res.serverError(err);
      res.json(product);
    
    });
  },
  editProduct : function(req,res){
    Product.update({"id":req.body.id }, req.body)
    .exec(function(err, product) {
      if (err) { return res.serverError(err); }
      res.json(product);
    });
  }

};

