import React from "react";
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const Cart = () => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Replace the above line with your actual retrieval of cart items

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storedCartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>
                  <Button color="secondary" variant="outlined" size="small">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary">
        Confirm Purchase
      </Button>
    </div>
  );
};

export default Cart;