import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const roles = ["Senior Software Engineer.", "AI Systems Architect.", "Data Engineer."];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Lenis smooth scroll with optimized performance
    const lenis = new Lenis({ 
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false
    });
    
    let rafId: number;
    let lastTime = 0;
    function raf(time: number) {
      lenis.raf(time);
      // Throttle to ~60fps
      if (time - lastTime >= 16) {
        rafId = requestAnimationFrame(raf);
        lastTime = time;
      } else {
        rafId = requestAnimationFrame(raf);
      }
    }
    rafId = requestAnimationFrame(raf);

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Simple typing effect for Hero
    let currentRole = roles[roleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const type = () => {
      currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1800; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setRoleIndex((prev) => (prev + 1) % roles.length);
        typeSpeed = 400; // Pause before next role
      }

      timer = setTimeout(type, typeSpeed);
    };

    type();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [roleIndex]);

  return (
    <div className="app">
      <nav className={`navigation ${scrolled ? 'glass active' : ''}`}>
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-text">Manolocap<span className="logo-dot">.</span>dev</span>
          </div>
          
          <div className="nav-links-desktop">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mobile-nav-links">
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a>
              <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="hero" className="hero-section">
          <div className="container hero-content">
            <motion.div
              className="hero-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="hero-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img src="/profile.JPG" alt="Manolo Capilla" className="hero-profile-image" />
              </motion.div>
              <div className="hero-text-content">
                <span className="hero-intro">Hello, I am</span>
                <h1 className="hero-name">Manolo Capilla</h1>
                <div className="typing-container">
                  <span className="typed-text">{typedText}</span>
                  <span className="cursor">|</span>
                </div>
                <p className="hero-description">
                  Senior Software Engineer with over 8 years of experience specializing in the intersection of High-Performance Backend Systems, Data Engineering, and Artificial Intelligence. Proven track record in architecting scalable APIs, real-time interactive experiences, and robust ETL pipelines for global brands and fintech institutions. Founder of Agente.tech, dedicated to orchestrating autonomous AI agents and computer vision solutions.
                </p>
                <div className="hero-btns">
                  <a href="#projects" className="btn btn-primary">Featured Work</a>
                  <a href="#contact" className="btn btn-outline">Let's Talk</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Projects />
        <Experience />
        <Skills />

        <section id="contact" className="contact-section">
          <div className="container">
            <div className="glass contact-card">
              <h2 className="section-title">Get in <span className="text-secondary">Touch</span></h2>
              <p>Looking for a Senior Software Engineer & AI Systems Architect? Let's build something extraordinary.</p>
              <div className="contact-links">
                <a href="mailto:me@manolocap.dev" className="contact-item">
                   <Mail className="contact-icon" />
                   <span>me@manolocap.dev</span>
                </a>
              </div>
              <div className="secondary-links">
                <a href="https://linkedin.com/in/Manolocap" target="_blank" className="sec-link">LinkedIn</a>
                <span className="dot">•</span>
                <a href="https://github.com/Manolocap" target="_blank" className="sec-link">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <span className="logo-text">Manolocap<span className="logo-dot">.</span>dev</span>
            <p>Guatemala (Remote)</p>
          </div>
          <div className="footer-links">
             <a href="https://github.com/Manolocap" target="_blank" className="social-icon"><Github size={24} /></a>
             <a href="https://linkedin.com/in/Manolocap" target="_blank" className="social-icon"><Linkedin size={24} /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Manolocap.dev. Built with precision.</p>
        </div>
      </footer>

      <style>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition-smooth);
        }

        .navigation.active {
          padding: 1rem 0;
          background: rgba(2, 6, 23, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--glass-border);
          transform: translateZ(0);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
        }

        .logo-dot {
          color: var(--primary);
        }

        .nav-links-desktop {
          display: none;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex;
          }
        }

        .nav-link {
          font-weight: 500;
          opacity: 0.7;
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          opacity: 1;
          color: var(--primary);
        }

        .mobile-toggle {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .mobile-toggle {
            display: none;
          }
        }

        .mobile-menu {
          position: fixed;
          top: 5rem;
          right: 1.5rem;
          width: calc(100% - 3rem);
          max-width: 300px;
          z-index: 999;
          padding: 2rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          background: 
            radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%);
        }

        .hero-content {
          width: 100%;
        }

        .hero-layout {
          display: flex;
          align-items: center;
          gap: 4rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-layout {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
        }

        .hero-image-container {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-profile-image {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--primary);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
          transition: transform 0.3s ease;
        }

        .hero-profile-image:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-profile-image {
            width: 200px;
            height: 200px;
          }
        }

        .hero-text-content {
          flex: 1;
          min-width: 300px;
        }

        .hero-intro {
          color: var(--primary);
          font-weight: 700;
          letter-spacing: 0.2rem;
          text-transform: uppercase;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 1rem;
        }

        .hero-name {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .typing-container {
          min-height: 4rem;
          margin-bottom: 1.5rem;
        }

        .typed-text {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 600;
          color: var(--text-muted);
        }

        .cursor {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          color: var(--primary);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .hero-description {
          max-width: 650px;
          font-size: 1.2rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }

        .hero-btns {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.8rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: var(--transition-smooth);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(139, 92, 246, 0.3);
        }

        .btn-outline {
          border: 1px solid var(--glass-border);
          color: white;
        }

        .btn-outline:hover {
          background: var(--glass-bg);
          transform: translateY(-3px);
        }

        .contact-section {
          padding: 8rem 0;
        }

        .contact-card {
          padding: 4rem;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-card p {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .secondary-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }

        .sec-link:hover {
          color: var(--primary);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: clamp(1rem, 4vw, 1.5rem);
          font-weight: 700;
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          transition: var(--transition-smooth);
        }

        .contact-item:hover {
          color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .contact-icon {
          color: var(--primary);
        }

        .footer {
          padding: 5rem 0 2rem;
          background: #010411;
          border-top: 1px solid var(--card-border);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
        }

        .footer-logo p {
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .social-icon:hover {
          color: var(--primary);
          transform: translateY(-3px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
          color: #475569;
          font-size: 0.9rem;
        }

        .dot {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}

export default App;
