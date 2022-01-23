import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { keyToText as k } from '../../helpers/keysToText'
import { SkoleniaZamestnanca } from '../../types'

import styles from './CoursesTableWrapper.module.css'

type CoursesTableWrapperProps = {
  columns: any[]
  rows: SkoleniaZamestnanca[]
}

const CoursesTableWrapper = ({ columns, rows }: CoursesTableWrapperProps) => {
  columns = columns.filter((col) => col.id !== 'id')
  return (
    <TableContainer className={styles.tableContainer}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, verticalAlign: 'bottom' }}
              >
                <b>
                  {column.label
                    ? k(`${column.id} ${column.label}`)
                    : k(column.id)}
                </b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell key={column.id} align={'left'}>
                      {value === undefined
                        ? ''
                        : column.id === 'meno' ||
                          column.id === 'priezvisko' ||
                          column.id === 'oblast'
                        ? value && value.toString()
                        : new Date(value).toLocaleDateString('sk-SK')}
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

export default CoursesTableWrapper
