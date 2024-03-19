import {createColumnHelper } from "@tanstack/react-table"
import { AsyncTable } from '../asyncTable/AsyncTable'
import { RiInformationFill, RiEdit2Fill, RiDeleteBinFill } from "react-icons/ri";
import noImg from '../../assets/img/not-img.jpg'
import { baseUrl } from "../../utilitys/base-url.utils";
import { useNavigate } from "react-router-dom";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteOneCompany } from "../../services/companies.service";

export const ComapniesTables = ({data, searchLabel}) => {

  const columnHelper = createColumnHelper()
  const mySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const {callEndpoint} = useFetchAndLoad()

  const fetchDeleteCompany = async(id) => {
    try {
      let response = await callEndpoint(deleteOneCompany(id))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict(e)
    }
  }

  const consultEnd = (name, id) => {
    mySwal.fire({
      title: 'Eliminar Empresa?',
      html: <div><p>Esta seguro de eliminar esta empresa: <strong>{name}</strong></p><small className="text-xs text-red-300">No se realizara una eliminacion completa, solo se desactivara</small></div>,
      // text: `Esta seguro de eliminar esta empresa ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6228bde6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>fetchDeleteCompany(id))
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

  const handleClick = (e) => {
    console.log(e.target)
  }
  
  const deleteBtn = (info) => {
    return (<button
      onClick={() => consultEnd(info.row.original.name, info.row.original.id)}
      className="btn table_btn delete_btn">
      <RiDeleteBinFill/>
    </button>)
  }
  const editBtn = (info) => {
    return (<button
      onClick={() => navigate(`/edit-company/${info.row.original.id}`)}
      className="btn table_btn primary_btn">
      <RiEdit2Fill/>
    </button>)
  }

  const detailCompanyBtn = (info) => {
    return (
        <button
          onClick={() => navigate(`/company/${info.row.original.id}`)}
          className="btn table_btn secondary_btn">
          <RiInformationFill/>
        </button>
    )
  }

  const columns = [
    // columnHelper.accessor('id', {
    //   header: () => <span>Id</span>,
    //   cell: info => info.getValue(),
    //   footer: info => info.column.id
    // }),
    columnHelper.accessor('name', {
      header: () => <span>Nombre</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('logo', {
      cell: info => {
        if (info.getValue() !== null) {
          return (
            <picture className="logo_company">
              <img src={`${baseUrl}${info.getValue()}`} />
            </picture>
          )
        } else {
          return (
            <picture className="logo_company">
              <img src={noImg} />
            </picture>
          )
        }
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('city', {
      header: () => <span>Ciudad</span>,
      cell: info => {
        if (info.getValue() !== null ){
          return info.getValue()
        }
        return 'No registrado'
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('phone', {
      header: () => <span>Telefono</span>,
      cell: info => {
        if (info.getValue() !== '' ){
          return info.getValue()
        }
        return 'No registrado'
      },
      footer: info => info.column.id
    }),
    columnHelper.accessor('num_employees', {
      header: () => <span>Empleados</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('Acciones', {
      header: () => <span>Acciones</span>,
      cell: info => <div className="flex gap-3 justify-center">
        {detailCompanyBtn(info)}
        {editBtn(info)}
        {deleteBtn(info)}
      </div>,
      footer: info => info.column.id
    }),
  ]


  return (
    <AsyncTable data={data} columns={columns} label={searchLabel} />
  )
}
