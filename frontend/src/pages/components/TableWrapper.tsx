import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { EmployeeData } from "../../types";
import styles from "./TableWrapper.module.css";
import { keyToText as k } from "../../helpers/keysToText";

type TableProps = {
  columns: any[];
  rows: any[];
  handleEditEmployee: (rowData: EmployeeData) => void;
};

const TableWrapper = ({ columns, rows, handleEditEmployee }: TableProps) => {
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEditEmployee(row)}
                      >
                        Uprav
                      </Button>
                      <Button variant="contained" size="small">
                        Odstran
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell key={column.id} align={"left"}>
                      {value && value.toString()}
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
};
export default TableWrapper;
