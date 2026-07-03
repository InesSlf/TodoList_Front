import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToDo from "./ToDo";
import { useState, useContext } from "react";
import { TodosCntxt } from "../contexts/ToDosContext";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};
export default function ToDoList() {
  const { toDos, setToDos } = useContext(TodosCntxt);
  const [titleInp, setTitleInp] = useState("");
  const ListTodos = toDos.map((t: Todo) => {
    return <ToDo key={t.id} todo={t}/>;
  });

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInp,
      details: "",
      isCompleted: false,
    };
    setToDos([...toDos, newTodo]);
    setTitleInp("");
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "#4e342e", fontWeight: "bold" }}
              variant="h2"
              align="center"
            >
              Tâches
            </Typography>
            <Divider variant="middle" />
            <ToggleButtonGroup
              /* value={alignment} */
              exclusive
              /*   onChange={handleAlignment} */
              aria-label="text alignment"
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <ToggleButton value="left" style={{ color: "#3e2723" }}>
                Toutes les tâches
              </ToggleButton>
              <ToggleButton value="center" style={{ color: "#3e2723" }}>
                En cours
              </ToggleButton>
              <ToggleButton value="right" style={{ color: "#3e2723" }}>
                Terminées
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ALL TODOS */}
            {ListTodos}
            {/* === ALL TODOS === */}
            {/* INPUT + ADD BUTTON  */}
            <Grid container spacing={2} style={{ marginTop: "15px" }}>
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={titleInp}
                  onChange={(e) => {
                    setTitleInp(e.target.value);
                  }}
                  className="custom-textfield"
                  style={{ width: "100%", color: "#3e2723" }}
                  id="outlined-basic"
                  label="Nom de la Tâche"
                  variant="outlined"
                />
              </Grid>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    handleAddClick();
                  }}
                  className="AddBtn "
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#3e2723",
                  }}
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>
            {/* === INPUT + ADD BUTTON === */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
