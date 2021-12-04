import TableCell from "./TableCell"

type TableRowProps = {
    data: string[]
}

const TableRow = ({data}: TableRowProps) => {
    return(
        <div className="table-row">
            {data.map((item, index) => {
                return <TableCell key={index} data={item}/>
            })}
        </div>
    )
}
export default TableRow