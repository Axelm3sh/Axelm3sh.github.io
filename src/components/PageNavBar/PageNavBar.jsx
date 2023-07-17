import React from 'react';
import {Navbar, Button, Link, Text, styled, Image, Spacer} from "@nextui-org/react";
import PropTypes from "prop-types";
import {textTransforms} from "@nextui-org/react";
import githubIcon from "../../assets/images/GitHub-Mark-64px.png";
import githubIconLight from "../../assets/images/GitHub-Mark-Light-64px.png";
import './NavBar.css';

function PageNavBar({ activeIndex, onLinkSelect, navItems }) {
    const handleLinkSelect = (evt, index) => {
        evt.preventDefault();
        if (typeof onLinkSelect === 'function') {
            onLinkSelect(index);
        }
    };
    
    const handleGithubLinkAnim = (element) => {
        console.log("hovered over github button");
        //todo make the github logo animate it's position until mouse leaves button
    };
    
  return (
      
          <Navbar isCompact isBordered variant="sticky">
              <Navbar.Brand>
                  <AcmeLogo />
                  <Text b color="inherit" hideIn="xs" transform={"uppercase"}>
                      My Page
                  </Text>
              </Navbar.Brand>
              <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                  {navItems.map((item, index) => (
                      <Navbar.Link
                          key={index}
                          href="#"
                          onClick={evt => handleLinkSelect(evt, index)}
                          isActive={index === activeIndex}
                      >
                          {item}
                      </Navbar.Link>
                  ))}
              </Navbar.Content>
              <Navbar.Content>
                  {/*<Navbar.Link color="inherit" href="#">*/}
                  {/*    Login*/}
                  {/*</Navbar.Link>*/}
                  <Navbar.Item>
                      <Button auto as={Link} href="#" color={"gradient"} onMouseOver={event => handleGithubLinkAnim(event)}>
                          <Image id={"githubLink"} src={githubIconLight} alt="github logo"/>
                          <Spacer x={1}></Spacer>
                          <Text color={"white"}>My Github</Text>
                      </Button>
                  </Navbar.Item>
              </Navbar.Content>
          </Navbar>
      
  );
}

PageNavBar.propTypes = {
    activeIndex: PropTypes.number,
    onLinkSelect: PropTypes.func,
    navItems: PropTypes.arrayOf(PropTypes.string),
};

PageNavBar.defaultProps = {
    navItems: ['Home', 'About', 'Projects'],
};
export default PageNavBar;

const Box = styled("div", {
    boxSizing: "border-box",
});
const Layout = ({ children }) => (
    <Box
        css={{
            maxW: "100%"
        }}
    >
        {children}
    </Box>
);
const AcmeLogo = () => (
    <svg
        className=""
        fill="none"
        height="36"
        viewBox="0 0 32 32"
        width="36"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

