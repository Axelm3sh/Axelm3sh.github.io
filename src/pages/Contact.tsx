import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import WindowChrome from '../components/WindowChrome'
import GlassPanel from '../components/GlassPanel'
import Divider from '../components/Divider'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="contact-header"
      >
        <h1>Contact</h1>
        <Divider />
        <p className="contact-intro">
          Feel free to reach out to me through any of the channels below.
        </p>
      </motion.div>

      <div className="contact-content">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <WindowChrome title="send_message.exe">
            <h2 className="contact-section-heading">Send a Message</h2>
            <Divider width="70%" />
            <GlassPanel className="message-disabled">
              <p>The message functionality is currently disabled.</p>
              <p>Please use the provided contact information to get in touch.</p>
            </GlassPanel>
          </WindowChrome>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <WindowChrome title="contact_info.md">
            <h2 className="contact-section-heading">Contact Information</h2>
            <Divider width="70%" />

            <div className="info-item">
              <h3>Email</h3>
              <p><Link to="/not-found" className="email-link">example@example.com</Link></p>
            </div>

            <div className="info-item">
              <h3>Social Media</h3>
              <div className="social-links">
                <a href="https://github.com/Axelm3sh" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <span className="social-link disabled" title="LinkedIn profile coming soon">LinkedIn</span>
                <span className="social-link disabled" title="Twitter profile coming soon">X (Twitter)</span>
              </div>
            </div>

            <div className="info-item">
              <h3>Location</h3>
              <p>California, USA</p>
            </div>
          </WindowChrome>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
