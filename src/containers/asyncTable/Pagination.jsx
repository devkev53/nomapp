import { RiArrowLeftDoubleFill, RiArrowRightDoubleLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export const Pagination = ({tableInstance}) => {
  return (
    <div className='pagination_wrapper'>
        <div className="pages_count">
          <span>Page</span>
          <strong>
            {tableInstance.getState().pagination.pageIndex+1} of {''}
            {tableInstance.getPageCount()}
          </strong>
        </div>
        <div className="pages_x_row">
          <span>Mostrar</span>
          <select
            value={tableInstance.getState().pagination.pageSize}
            onChange={e => {
              tableInstance.setPageSize(Number(e.target.value))
            }}
          >
            {[2, 5, 10].map(pageSize => (
              <option key={pageSize} value={pageSize}>
              {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="buttons">
          <button
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
          ><RiArrowLeftDoubleFill/></button>
          <button
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          ><RiArrowLeftSLine/></button>
          <button
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          ><RiArrowRightSLine/></button>
          <button
            onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
            disabled={!tableInstance.getCanNextPage()}
          ><RiArrowRightDoubleLine/></button>
        </div>
    </div>
  )
}
