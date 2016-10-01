/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'mysql',
  
  attributes: {

    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'text',
      required: true
    },
    price: {
      type: 'float',
      required: true
    },
    stock: {
      type: 'integer',
      required: true,
    },
    image: {
      type: 'string',
      required: true
    },
    features: {
      type: 'text',
    },
    sales:{
      collection: 'sale',
      via: 'product',
      through: 'order'
    }
  }
};

