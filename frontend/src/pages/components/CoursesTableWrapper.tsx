import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material'
import { keyToText as k } from '../../helpers/keysToText'
import { SkoleniaZamestnanca } from '../../types'

import styles from './TableWrapper.module.css'

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
            {columns.map((column: any) => {
              const isSticky =
                column.id === 'meno' ||
                column.id === 'priezvisko' ||
                column.id === 'oblast'

              let size = 0

              if (column.id === 'priezvisko') size = 120
              if (column.id === 'oblast') size = 2 * 120
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    verticalAlign: 'bottom',
                    position: 'sticky',
                    left: size,
                    zIndex: isSticky ? 2 : 1,
                    background: 'white',
                  }}
                >
                  <b>
                    {column.label
                      ? k(`${column.id} ${column.label}`)
                      : k(column.id)}
                  </b>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const isSticky =
                    column.id === 'meno' ||
                    column.id === 'priezvisko' ||
                    column.id === 'oblast'
                  const value = row[column.id]

                  let size = 0

                  if (column.id === 'priezvisko') size = 120
                  if (column.id === 'oblast') size = 2 * 120
                  return (
                    <Box
                      component={TableCell}
                      key={column.id}
                      align={'left'}
                      sx={{
                        position: isSticky ? 'sticky' : 'static',
                        left: size,
                        background: 'white',
                      }}
                    >
                      {value === undefined
                        ? ''
                        : isSticky
                        ? value && value.toString()
                        : new Date(value).toLocaleDateString('sk-SK')}
                    </Box>
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
