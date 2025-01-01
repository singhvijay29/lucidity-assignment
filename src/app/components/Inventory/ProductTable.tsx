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
      <span className="bg-[#000] rounded-xl bg-opacity-70 px-4 py-2 h-6 text-[#96a650]">
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
      <TableContainer
        className="rounded-[12px]"
        style={{
          background: "#212124",
        }}
      >
        <Table>
          <TableHead className="text-[#f2f2f9] border-b-[#000]">
            <TableRow>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
                <Label name={"Name"} />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
                <Label name={"Category"} />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
                <Label name={"Value"} />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
                <Label name={"Quantity"} />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
                <Label name={"Price"} />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #000",
                }}
              >
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
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    {product.name}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    {product.category}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    {product.value}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    {product.quantity}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    {product.price}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #000",
                      color: "#f2f2f9",
                    }}
                  >
                    <IconButton
                      size="small"
                      disabled={!isAdmin || product.disabled}
                      onClick={() => setEditingProduct(product)}
                      className="cursor-pointer disabled:cursor-not-allowed"
                      style={{
                        color: isAdmin ? "#166534" : "#737373",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={!isAdmin}
                      onClick={() => dispatch(toggleProductStatus(product.id!))}
                      className="cursor-pointer disabled:cursor-not-allowed"
                    >
                      {product.disabled ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon
                          style={{
                            color: isAdmin ? "#c084fc" : "#737373",
                          }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={!isAdmin}
                      onClick={() => dispatch(deleteProduct(product.id!))}
                      className="cursor-pointer disabled:cursor-not-allowed"
                    >
                      <DeleteIcon
                        style={{
                          color: isAdmin ? "#991b1b" : "#737373",
                        }}
                      />
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
