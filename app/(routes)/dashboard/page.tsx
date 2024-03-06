import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function DashboardPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
          }}
        >
          aaa
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
          }}
        >
          bbb
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          ccc
        </Paper>
      </Grid>
    </Grid>
  );
}
