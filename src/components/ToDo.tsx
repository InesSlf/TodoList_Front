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
import TextField from "@mui/material/TextField";
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
  const [showUpdateAlert, setShouwUpdateAlert] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
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
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  function handleDelClick() {
    setShouwDelAlert(true);
  }
  function handleUpdateClick() {
    setShouwUpdateAlert(true);
  }
  function handleDeleteDialogClose() {
    setShouwDelAlert(false);
  }
  function handleUpdateClose() {
    setShouwUpdateAlert(false);
  }
  function handleDelConfirm() {
    const updatedTodos = toDos.filter((t) => {
      return t.id !== todo.id;
    });
    setToDos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = toDos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setToDos(updatedTodos);
    setShouwUpdateAlert(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDelAlert}
        slots={{}}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle
          style={{
            color: "#3e2723",
          }}
        >
          Confirmation de suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Êtes-vous sûr de vouloir supprimer cette tâche ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleDeleteDialogClose}
            style={{
              color: "#3e2723",
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDelConfirm}
            style={{
              color: "#3e2723",
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE MODAL === */}

      {/* UPDATE MODAL */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateAlert}
        slots={{}}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle
          style={{
            color: "#3e2723",
          }}
        >
          Confirmation de mise à jour
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="nom"
            label="Nom de la tâche"
            fullWidth
            variant="standard"
            style={{ color: "#3e2723" }}
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Détails "
            fullWidth
            variant="standard"
            style={{ color: "#3e2723" }}
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleUpdateClose}
            style={{
              color: "#3e2723",
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            style={{
              color: "#3e2723",
            }}
          >
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE MODAL === */}
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
                sx={{
                  color: "text.secondary",
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
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
                onClick={handleUpdateClick}
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
