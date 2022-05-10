import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom'
import Navigation from "./components/Navigation"
import Login from "./pages/Login"
import Register from "./pages/Register"
import User from "./pages/User"
import PageNotFound from "./pages/PageNotFound"

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>

        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/user" element={ <User /> } />

        <Route path="*" element={ <PageNotFound /> } />

      </Routes>
    </div>
  )
}

export default App
