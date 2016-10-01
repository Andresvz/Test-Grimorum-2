/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {
    Product.find().exec(function (err, products){
      if (err) return res.serverError(err);

      return res.view('home', {
        products: products
      });
    });
  }
};

