import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { keyToText as k } from "../../helpers/keysToText";
import { SkoleniaZamestnanca } from "../../types";

import styles from "./CoursesTableWrapper.module.css";

type CoursesTableWrapperProps = {
  columns: any[];
  rows: SkoleniaZamestnanca[];
};

const CoursesTableWrapper = ({ columns, rows }: CoursesTableWrapperProps) => {
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
                  return (
                    <TableCell key={column.id} align={"left"}>
                      {typeof value !== "string" && typeof value !== "number"
                        ? new Date(value.datum).toLocaleDateString("sk-SK")
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
};

export default CoursesTableWrapper;
