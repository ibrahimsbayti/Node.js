productUpdate.put('all-products/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.id = req.body.id;
    product.name = req.body.name;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productUpdate;
