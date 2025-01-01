"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "./redux/slices/inventorySlice";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/Layout/Navbar";
import Widgets from "./components/Dashboard/Widgets";
import ProductTable from "./components/Inventory/ProductTable";
import { theme } from "./styles/theme";
import { AppDispatch, RootState } from "./redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <div className="px-[20px] pb-[20px] pt-2 font-[family-name:var(--font-open-sans)]">
      <ThemeProvider theme={theme}>
        <Navbar />
        <Widgets />
        <ProductTable />
      </ThemeProvider>
    </div>
  );
}
