import React from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/slices/inventorySlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

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
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <TextField
              label="Value"
              fullWidth
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Price"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProductModal;
