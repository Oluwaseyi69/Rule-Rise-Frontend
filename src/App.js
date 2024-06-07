import ProductList from './components/ProductList';
import './index.css';

function App() {
 return(
  <div className="text-center">
  <header className="bg-gray-800 text-white p-5">
    <h1 className="text-3xl">Product List</h1>
  </header>
  <ProductList />
</div>
 )
}

export default App;
