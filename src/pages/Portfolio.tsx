import { motion } from 'framer-motion'
import './Portfolio.css'
import LoadingTemplate from '../components/LoadingTemplate'

const Portfolio = () => {

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="portfolio-content"
      >
        <LoadingTemplate message="Portfolio projects coming soon..." className="portfolio-loading" />
      </motion.div>
    </div>
  )
}

export default Portfolio
