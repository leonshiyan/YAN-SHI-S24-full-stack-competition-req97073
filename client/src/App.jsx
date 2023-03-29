import { useState, useEffect } from 'react'
import { getProducts } from './api'

function App() {
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
  const data = await getProducts();
  setProducts(data);
  };
  fetchProducts();
}, []);

return (
  <div className="App">
    <h1>Products</h1>
    <h2>Number of products : {products.length}</h2>
    <ul>
      {products.map((product) => (
        <li key={product.productId}>
          <h2>{product.productName}</h2>
        <p>{product.productOwnerName}</p>
        </li>
        ))}
    </ul>
  </div>
  );
}

export default App;