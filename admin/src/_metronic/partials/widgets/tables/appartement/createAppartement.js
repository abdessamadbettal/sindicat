import React, { useState } from "react";
import {  useEffect} from "react";
import { KTSVG } from "../../../../helpers";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik , 
  Formik, Field, Form, ErrorMessage ,
 } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';

const CreateAppartement = ({stateChanger , ...rest}) => {
    const create = 0;
    // const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    // const [alert, setAlert] = useState('');
    const validationSchema = yup.object({
        name: yup
          .string('Enter your username')
          .min(6, 'username should be of minimum 6 characters length')
          .max(20, 'username should be of maximum 20 characters length')
          .required('username is required'),
        address: yup
            .string('Enter your address')
            .min(6, 'address should be of minimum 6 characters length')
            .max(50, 'address should be of maximum 20 characters length')
            .required('address is required'),
        price: yup
            .number('Enter your price')
            .min(6, 'price should be of minimum 6 characters length')
            .max(200, 'price should be of maximum 20 characters length')
            .required('price is required'),
        city: yup
            .string('Enter your city')
            .min(6, 'city should be of minimum 6 characters length')
            .max(20, 'city should be of maximum 20 characters length')
            .required('city is required'),
        etage: yup
            .number('Enter your etage')
            .min(0, 'etage should be of minimum 6 characters length')
            .max(10, 'etage should be of maximum 20 characters length')
            .required('etage is required') ,
        bloc: yup
            .string('Enter your bloc')
            .min(2, 'bloc should be of minimum 6 characters length')
            .max(20, 'bloc should be of maximum 20 characters length')
            .required('bloc is required'),
        rooms: yup
            .number('Enter your rooms')
            .min(1, 'rooms should be of minimum 6 characters length')
            .max(10, 'rooms should be of maximum 20 characters length')
            .required('rooms is required')
        
        
      });
        const formik = useFormik({
          initialValues: {
            name: '',
            address: '',
            price: '',
            city: '',
            etage: '',
            rooms: '',
            bloc: '',

           
           
           
          },
          validationSchema: validationSchema,
          onSubmit: (values) => {
            
          //   remove password_confirmation 
      
      
            
      
            
            // alert(JSON.stringify(values, null, 2));
            fetch('http://localhost:8081/api/houses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('api_token')
              },
              body: JSON.stringify(values)
            })
            .then(res => {
                
            //   pass the update data to the parent component

            //  set state 
            
            
            stateChanger('appartement created in date :'+ new Date().toLocaleString());
          

            
            
            document.getElementById('closeModal').click();
            // clear form
            
            formik.resetForm();


            }
            )
            .catch(err => {
              console.log(err);
            })
      
          } 
          
        });
      

    return (
        <div className="modal fade" tabIndex={-1} id="createAppartement">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Create Apparement</h5>
        <div
          className="btn btn-icon btn-sm btn-active-light-primary ms-2"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <KTSVG
            path="/media/icons/duotune/arrows/arr061.svg"
            className="svg-icon svg-icon-2x"
          />
        </div>
      </div>
      <div className="modal-body">
      {/* {error && <Alert severity="error" >{error}</Alert>} */}
      <form className="login-form" method="POST" onSubmit={formik.handleSubmit} >
      <div className="mb-10">
      <TextField fullWidth id="standard-basic" 
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    label="username" variant="standard" 
                    helperText={formik.touched.name && formik.errors.name}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"
                    name='address'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    label="address" variant="standard"
                    helperText={formik.touched.address && formik.errors.address}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"
                    name='price'
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    label="price" variant="standard"
                    helperText={formik.touched.price && formik.errors.price}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"
                    name='city'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    label="city" variant="standard"
                    helperText={formik.touched.city && formik.errors.city}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"

                    name='etage'
                    value={formik.values.etage}
                    onChange={formik.handleChange}
                    error={formik.touched.etage && Boolean(formik.errors.etage)}
                    label="etage" variant="standard"
                    helperText={formik.touched.etage && formik.errors.etage}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"    
                    name='rooms'
                    value={formik.values.rooms}
                    onChange={formik.handleChange}
                    error={formik.touched.rooms && Boolean(formik.errors.rooms)}
                    label="rooms" variant="standard"
                    helperText={formik.touched.rooms && formik.errors.rooms}
        />
        </div>
        <div className="mb-10">
        <TextField fullWidth id="standard-basic"
                    name='bloc'
                    value={formik.values.bloc}
                    onChange={formik.handleChange}
                    error={formik.touched.bloc && Boolean(formik.errors.bloc)}
                    label="bloc" variant="standard"
                    helperText={formik.touched.bloc && formik.errors.bloc}
        />
        </div>
        
        
    
          
               
                <div className="modal-footer">
                    <button
                    id="closeModal"
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    >
                    Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                    Save changes
                    </button>
                </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );


}
export default CreateAppartement;