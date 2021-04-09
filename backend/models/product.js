const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const product = sequelize.define(
    "product",
    {      
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "-"
      },
      bookcontent: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      category: {
        type: Sequelize.STRING
        // allowNull defaults to true
      }
    },
    {
      // options
    }
  );


(async () => {
  await product.sync({ force: false });    
})();

  
module.exports = product;
