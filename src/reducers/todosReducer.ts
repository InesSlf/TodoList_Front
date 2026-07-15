import { v4 as uuidv4 } from "uuid";
type Todo = {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
};
export type Action =
    | {
          type: "add";
          payload: {
              title: string;
          };
      }
    | {
          type: "delete";
          payload: {
              id: string;
          };
      }
    | {
          type: "update";
          payload: {
              id: string;
              title: string;
              details: string;
          };
        }
    | {
      type: "get";
    }
    | {
      type: "completed",
      payload: {
        id: string;
      };
    }

      
function assertNever(x: never): never {
    throw new Error("Unexpected action" + x);
}
export default function todosReducer(state: Todo[], action: Action) {
    switch(action.type){
        case "add" : {
            const newTodo = {
             id: uuidv4(),
             title: action.payload.title,
             details: "",
             isCompleted: false,
    };
            const updatedTodos = [...state, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos
        }
        case "delete": {
            if (!action.payload) return state;
             const updatedTodos = state.filter((t) => {
             return t.id !== action.payload.id;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos
        }
        case "update" : {
            
            const updatedTodos = state.map((t) => {
            if (t.id == action.payload.id) {
            return { ...t, title: action.payload.title, details: action.payload.details };
            } else {
            return t;
          }
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;

        }
        case "get": {
            const storageTodos = localStorage.getItem("todos");
            if (storageTodos) {
               return JSON.parse(storageTodos);
            }
            return state
        }
        case "completed" :{
            const updatedTodo = state.map((t) => {
            if (t.id === action.payload.id) {
            return {
                  ...t,
                  isCompleted: !t.isCompleted,
            };
        }

              return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodo));
            return updatedTodo;
          }
        default: {
            return assertNever(action);
        }
    }
    return []
}