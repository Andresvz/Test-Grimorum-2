/**
 * Sale.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'mysql',

  attributes: {

    user : {
      model: 'user'
    },
    products: {
      collection:'product',
      via:'sale',
      through: 'order'
    },
    total: {
      type: 'float'
    }
  }
};

