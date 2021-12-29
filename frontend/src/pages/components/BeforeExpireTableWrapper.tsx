import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KonciaceSkoleniaRow, Column } from "../../types";
import styles from "./TableWrapper.module.css";

type TableProps = {
  columns: Column[];
  rows: KonciaceSkoleniaRow[];
};

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
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            let color = "primary.main";
            if (
              row.pocetDniPlatnosti !== undefined &&
              row.pocetDniPlatnosti < 14
            ) {
              color = "error.main";
            }
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                color={"primary.main"}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={"left"}>
                      <Typography color={color}>
                        {value && value.toString()}
                      </Typography>
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

export default BeforeExpireTableWrapper;
