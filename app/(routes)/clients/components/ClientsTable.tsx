"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

interface Props {
  data: Client[];
  count: number;
}

export default function ClientsTable({ data, count }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams);

      if (page > 0) params.set("page", `${page + 1}`);
      else params.delete("page");

      if (rowsPerPage !== 5) params.set("limit", `${rowsPerPage}`);
      else params.delete("limit");

      route.replace(`${pathname}?${params.toString()}`);
    }
  }, [isMounted, page, rowsPerPage, searchParams, pathname, route]);

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams);

      if (params.has("page")) {
        const pageCurrent = parseInt(params.get("page") ?? "1", 10);
        setPage(pageCurrent - 1);
      }

      if (params.has("limit")) {
        const limitCurrent = parseInt(params.get("limit") ?? "5", 10);
        setRowsPerPage(limitCurrent);
      }
    }
  }, [isMounted, searchParams]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={4}
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
