import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './api';

import ProductForm from './components/ProductForm/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [scrumMasterFilter, setScrumMasterFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.scrumMasterName.toLowerCase().includes(scrumMasterFilter.toLowerCase()));
    setFilteredProducts(filtered);
  }, [scrumMasterFilter, products]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = async (productId) => {
    const product = await getProduct(productId);
    setSelectedProduct(product);
  };

  const handleProductCreate = async (product) => {
    const newProduct = await createProduct(product);
    setProducts([...products, newProduct]);
    setFilteredProducts([...filteredProducts, newProduct]);
  };

  const handleProductUpdate = async (product) => {
    const updatedProduct = await updateProduct(product.productId, product);
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p.productId === product.productId);
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
    const filtered = newProducts.filter((p) => p.scrumMasterName.toLowerCase().includes(scrumMasterFilter.toLowerCase()));
    setFilteredProducts(filtered);
    setSelectedProduct(updatedProduct);
  };

  const handleProductDelete = async (productId) => {
    await deleteProduct(productId);
    const newProducts = products.filter((p) => p.productId !== productId);
    setProducts(newProducts);
    const filtered = newProducts.filter((p) => p.scrumMasterName.toLowerCase().includes(scrumMasterFilter.toLowerCase()));
    setFilteredProducts(filtered);
    setSelectedProduct(null);
  };

  const handleProductClear = () => {
    setSelectedProduct(null);
  };

  const handleFilterChange = (event) => {
    setScrumMasterFilter(event.target.value);
  };

  return (
    <div className="App">
      <h1>Products</h1>
      <div>
        <label htmlFor="scrumMasterFilter">Search Scrum Master:</label>
        <input type="text" id="scrumMasterFilter" value={scrumMasterFilter} onChange={handleFilterChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Product Number</th>
            <th>Developers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>{product.productId}</td>
              <td>{product.Developers.join()}</td>
              <td>
                <button onClick={() => handleProductSelect(product.productId)}>Edit</button>
                <button onClick={() => handleProductDelete(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total products found : {filteredProducts.length}</div>
      <hr />
      {selectedProduct ? (
      <>
      <h2>Edit Product</h2>
        <ProductForm product={selectedProduct} onSubmit={handleProductUpdate} onCancel={handleProductClear} nextProductId={products.length + 1} />
      </>
      ) : (
      <>
      <h2>Create Product</h2>
        <ProductForm onSubmit={handleProductCreate} onCancel={handleProductClear} nextProductId={products.length + 1} />
      </>
      )}
    </div>
  );
}
export default App;


