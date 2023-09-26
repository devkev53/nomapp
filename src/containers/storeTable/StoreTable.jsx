import {createColumnHelper } from "@tanstack/react-table"
import { AsyncTable } from "../asyncTable/AsyncTable"

export const StoreTable = ({data}) => {
  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Id</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('url_img', {
      header: () => <span>Foto</span>,
      cell: info => (
        <picture>
          <img className="store_img_employee rounded-full" src={`http://localhost:8000${info.getValue()}`} alt="" />
        </picture>
      ),
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
    
  ]

  return (
    <AsyncTable data={data} columns={columns} />
  )
}
