import { Input } from "./components/forms/Input.jsx";
//import { Checkbox } from "./components/forms/Checkbox.jsx";
import { useMemo, useState } from "react"


function App() {

  const [firtsName, setFirstname] = useState('John')
  const [password, setPassword] = useState('MotDePasse')
  //const security = passwordSecurity(password)
  const security = useMemo(() => {
    return passwordSecurity(password)
  }, [password])


  return <>
    <h1>React.js : useMemo</h1>
    <div className="container my-3 stack gap-2">
      <Input
        label="Nom d'utilisateur"
        value={firtsName}
        onChange={setFirstname}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      Sécurité : {security}
    </div>
  </>
}

function passwordSecurity(password) {

  // Fausse lenteur
  let startTime = performance.now()
  while (performance.now() - startTime < 200) { }

  if (password.length < 3) {
    return 'Faible'
  } else if (password.length < 6) {
    return 'Moyen'
  }
  return 'Fort'
}

export default App
