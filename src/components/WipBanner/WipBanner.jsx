import React from 'react';
import viteLogo from '../../assets/vite.svg'
import reactLogo from '../../assets/react.svg'
import wipGears from '../../assets/images/banner-image.jpg'
import './WipBanner.css'
import {Card, Container, Image, Link, Row, Spacer, Text} from "@nextui-org/react";

function WipBanner() {
    const bgProps = {
        src: wipGears,
        alt: "work in progress background gears",
        objectFit: "cover",
        width: "100%"
    }

    return (
        <Container>
            <Spacer y={2}></Spacer>
            <Card>
                <Card.Body css={{position: "absolute", zIndex: 1, top: 5}}>
                    <Row align={"center"} justify={"center"}>
                        <Text h1 css={{textGradient: "45deg, $blue600 -20%, $pink600 50%"}} weight="bold">Work In Progress</Text>
                    </Row>
                    <Spacer y={2}></Spacer>
                    <Row align={"center"} justify={"center"} css={{overflow: "hidden"}}>
                        <Link href="https://vitejs.dev" target="_blank" rel="noreferrer">
                            <Image objectFit={"cover"} src={viteLogo} className="logo vite animate-float" alt="Vite logo"/>
                        </Link>
                        <Spacer x={5}></Spacer>
                        <Link href="https://react.dev" target="_blank" rel="noreferrer">
                            <Image objectFit={"cover"} src={reactLogo} className="logo react animate-spin" alt="React logo"/>
                        </Link>
                    </Row>
                </Card.Body>
                <Card.Image src={bgProps.src} alt={bgProps.alt} objectFit={bgProps.objectFit} width={bgProps.width}></Card.Image>
            </Card>
            <Spacer y={2}></Spacer>
        </Container>
    );
}

export default WipBanner;