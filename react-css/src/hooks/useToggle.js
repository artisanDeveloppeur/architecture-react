import { useState } from "react"
/**
 * 
 * @param {boolean} initial 
 */

export function useToggle(initial = false) {
  const [state, setState] = useState(initial)
  const toggle = () => setState(v => !v)
  return [state, toggle]
}

{/*

import { useToggle } from "./hooks/useToggle"

const [checked, toggleCheck] = useToggle()

    <input type="checkbox" checked={checked} onChange={toggleCheck} />
    {checked && 'je suis coché'}

*/}