/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import axios from 'axios'
import {Link} from 'react-router-dom'

const TableSpecialite = ({className}) => {
    const [specialites, setSpecialites] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const [specialite, setSpecialite] = useState([])
    const [countDocumets, setCountDocuments] = useState(0)

    // edit data use state
    const [editData, setEditData] = useState({
        name: '',
        description: '',
        status: '',
        langue: '',
        abr: '',
        coleur: '',
        pseudo: '' ,
        image: ''
    })

    useEffect(() => {
        const fetchSpecialites = async () => {
            try {
                const {data} = await axios.get('http://localhost:8000/api/specialite')
                setSpecialites(data.specialites)
                setLoading(true)
                setError(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchSpecialites()
    }, [])

    const handleSubmite = async (e) => {
        console.log('specialite ediiii')
        e.preventDefault()
        try {
            console.log("editData" ,editData)
            const formData = new FormData()
            formData.append('name', editData.name)
            formData.append('description', editData.description)
            formData.append('status', editData.status)
            formData.append('langue', editData.langue)
            formData.append('abr', editData.abr)
            formData.append('coleur', editData.coleur)
            formData.append('pseudo', editData.pseudo)
            formData.append('image', editData.image)

            

            const {data} = await axios.put(`http://localhost:8000/api/specialite/${specialite.id}`, formData)
            setAlert(data.message)
            setTimeout(() => {
                setAlert('specialite updated successfully')
            }, 3000)
        } catch (error) {
            setError(error.message)
        }
    }


    
  return (
    <div className={`card ${className}`}>


            {/* modal */}
                
            <div className="modal fade" tabIndex={-1} id="kt_modal_1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">edit specialite</h5>
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
                    <form className="form" method='POST' onSubmit={
                        (e) => {
                            handleSubmite(e)
                        }
                    } encType="multipart/form-data" >
                      <div className="mb-10">
                        <label className="form-label">name</label>
                        <input
                          type="file"
                          name='image'
                          accept='image/*'
                            onChange={
                                (e) => {
                                    setEditData({...editData, image: e.target.files[0]})
                                }
                            }
                          className="form-control form-control-solid"
                          placeholder="name"
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">name</label>
                        <input
                          type="text"
                          defaultValue={editData.name}
                          name='name'
                            onChange={
                                (e) => {
                                    setEditData({...editData, name: e.target.value})
                                }
                            }
                          className="form-control form-control-solid"
                          placeholder="name"
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">pseudo</label>
                        <input
                          type="text"
                          name='pseudo'
                            onChange={(e) => {
                            setEditData({...editData, pseudo: e.target.value})
                            }}
                          className="form-control form-control-solid"
                          placeholder="biologie"
                         defaultValue={specialite.pseudo}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">abreviation</label>
                        <input
                          type="text"
                          name='abr'
                            onChange={(e) => {
                            setEditData({...editData, abr: e.target.value})
                            }}
                          className="form-control form-control-solid"
                          placeholder="svi"
                         defaultValue={specialite.abr}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">coleur</label>
                        <input
                          type="text"
                          name='coleur'
                            onChange={(e) => {
                            setEditData({...editData, coleur: e.target.value})
                            }}
                          className="form-control form-control-solid"
                          placeholder="coleur de la specialite"
                         defaultValue={specialite.coleur}
                        />
                       </div>
                      <div className="mb-10">
                        <label className="form-label">langue</label>
                        <select className="form-select form-select-solid" name='langue'
                        onChange={(e) => {
                            setEditData({...editData, langue: e.target.value})
                            }
                        }
                        aria-label="Select example">
                        <option defaultValue={specialite.langue} >{specialite.langue}</option>
                        <option value="fr">francais</option>
                        <option value="ar">arabe</option>
                        <option value="en">anglais</option>
                        </select>
                       </div>
                      <div className="mb-10">
                        <label className="form-label">status</label>
                        <select className="form-select form-select-solid"
                        name='status' 
                        onChange={(e) => {
                            setEditData({...editData, status: e.target.value})
                            }
                        }
                        aria-label="Select example">
                        <option defaultValue={specialite.status} >{specialite.status}</option>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                        </select>
                       </div>
                      
                      <div className="mb-10">
                        <label className="form-label">description</label>
                        <textarea
                          className="form-control form-control-solid "
                          placeholder="bla bla"
                          onChange={(e) => {
                            setEditData({...editData, description: e.target.value})
                            }
                          }
                          rows="12" cols="33"
                          name='description'
                         defaultValue={specialite.description}
                        />
                       </div>
                       <div className="modal-footer">
                            <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                            >
                            Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                            Editer
                            </button>
                        </div>
                       </form>
                  </div>
                  
                </div>
              </div>
            </div>


      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Specialite Overview</span>
          <span className='text-muted fw-semibold fs-7'>Pending 10 tasks</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* begin::Menu 1 */}
          <Dropdown1 />
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-5'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-200px'></th>
                <th className='p-0 min-w-100px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
                {specialites.map((specialite) => (
              <tr key={specialite.id}>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <img
                        src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                        className='h-50 align-self-center'
                        alt=''
                      />
                    </span>
                  </div>
                </th>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {specialite.pseudo}
                  </a>
                  <span className='text-muted fw-semibold d-block fs-7'>{specialite.name}</span>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>{
                        specialite.documentsCount 
                      } PDF </span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{width: Math.floor(specialite.documentsCount * 0.2) }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <button className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                  type="button"
                  onClick={ () => {
                    // setIsOpen(true)
                    // setModalType('edit')
                    setEditData(specialite)
                    setSpecialite(specialite)
                  }
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_1"
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </button>
                  {/* <button
                    type="button"
                    onClick={ () => {
                    //   setIsOpen(true)
                    //   setModalType('edit')
                      setContact(contact)
                    }
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_1"
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button> */}
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
    </div>
  )
}

export {TableSpecialite}