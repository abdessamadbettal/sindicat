/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState , useEffect } from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import axios from 'axios'

const TableContact = ({className}) => {
  const [contacts, setContacts] = useState([])
  const [contact, setContact] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/contact/all')
        console.log( "res data",response.data)
        await setContacts(response.data)
        setError(null)
        // setContacts(null)
        setLoading(true)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    fetchContacts()
  }, [alert])

  const deleteContact = async (id) => {
    try {
      // setIsOpen(true)
      // setModalType('delete')
      const response = await axios.delete(`http://localhost:8000/api/contact/${id}`)
      setAlert(`${id} contact deleted`)
      setError(null)
      setLoading(true)
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }
  const editContact = async (id) => {
    try {
      //  setIsOpen(true)
      // setModalType('edit')
      console.log("is open",isOpen)
      // const response = await axios.put(`http://localhost:8000/api/contact/${id}`)
      // setAlert(`${id} contact edited`)
      // setError(null)
      // setLoading(true)
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }
  console.log("is open before",isOpen)


  return (
    <div className={`card ${className}`}>

      {/* modal */}
      
          <div className="modal fade" tabIndex={-1} id="kt_modal_1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">edit contact</h5>
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
                      <div className="mb-10">
                        <label className="form-label">name</label>
                        <input
                          type="text"
                          name='name'
                          className="form-control form-control-solid"
                          placeholder="name"
                          value={contact.name}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">email</label>
                        <input
                          type="email"
                          name='email'
                          className="form-control form-control-solid"
                          placeholder="name@example.com"
                          value={contact.email}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">phone</label>
                        <input
                          type="phone"
                          name='phone'
                          className="form-control form-control-solid"
                          placeholder="name@example.com"
                          value={contact.phone}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">subject</label>
                        <input
                          type="text"
                          name='subject'
                          className="form-control form-control-solid"
                          placeholder="name@example.com"
                          value={contact.phone}
                        />
                       </div>
                      
                      <div className="mb-10">
                        <label className="form-label">message</label>
                        <textarea
                          className="form-control form-control-solid "
                          placeholder="name@example.com"
                          rows="12" cols="33"
                          value={contact.message}
                        />
                       </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    {/* <button type="button" className="btn btn-primary">
                      Save changes
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
       
      
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Members Statistics</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 members</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            New Comment
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Author</th>
                <th className='min-w-200px'>Content</th>
                {/* <th className='min-w-120px'>Progress</th> */}
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              { loading && contacts.map(contact => (
              <tr key={contact.id}>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {contact.name}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {contact.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    {contact.subject} 
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    {contact.message}
                  </span>
                </td>
                {/* <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{width: '50%'}}
                      ></div>
                    </div>
                  </div>
                </td> */}
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    {/* <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a> */}
                    <button
                    type="button"
                    onClick={ () => {
                      setIsOpen(true)
                      setModalType('edit')
                      setContact(contact)
                    }
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_1"
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                    
                    <button
                    onClick={() => deleteContact(contact.id)}
                      // href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </button>
                  </div>
                </td>
              </tr>
              ))}
              
              
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TableContact}
