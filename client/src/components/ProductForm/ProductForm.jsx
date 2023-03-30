import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';


function ProductForm(props) {
  const [product, setProduct] = useState(props.product || {});

  useEffect(() => {
    setProduct(props.product || {});
  }, [props.product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(product);
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    } else {
      setProduct({});
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDevelopersChange = (event) => {
    const developers = event.target.value.split(',');
    setProduct({ ...product, developers });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name</label>
        <input type="text" id="productName" name="productName" value={product.productName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="productOwnerName">Product Owner Name</label>
        <input type="text" id="productOwnerName" name="productOwnerName" value={product.productOwnerName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="developers">Developers</label>
        <input type="text" id="developers" name="developers" value={product.Developers?.join(', ') || ''} onChange={handleDevelopersChange} />
      </div>
      <div>
        <label htmlFor="scrumMasterName">Scrum Master Name</label>
        <input type="text" id="scrumMasterName" name="scrumMasterName" value={product.scrumMasterName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" value={format(new Date(product.startDate), 'yyyy-MM-dd') || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="methodology">Methodology</label>
        <select id="methodology" name="methodology" value={product.methodology || ''} onChange={handleChange} required>
            <option value="">Select methodology</option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
        </select>
        </div>
        <div>
            <button type="submit">{product.productId ? 'Update' : 'Create'}</button>
            {props.onCancel && (
            <button type="button" onClick={handleCancel}>
            Cancel
            </button>
            )}
        </div>
        </form>
    );
}

export default ProductForm;
