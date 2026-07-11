import ToDoList from "./components/ToDoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosCntxt } from "./contexts/ToDosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastProvider } from "./contexts/ToastCntxt";

const theme = createTheme({
  typography: {
    fontFamily: "A",
  },
  palette: {
    primary:{
      main: "#3e2723"
    }
  }
});
const toDosinit = [
  {
    id: uuidv4(),
    title: "Apprendre React",
    details: "Hooks, Components, TSX",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Apprendre Python",
    details: "Functions, Arrays, List, Tuples",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Cuisiner",
    details: "Préparer caker, chorba, mtewem",
    isCompleted: false,
  },
];

function App() {
  const [toDos, setToDos] = useState(toDosinit);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider /* value={{ showHideToast}} */>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#d7ccc8",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <TodosCntxt.Provider value={{ toDos, setToDos }}>
          <ToDoList />
        </TodosCntxt.Provider>
      </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
