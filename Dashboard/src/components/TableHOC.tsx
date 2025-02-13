import { Column, useTable, useSortBy, usePagination } from 'react-table'

function TableHOC<T extends Object>(columns: Column<T>[],
    data: T[],
    heading: string,
    showPagination: boolean = false) {

    const { getTableBodyProps,
        getTableProps,
        headerGroups,
        page,
        prepareRow, nextPage, previousPage, canNextPage, canPreviousPage
        , pageCount, state: { pageIndex }, gotoPage } = useTable({ columns, data, initialState: { pageSize: 5 } }, useSortBy, usePagination);

    return function HOC() {
        return <div className={`${heading}`}>
            <h2>
                <table {...getTableProps()} className={`${heading + "Table"} w-full`}>
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            return <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className='max-sm:p-2 p-3 text-xl'>
                                        {column.render("Header")}
                                        {column.isSorted &&
                                            <span className='text-sm font-normal'
                                            >{column.isSortedDesc ? " D" : " A"}</span>}
                                    </th>
                                ))}
                            </tr>
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()} className={`${heading}+"Body`}>
                        {page.map(row => {
                            prepareRow(row)
                            return <tr {...row.getRowProps()} className={`${heading + "Row"} text-center`}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className={`${heading + "TableData"} text-lg`}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        })}
                    </tbody>
                </table>
                {showPagination && <div className='w-full flex justify-center gap-3 items-center bg-slate-200'>
                    <button className={`text-white p-1 rounded-md m-2 cursor-pointer bg-blue-400 hover:bg-blue-300`}
                        onClick={() => gotoPage(0)}>{'<<'}</button>
                    <button disabled={!canPreviousPage}
                        onClick={previousPage} className={`text-white p-1 rounded-md m-2 cursor-pointer ${!canPreviousPage ? 'bg-slate-300' : 'bg-blue-400 hover:bg-blue-300'}`}>Prev</button>
                    <span>Page of {pageIndex + 1} of {pageCount}</span>
                    <button disabled={!canNextPage}
                        onClick={nextPage}
                        className={`text-white p-1 rounded-md m-2 cursor-pointer ${!canNextPage ? 'bg-slate-300' : 'bg-blue-400 hover:bg-blue-300'}`}>Next</button>
                    <button className={`text-white p-1 rounded-md m-2 cursor-pointer bg-blue-400 hover:bg-blue-300`}
                        onClick={() => gotoPage(pageCount - 1)}>{'>>'}</button>
                </div>}
            </h2>
        </div>
    }
}

export default TableHOC
