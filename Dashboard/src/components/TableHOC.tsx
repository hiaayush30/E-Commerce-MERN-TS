import { Column, useTable } from 'react-table'

function TableHOC<T extends Object>(columns: Column<T>[],
    data: T[],
    containerClassName: string,
    heading: string){

    const {getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        prepareRow} = useTable({columns,data});

    return function HOC() { 
        return <div className={`${containerClassName}`}>
           <h2 className={`${heading}`}>
                   <table {...getTableProps()} className='w-full'>
                      <thead>
                        {headerGroups.map((headerGroup)=>{
                            return <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps()} className='max-sm:p-2 p-3 bg-blue-300 text-xl'>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        })}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                               {rows.map(row=>{
                                prepareRow(row)
                                return <tr {...row.getRowProps()} className='p-2 text-center'>
                                    {row.cells.map(cell=>(
                                        <td {...cell.getCellProps()} className='text-lg'>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                               })}
                      </tbody>
                   </table>
           </h2>
        </div>
    }
}

export default TableHOC
