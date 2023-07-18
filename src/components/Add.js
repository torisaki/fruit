import {React, useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Alert, AlertTitle, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Add() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
   setOpen(false);
      };
    const baseURL='https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits';
    const formik = useFormik({
        initialValues:{
          name:"",
          image:"",
          description:"",
          price:"",
          stock:""
      },
      onSubmit: (values)=>{
        fetch(baseURL, {  method: 'POST',
        body: JSON.stringify(values),  headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
        }).then(response =>{
          if(!response.ok){
              throw new Error(`HTTP Status: ${response.status}`)
          }
          return response.json()
        })            
        .then(data => setOpen(true))
        .catch(error => console.log(error.message));
      },
      validationSchema: Yup.object({
          name: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
          image: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
          description: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
          price: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
          stock: Yup.string().required("Required.").min(2, "Must be 2 characters or more")
      }),
      });
  return (
    <div>
      <h3>Add a new fruit</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextField
            autoFocus
            margin="normal"
            name="name"
            label="Name"
            type="text"
            size="medium"
            fullWidth 
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
           />
          {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
          <TextField
            margin="dense"
            name="image"
            label="Image"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.image}
              onChange={formik.handleChange}
          />
          {formik.errors.image && (<Typography variant="caption" color="red">{formik.errors.image}</Typography>)}
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.description}
              onChange={formik.handleChange}
          />
          {formik.errors.description && (<Typography variant="caption" color="red">{formik.errors.description}</Typography>)}
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.price}
              onChange={formik.handleChange}
          />
          {formik.errors.price && (<Typography variant="caption" color="red">{formik.errors.price}</Typography>)}
          <TextField
            margin="dense"
            name="stock"
            label="Stock"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.stock}
              onChange={formik.handleChange}
          />
          {formik.errors.stock && (<Typography variant="caption" color="red">{formik.errors.stock}</Typography>)}
            <br />
          <Button variant="contained" size="small"  type='submit'>Add</Button>
        </form>
        <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Congraturation"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      <Alert severity="success">
  <AlertTitle>Added successfully!</AlertTitle>
</Alert>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button><Link to='/Dashboard' style={{textDecoration:"none"}}>Dashboard</Link></Button>
      <Button autoFocus onClick={handleClose}>
       Close
      </Button>
    </DialogActions>
  </Dialog>

    </div>
  )
}
