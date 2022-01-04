import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { EmployeeData } from "../../types";
import styles from "./TableWrapper.module.css";
import { keyToText as k } from "../../helpers/keysToText";
import { useMemo } from "react";

type TableProps = {
  columns: any[];
  rows: any[];
  handleEditEmployee: (rowData: EmployeeData) => void;
  handleRemoveEmployee: (rowData: EmployeeData) => void;
};

const EmployeeTableWrapper = ({
  columns,
  rows,
  handleEditEmployee,
  handleRemoveEmployee,
}: TableProps) => {
  const memTable = useMemo(() => {
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
                  {k(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return column.id === "" ? (
                      <TableCell key={column.id} align="center">
                        <Box display={"flex"} flexDirection={"column"}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleEditEmployee(row)}
                          >
                            Uprav
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleRemoveEmployee(row)}
                          >
                            Odstráň
                          </Button>
                        </Box>
                      </TableCell>
                    ) : (
                      <TableCell key={column.id} align={"left"}>
                        {column.id === "datum_vydania"
                          ? !!value
                            ? new Date(value).toLocaleDateString("sk-SK")
                            : ""
                          : value && value.toString()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, columns]);

  return memTable;
};
export default EmployeeTableWrapper;
