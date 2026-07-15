import { createContext } from "react";
import type { Action } from "../reducers/todosReducer";

type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};

export type TodosContextType = {
  toDos: Todo[];
  dispatch: React.Dispatch<Action>;
};

export const TodosCntxt = createContext<TodosContextType>({
  toDos: [],
  dispatch: () => {},
});