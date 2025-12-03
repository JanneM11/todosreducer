import { useReducer } from "react"


interface Task {
  id: string
  name: string
  done: boolean
}

type TaskAction =
  | { type: 'ADD'; payload: string}
  | { type: 'TOGGLE'; payload: string}
  | { type: 'DELETE'; payload: string}

const initialState: Task[] = []
const taskReducer = (state: Task[],action: TaskAction):
  Task[] => {
    switch (action.type) {
      case "ADD":
        return [...state,{ id: Date.now().toString(), name: action.payload.trim(), done: false }]
      case "TOGGLE":
        return state.map(task => task.id === action.payload ? { ...task, done: !task.done } : task )
      case "DELETE":
        return state.filter((task) => task.id !== action.payload)
      default:
        return state
    }
  }

export const useTodos = () => {
  const [state,dispatch] = useReducer(taskReducer,initialState)

  const handleAdd = (name: string) => {
    dispatch({ type: "ADD", payload: name})
  }

  const handleToggle = (id: string) => {
    dispatch({ type: "TOGGLE", payload: id})
  }

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE", payload: id})
  }
  return {
    state,
    handleAdd,
    handleToggle,
    handleDelete
  }
}