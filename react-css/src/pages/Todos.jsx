import { useTodos } from "../hooks/useTodo.js"


export function Todos() {


  const { todosNumber, visibleTodos, removeTodo, clearCompleted, toggleFilter, toggleTodo, showCompleted } = useTodos()

  console.log(visibleTodos)


  return <>
    <h1 className="mb-3">hook useReducer :  {todosNumber} tâches</h1>

    <p>
      <input type="checkbox"
        checked={showCompleted}
        onChange={toggleFilter}

      />
      Afficher les tâches accomplies
    </p>
    <ul>
      {visibleTodos.map(todo => (<li
        key={todo.name}

      >
        <input type="checkbox"
          onChange={() => toggleTodo(todo)}
          checked={todo.checked}
        />
        {todo.name}
        <button
          onClick={() => removeTodo(todo)}>
          Supprimer
        </button>
      </li>))}
    </ul>
    <button onClick={clearCompleted}>Supprimer les tâches accomplies</button>
  </>
}

