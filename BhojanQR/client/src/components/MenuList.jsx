// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MenuItemCard from "./MenuItemCard";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const MenuList = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const backendUri = import.meta.env.VITE_BACKEND_URI;
//   const navigate = useNavigate();

//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get(`${backendUri}/api/menu`);
//       setMenuItems(response.data.items);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch menu items:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this item?"
//     );
//     if (!confirm) return;
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.delete(`${backendUri}/api/menu/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("🗑️ Item deleted successfully!");
//       fetchMenuItems();
//     } catch (error) {
//       console.error("Delete failed:", error);
//       toast.error("❌ Failed to delete item.");
//     }
//   };

//   const handleEdit = (item) => {
//     navigate(`/admin/edit/${item._id}`);
//   };

//   const handleToggleAvailable = async (id, newStatus) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.patch(
//         `${backendUri}/api/menu/${id}/availability`,
//         { available: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("✅ Item availability updated!");
//       fetchMenuItems();
//     } catch (error) {
//       console.error("Failed to toggle availability:", error);
//       toast.error("⚠️ Failed to update availability.");
//     }
//   };

//   return (
//     <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-orange-50 shadow-lg border border-green-100">
//       <div className="flex justify-between items-center mb-6 border-b pb-2 border-orange-200">
//         <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
//           🧾 Menu Items
//         </h1>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : menuItems.length === 0 ? (
//         <div className="text-center mt-10 flex flex-col items-center justify-center gap-4 text-red-600">
//           <img
//             src="/src/assets/nomenu.png"
//             alt="No Orders"
//             className="w-40 h-40 object-contain animate-bounce opacity-80"
//           />
//           <p className="text-lg sm:text-xl font-semibold">
//             🚫 Emergency status: No items found under this filter.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {menuItems.map((item) => (
//             <MenuItemCard
//               key={item._id}
//               item={item}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onToggleAvailable={handleToggleAvailable}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItemCard from "./MenuItemCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${backendUri}/api/menu`);
      setMenuItems(response.data.items);
      setLoading(false);
    } catch (error) {
      // console.error("Failed to fetch menu items:", error);
      setLoading(false);
      toast.error("⚠️ Failed to load menu items.");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${backendUri}/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Item deleted successfully!");
      fetchMenuItems();
    } catch (error) {
      // console.error("Delete failed:", error);
      toast.error("❌ Failed to delete item.");
    }
  };

  const handleEdit = (item) => {
    navigate(`/admin/edit/${item._id}`);
  };

  const handleToggleAvailable = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${backendUri}/api/menu/${id}/availability`,
        { available: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`✅ Item ${newStatus ? 'available' : 'unavailable'}!`);
      fetchMenuItems();
    } catch (error) {
      // console.error("Failed to toggle availability:", error);
      toast.error("⚠️ Failed to update availability.");
    }
  };

  return (
    <div className="bg-white  p-4">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-green-700">
          🧾 Manage Menu Items
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center mt-6 flex flex-col items-center justify-center gap-3 text-gray-600">
          <img
            src="/src/assets/nomenu.png"
            alt="No Menu Items"
            className="w-24 h-24 object-contain animate-bounce opacity-70"
          />
          <p className="text-lg font-medium">
            🚫 No menu items found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleAvailable={handleToggleAvailable}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;