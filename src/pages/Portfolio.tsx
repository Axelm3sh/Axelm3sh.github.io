import { motion } from 'framer-motion'
import './Portfolio.css'

const Portfolio = () => {
  // Placeholder project data with lorem ipsum
  const projects = [
    {
      id: 1,
      title: 'Lorem Ipsum Project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.',
      tags: ['React', 'TypeScript', 'Node.js'],
      image: 'placeholder',
    },
    {
      id: 2,
      title: 'Dolor Sit Amet',
      description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet.',
      tags: ['Vue', 'JavaScript', 'Express'],
      image: 'placeholder',
    },
    {
      id: 3,
      title: 'Consectetur Adipiscing',
      description: 'Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo.',
      tags: ['React', 'Firebase', 'Tailwind'],
      image: 'placeholder',
    },
    {
      id: 4,
      title: 'Nullam Quis Risus',
      description: 'Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta.',
      tags: ['Python', 'Django', 'PostgreSQL'],
      image: 'placeholder',
    },
    {
      id: 5,
      title: 'Vestibulum Porta',
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
      tags: ['C++', 'OpenGL', 'GLSL'],
      image: 'placeholder',
    },
    {
      id: 6,
      title: 'Commodo Cursus',
      description: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus.',
      tags: ['Unity', 'C#', 'Blender'],
      image: 'placeholder',
    },
  ]

  return (
    <div className="portfolio-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="portfolio-header"
      >
        <h1>Portfolio</h1>
        <p className="portfolio-intro">
          Oh gee, my portfolio <i>placeholder</i> is pretty empty right now. What will I ever do? <i>*gasp*</i> It's all over, I guess.
          No one will look at the surrounding context and think 'oh golly, they made this.' I'm not even sure if I'll ever make a portfolio page.
        </p>
      </motion.div>

      <div className="portfolio-filters">
        <button className="filter-button active">All</button>
        <button className="filter-button">Web Development</button>
        <button className="filter-button">Game Development</button>
        <button className="filter-button">Design</button>
      </div>

      <motion.div 
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="project-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <div className="project-image placeholder"></div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">View Project</a>
                <a href="#" className="project-link">Source Code</a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Portfolio
