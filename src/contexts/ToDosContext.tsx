import { createContext } from "react";

type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};
type TodosContextType = {
  toDos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosCntxt = createContext<TodosContextType>({
  toDos: [],
  setToDos: () => {},
});
