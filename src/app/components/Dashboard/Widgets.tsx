import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

const Widgets = () => {
  const products = useSelector((state: RootState) => state.inventory.products);

  const stats = {
    totalProducts: products.filter((p) => !p.disabled).length,
    totalValue: products
      .filter((p) => !p.disabled)
      .reduce((acc, curr) => acc + parseFloat(curr.value.replace("$", "")), 0),
    outOfStock: products.filter((p) => p.quantity === 0 && !p.disabled).length,
    categories: new Set(
      products.filter((p) => !p.disabled).map((p) => p.category)
    ).size,
  };

  const widgets = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Total Store Value",
      value: `${stats.totalValue.toFixed(2)}`,
      icon: <CurrencyExchangeOutlinedIcon />,
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: <RemoveShoppingCartIcon />,
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <CategoryIcon />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {widgets.map((widget, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <div className="bg-[#243325] text-white p-5 rounded-md">
            <Typography
              color="#fff"
              variant="subtitle2"
              className="flex gap-2 items-center mb-2"
            >
              {widget.icon}
              {widget.title}
            </Typography>
            <Typography variant="h4">{widget.value}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Widgets;
