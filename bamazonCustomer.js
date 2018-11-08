var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'bamazon'
});

homeScreen();

function homeScreen() {
  connection.query('SELECT * FROM products', function (err, resp) {
    console.log('Welcome to BAMAZON. Here is a table of our complete inventory.\n');
    for (var i = 0; i < resp.length; i++) {
      console.log(`${resp[i].id} - ${resp[i].itemname} || price: $${resp[i].price}.00 || quantity: ${resp[i].quant}`);
    }
    
    inquirer.prompt([{
      type: 'input',
      name: 'itemid',
      message: 'What is the ID of the item you would like to purchase?',
      validate: function (resp) {
        if (isNaN(resp)) {
          return false;
        }
          return true;
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many units of this item would you like to purchase?',
      validate: function (resp) {
        if (isNaN(resp)) {
          return false;
        }
          return true;
      }
    }]).then(ans => {
      validatePurchase(ans.itemid, ans.quantity);
    })
  })
};

function validatePurchase(id, quantity) {
  connection.query('SELECT itemname, quant FROM products WHERE ?', { id: id }, (err, resp) => {

    var stockQuantity = resp[0].quant;
    if (quantity <= stockQuantity) {
      customerPurchase(id, quantity, stockQuantity);
    }
    else {
      console.log(quantity, stockQuantity, 'Sorry, we don\'t have enough of that product in stock!');
    }
  })
};

function customerPurchase(x, y, z) {
  var newStockQuantity = (z - y);

  connection.query('UPDATE products SET ? WHERE ?', [
    {
      quant: newStockQuantity
    },
    {
      id: x
    }
  ], (err, resp) => {
    if (err) throw err;
    else {
      console.log('Your order has been placed!\n\nThank you for shopping at BAMAZON!');
      homeScreen();

    }
  });
  if (newStockQuantity === 0) {
    connection.query('UPDATE products SET ? WHERE ?', [{
      quant: 0
    }], (err, resp) => {
      if (err) throw err;
    })
  }
};