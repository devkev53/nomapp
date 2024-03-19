import {createColumnHelper } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { RiInformationFill, RiEdit2Fill, RiDeleteBinFill } from "react-icons/ri";

import { AsyncTable } from "../asyncTable/AsyncTable"

import noImg from '../../assets/img/not-img.jpg'
import { baseUrl } from "../../utilitys/base-url.utils";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteOneEmployee } from "../../services/employees.service";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import {useModal} from '../../hooks/useModal'
import {ModalContainer} from '../../containers/modalContainer/ModalContainer'
import {EditEmployeeModal} from '../../components/editEmployeeModal/EditEmployeeModal'
import { useState } from "react";

export const EmployeesTable = ({data}) => {

  const [selected, setSelected] = useState(null)

  const columnHelper = createColumnHelper()
  const navigate = useNavigate()
  const {callEndpoint} = useFetchAndLoad()
  const mySwal = withReactContent(Swal)
  const {showModal, isVisible, closeModal} = useModal()


  const fetchDeleteEmployee = async(id) => {
    try {
      let response = await callEndpoint(deleteOneEmployee(id))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict(e)
    }
  }

  const consultEnd = (name, id) => {
    mySwal.fire({
      title: 'Eliminar Empleado?',
      html: <div><p>Esta seguro de eliminar esta empleado: <strong>{name}</strong></p><small className="text-xs text-red-300">No se realizara una eliminacion completa, solo se desactivara</small></div>,
      // text: `Esta seguro de eliminar esta empresa ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6228bde6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{fetchDeleteEmployee(id)})
  }

  const endOk  = () => mySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate(0)
  })
  
  const endConflict = () => mySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible realizar la acción..!</p></div>
  })

  const deleteBtn = (info) => {
    return (<button
      onClick={() => consultEnd(info.row.original.get_full_name, info.row.original.id)}
      className="btn table_btn delete_btn">
      <RiDeleteBinFill/>
    </button>)
  }

  const editBtn = (info) => {
    return (<button
      onClick={() => {showModal(), setSelected(info.row.original)}}
      className="btn table_btn primary_btn">
      <RiEdit2Fill/>
    </button>)
  }

  const checkBtn = (info) => {
    return (
      <button
        onClick={() => navigate(`/employee/${info.row.original.id}`)}
        className="btn table_btn secondary_btn">
        <RiInformationFill/>
      </button>
    )
  }

  const columns = [
    columnHelper.accessor('url_img', {
      header: () => <span>Foto</span>,
      cell: info => {
        if (info.getValue() !== "") {
          return (<picture>
            <img className="store_img_employee rounded-full"
              src={`${baseUrl}${info.getValue()}`}
              alt="" />
          </picture>)
        } else {
          return (<picture>
            <img className="store_img_employee rounded-full"
            src={noImg}
            alt="" />
          </picture>)
        }
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('get_full_name', {
      header: () => <span>Nombre</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.job_position.name, {
      id: 'name',
      header: () => <span>Puesto</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('total_prepaid', {
      header: () => <span>Salario Quincenal</span>,
      cell: info => <p>Q. <span>{info.getValue()}</span></p>,
      footer: info => info.column.id
    }),
    columnHelper.accessor('total_monthPayment', {
      header: () => <span>Salario Menusal</span>,
      cell: info => <p>Q. <span>{info.getValue()}</span></p>,
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.job_position.salary, {
      id: 'salary',
      header: () => <span>Salario Base</span>,
      cell: info => <p>Q. <span>{info.getValue()}</span></p>,
      footer: info => info.column.id
    }),
    columnHelper.accessor('Verificar', {
      header: () => <span>Acciones</span>,
      cell: info => <div className="flex gap-3 justify-center">
        {checkBtn(info)}
        {editBtn(info)}
        {deleteBtn(info)}
      </div>,
      footer: info => info.column.id
    }),

  ]

  return (
    <>
      {isVisible && <ModalContainer>
        <EditEmployeeModal closeFn={closeModal} employee={selected} />
        </ModalContainer>}
      <AsyncTable columns={columns} label="Buscar Empleado" data={data} />
    </>
  )
}
