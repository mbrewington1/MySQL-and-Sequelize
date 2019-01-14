CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    createdAT TIMESTAMP NOT NULL,
    updatedAT TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);