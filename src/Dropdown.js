// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   fetchProducts,
//   fetchProductsByCategory,
//   selectProducts,
//   selectLoading,
//   selectError
// } from './features/productSlice';
// import { Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// const categories = [
//   "All Categories", "Smartphones", "Laptops", "Fragrances", "Beauty", "Furniture", 
//   "Groceries", "Home-Decoration", "Kitchen-Accessories", "Mens-Shirts", "Mens-Shoes", 
//   "Mens-Watches", "Mobile-Accessories", "Motorcycle", "Skin-Care", "Sports-Accessories", 
//   "Sunglasses", "Tablets", "Tops", "Vehicle", "Womens-Bags", "Womens-Dresses", 
//   "Womens-Jewellery", "Womens-Shoes", "Womens-Watches"
// ];

// export default function ProductDashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage, setProductsPerPage] = useState(10);
//   const [autocompleteResults, setAutocompleteResults] = useState([]);

//   const products = useSelector(selectProducts);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const category = params.get('category');
//     const search = params.get('search');

//     if (category && category !== 'All Categories') {
//       setSelectedCategory(category);
//       dispatch(fetchProductsByCategory(category, currentPage, productsPerPage));
//     } else {
//       dispatch(fetchProducts(currentPage, productsPerPage));
//     }

//     if (search) {
//       setSearchTerm(search);
//     }
//   }, [location, currentPage, dispatch, productsPerPage]);

//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
//     if (value && value !== "All Categories") {
//       navigate({
//         pathname: location.pathname,
//         search: `?category=${value}&search=${searchTerm}`
//       });
//       dispatch(fetchProductsByCategory(value, 1, productsPerPage));
//     } else {
//       navigate({
//         pathname: location.pathname,
//         search: `?search=${searchTerm}`
//       });
//       dispatch(fetchProducts(1, productsPerPage));
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setCurrentPage(1);

//     if (value === '') {
//       navigate({
//         pathname: location.pathname,
//         search: `?category=${selectedCategory}`
//       });
//       if (selectedCategory && selectedCategory !== "All Categories") {
//         dispatch(fetchProductsByCategory(selectedCategory, 1, productsPerPage));
//       } else {
//         dispatch(fetchProducts(1, productsPerPage));
//       }
//     } else {
//       navigate({
//         pathname: location.pathname,
//         search: `?category=${selectedCategory}&search=${value}`
//       });

//       // Simulated autocomplete (replace with actual API call in production)
//       const results = products
//         .filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
//         .map(product => product.title);
//       setAutocompleteResults(results);
//     }
//   };

//   const handleAutocompleteSelect = (value) => {
//     setSearchTerm(value);
//     setAutocompleteResults([]);
//   };

//   const loadMoreProducts = () => {
//     setCurrentPage(currentPage + 1);
//     if (selectedCategory && selectedCategory !== "All Categories") {
//       dispatch(fetchProductsByCategory(selectedCategory, currentPage + 1, productsPerPage));
//     } else {
//       dispatch(fetchProducts(currentPage + 1, productsPerPage));
//     }
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     if (selectedCategory && selectedCategory !== "All Categories") {
//       dispatch(fetchProductsByCategory(selectedCategory, pageNumber, productsPerPage));
//     } else {
//       dispatch(fetchProducts(pageNumber, productsPerPage));
//     }
//   };

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const pageRangeStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
//   const pageRangeEnd = Math.min(pageRangeStart + 9, totalPages);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white p-6 overflow-y-auto h-full">
//         <h2 className="text-xl font-semibold mb-4">Categories</h2>
//         <ul className="space-y-2">
//           {categories.map((category) => (
//             <li key={category}>
//               <button
//                 className={`w-full text-left p-2 ${selectedCategory === category ? 'bg-primary/10 text-primary' : ''}`}
//                 onClick={() => handleCategoryChange(category)}
//               >
//                 {category}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6 overflow-y-auto h-full">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <header className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Dashboard</h1>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className="w-full border-gray-300 rounded-md pl-10 p-2"
//                 />
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//                 {autocompleteResults.length > 0 && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
//                     {autocompleteResults.map((result, index) => (
//                       <li
//                         key={index}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleAutocompleteSelect(result)}
//                       >
//                         {result}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => handleCategoryChange(e.target.value)}
//                 className="w-full sm:w-[200px] border-gray-300 rounded-md p-2"
//               >
//                 <option value="">Select category</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </header>

//           {/* Error message */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
//               <strong className="font-bold">Error:</strong>
//               <span className="block sm:inline"> {error}</span>
//             </div>
//           )}

//           {/* Product grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading
//               ? Array.from({ length: productsPerPage }).map((_, index) => (
//                   <div key={index} className="overflow-hidden bg-white rounded-md shadow-md p-4">
//                     <div className="h-48 w-full bg-gray-300"></div>
//                     <div className="mt-4">
//                       <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded-md"></div>
//                     </div>
//                   </div>
//                 ))
//               : filteredProducts.slice(0, currentPage * productsPerPage).map((product) => (
//                   <div key={product.id} className="overflow-hidden bg-white rounded-md shadow-md p-4">
//                     <img
//                       className="h-48 w-full object-cover rounded-md"
//                       src={product.image}
//                       alt={product.title}
//                     />
//                     <div className="mt-4">
//                       <h2 className="font-semibold text-lg">{product.title}</h2>
//                       <p className="text-sm text-gray-500">{product.description}</p>
//                       <div className="flex items-center mt-2">
//                         <Star className="text-yellow-400" />
//                         <span className="ml-1">{product.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//           </div>

//           {/* Load More */}
//           {filteredProducts.length > currentPage * productsPerPage && (
//             <div className="flex justify-center mt-6">
//               <button
//                 className="bg-primary text-white px-4 py-2 rounded-md"
//                 onClick={loadMoreProducts}
//               >
//                 Load More
//               </button>
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center mt-6">
//               <div className="flex space-x-2">
//                 <button
//                   className="text-primary"
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 {Array.from({ length: pageRangeEnd - pageRangeStart + 1 }, (_, index) => (
//                   <button
//                     key={index}
//                     className={`${
//                       currentPage === pageRangeStart + index
//                         ? 'bg-primary text-white'
//                         : 'text-primary'
//                     } px-3 py-1 rounded-md`}
//                     onClick={() => paginate(pageRangeStart + index)}
//                   >
//                     {pageRangeStart + index}
//                   </button>
//                 ))}
//                 <button
//                   className="text-primary"
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
