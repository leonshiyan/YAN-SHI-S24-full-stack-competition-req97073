import { useState, useEffect } from 'react'
import { getPosts } from './api'

function App() {
const [posts, setPosts] = useState([]);

useEffect(() => {
  const fetchPosts = async () => {
  const data = await getPosts();
  setPosts(data);
  };
  fetchPosts();
}, []);

return (
  <div className="App">
    <h1>Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
        <p>{post.body}</p>
        </li>
        ))}
    </ul>
  </div>
  );
}

export default App;