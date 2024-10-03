import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  fetchProducts,
  fetchProductsByCategory,
  selectProducts,
  selectLoading,
  selectError
} from './features/productSlice';
import { Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function Dash() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Maintain selected category state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Fetch all products on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');

    // If category is found in query params, update the selected category and fetch products
    if (category) {
      setSelectedCategory(category); // Set dropdown to selected category
      dispatch(fetchProductsByCategory(category));
    } else {
      dispatch(fetchProducts());
    }

    if (search) {
      setSearchTerm(search); // Set the search term from query params
    }
  }, [location, dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle category selection from dropdown
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); // Update the selected category state
    if (selectedCategory) {
      // Update the URL with the selected category
      navigate({
        pathname: location.pathname,
        search: `?category=${selectedCategory}&search=${searchTerm}`
      });
      dispatch(fetchProductsByCategory(selectedCategory)); // Fetch products by category
    } else {
      navigate({
        pathname: location.pathname,
        search: `?search=${searchTerm}`
      });
      dispatch(fetchProducts()); // Fetch all products if no category is selected
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate({
      pathname: location.pathname,
      search: `?category=${selectedCategory}&search=${value}` // Keep the selected category in URL
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-8 flex justify-between">
        {/* Dropdown placed at the leftmost side */}
        <div className="flex-shrink-0">
          <select
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleCategoryChange}
            value={selectedCategory} // Set the value of the dropdown to match the query param
          >
            <option value="">All Categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="beauty">Beauty</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home Decoration</option>
            <option value="kitchen-accessories">Kitchen Accessories</option>
            <option value="mens-shirts">Men's Shirts</option>
            <option value="mens-shoes">Men's Shoes</option>
            <option value="mens-watches">Men's Watches</option>
            <option value="mobile-accessories">Mobile Accessories</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="skin-care">Skin Care</option>
            <option value="sports-accessories">Sports Accessories</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="tablets">Tablets</option>
            <option value="tops">Tops</option>
            <option value="vehicle">Vehicle</option>
            <option value="womens-bags">Women's Bags</option>
            <option value="womens-dresses">Women's Dresses</option>
            <option value="womens-jewellery">Women's Jewellery</option>
            <option value="womens-shoes">Women's Shoes</option>
            <option value="womens-watches">Women's Watches</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Search bar centered */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[500px] pl-10 pr-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Display products here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.description.slice(0, 100)}...</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  <Star size={16} />
                </span>
                <span className="ml-1">{product.rating}</span>
              </div>
              <p className="mt-2 text-gray-800 font-bold">${product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination and other UI components here */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow" aria-label="Pagination">
          {/* Pagination buttons */}
        </nav>
      </div>
    </div>
  );
}
