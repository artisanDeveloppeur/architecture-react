import { useToggle } from "../hooks/useToggle.js"
import { activeClassIf } from "../utils/classnames.js"
import { Copyright } from "./Copyright.jsx"

/**
 * 
 * @param {string} page 
 */
export function Header({ page }) {

  const [expanded, toggleExpanded] = useToggle(false)


  return <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Mon site  <Copyright /></a>
      <button onClick={toggleExpanded} className="navbar-toggler" type="button"
        aria-controls="navbarNav" aria-expanded={expanded} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
        id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={activeClassIf(page === 'home', 'nav-link')} aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'todos', 'nav-link')} href="#todos">Todos</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'images', 'nav-link')} href="#images">Images</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'search', 'nav-link')} href="#search">Search</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'meteo', 'nav-link')} href="#meteo">Meteo</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'faq', 'nav-link')} href="#faq">Faq</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'quote', 'nav-link')} href="#quote">Quote</a>
          </li>
          <li className="nav-item">
            <a className={activeClassIf(page === 'contact', 'nav-link')} href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}