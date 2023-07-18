import React, { useState, useEffect } from "react";
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = async (index) => {
    const removedItem = cartItems[index];
    const { id, amount } = removedItem;
    const updatedStock = removedItem.stock + amount;
  
    // Update the stock in the MockAPI
    try {
      const response = await fetch(`https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: updatedStock }),
      });
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
  
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1); // Remove the item from the cartItems array
      setCartItems(updatedCartItems); // Update the cartItems state
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  
      alert("Removed successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length > 0 ? (
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
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    <Button color="secondary" variant="outlined" size="small" onClick={() => handleRemoveItem(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      <Button variant="contained" color="primary">
        Confirm Purchase
      </Button>
    </div>
  );
};

export default Cart;



