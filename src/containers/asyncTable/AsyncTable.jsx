import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, PaginationState, getPaginationRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react"

import {CustomGobalFilter} from './CustomGobalFilter'
import { Pagination } from "./Pagination"

export const AsyncTable = ({data, columns, label}) => {

  const [globalFilter, setGlobalFilter] = useState('')

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className="async_table_wrapper">

      <div className="filter-table">
        <CustomGobalFilter
          label={label}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter} />
      </div>

      <div className="table_content">
        <table className="styled-table">
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
            {data.length < 1 && (
              <tr>
                <td colSpan={tableInstance.getHeaderGroups()[0].headers.length} className="no_register">
                  No se han encontrado registros..!
                </td>
              </tr>
            )}
            {tableInstance.getRowModel().rows.map(row => (
              <tr key={row.id} id={row.original.id}>
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

      <Pagination tableInstance={tableInstance} />
    </div>
  )
}
