const db = require("../Config/Database.js");

// ==> Método responsável por criar um novo 'Product':

exports.createProduct = async (req, res) => {
  const { product_name, quantity, price } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)",
    [product_name, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { product_name, quantity, price }
    },
  });
};

exports.listAllProducts = async (req, res) => {
  const response = await db.query('SELECT * FROM products ORDER BY productname ASC');
  console.log('GetAll feito com sucesso!');
  res.status(200).send(response.rows);
};

exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM products WHERE productid = $1', [productId]);
  res.status(200).send(response.rows);
};

exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, quantity, price } = req.body;

  const response = await db.query(
    "UPDATE products SET productname = $1, quantity = $2, price = $3 WHERE productId = $4",
    [product_name, quantity, price, productId]
  );

  res.status(200).send({ message: "Product Updated Successfully!" });
};

exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
};