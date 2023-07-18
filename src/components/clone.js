import { React, useState, useEffect} from "react";
import {Typography, Button, ButtonGroup, Grid, Modal, TextField, Box,} from "@mui/material";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { Link, useParams} from "react-router-dom";
import useStyles from "./Styles";

export default function Detail1() {
  const { id } = useParams();
  const [fruitData, setFruitData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const classes = useStyles();

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setInputValue("");
    setError("");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value > fruitData.stock) {
      setError("Amount too large");
    } else {
      setError("");
    }
  };

  const handleConfirm = () => {
    const confirmedAmount = Number(inputValue);
    if (confirmedAmount > 0) {
      const updatedStock = fruitData.stock - confirmedAmount;
      const total = fruitData.price * confirmedAmount;
      setFruitData((prevData) => ({
        ...prevData,
        stock: updatedStock,
      }));
      const cartItem = {
        name: fruitData.name,
        amount: confirmedAmount,
        total: total,
      };
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [...storedCartItems, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      const alertMessage = "Added to cart";
      displayAlert(alertMessage);
    }
    handleCloseModal();
  };

  const displayAlert = (message, options) => {
    const formattedOptions = options.map((option) => option.label).join("\n");
    const selectedOption = window.confirm(`${message}\n${formattedOptions}`);
    if (selectedOption) {
      const optionIndex = options.findIndex(
        (option) => option.label === selectedOption
      );
      if (optionIndex !== -1) {
        options[optionIndex].handler();
      }
    }
  };

  return (
    <div>
      <Grid container className={classes.containerSpaceAround}>
        <Grid item sm={12} lg={4} align="center">
          <img
            src={`${fruitData.image}`}
            className={classes.poster}
            alt={fruitData.name}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            {fruitData.name}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Typography
              gutterBottom
              variant="h5"
              style={{ marginLeft: "10px" }}
            >
              Price: {fruitData.price}
            </Typography>
            <Typography gutterBottom variant="h5" align="center">
              Stock: {fruitData.stock}
            </Typography>
          </Grid>
          <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
            Description
          </Typography>
          <Typography style={{ marginBottom: "2rem", fontSize: 25 }}>
            {fruitData.description}
          </Typography>
          <Grid item container style={{ marginTop: "2rem" }}>
            <div className={classes.buttonContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    onClick={handleOpenModal}
                    endIcon={<AddShoppingCart />}
                  >
                    Add to cart
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: "primary.main" }}
                  >
                    <Typography
                      variant="subtitle2"
                      component={Link}
                      to="/"
                      color="inherit"
                      sx={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: "300px",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">Type the amount you want</Typography>
          <TextField
            label="Amount"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!!error}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}