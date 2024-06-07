import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  useEffect(() => {
    let updatedProducts = products;

    // Filtering
    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sorting
    if (sortCriteria === 'price-asc') {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'price-desc') {
      updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === 'title-asc') {
      updatedProducts = updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === 'title-desc') {
      updatedProducts = updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, sortCriteria, products]);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-2 sm:mb-0 sm:mr-4 p-2 border rounded-full w-full sm:w-auto"
        />
        <select
          value={sortCriteria}
          onChange={e => setSortCriteria(e.target.value)}
          className="p-2 border rounded-full text-black w-full sm:w-auto"
        >
          <option value="">Sort by</option>
          <option value="price-desc">Price: Low to High</option>
          <option value="price-asc">Price: High to Low</option>
          <option value="title-desc">Title: A to Z</option>
          <option value="title-asc">Title: Z to A</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center p-4">

        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md m-4 p-4 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform transition-transform hover:scale-105  hover:bg-gray-300 hover:text-white">
            <img src={product.thumbnail} alt={product.title} className="mb-4 w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-red-500 text-lg font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
