import React, { useState } from 'react';
import { format } from 'date-fns';

function ProductForm(props) {
  const [product, setProduct] = useState(props.product || {});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(product);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDeveloperChange = (event, index) => {
    const { value } = event.target;
    const developers = [...(product.Developers || [])];
    developers[index] = value;
    setProduct({ ...product, Developers: developers });
  };

  const handleAddDeveloper = () => {
    const developers = [...(product.Developers || []), ''];
    setProduct({ ...product, Developers: developers });
  };

  const handleRemoveDeveloper = (index) => {
    const developers = [...(product.Developers || [])];
    developers.splice(index, 1);
    setProduct({ ...product, Developers: developers });
  };

  const startDate = product.startDate && Date.parse(product.startDate) ? format(new Date(product.startDate), 'yyyy-MM-dd') : '';

  return (
    <form onSubmit={handleSubmit}>
      {product.productId === undefined && (
        <div>
          <p>Product Number: {props.productId}</p>
        </div>
      )}
      <div>
        <label htmlFor="productName">Product Name</label>
        <input type="text" id="productName" name="productName" value={product.productName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="productOwnerName">Product Owner</label>
        <input type="text" id="productOwnerName" name="productOwnerName" value={product.productOwnerName || ''} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="scrumMasterName">Scrum Master</label>
        <input type="text" id="scrumMasterName" name="scrumMasterName" value={product.scrumMasterName || ''} onChange={handleChange} required />
      </div>
      {product.Developers && product.Developers.map((developer, index) => (
        <div key={index}>
          <label htmlFor={`developer${index}`}>Developer {index + 1}</label>
          <div>
            <input type="text" id={`developer${index}`} name={`developer${index}`} value={developer} onChange={(event) => handleDeveloperChange(event, index)} />
            <button type="button" onClick={() => handleRemoveDeveloper(index)}>Remove</button>
          </div>
        </div>
      ))}
      {(!product.Developers || product.Developers.length < 5) && (
        <button type="button" onClick={handleAddDeveloper}>Add Developer</button>
      )}
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleChange} required />
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
        <button type="submit">{product.productId === undefined ? 'Create' : 'Update'}</button>
        {props.onCancel && (
        <button type="button" onClick={props.onCancel}>
            Cancel
        </button>
        )}
    </div>
</form>
);
}

export default ProductForm;
