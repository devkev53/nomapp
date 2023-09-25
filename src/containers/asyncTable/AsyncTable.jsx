import { flexRender, useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table"
import { useEffect, useState } from "react"

export const AsyncTable = ({res}) => {

  const defaultData = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('username', {
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      footer: info => info.column.id
    }),
    columnHelper.accessor('url_img', {
      cell: info => info.getValue(),
      footer: info => info.column.id
    })
  ]

  const [data, setData] = useState([])

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(() => {
    setData(res)
  },[res])

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceHolder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
