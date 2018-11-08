var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'noodles12',
  database: 'bamazon_db'
});

homeScreen();

function homeScreen() {
  console.log('Welcome to BAMAZON. Here is a table of our complete inventory.\n');
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id} - ${res[i].product_name} || price: $${res[i].price}.00 || quantity: ${res[i].stock_quantity}`);
    }
    
    inquirer.prompt([{
      type: 'input',
      name: 'itemid',
      message: 'What is the ID of the item you would like to purchase?',
      validate: function (res) {
        if (isNaN(res)) {
          return false;
        }
          return true;
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many units of this item would you like to purchase?',
      validate: function (res) {
        if (isNaN(res)) {
          return false;
        }
          return true;
      }
    }]).then(ans => {
      validatePurchase(ans.item_id, ans.stock_quantity) ;
    })
  })
};

function validatePurchase(item_id, stock_quantity) {
  connection.query('SELECT product_name, stock_quantity FROM products WHERE ?', { item_id: item_id }, (err, res) => {

    var stockQuantity = res.stock_quantity;
    if (stock_quantity <= stockQuantity) {
      customerPurchase(item_id, stock_quantity);
    }
    else {
      console.log(res.stock_quantity, 'Sorry, we don\'t have enough of that product in stock!');
    }
  })
};

function customerPurchase(x, y, z) {
  var newStockQuantity = (z - y);

  connection.query('UPDATE products SET ? WHERE ?', [
    {
      stock_quantity: newStockQuantity
    },
    {
      item_id: x
    }
  ], (err, res) => {
    if (err) throw err;
    else {
      console.log('Your order has been placed!\n\nThank you for shopping at BAMAZON!');
      homeScreen();

    }
  });
  if (newStockQuantity === 0) {
    connection.query('UPDATE products SET ? WHERE ?', [{
      stock_quantity: 0
    }], (err, res) => {
      if (err) throw err;
    })
  }
};