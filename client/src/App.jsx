// npm modules
import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './api';

import ProductForm from './components/ProductForm/ProductForm';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

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

  return (
    <div className="App">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <h2 onClick={() => handleProductSelect(product.productId)}>{product.productName}</h2>
            <p>Product Number: {product.productId}</p>
            <p>Scrum Master: {product.scrumMasterName}</p>
            <p>Product Owner: {product.productOwnerName}</p>
            <p>Developers: {product.Developers && product.Developers.join(', ')}</p>
            <p>Start Date: {product.startDate}</p>
            <p>Methodology: {product.methodology}</p>
            <button onClick={() => handleProductDelete(product.productId)}>Delete</button>
          </li>
        ))}
      </ul>
      <hr />
      {selectedProduct ? (
        <>
          <h2>Edit Product</h2>
          <ProductForm product={selectedProduct} onSubmit={handleProductUpdate} onCancel={handleProductClear} />
        </>
      ) : (
        <>
          <h2>Create Product</h2>
          <ProductForm onSubmit={handleProductCreate} />
        </>
      )}
    </div>
  );
}



export default App
