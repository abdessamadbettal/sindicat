/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
// type Props = {
//   className: string
// }

const TableDocument = ({className}) => {
  const [documents, setDocuments] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [alert, setAlert] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/document/all/${page}`)
        setDocuments(response.data.data)
        setError(null)
        setDocuments(response.data.documents)
        setPages(response.data.pages)
        setPage(response.data.page)
        setLoading(true)
      } catch (e) {
        setError(e)
      }
    }
   fetchDocuments()
  }, [alert , page])

  const acceptDocument = async (id) => {


    console.log('id',id)
    try {
      const response = await axios.post('http://localhost:8000/api/document/accept', {id})
      console.log('response',response)
      setError(null)
      setLoading(true)
      setAlert(id + " Document accepté avec succès")
    } catch (e) {
      setError(e)
    }
  }
  const masqueDocument = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/api/document/hidden', {id})
      console.log('response',response)
      setError(null)
      setLoading(true)
      setAlert(id + " Document masqué avec succès")
    } catch (e) {
      setError(e)
    }}
  const approveDocument = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/api/document/approve', {id})
      console.log('response',response)
      setError(null)
      setLoading(true)
      setAlert(id + " Document approuvé avec succès")
    } catch (e) {
      setError(e)
    }}




console.log('documents',documents)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>New Arrivals</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 new products</span>
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            New Produit
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Document</th>
                <th className='min-w-125px'>specialite</th>
                <th className='min-w-125px'>module</th>
                <th className='min-w-100px'>info</th>
                <th className='min-w-150px'>Status</th>
                <th className='min-w-125px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {documents.map((document) => (
              <tr key={document.id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-26.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        {document.name}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      {document.file_pages} pages, {document.file_sieze} MB, {document.year}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {document.ecole.pseudo}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>{document.specialite.pseudo}</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {document.module.name}
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>{document.module.semestre}</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {document.download || 22} down
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>{document.user.name}</span>
                </td>
                <td>
                  {document.status === 'accepted' && (
                    <button className='badge badge-light-success fs-7 fw-semibold border-0' onClick={ e => masqueDocument(document.id) }>Accepted</button>
                     )}
                  {document.status === 'hidden' && (
                    <button className='badge badge-light-danger fs-7 fw-semibold border-0' onClick={e => approveDocument(document.id)} >hidden</button>
                     )}
                  {document.status === 'active' && (
                    <button className='badge badge-light-warning fs-7 fw-semibold border-0' onClick={ e => acceptDocument(document.id) }>Active</button>
                     )}
                  {document.status === 'inactive' && (
                    <button className='badge badge-light-primary fs-7 fw-semibold border-0' onClick={ e => acceptDocument(document.id) }>Inactive</button>
                     )}
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              ))}
              {/* <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-3.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Telegram Development
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $4,790
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $240
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Chris Thompson
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>NBA Player</span>
                </td>
                <td>
                  <span className='badge badge-light-danger fs-7 fw-semibold'>In Progress</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-9.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Payroll Application
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $4,390
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $593
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Zoey McGee
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Ruby Developer</span>
                </td>
                <td>
                  <span className='badge badge-light-success fs-7 fw-semibold'>Success</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-18.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        HR Management System
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $7,990
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $980
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Brandon Ingram
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td>
                  <span className='badge badge-light-info fs-7 fw-semibold'>Rejected</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-8.jpg')}
                        className=''
                        alt=''
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                        Telegram Mobile
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $5,790
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    $750
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Natali Trump
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td>
                  <span className='badge badge-light-warning fs-7 fw-semibold'>Approved</span>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </a>
                </td>
              </tr> */}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        <Stack spacing={1} className=" pt-3">
            <Pagination count={pages} shape="rounded"  color="primary" onChange={
                (e, page) => {
                    setPage(page)
                }
            } hidePrevButton hideNextButton />
        </Stack>
            {/* <Pagination count={10}  shape="rounded" color='primary' className=' pt-5' size='small' /> */}
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TableDocument}
