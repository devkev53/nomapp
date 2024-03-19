import '../companies/createCompany.css'
import { useRef, useState, useEffect } from 'react'
import { RiBuilding2Fill, RiSave2Fill } from "react-icons/ri";
import { CustomTexarea } from '../../components/ui/CustomTexarea';
import { CustomInput } from '../../components/ui/CustomInput';
import { CustomImageInput } from '../../components/ui/CustomImageInput';
import { createCompany, updateCompany } from '../../services/companies.service';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { useParams } from 'react-router-dom';
import { getOneCompany } from '../../services/companies.service';
import { CustomEditImagenInput } from '../../components/ui/CustomEditImagenInput';
import { useCompany } from '../../hooks/useCompany';
import { CustomInputEdit } from '../../components/ui/CustomInputEdit';
import { CustomTextEdit } from '../../components/ui/CustomTextEdit';

export const EditCompany = () => {

  
  const [company, setCompany] = useState()
  const [logo, setLogo] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [description, setDescription] = useState()

  const navigate = useNavigate()
  const params = useParams()
  const formRef = useRef()
  const mySwal = withReactContent(Swal)

  const SuccessSwall = withReactContent(Swal)
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const fetchGetOneCompany = async () => {
    try {
      let response = await callEndpoint(getOneCompany(params.companyId))
      setCompany(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchUpdateOneCompany = async(id, data) => {
    try {
      let response = await callEndpoint(updateCompany(id, data))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    fetchUpdateOneCompany(company?.id, data)
  }

  const endOk  = () => mySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate(`/company/${company?.id}`)
  })
  
  const endConflict = () => mySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible realizar la actualización..!</p></div>
  })

  useEffect(() => {
    fetchGetOneCompany()
  },[])

  return (
    <div className='createCompany_wrapper p-4 flex flex-col justify-center'>
      {isLoading && <PageLoadingSpiner/>}

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          <RiBuilding2Fill />
          Crear Empresa
        </h2>
        <div className="tite_border"></div>
      </div>


      <form onSubmit={handleSubmit} ref={formRef} className="createCompany_form">

        <div className="form_fields">
          <div className="row row_one row_image">
            {company !== undefined && (
              <CustomEditImagenInput 
                name="logo" 
                data={company.logo}
              /> 
            )}

          </div>
          <div className="row row_two">

            <div className="row_two__row">
              {company !== undefined && (
                <>
                  <CustomInputEdit 
                    name="name"
                    val={company?.name} 
                    label="Nombre" 
                    type="text" 
                    required={true}
                  />

                  <CustomInputEdit 
                    name="email"
                    val={company?.email} 
                    label="Correo Eléctronico" 
                    type="email" 
                    required={false}
                  />

                  <CustomInputEdit 
                    name="phone"
                    val={company?.phone} 
                    label="Telefono" 
                    type="text" 
                    required={false}
                  />
                </>
              )}

            </div>

            <div className="row_two__row">
              {company !== undefined && (
                <>
                  <CustomInputEdit 
                    name="address"
                    val={company?.address} 
                    label="Dirección" 
                    type="text" 
                    required={false}
                  />

                  <CustomTextEdit 
                    name="description"
                    val={company?.description} 
                    label="Descripción" 
                    type="text" 
                    required={false}
                  />
                </>
              )}

            </div>

          </div>
        </div>
        <button type='submit' className="btn primary_btn">
          <RiSave2Fill/>
          <span>Guardar</span>
        </button>
      </form>


    </div>
  )
}