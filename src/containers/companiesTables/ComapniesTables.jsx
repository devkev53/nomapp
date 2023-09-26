import {createColumnHelper } from "@tanstack/react-table"
import { AsyncTable } from '../asyncTable/AsyncTable'

export const ComapniesTables = ({data}) => {

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Id</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('name', {
      header: () => <span>Nombre</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('logo', {
      cell: info => (
        <picture className="logo_company">
          <img src={`http://localhost:8000${info.getValue()}`} />
        </picture>
      ),
      footer: info => info.column.id
    }),
    columnHelper.accessor('city', {
      header: () => <span>Ciudad</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('phone', {
      header: () => <span>Telefono</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('num_employees', {
      header: () => <span>Empleados</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('Acciones', {
      header: () => <span>Acciones</span>,
      cell: <button className="secondary_btn">Ver</button>,
      footer: info => info.column.id
    }),
  ]

  return (
    <AsyncTable data={data} columns={columns} />
  )
}
