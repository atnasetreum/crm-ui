"use client";

import { ChangeEvent } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDebouncedCallback } from "use-debounce";

export default function ClientsFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handleSearch = useDebouncedCallback((term: string, key: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }
    route.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const getCurrentValueFilter = (key: string) =>
    searchParams.get(key)?.toString() || "";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} lg={2}>
              <Paper>
                <TextField
                  label="Buscar ..."
                  variant="filled"
                  fullWidth
                  autoComplete="off"
                  defaultValue={getCurrentValueFilter("searchParam")}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => handleSearch(e.target.value, "searchParam")}
                />
              </Paper>
            </Grid>
          </Grid>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
