import {
  RiUser3Fill, RiMailCheckFill,
  RiShieldUserFill, RiSmartphoneFill,
  RiCalendarEventFill, RiMapPin2Fill,
  RiKey2Fill, RiEdit2Fill
} from 'react-icons/ri'
import {useAuth} from '../../hooks/useAuth'
import './userProfile.css'
import { useModal } from '../../hooks/useModal'
import { PrimaryBtn } from '../../components/ui/PrimaryBtn'
import { SecondaryBtn } from '../../components/ui/SecondaryBtn'
import { ModalContainer } from '../../containers/modalContainer/ModalContainer'
import { ChangePassModal } from '../../components/changePassModal/ChangePassModal'

export const UserProfile = () => {

  const {user} = useAuth()

  const {
    isVisible:isVisibleEdit,
    showModal:openEdit,
    closeModal:closeEdit
  } = useModal()

  const {
    isVisible:isVIsiblePass,
    showModal:openPass,
    closeModal:closePass
  } = useModal()

  return (
    <div className="detailEmployee_wrapper p-4 flex flex-col justify-center">

    {/* Title */}
    <div className="page_title">
      <h2 className='title'>
        {/* <RiBuilding2Fill /> */}
        <picture>
          <img src={user?.url_img} alt="" />
        </picture>
        {user?.username}
      </h2>
      <div className="tite_border"></div>
    </div>

    <div className="user_info">
      <div className="user_row">
        <p>
          <RiUser3Fill/>
          <span>{user?.name} {user?.last_name}</span>
        </p>
        <p>
          <RiShieldUserFill/>
          <span>{user?.username}</span>
        </p>
        <p>
          <RiMailCheckFill/>
          <span>{user?.email}</span>
        </p>
      </div>
      <div className="user_row row2">
        <p>
          <RiSmartphoneFill/>
          <span>{user?.phone !== null ? user?.phone : 'N/I'}</span>
        </p>
        <p>
          <RiMapPin2Fill/>
          <span>{user?.address !== null ? user?.address : 'N/I'}</span>
        </p>
        <p>
          <RiCalendarEventFill/>
          <span>{user?.birthday !== null ? user?.birthday : 'N/I'}</span>
        </p>
      </div>
    </div>

    <div className="button_options">
      <PrimaryBtn label="Editar Perfil">
        <RiEdit2Fill/>
      </PrimaryBtn>
      <SecondaryBtn callback={openPass} label="Cambiar Contraseña">
        <RiKey2Fill/>
      </SecondaryBtn>
    </div>
    {isVIsiblePass && <ModalContainer>
      <ChangePassModal closeFn={closePass} />
    </ModalContainer>}
    {isVisibleEdit && <ModalContainer>
    </ModalContainer>}
  </div>
  )
}
