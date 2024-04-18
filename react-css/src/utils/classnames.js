export function activeClassIf(condition, className) {
  if (!condition) {
    return className
  }
  if (!className) {
    return 'active';
  }
  return `active ${className}`
}

{/* 

<a className={`nav-link ${page === 'home' ? 'active' : '' }`} aria-current="page" href="#">Home</a>

<a className={activeClassIf(page === 'home', 'nav-link')} aria-current="page" href="#">Home</a>

*/}

