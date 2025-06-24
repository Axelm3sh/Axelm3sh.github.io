import {motion} from 'framer-motion'
import Divider from '../components/Divider'
import './About.css'

const About = () => {
    return (
        <div className="about-container">
            <motion.div
                className="card about-content"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h1>About Me</h1>
                <Divider />
                <p className="about-intro">
                    Hey, welcome to my (relatively) new revamped web page! My name is Daniel Phan, and typically in my
                    spare time I like working on side projects that include web apps, web design, programming, and
                    creating game prototypes with Unreal Engine. I aspire to eventually ship out a game someday.
                </p>

                <div className="about-section">
                    <h2>Skills</h2>
                    <Divider width="30%" />
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Programming Languages</h3>
                            <ul>
                                <li>C++ (started here)</li>
                                <li>C# (became proficient here)</li>
                                <li>SQL</li>
                                <li>JavaScript</li>
                                <li>HTML/CSS</li>
                                <li>Java</li>
                                <li>Python</li>
                            </ul>
                        </div>
                        <div className="skill-category">
                            <h3>Frameworks & Libraries</h3>
                            <ul>
                                <li>.NET Core</li>
                                <li>Vue</li>
                                <li>React</li>
                            </ul>
                        </div>
                        <div className="skill-category">
                            <h3>Tools & Technologies</h3>
                            <ul>
                                <li>Jetbrains Rider</li>
                                <li>Visual Studio</li>
                                <li>Unreal Engine 5</li>
                                <li>Git</li>
                                <li>Docker</li>
                                <li>CI/CD</li>
                                <li>Ollama</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Background</h2>
                    <Divider width="30%" />
                    <p>
                        I have a <strong>Masters in Information Technology</strong>, and completed my undergraduate with
                        a <strong>Major</strong> in <strong>Business - Information Systems</strong> with
                        a <strong>Minor</strong> in <strong>Computer Science</strong>.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Work Experience</h2>
                    <Divider width="30%" />
                    <p><strong>Junior Web Developer (Student Assistant)</strong></p>
                    <p>Maintained the Mihaylo Business College website using Microsoft Visual Studios, C#, JavaScript,
                        HTML and CSS to update back-end database logic and front-end client-side visuals.</p>
                </div>

                <div className="about-section">
                    <h2>Interests</h2>
                    <Divider width="30%" />
                    <p>
                        Coffee and coffee-related activities. I also enjoy playing
                        video games, reading, and
                        learning new things about technology. I'm also passionate about
                        music.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default About
