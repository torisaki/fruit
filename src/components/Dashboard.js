import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Modal, Box, Typography } from "@mui/material";
import { BorderColor, Delete } from "@mui/icons-material";

export default function Dashboard() {
  const baseURL = "https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits";
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    if (selectedFruit) {
      const deleteURL = `${baseURL}/${selectedFruit.id}`;
      fetch(deleteURL, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          const updatedFruits = fruits.filter(
            (fruit) => fruit.id !== selectedFruit.id
          );
          setFruits(updatedFruits);
          setIsModalOpen(false);
        })
        .catch((error) => console.log(error.message));
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [fruits, setFruits] = useState([]);
  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFruits(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <div>
      <a class="waves-effect waves-light btn left">
        <Link to={`/Add`} className="white-text">
          <i class="material-icons left">add</i>Add new fruit
        </Link>
      </a>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {fruits.map((fruit) => (
            <tr>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.description}</td>
              <td>{fruit.price}</td>
              <td>{fruit.stock}</td>
              <td>
                <ButtonGroup>
                  <Button endIcon={<BorderColor />} component={Link} to={`Edit/${fruit.id}`}>
                    Edit
                  </Button>
                  <Button
                    endIcon={<Delete />}
                    onClick={() => {
                      setSelectedFruit(fruit);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={{ p: 2, bgcolor: "white" }}>
          <Typography variant="h5" gutterBottom>
            Do you want to delete this fruit?
          </Typography>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={handleModalClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}
