import { useState } from 'react'
import './App.css'
import NavBar from "./components/NavBar/NavBar.jsx";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WipBanner from "./components/WipBanner/WipBanner.jsx";
import { Button } from '@nextui-org/react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBar></NavBar>
        <div>
            {/*<Header></Header>*/}
            <WipBanner></WipBanner>
            {/*<Main></Main>*/}
            <Button color="gradient" onClick={() => setCount(count + 1)}>
                You click {count} times
            </Button>
            <Footer></Footer>
        </div>
    </>
  )
}

export default App
