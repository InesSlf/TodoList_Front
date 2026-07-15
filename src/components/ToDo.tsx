import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TodosCntxt } from "../contexts/ToDosContext";
import { useContext, /* useState */ } from "react";
//import { /* ToastCntxt, */ useToast } from "../contexts/ToastCntxt";
import { useToast } from "../contexts/useToast";

type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};

type TodoProps = {
  todo: Todo;
  showDel: (todo: Todo) => void;
  showUpdate: (todo: Todo) => void;
};

export default function ToDo({ todo, showDel, showUpdate }: TodoProps) {
  //const { toDos, setToDos } = useContext(TodosCntxt);
  const { /* toDos, */ dispatch } = useContext(TodosCntxt);
  const { showHideToast } = useToast()
  //const [showDelAlert, setShouwDelAlert] = useState(false);
  /* const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  }); */ 
  /* Handlers */
  function handleCheckClick() {
    dispatch({
      type: "completed",
      payload: {
        id: todo.id,
      }
    })
    showHideToast("Tâche marquée comme terminée !");
  }
  function handleDelClick() {
    showDel(todo);
  }
  function handleUpdateClick() {
    showUpdate(todo);
  }

  
  return (
    <>
     
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
