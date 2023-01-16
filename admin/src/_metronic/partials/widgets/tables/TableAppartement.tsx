/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import  {useEffect, useState} from "react";

import {KTSVG} from '../../../helpers'

import CreateAppartement from './appartement/createAppartement';
import EditAppartement from './appartement/editAppatement';
import { create } from 'domain';

type Props = {
  className: string
}
type Appartement = {
  _id: number,
  name: string,
  address: string,
  price: number,
  rooms: number,
  etage: number,
  city: string,
  bloc: string
}


     




    






const TableAppartement: React.FC<Props> = ({className}) => {
  const [appartements, setAppartements] = useState<Array<Appartement>>([]);
  const [appartement, setAppartement] = useState<Appartement>({} as Appartement);
  const[state, setState] = useState <string> ('');

  // delete appartement
const deleteAppartement = (id: number) => {
  fetch('http://localhost:8081/api/houses/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('api_token')
    }
  })
    .then((response) => response.json())
    .then((data) => {
      setState('deleted in ' + new Date().toLocaleTimeString());
      console.log(data);
    }
    );
}

  useEffect(() => {
    // get appartements
    fetch('http://localhost:8081/api/houses',
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('api_token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAppartements(data);
      }
      );
  }, [ state]);
  // console.log(appartements);


  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent appartement</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 50 appartement</span>
        </h3>
        <div className='card-toolbar'>
        <div className='card-toolbar'>
          <button className='btn btn-sm btn-light-primary'
          type="button"
          data-bs-toggle="modal"
             data-bs-target="#createAppartement">
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2'
              />
            New Appartement
          </button>
        </div>
          <CreateAppartement stateChanger={setState} />
          <EditAppartement appartement={appartement} stateChanger={setState} />
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
            data-kt-menu='true'
          >
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>Quick Actions</div>
            </div>
            <div className='separator mb-3 opacity-75'></div>
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div>
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Customer
              </a>
            </div>
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Staff Group
                  </a>
                </div>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Member Group
                  </a>
                </div>
              </div>
            </div>
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            <div className='separator mt-3 opacity-75'></div>
            <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Appartement Id</th>
                <th className='min-w-120px'>name</th>
                <th className='min-w-140px'>address</th>
                <th className='min-w-120px'>city</th>
                <th className='min-w-120px'>price</th>
                <th className='min-w-120px'>bloc</th>
                <th className='min-w-100px text-end'>crud</th>
              </tr>
            </thead>
            <tbody>
              {
                appartements.map((appartement:Appartement) => (
              <tr >
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    {appartement._id}
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {appartement.name}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: PH</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {appartement.address}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {appartement.city}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    {appartement.price}
                    Melion
                  </span>
                </td>
                <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td>
                <td>
                  <span className='badge badge-light-success'>{appartement.bloc}</span>
                </td>
                <td className='text-end'>
                  <button
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </button>
                  <button
                  type="button"
                  data-bs-toggle="modal"
                     data-bs-target="#editAppartement"
                     onClick={() => {
                        setAppartement(appartement)
                     }}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </button>
                  <button onClick={
                    () => { 
                      deleteAppartement(appartement._id)
                    }
                  } className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </button>
                </td>
              </tr>
                )) }
              

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {TableAppartement}
