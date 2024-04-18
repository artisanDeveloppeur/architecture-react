import { Home } from "./pages/Home.jsx"
import { Contact } from "./pages/Contact.jsx"
//import { Single } from "./pages/Single.jsx"
import { Todos } from "./pages/Todos.jsx"
import { Images } from "./pages/Images.jsx"
import { Faq } from "./pages/Faq.jsx"
import { RandomQuote } from "./pages/Quotes/RandomQuote.jsx"
import { Search } from "./pages/Search.jsx"

import { NotFound } from './pages/NotFound.jsx'
import { useHashNavigation } from "./hooks/useHashNavigation.js"
import { Header } from "./components/Header.jsx"
import { ErrorBoundary } from "react-error-boundary"
import { Alert } from "./components/Alert.jsx"

import { Suspense, lazy } from 'react';
import { Meteo } from "./pages/Meteo.jsx"



function App() {

  const { page, param } = useHashNavigation()
  const pageContent = getPageContent(page, param)

  return <>
    <Header page={page} />
    <div className="container my-3">
      <ErrorBoundary FallbackComponent={PageError}>
        {pageContent}
      </ErrorBoundary>
    </div>
  </>
}

function PageError({ error }) {
  return <Alert type="danger">{error.toString()}</Alert>
}

function LoadingCurrentComponent() {
  return <div>Chargement des composants en cours</div>
}
function getPageContent(page, param) {
  if (page === 'home') {
    return <Home />
  }
  if (page === 'todos') {
    return <Todos />
  }
  if (page === 'images') {
    return <Images />
  }
  if (page === 'search') {
    return <Search />
  }
  if (page === 'faq') {
    return <Faq />
  }

  if (page === 'meteo') {
    return <Meteo />
  }
  if (page === 'quote') {
    return <RandomQuote />
  }

  if (page === 'contact') {

    return <Contact />
  }
  if (page === 'post') {
    const SingleLazy = lazy(() => import('./pages/Single'))
    /**
     * Error: A component suspended while responding to synchronous input. 
     * This will cause the UI to be replaced with a loading indicator. 
     * To fix, updates that suspend should be wrapped with startTransition.
     *
     * BUG return <SingleLazy postId={param} />
     */

    return <Suspense fallback={<LoadingCurrentComponent />}>
      <SingleLazy postId={param} />
    </Suspense>
  }
  return <NotFound page={page} />

}
export default App

