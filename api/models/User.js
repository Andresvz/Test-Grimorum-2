/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  connection: 'mysql',

  attributes: {

    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    type: {
      type: 'string',
      enum: ['admin', 'client'],
      defaultsTo: 'client'
    },
    password: {
      type: 'string'
    },
    sale: {
      collection:'sale',
      via:'user'
    },

    getFullName: function(){
      return this.first_name + ' ' + this.last_name;
    },

    // Este método es para evitar pasar toda la información del modelo
    // Evitamos pasar los siguientes parámetros: password, confirmation, encryptedpassword y _csrf. 
    toJSON: function() { 
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },
  beforeUpdate: function (values, cb) {
    if(values.password){
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return cb(err);

        bcrypt.hash(values.password, salt, function(err, hash) {
          if(err) return cb(err);

          delete values.password;
          values.password = hash;
          return cb();
        });
      });
    }
    else {
      return cb();
    }
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

