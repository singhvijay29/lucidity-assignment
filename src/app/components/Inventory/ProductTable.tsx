import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  deleteProduct,
  toggleProductStatus,
} from "../../redux/slices/inventorySlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import EditProductModal from "./EditProductModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from "../../types/index";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.inventory);
  const isAdmin = useSelector((state: RootState) => state.ui.isAdmin);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const loading = useSelector((state: RootState) => state.inventory.loading);

  type Props = {
    name: string;
  };

  const Label = ({ name }: Props) => {
    return (
      <span className="bg-[#000] rounded-xl bg-opacity-70 px-4 py-2 h-6">
        {name}
      </span>
    );
  };

  const Loader = () => {
    return (
      <TableCell className="!border-[#000]">
        <Skeleton
          count={5}
          className="h-[54px] my-[7px]"
          height={44}
          width={"100%"}
          highlightColor="#212124"
          baseColor="#101010"
        />
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer className="bg-[#212124] rounded-[12px]">
        <Table>
          <TableHead className="text-[#f2f2f9] border-b-[#000]">
            <TableRow>
              <TableCell className="text-[#96a650] border-b-[#000] ">
                <Label name={"Name"} />
              </TableCell>
              <TableCell className="text-[#96a650] border-b-[#000]">
                <Label name={"Category"} />
              </TableCell>
              <TableCell className="text-[#96a650] border-b-[#000]">
                <Label name={"Value"} />
              </TableCell>
              <TableCell className="text-[#96a650] border-b-[#000]">
                <Label name={"Quantity"} />
              </TableCell>
              <TableCell className="text-[#96a650] border-b-[#000]">
                <Label name={"Price"} />
              </TableCell>
              <TableCell className="text-[#96a650] border-b-[#000]">
                <Label name={"Actions"} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="text-[#f2f2f9]">
            {loading ? (
              <TableRow className="!border-[#000]">
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    {product.value}
                  </TableCell>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    {product.price}
                  </TableCell>
                  <TableCell className="text-[#f2f2f9] border-b-[#000]">
                    <IconButton
                      size="small"
                      disabled={!isAdmin || product.disabled}
                      onClick={() => setEditingProduct(product)}
                      className="text-green-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={!isAdmin}
                      onClick={() => dispatch(toggleProductStatus(product.id!))}
                      className="text-purple-400 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {product.disabled ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={!isAdmin}
                      onClick={() => dispatch(deleteProduct(product.id!))}
                      className="text-red-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
};

export default ProductTable;
