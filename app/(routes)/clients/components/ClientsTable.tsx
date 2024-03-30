"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "@shared/components";
import { Client } from "@interfaces";
import { usePagination } from "@hooks";
import { stringToDateWithTime } from "@utils";

interface Props {
  data: Client[];
  count: number;
}

export default function ClientsTable({ data, count }: Props) {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Teléfono</StyledTableCell>
            <StyledTableCell>Correo</StyledTableCell>
            <StyledTableCell>Estatus</StyledTableCell>
            <StyledTableCell>Proyectos</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Campaña</StyledTableCell>
            <StyledTableCell>Creación</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.phone}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.state.name}</StyledTableCell>
              <StyledTableCell>
                {row.projects.map((project) => project.name).join(", ")}
              </StyledTableCell>
              <StyledTableCell>{row.origin.name}</StyledTableCell>
              <StyledTableCell>{row.campaign.name}</StyledTableCell>
              <StyledTableCell>
                {stringToDateWithTime(row.createdAt)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={9}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
