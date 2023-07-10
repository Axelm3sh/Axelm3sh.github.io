// Header.jsx
import React from 'react';
import './CopyrightBadge.jsx'
import './Header.css';
import CopyrightBadge from "./CopyrightBadge.jsx";
import githubMark from '../../assets/images/GitHub-Mark-Light-64px.png'

function Header() {
    return (
        <header>
            {/* All code related to the nav bar */}
            <nav>
                <h1 className="font-staatl">Daniel Phan</h1>
                <h3>Information Systems Major</h3>
                <h4 className="border-bottom font-weight-light pl-3"><i>Computer Science Minor</i></h4>

                <div className="border-bottom">
                    <strong>
                        <a className="nav-link" href="#sectIntro">Intro</a>
                    </strong>
                </div>
                {/*
                    <div class="border-bottom">
                        <strong><a class="nav-link" href="#sectOne">Skills</a>
                        </strong>
                    </div>
                */}
                <div className="border-bottom">
                    <strong><a className="nav-link" href="#sectWork">Work Experience</a>
                    </strong>
                </div>
                <div className="border-bottom">
                    <strong><a className="nav-link" href="#sectProjects">Projects</a>
                    </strong>
                </div>

                <div><a className="nav-link" href="https://github.com/Axelm3sh">
                    <strong>Github Link </strong>
                    <img className="cardlink" src={githubMark} alt="github mark"/>
                </a>
                </div>
            </nav>
            <CopyrightBadge></CopyrightBadge>
        </header>
    );
}

export default Header;