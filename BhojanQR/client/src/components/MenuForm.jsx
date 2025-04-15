// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MenuForm = ({ backendUri, onCancel, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "Main Course",
//     description: "",
//     image: null,
//     available: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("adminToken");
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, val]) => data.append(key, val));

//       const response = await axios.post(`${backendUri}/api/menu/add`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       onSuccess(response.data.menuItem); // Update parent
//       toast.success("Item added successfully!");
//     } catch (error) {
//       console.error("Error adding menu item:", error);
//       toast.error("Failed to add item. Please try again.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-4 p-6 rounded-xl shadow-xl bg-gradient-to-r from-green-100 via-white to-green-300"
//     >
//       <h2 className="text-2xl font-bold text-green-800 mb-4 drop-shadow-lg">
//         Add New Menu Item
//       </h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Item Name"
//         value={formData.name}
//         onChange={handleChange}
//         className="w-full mb-3 p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={formData.price}
//         onChange={handleChange}
//         className="w-full mb-3 p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//         required
//       />
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         className="w-full mb-3 p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//       >
//         <option>Main Course</option>
//         <option>Starter</option>
//         <option>Dessert</option>
//         <option>Beverage</option>
//       </select>
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={formData.description}
//         onChange={handleChange}
//         className="w-full mb-3 p-3 rounded-lg border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//       />
//       <input
//         type="file"
//         name="image"
//         accept="image/*"
//         onChange={handleChange}
//         className="w-full mb-3 p-3 rounded-lg border border-orange-500"
//         required
//       />
//       <label className="flex items-center space-x-2 mb-4">
//         <input
//           type="checkbox"
//           name="available"
//           checked={formData.available}
//           onChange={handleChange}
//           className="text-green-500"
//         />
//         <span className="text-gray-600">Available</span>
//       </label>
//       <div className="flex gap-4">
//         <button
//           type="submit"
//           className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
//         >
//           Add Item
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MenuForm;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MenuForm = ({ backendUri, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Main Course",
    description: "",
    image: null,
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));

      const response = await axios.post(`${backendUri}/api/menu/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess(response.data.menuItem); // Update parent
      toast.success("✅ Item added successfully!");
      setFormData({ // Reset form after successful submission
        name: "",
        price: "",
        category: "Main Course",
        description: "",
        image: null,
        available: true,
      });
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("❌ Failed to add item. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mt-4 border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        ➕ Add New Menu Item
      </h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter item name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          <option>Main Course</option>
          <option>Starter</option>
          <option>Dessert</option>
          <option>Beverage</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={formData.available}
          onChange={handleChange}
          className="form-checkbox h-4 w-4 text-green-500 focus:ring-green-500 rounded border-gray-300"
        />
        <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
          Available
        </label>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MenuForm;