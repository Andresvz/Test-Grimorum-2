'use strict';

module.exports.adminpanel = {

  connection: 'mysql',
  
  instances: {

    users: {

      title: 'Usuarios',
      model: 'User',

      list: {
        fields: {
          id: 'ID',
          email: 'Correo',
          type: 'Tipo',
        }
      },

      edit: {
        fields: {
          email: 'Email',

          admin: {
            title: 'Admin',
            disabled: false 
          }
        }
      }
    },
    sales : {
      title: 'Ventas',
      model: 'Sale',
      list: {
        fields: {
          user: 'Usuario',
          products : 'Productos',
          total: 'Total',
        }
      },
    }
  }
};
