DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(10) auto_increment not null,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('stuffed unicorn','pets',6.66,8000000),('broccoli','pantry',2,800),("24x36 print of Kate Bush\'s Hounds of Love cover",'music',36,100),('used tattoo gun','art',80,25),('a cast bronze replica of the slice of pizza that pizza rat was dragging','pantry',800,15),('8 lightning chargers for iPhone that will each work for one month','technology',12,3000),('vintage Coca-Cola bottle stuffed with random street trash','art',35,700),("a macbook pro that doesn\'t work but is good for levelling tables/beds",'furniture',60,223),('an iPod classic that is much older than the macbook but still works and has a 24 hour battery life','technology',345,60),('bottle cap necklace made by a 7th grader','fashion',7,280)