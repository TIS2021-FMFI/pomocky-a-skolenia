import Header from "./Header"
import TableRow from "./TableRow"

type TableProps = {
    data: string[][]
}

const Table = ({data}: TableProps) => {
    const headers = data[0]
    data = data.slice(1,)

    return(
        <div>
        <Header headers={headers}/>
        {data.map((row, index) => {
            return <TableRow key={index} data={row}/>
        })}
        </div>
    )
}
export default Table