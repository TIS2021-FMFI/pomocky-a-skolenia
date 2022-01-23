import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import styles from './TableWrapper.module.css'

type TableProps = {
  columns: any[]
  rows: any[]
}

const BeforeExpireTableWrapper = ({ columns, rows }: TableProps) => {
  return (
    <TableContainer className={styles.tableContainer}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                <b>{column.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            let color = 'primary.main'
            if (
              row.pocet_dni_platnosti !== undefined &&
              row.pocet_dni_platnosti < 14
            ) {
              color = 'error.main'
            }
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                color={'primary.main'}
              >
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell key={column.id} align={'left'}>
                      <Typography color={color}>
                        {column.id === 'koniec_platnosti' ||
                        column.id === 'datum_absolvovania'
                          ? new Date(value).toLocaleDateString('sk-SK')
                          : value && value.toString()}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BeforeExpireTableWrapper
