"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import Copyright from "@layout/Copyright";
import { emailIsValid, encryptPassword } from "@utils";
import { AuthService } from "@services";

export interface Data {
  token: string;
}

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "eduardo-265@hotmail.com",
    password: "123",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = form;

    const emailClean = email.trim();
    const passwordClean = password.trim();

    if (!emailClean) {
      return toast.error("El correo electrónico es requerido");
    }

    if (!emailIsValid(emailClean)) {
      return toast.error("El correo electrónico no es válido");
    }

    if (!passwordClean) {
      return toast.error("La contraseña es requerida");
    }

    setIsLoading(true);

    AuthService.login({
      email: emailClean,
      password: encryptPassword(passwordClean),
    })
      .then(() => router.push("/dashboard"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CRM - Mario Gutiérrez García
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Iniciar
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

/*import { gql } from "@apollo/client";

import { getClient } from "@lib/apollo-client";

async function loadData() {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  console.log({ data: data.characters.results });
}

export default async function LoginPage() {
  await loadData();
  return <p>hola mundo</p>;
}*/

/*
"use client";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect } from "react";

const query = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

export interface Results {
  characters: Characters;
}

export interface Characters {
  __typename: string;
  results: Result[];
}

export interface Result {
  __typename: string;
  id: string;
  name: string;
  image: string;
}

export default function LoginPage() {
  const { data } = useSuspenseQuery<Results>(query);

  useEffect(() => {
    console.log({
      results: data.characters.results,
      data,
    });
  }, []);

  return <p>hola mundo</p>;
}*/
