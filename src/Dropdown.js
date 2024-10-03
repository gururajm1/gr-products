// import { useDispatch } from 'react-redux';
// import { fetchProductsByCategory } from './features/productSlice'; // Import the action

// const Dropdown = () => {
//   const dispatch = useDispatch();

//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     dispatch(fetchProductsByCategory(selectedCategory)); // Dispatch the action with the selected category
//   };

//   return (
//     <div className="relative inline-block w-full">
//       <select
//         className="w-full px-4 py-2 border rounded-md"
//         onChange={handleCategoryChange}
//         defaultValue=""
//       >
//         <option value="" disabled>Select a category</option>
//         <option value="smartphones">Smartphones</option>
//         <option value="laptops">Laptops</option>
//         <option value="fragrances">Fragrances</option>
//         <option value="skincare">Skincare</option>
//         <option value="beauty">Beauty</option>
//         <option value="furniture">Furniture</option>
//         <option value="groceries">Groceries</option>
//         <option value="home-decoration">Home Decoration</option>
//         <option value="kitchen-accessories">Kitchen Accessories</option>
//         <option value="mens-shirts">Men's Shirts</option>
//         <option value="mens-shoes">Men's Shoes</option>
//         <option value="mens-watches">Men's Watches</option>
//         <option value="mobile-accessories">Mobile Accessories</option>
//         <option value="motorcycle">Motorcycle</option>
//         <option value="skin-care">Skin Care</option>
//         <option value="sports-accessories">Sports Accessories</option>
//         <option value="sunglasses">Sunglasses</option>
//         <option value="tablets">Tablets</option>
//         <option value="tops">Tops</option>
//         <option value="vehicle">Vehicle</option>
//         <option value="womens-bags">Women's Bags</option>
//         <option value="womens-dresses">Women's Dresses</option>
//         <option value="womens-jewellery">Women's Jewellery</option>
//         <option value="womens-shoes">Women's Shoes</option>
//         <option value="womens-watches">Women's Watches</option>
//       </select>
//     </div>
//   );
// };

// export default Dropdown;
