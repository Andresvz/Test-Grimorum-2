/**
 * OrderController
 */

module.exports = {
  checkout : function (req, res) {

    Product.find().exec(function (err, products){
      if (err) return res.serverError(err);

      return res.view('checkout', {
        products: products
      });
    });

  },

  sale : function (req, res) {
    sails.log(req.user.id);
    var total = 0;
    var stock_g = 0;
    var id_product = 0;

    req.body.forEach(function(product, index){
      total += product.price* product.quantity; 
    });
    Sale.create({
      "user":req.user.id,"total":total}).exec(function (err, sale){
        if (err) { return res.serverError(err); }
        req.body.forEach(function(product, index){
          Order.create({
            "product":product.id,
            "sale":sale.id,
            "quantity": product.quantity
          }).exec(function (err, order){
            if (err) { return res.serverError(err); }
            Product.find({"id":order.product}).exec(function (err, o_product){
              if (err) { return res.serverError(err); }
              sails.log('product find:',o_product[0] );
              sails.log('product find:',order.quantity );
              stock_g = parseInt(o_product[0].stock) - parseInt(product.quantity); 
              sails.log('nuevo stock:',stock_g );
              Product.update({"id":order.product }, {"stock":stock_g})
              .exec(function(err, products) {
                sails.log('nhuevo stock:',products );
                if (err) { return res.serverError(err); }
              });
            });
          });
        })
        return res.ok();
      });
  }
};

