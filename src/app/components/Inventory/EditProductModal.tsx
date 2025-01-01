import React from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/slices/inventorySlice";
import { Product } from "../../types/index";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProduct(formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl">Edit product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">Samsumg s24 ultra</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-zinc-800 text-white rounded p-2 border border-zinc-700"
                placeholder="phone"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-zinc-800 text-white rounded p-2 border border-zinc-700"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
                className="w-full bg-zinc-800 text-white rounded p-2 border border-zinc-700"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className="w-full bg-zinc-800 text-white rounded p-2 border border-zinc-700"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-yellow-400 hover:text-yellow-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
