import './createCompany.css'
import { RiBuilding2Fill } from "react-icons/ri";
import { CustomTexarea } from '../../components/ui/CustomTexarea';
import { CustomInput } from '../../components/ui/CustomInput';
import { CustomImageInput } from '../../components/ui/CustomImageInput';

export const CreateCompany = () => {
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

      <form className="createCompany_form">
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
            <CustomInput required={true} name="address" label="Dirección" type="text" />
            <CustomTexarea name="description" label="Descripción" />
          </div>

        </div>
      </form>

    </div>
  )
}
