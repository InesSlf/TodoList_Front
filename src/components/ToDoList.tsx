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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToDo from "./ToDo";
import { useState, useContext, useEffect, useMemo/* , useReducer */ } from "react";
import { TodosCntxt } from "../contexts/ToDosContext";
/* import { v4 as uuidv4 } from "uuid"; */
//import { /* ToastCntxt, */ useToast } from "../contexts/ToastCntxt";
//import todosReducer from "../reducers/todosReducer";
import { useToast } from "../contexts/useToast";

type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};
export default function ToDoList() {
  //const { toDos2, setToDos } = useContext(TodosCntxt);
  const {toDos, dispatch} = useContext(TodosCntxt);
  const { showHideToast } = useToast();
  const [titleInp, setTitleInp] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDelAlert, setShouwDelAlert] = useState(false);
  const [dialTodo, setDialTodo] = useState<Todo | null>(null);
  const [showUpdateAlert, setShouwUpdateAlert] = useState(false);
  //const [toDos, dispatch] = useReducer(todosReducer, []);

  // filteration arrays

  const completedTodos = useMemo(() => {
    return toDos.filter((t) => {
      return t.isCompleted;
    });
  }, [toDos]);

  const notCompletedTodos = useMemo(() => {
    return toDos.filter((t) => {
      return !t.isCompleted;
    });
  }, [toDos]);

  let todosTobeRendered = toDos;

  if (displayedTodosType === "completed") {
    todosTobeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosTobeRendered = notCompletedTodos;
  }

  useEffect(() => {
    dispatch({
      type: "get",
    });
  }, []);

  //handlers

  function handleAddClick() {
    dispatch({
      type: "add",
      payload: {
        title: titleInp,
      },
    });
    setTitleInp("");
    showHideToast("Tâche ajoutée avec succès !");
  }

  function changeDisplayedType(
    _: React.MouseEvent<HTMLElement>,
    value: string,
  ) {
    setDisplayedTodosType(value);
  }
  function handleDelConfirm() {
    if (!dialTodo) return;
    dispatch({
      type: "delete",
      payload: {
        id: dialTodo.id,
      },
    });
    setShouwDelAlert(false);
    showHideToast("Tâche supprimée avec succès !");
  }
  function handleDeleteDialogClose() {
    setShouwDelAlert(false);
  }

  function showDeleteDialog(todo: Todo) {
    setDialTodo(todo);
    setShouwDelAlert(true);
  }
  function handleUpdateClose() {
    setShouwUpdateAlert(false);
  }

  function showUpdateDialog(todo: Todo) {
    setDialTodo(todo);
    setShouwUpdateAlert(true);
  }

  function handleUpdateConfirm() {
    if (!dialTodo) return;
    dispatch({
      type: "update",
      payload: {
        id: dialTodo.id,
        title: dialTodo.title,
        details: dialTodo.details,
      },
    });
    setShouwUpdateAlert(false);
    showHideToast("Tâche mise à jour avec succès !");
  }

  const ListTodos = todosTobeRendered.map((t: Todo) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        showDel={showDeleteDialog}
        showUpdate={showUpdateDialog}
      />
    );
  });

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
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "90vh", overflow: "scroll" }}
        >
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
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <ToggleButton value="all" style={{ color: "#3e2723" }}>
                Toutes les tâches
              </ToggleButton>
              <ToggleButton value="non-completed" style={{ color: "#3e2723" }}>
                En cours
              </ToggleButton>
              <ToggleButton value="completed" style={{ color: "#3e2723" }}>
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
                  disabled={titleInp.length == 0}
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>
            {/* === INPUT + ADD BUTTON === */}
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
                  value={dialTodo?.title ?? ""}
                  /* onChange={(e) => {
                    setUpdatedTodo({ ...dialTodo, title: e.target.value });
                  }} */
                  onChange={(e) => {
                    if (!dialTodo) return;

                    setDialTodo({
                      ...dialTodo,
                      title: e.target.value,
                    });
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
                  value={dialTodo?.details ?? ""}
                  /* onChange={(e) => {
                    setUpdatedTodo({ ...dialTodo, details: e.target.value });
                  }} */
                  onChange={(e) => {
                    if (!dialTodo) return;

                    setDialTodo({
                      ...dialTodo,
                      details: e.target.value,
                    });
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
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
