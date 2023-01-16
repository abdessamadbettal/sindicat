import React, { useState } from "react";
import { useEffect } from "react";
import { KTSVG } from "../../../../helpers";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent , Dialog } from '@mui/material/Select';
import {
    useFormik,
    Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';

const CreatePaiement = ({ appartements , stateChanger, ...rest }) => {
    // const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
   
    // const [alert, setAlert] = useState('');
    const validationSchema = yup.object({
        name: yup
            .string('Enter your username')
            .min(6, 'username should be of minimum 6 characters length')
            .max(20, 'username should be of maximum 20 characters length')
            .required('username is required'),
        date_paiement: yup
            .string('Enter your date_paiement')
            .required('date_paiement is required'),
        montant: yup
            .number('Enter your montant')
            .min(6, 'montant should be of minimum 6 characters length')
            .max(20000, 'montant should be of maximum 20 characters length')
            .required('montant is required'),
        type_paiement: yup
            .string('Enter your type_paiement')
            .min(4, 'type_paiement should be of minimum 4 characters length')
            .max(20, 'type_paiement should be of maximum 20 characters length')
            .required('type_paiement is required'),
        date_new_paiement: yup
            .string('Enter your date_new_paiement')
            .required('date_new_paiement is required'),
        house: yup
            .string('Enter your house')
            .required('house is required'),
        
        


    });
    const formik = useFormik({
        initialValues: {
            name: '',
            date_paiement: '',
            montant: '',
            type_paiement: '',
            date_new_paiement: '',
            house: '',
            




        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            //   remove password_confirmation 





            // alert(JSON.stringify(values, null, 2));
            fetch('http://localhost:8081/api/paiements', {
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


                    stateChanger('paiement created in date :' + new Date().toLocaleString());




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
        <div className="modal fade" tabIndex={-1} id="CreatePaiement">
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
                                    name='date_paiement'
                                    value={formik.values.date_paiement}
                                    onChange={formik.handleChange}
                                    error={formik.touched.date_paiement && Boolean(formik.errors.date_paiement)}
                                    label="date_paiement" variant="standard"
                                    helperText={formik.touched.date_paiement && formik.errors.date_paiement}
                                />
                            </div>
                            <div className="mb-10">
                                <TextField fullWidth id="standard-basic"
                                    name='montant'
                                    value={formik.values.montant}
                                    onChange={formik.handleChange}
                                    error={formik.touched.montant && Boolean(formik.errors.montant)}
                                    label="montant" variant="standard"
                                    helperText={formik.touched.montant && formik.errors.montant}
                                />
                            </div>
                            <div className="mb-10">
                                <TextField fullWidth id="standard-basic"
                                    name='type_paiement'
                                    value={formik.values.type_paiement}
                                    onChange={formik.handleChange}
                                    error={formik.touched.type_paiement && Boolean(formik.errors.type_paiement)}
                                    label="type_paiement" variant="standard"
                                    helperText={formik.touched.type_paiement && formik.errors.type_paiement}
                                />
                            </div>
                            <div className="mb-10">
                                <TextField fullWidth id="standard-basic"
                                    name='date_new_paiement'
                                    value={formik.values.date_new_paiement}
                                    onChange={formik.handleChange}
                                    error={formik.touched.date_new_paiement && Boolean(formik.errors.date_new_paiement)}
                                    label="date_new_paiement" variant="standard"
                                    helperText={formik.touched.date_new_paiement && formik.errors.date_new_paiement}
                                />
                            </div>
                            <div className="mb-10">
                                <FormControl className='w-50' error={formik.touched.house && Boolean(formik.errors.house)}
                                >
                                    <InputLabel id="house" >house</InputLabel>
                                   
                                    <Select

                                        labelId="house"
                                        id="demo-simple-select"
                                        value={formik.values.house}
                                        label="house"
                                        onChange={
                                            (e) => {
                                                formik.setFieldValue('house', e.target.value)
                                            }
                                        }
                                    >
                                        {
                                            appartements.map((appartement) =>  (
                                                    <MenuItem value={appartement._id}>{appartement.name}</MenuItem>
                                                )
                                            
                                                
                                            )
                                        }
                                        
                                        
                                    </Select>
                                  
                                    {
                                        formik.errors.house && formik.touched.house ? (
                                            <FormHelperText>{formik.errors.house}</FormHelperText>
                                        ) : null
                                    }
                                </FormControl>
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
export default CreatePaiement;