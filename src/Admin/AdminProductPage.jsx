import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    // Remove token and role from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to login page
    navigate('/login');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/product/get-all-products-all');
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        } else {
          throw new Error(data.message || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout} 
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <br />      
      {/* Product Section */}
      <h1 className='text-5xl font-semibold'> Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mx-auto max-w-7xl p-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map(product => (
            <div key={product._id} className="bg-green-50 shadow-md overflow-hidden">
              {/* Displaying only the first image */}
              <img className="w-full h-60 object-cover object-center" src={product.images[0]} alt={product.name} />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <Link to={`/product/${product._id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminProductPage;
