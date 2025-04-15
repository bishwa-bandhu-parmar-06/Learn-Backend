// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const backendUri = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000";

// const EditMenuForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     available: true,
//     image: null,
//     imagePreview: "",
//   });

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await axios.get(`${backendUri}/api/menu/${id}`);
//         const { name, price, category, description, available, imageUrl } =
//           res.data.item;

//         setFormData((prev) => ({
//           ...prev,
//           name,
//           price,
//           category,
//           description,
//           available,
//           imagePreview: imageUrl,
//         }));
//       } catch (err) {
//         console.error("Error fetching menu item:", err.message);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         image: files[0],
//         imagePreview: URL.createObjectURL(files[0]),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("price", formData.price);
//       form.append("category", formData.category);
//       form.append("description", formData.description);
//       form.append("available", formData.available);
//       if (formData.image) form.append("image", formData.image);

//       const res = await axios.put(`${backendUri}/api/menu/update/${id}`, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       });

//       console.log("Menu item updated:", res.data);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error("Error updating item:", err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white to-orange-100 px-4 py-6">
//       {/* Left Side Image */}
//       <div className="hidden md:flex md:w-1/2 justify-center animate-slideLeft">
//         <img
//           src="/frontpage-bgimage-removebg-min_1.png"
//           alt="Edit Visual"
//           className="w-[95%] max-w-lg scale-110 transition-transform duration-500"
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="md:w-1/2 w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl p-6 flex flex-col justify-start ">
//         <h2 className="text-2xl font-bold mt-2 mb-2 text-center text-green-800">
//           Edit Menu Item
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4 pb-2">
//           <label className="block text-green-700 font-medium">Item Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Item Name"
//             className="w-full p-2 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             required
//           />

//           <label className="block text-green-700 font-medium">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="w-full p-2 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             required
//           />

//           <label className="block text-green-700 font-medium">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="snacks">Snacks</option>
//             <option value="drinks">Drinks</option>
//             <option value="meal">Meal</option>
//           </select>

//           <label className="block text-green-700 font-medium">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full p-2 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             rows="2"
//           />

//           <label className="flex items-center space-x-2 text-green-700 font-medium">
//             <input
//               type="checkbox"
//               name="available"
//               checked={formData.available}
//               onChange={handleChange}
//             />
//             <span>Available</span>
//           </label>

//           {formData.imagePreview && (
//             <img
//               src={formData.imagePreview}
//               alt="Preview"
//               className="w-24 h-24 object-cover rounded border border-orange-300"
//             />
//           )}

//           <label className="block text-green-700 font-medium">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full text-sm"
//           />

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Update Item
//           </button>
//         </form>
//       </div>

//       {/* Animation Style */}
//       <style>
//         {`
//       .animate-slideLeft {
//         animation: slideLeft 1s ease-out forwards;
//       }

//       @keyframes slideLeft {
//         0% {
//           opacity: 0;
//           transform: translateX(-100px);
//         }
//         100% {
//           opacity: 1;
//           transform: translateX(0);
//         }
//       }
//     `}
//       </style>
//     </div>
//   );
// };

// export default EditMenuForm;



import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const backendUri = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000";

const EditMenuForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    available: true,
    image: null,
    imagePreview: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUri}/api/menu/${id}`);
        const { name, price, category, description, available, imageUrl } =
          res.data.item;

        setFormData((prev) => ({
          ...prev,
          name,
          price,
          category,
          description,
          available,
          imagePreview: imageUrl,
        }));
      } catch (err) {
        // console.error("Error fetching menu item:", err.message);
        setError("Failed to load menu item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: files[0] ? URL.createObjectURL(files[0]) : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("description", formData.description);
      form.append("available", formData.available);
      if (formData.image) form.append("image", formData.image);

      const res = await axios.put(`${backendUri}/api/menu/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      // console.log("Menu item updated:", res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      // console.error("Error updating item:", err.message);
      setError("Failed to update menu item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-green-500 py-4 px-6 text-white text-center font-semibold text-lg">
          Edit Menu Item
        </div>
        <form onSubmit={handleSubmit} className="py-6 px-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Item Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            >
              <option value="">Select Category</option>
              <option value="snacks">Snacks</option>
              <option value="drinks">Drinks</option>
              <option value="meal">Meal</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
              Available
            </label>
          </div>

          {formData.imagePreview && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Current Image Preview
              </label>
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mt-1 w-24 h-24 object-cover rounded border border-gray-300"
              />
            </div>
          )}

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuForm;