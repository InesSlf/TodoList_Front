import { useReducer } from "react";
import todosReducer from "../reducers/todosReducer";
import { TodosCntxt } from "./ToDosContext";

type Props = {
  children: React.ReactNode;
};

export default function TodosProvider({ children }: Props) {
  const [toDos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosCntxt.Provider value={{ toDos, dispatch }}>
      {children}
    </TodosCntxt.Provider>
  );
}