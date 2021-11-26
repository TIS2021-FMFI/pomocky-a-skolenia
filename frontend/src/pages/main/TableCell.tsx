type TableCellProps = {
    data: string
}

const TableCell = ({data}: TableCellProps) => {
    return <div className="table-cell">
        {data}
    </div>
}

export default TableCell