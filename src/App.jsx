import { useState } from 'react'
import './App.css'
import PageNavBar from "./components/PageNavBar/PageNavBar.jsx";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WipBanner from "./components/WipBanner/WipBanner.jsx";
import {Button, Container} from '@nextui-org/react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <PageNavBar navItems={["Home", "About", "Projects"]} activeIndex={0}></PageNavBar>
        <Container fluid={true}>
            {/*<Header></Header>*/}
            <WipBanner></WipBanner>
            {/*<Main></Main>*/}
            {/*<Button color="gradient" onClick={() => setCount(count + 1)}>*/}
            {/*    You click {count} times*/}
            {/*</Button>*/}
            {/*<Footer></Footer>*/}
        </Container>
    </>
  )
}

export default App
