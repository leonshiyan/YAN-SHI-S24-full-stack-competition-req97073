import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './api';

import ProductForm from './components/ProductForm/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [scrumMasterName, setScrumMasterName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(scrumMasterName);
      setProducts(data);
    };
    fetchProducts();
  }, [scrumMasterName]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = async (productId) => {
    const product = await getProduct(productId);
    setSelectedProduct(product);
  };

  const handleProductCreate = async (product) => {
    const newProduct = await createProduct(product);
    setProducts([...products, newProduct]);
  };

  const handleProductUpdate = async (product) => {
    const updatedProduct = await updateProduct(product.productId, product);
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p.productId === product.productId);
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
    setSelectedProduct(updatedProduct);
  };

  const handleProductDelete = async (productId) => {
    await deleteProduct(productId);
    const newProducts = products.filter((p) => p.productId !== productId);
    setProducts(newProducts);
    setSelectedProduct(null);
  };

  const handleProductClear = () => {
    setSelectedProduct(null);
  };

  const handleScrumMasterNameChange = (event) => {
    setScrumMasterName(event.target.value);
  };

  return (
    <div className="App">
      <h1>Products</h1>
      <div className="search">
        <label htmlFor="scrumMasterName">Search by Scrum Master:</label>
        <input type="text" id="scrumMasterName" name="scrumMasterName" value={scrumMasterName} onChange={handleScrumMasterNameChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId} onClick={() => handleProductSelect(product.productId)}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Products: {products.length}</td>
          </tr>
        </tfoot>
      </table>
      <hr />
      {selectedProduct ? (
        <>
          <h2>Edit Product</h2>
          <ProductForm product={selectedProduct} onSubmit={handleProductUpdate} onCancel={handleProductClear} />
        </>
      ) : (
        <>
          <h2>Create Product</h2>
          <ProductForm onSubmit={handleProductCreate} nextProductId={products.length + 1} />
        </>
      )}
    </div>
  );
}

export default App;
