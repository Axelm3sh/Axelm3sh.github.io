import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/NavBar/NavBar.jsx";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBar></NavBar>
        <div>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </div>
    </>
  )
}

export default App
