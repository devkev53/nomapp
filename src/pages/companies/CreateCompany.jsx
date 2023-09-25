import './createCompany.css'
import { useRef } from 'react'
import { RiBuilding2Fill } from "react-icons/ri";
import { CustomTexarea } from '../../components/ui/CustomTexarea';
import { CustomInput } from '../../components/ui/CustomInput';
import { CustomImageInput } from '../../components/ui/CustomImageInput';
import { createCompany } from '../../services/companies.service';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

export const CreateCompany = () => {

  const navigate = useNavigate()
  const formRef = useRef()

  const SuccessSwall = withReactContent(Swal)

  const handleCreateCompany = async (data) => {
    try {
      const result = await createCompany(data)
      SuccessSwall.fire({
        icon: 'success',
        title: <p>Empresa Creada con exito..!</p>
      }).then(result => {
        navigate('/companies')
      })
    } catch (error) {

    }

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    handleCreateCompany(data)
  }


  return (
    <div className='createCompany_wrapper p-4 flex flex-col justify-center'>

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
            <CustomImageInput name="logo" type='image' />
          </div>
          <div className="row row_two">

            <div className="row_two__row">
              <CustomInput required={true} name="name" label="Nombre" type="text" />
              <CustomInput required={false} name="email" label="Correo" type="email" />
              <CustomInput required={false} name="phone" label="Telefono" type="text" />
            </div>
            <div className="row_two__row">
              <CustomInput required={false} name="address" label="Dirección" type="text" />
              <CustomTexarea name="description" label="Descripción" />
            </div>

          </div>
        </div>
        <button type='submit' className="primary_btn">Crear</button>
      </form>


    </div>
  )
}
