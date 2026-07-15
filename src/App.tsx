import ToDoList from "./components/ToDoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { TodosCntxt } from "./contexts/ToDosContext";
//import { useState } from "react";
import TodosProvider from "./contexts/ToDosProvider";
import ToastProvider from "./contexts/ToastProvider";

const theme = createTheme({
  typography: {
    fontFamily: "A",
  },
  palette: {
    primary: {
      main: "#3e2723",
    },
  },
});

function App() {
 // const [toDos, setToDos] = useState(toDosinit);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
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
            <ToDoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
