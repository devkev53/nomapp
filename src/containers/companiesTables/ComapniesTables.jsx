import {createColumnHelper } from "@tanstack/react-table"
import { AsyncTable } from '../asyncTable/AsyncTable'
import { RiInformationFill, RiEdit2Fill } from "react-icons/ri";
import noImg from '../../assets/img/not-img.jpg'


export const ComapniesTables = ({data, searchLabel}) => {

  const columnHelper = createColumnHelper()


  const handleClick = (e) => {
    console.log(e.target)
  }


  const detailCompanyBtn = (info) => {
    return (
      <a
        onClick={handleClick}
        href={`company/${info.row.original.id}`}
        className="btn table_btn secondary_btn">
        <RiInformationFill/>
        {/* <span>Ver</span> */}
      </a>
    )
  }
  const editBtn = (info) => {
    return (
      <a
        href={`companies/${info.row.original.id}`}
        className="btn table_btn primary_btn"
      >
        <RiEdit2Fill/>
      </a>
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
              <img src={`http://localhost:8000${info.getValue()}`} />
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
        {/* {editBtn(info)} */}
      </div>,
      footer: info => info.column.id
    }),
  ]


  return (
    <AsyncTable data={data} columns={columns} label={searchLabel} />
  )
}
