import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function Edit() {
  <link rel="stylesheet" href="Edit.css" />;
  const { id } = useParams();
  const [fruitData, setFruitData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFruitData = async () => {
      try {
        const response = await fetch(
          `https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const data = await response.json();
        setFruitData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFruitData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updateURL = `https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits/${id}`;
      const response = await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fruitData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";

    if (value.trim() === "") {
      errorMessage = "This field is required.";
    } else if (
      (name === "price" || name === "stock") &&
      value.trim().length < 2
    ) {
      errorMessage = "Minimum length is 2 characters.";
    } else if (
      (name === "name" || name === "image" || name === "description") &&
      value.trim().length < 10
    ) {
      errorMessage = "Minimum length is 10 characters.";
    }
    setFruitData((prevState) => ({
      ...prevState,
      [name]: value,
      [`error_${name}`]: errorMessage,
    }));
  };

  return (
    <div>
      <h2>Edit this fruit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={fruitData.name}
            onChange={handleChange}
            className={fruitData.error_name ? "error" : ""}
          />
          {fruitData.error_name && (
            <span className="error-message">{fruitData.error_name}</span>
          )}
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={fruitData.image}
            onChange={handleChange}
            className={fruitData.error_image ? "error" : ""}
          />
          {fruitData.error_image && (
            <span className="error-message">{fruitData.error_image}</span>
          )}
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={fruitData.description}
            onChange={handleChange}
            className={fruitData.error_description ? "error" : ""}
          />
          {fruitData.error_description && (
            <span className="error-message">{fruitData.error_description}</span>
          )}
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={fruitData.price}
            onChange={handleChange}
            className={fruitData.error_price ? "error" : ""}
          />
          {fruitData.error_price && (
            <span className="error-message">{fruitData.error_price}</span>
          )}
        </label>
        <br />
        <label>
          Stock:
          <input
            type="text"
            name="stock"
            value={fruitData.stock}
            onChange={handleChange}
            className={fruitData.error_stock ? "error" : ""}
          />
          {fruitData.error_stock && (
            <span className="error-message">{fruitData.error_stock}</span>
          )}
        </label>
        <br />
        <Button variant="contained" size="small" type="submit">
          Submit
        </Button>
      </form>

      {/* Modal component */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ p: 2, bgcolor: "white" }}>
          <Typography variant="h5" gutterBottom>
            Updated successfully
          </Typography>
          <Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              To Homepage
            </Link>
          </Button>
          <Button>
            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              To Dashboard
            </Link>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
