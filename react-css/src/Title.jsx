
import { useState } from "react"
import { useDocumentTitle } from "./hooks/useDocumentTitle"
import { Input } from "./components/forms/Input"






function App() {


  const [name, setName] = useState('')

  useDocumentTitle(name ? `Editer ${name}` : null)

  return <>
    <h1>React.js : hook personnalisé</h1>
    <Input value={name} onChange={setName} label="Nom" />

  </>
}



export default App
