import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './api';

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
            <p>{product.productOwnerName}</p>
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

function ProductForm({ product = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(product);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setFormData({});
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name</label>
        <input type="text" id="productName" name="productName" value={formData.productName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="productOwnerName">Product Owner Name</label>
<input type="text" id="productOwnerName" name="productOwnerName" value={formData.productOwnerName || ''} onChange={handleChange} required />
</div>
<div>
<label htmlFor="developers">Developers</label>
<input type="text" id="developers" name="developers" value={formData.developers?.join(', ') || ''} onChange={handleChange} />
</div>
<div>
<label htmlFor="scrumMasterName">Scrum Master Name</label>
<input type="text" id="scrumMasterName" name="scrumMasterName" value={formData.scrumMasterName || ''} onChange={handleChange} required />
</div>
<div>
<label htmlFor="startDate">Start Date</label>
<input type="date" id="startDate" name="startDate" value={formData.startDate || ''} onChange={handleChange} required />
</div>
<div>
<label htmlFor="methodology">Methodology</label>
<select id="methodology" name="methodology" value={formData.methodology || ''} onChange={handleChange} required>
<option value="">Select methodology</option>
<option value="Scrum">Scrum</option>
<option value="Kanban">Kanban</option>
</select>
</div>
<div>
<button type="submit">{product.productId ? 'Update' : 'Create'}</button>
{onCancel && (
<button type="button" onClick={handleCancel}>
Cancel
</button>
)}
</div>
</form>
);
}

export default App