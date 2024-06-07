import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {products.map(product => (
        <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md m-4 p-4 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform transition-transform hover:scale-105  hover:bg-gray-300 hover:text-white">
          <img src={product.thumbnail} alt={product.title} className="mb-4 w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-red-500 text-lg font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
