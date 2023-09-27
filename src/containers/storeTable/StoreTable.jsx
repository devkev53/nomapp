import {createColumnHelper } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { RiInformationFill } from "react-icons/ri";


import { AsyncTable } from "../asyncTable/AsyncTable"

import noImg from '../../assets/img/not-img.jpg'


export const StoreTable = ({data}) => {

  const columnHelper = createColumnHelper()
  const navigate = useNavigate()

  const checkBtn = (info) => {
    return (
      <button
        onClick={() => navigate(`/validate-buy/${info.row.original.id}`)}
        className="btn table_btn secondary_btn">
        <RiInformationFill/>
      </button>
    )
  }

  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Id</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('url_img', {
      header: () => <span>Foto</span>,
      cell: info => {
        if (info.getValue() !== "") {
          return (<picture>
            <img className="store_img_employee rounded-full"
              src={`http://127.0.0.1:8000${info.getValue()}`}
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
    columnHelper.accessor(row => row.job_position.get_company, {
      id: 'company',
      header: () => <span>Empresa</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.job_position.name, {
      id: 'name',
      header: () => <span>Puesto</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('Verificar', {
      header: () => <span>Acciones</span>,
      cell: info => <div className="flex gap-3">{checkBtn(info)}</div>,
      footer: info => info.column.id
    }),

  ]

  return (
    <AsyncTable data={data} columns={columns} />
  )
}
