import { useCallback, useReducer } from "react"

function todosReducer(state, action) {
  if (action.type === 'REMOVE_TODO') {
    return {
      ...state,
      todos: state.todos.filter(todo => todo !== action.payload)
    }
  }
  if (action.type === 'TOGGLE_TODO') {
    return {
      ...state,
      todos: state.todos.map(todo => todo === action.payload ? {
        ...todo, checked: !todo.checked
      } : todo)
    }
  }
  if (action.type === 'CLEAR_COMPLETED') {
    return {
      ...state,
      todos: state.todos.filter(todo => !todo.checked)
    }
  }
  if (action.type === 'TOGGLE_FILTER') {
    return {
      ...state,
      showCompleted: !state.showCompleted
    }
  }
  //console.log({ state, action })
  return state

}

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, {
    showCompleted: true,
    todos: [
      { name: 'Maîtriser JavaScript', checked: true },
      { name: 'Utiliser npm', checked: true },
      { name: 'Comprendre les modules JS (import, export)', checked: false },
      { name: 'Apprendre Reactjs', checked: false },
      { name: 'Configurer ViteJS', checked: false }

    ]

  })

  const visibleTodos = state.showCompleted ? state.todos : state.todos.filter(t => !t.checked)

  return {
    todosNumber: state.todos.length,
    showCompleted: state.showCompleted,
    visibleTodos: visibleTodos,
    toggleTodo: useCallback(
      (todo) => dispatch({ type: 'TOGGLE_TODO', payload: todo }),
      [],
    ),
    removeTodo: useCallback(
      (todo) => dispatch({ type: 'REMOVE_TODO', payload: todo }),
      [],
    ),
    clearCompleted: useCallback(
      () => dispatch({ type: 'CLEAR_COMPLETED' }),
      [],
    ),
    toggleFilter: useCallback(
      () => dispatch({ type: 'TOGGLE_FILTER' }),
      [],
    ),

  };
}