import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TodosCntxt } from "../contexts/ToDosContext";
import { useContext, useState } from "react";
type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};

type TodoProps = {
  todo: Todo;
};

export default function ToDo({ todo }: TodoProps) {
  const { toDos, setToDos } = useContext(TodosCntxt);
  const [showDelAlert, setShouwDelAlert] = useState(false);
  /* Handlers */
  function handleCheckClick() {
    const updatedTodo = toDos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }

      return t;
    });

    setToDos(updatedTodo);
  }
  function handleDelClick() {
    setShouwDelAlert(true);
  }
  function handleClose() {
    setShouwDelAlert(false);
  }
  function handleDelConfirm() {
    const updatedTodos = toDos.filter((t) => {
      return t.id !== todo.id;
    });
    setToDos(updatedTodos);
  }
  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        onClose={handleClose}
        open={showDelAlert}
        slots={{}}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Voulez-vous vraiment supprimer cette tâche ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleDelConfirm}>Supprimer</Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE MODAL === */}
      <Card
        className="cardTD"
        sx={{
          minWidth: 275,
          background: "#bcaaa4",
          color: "black",
          marginTop: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", textAlign: "left" }}
                variant="h5"
                align="center"
              >
                {todo.title}
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", textAlign: "left" }}
                variant="h6"
                align="center"
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#3e2723",
                  background: todo.isCompleted ? "#aed581" : "white",
                  border: "solid #3e2723 3px",
                }}
              >
                <ChecklistOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#3e2723",
                  background: "white",
                  border: "solid #3e2723 3px",
                }}
                onClick={handleDelClick}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#3e2723",
                  background: "white",
                  border: "solid #3e2723 3px",
                }}
              >
                <EditNoteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
