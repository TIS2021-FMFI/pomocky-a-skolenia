import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchUsers, removeUser } from '../../helpers/requests'
import { keyToText as k } from '../../helpers/keysToText'

import styles from '../components/TableWrapper.module.css'
import RemoveUserModal from '../components/RemoveUserModal'

const UsersManagementTab = () => {
  const [users, setUsers] = useState<any[]>([])
  const [emailToDelete, setEmailToDelete] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const columns = ['email', 'is_admin', 'oblasti', ''].map((label) => ({
    id: label,
  }))

  const fetchAsync = async () => {
    setUsers(await fetchUsers())
  }

  useEffect(() => {
    fetchAsync()
  }, [])

  const handleRemoveUser = async (email: string) => {
    const result = await removeUser(email)
    if (result) fetchAsync()
  }

  if (users.length > 1)
    return (
      <>
        <TableContainer className={styles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: any) => {
                  return (
                    <TableCell
                      key={column.id}
                      sx={{
                        minWidth: 120,
                        verticalAlign: 'bottom',
                        background: 'white',
                      }}
                    >
                      <b>{k(column.id)}</b>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return column.id === '' ? (
                        <TableCell key={column.id} align="left">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              setEmailToDelete(row.email)
                              setIsOpen(true)
                            }}
                          >
                            Odstráň
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align={'left'}>
                          {value && value.toString()}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <RemoveUserModal
          email={emailToDelete}
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          handleSubmit={handleRemoveUser}
        />
      </>
    )
  else {
    return <></>
  }
}

export default UsersManagementTab
