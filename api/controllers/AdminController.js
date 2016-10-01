
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
  editProduct: function(req,res){
    Product.update({"id":req.body.id},req.body).exec(function (err, product){
      if (err) return res.negotiate(err);
      return res.json(product);
    });
  },
  deleteProduct: function(req,res){
    Product.destroy({
     "id":req.body.id 
    }).exec(function (err){
      if (err)return res.negotiate(err);
      return res.ok();
    });
  },
  getUsersView: function(req,res){
      res.view('adminUser', {layout: 'admin'})
  },
  getUsers: function(req,res){
    User.find().exec(function (err, users){
      if (err) return res.serverError(err);
      res.json(users);
    });
  },
  createUser: function(req,res){
    User.create(req.body).exec(function (err, user){
      if (err) return res.serverError(err);
      res.json(user);
    });
  },
  deleteUser: function(req,res){
    User.destroy({
      "id":req.body.id 
    }).exec(function (err){
      if (err)return res.negotiate(err);
      return res.ok();
    });
  },
  updateUser: function(req,res){
    User.update({"id":req.body.id},req.body).exec(function (err, user){
      if (err) return res.negotiate(err);
      return res.json(user);
    });
  },
  getSalesView: function(req,res){
    res.view('adminSales', {layout: 'admin'})
  },
  getSales: function(req,res){
    Sale.find().populateAll().exec(function (err, sale){
      if (err) return res.serverError(err);
      res.json(sale);
    });
  },
   
};

