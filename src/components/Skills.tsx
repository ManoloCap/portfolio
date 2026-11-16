import React from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, Cpu, Terminal, Workflow, Award, ExternalLink } from 'lucide-react';

interface SkillCategory {
  title: string;
  detail: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    detail: "Expert-level proficiency",
    icon: <Terminal size={24} />,
    skills: ["Python (Expert)", "JavaScript/TypeScript", "SQL", "Java", "C++", "Go"]
  },
  {
    title: "AI & Agents",
    detail: "Production LLM systems",
    icon: <Cpu size={24} />,
    skills: ["AI Agents", "LLM Orchestration", "LangGraph", "Claude Agent SDK", "MCP", "RAG Pipelines", "Computer Vision", "TensorFlow", "MediaPipe"]
  },
  {
    title: "Data Engineering",
    detail: "Robust ETL pipelines",
    icon: <Workflow size={24} />,
    skills: ["Apache Airflow", "BigQuery", "Apache Druid", "PostGIS", "Pandas"]
  },
  {
    title: "Backend",
    detail: "High-performance APIs",
    icon: <Database size={24} />,
    skills: ["FastAPI", "Django", "Flask", "Node.js", "WebSockets", "RESTful Microservices"]
  },
  {
    title: "Cloud & DevOps",
    detail: "Infrastructure as code",
    icon: <Globe size={24} />,
    skills: ["Terraform", "Docker", "Kubernetes", "GCP", "AWS", "Linux", "Jenkins", "GitHub Actions", "CI/CD"]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="section-title">Software <span className="text-secondary">Arsenal</span></h2>
          <p className="section-subtitle">Deep expertise in AI platform engineering, backend systems, and the infrastructure that runs them.</p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <motion.div 
              key={cat.title}
              className="skill-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="skill-card-header">
                <div className="skill-icon-box">{cat.icon}</div>
                <div>
                  <h3>{cat.title}</h3>
                  <span className="skill-detail">{cat.detail}</span>
                </div>
              </div>
              <div className="skill-tags">
                {cat.skills.map(skill => (
                  <motion.span 
                    key={skill} 
                    className="skill-tag"
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: '#fff' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div 
          className="mechatronics-box glass"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px", amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="mecha-header">
             <Cpu size={28} className="text-secondary" />
             <h3>Education</h3>
          </div>
          <p><strong>Universidad del Valle de Guatemala</strong> (2014 – 2018)<br />
          Bachelor of Science in Mechatronics Engineering<br />
          Relevant Coursework: Robotics, Control Systems, Digital Signal Processing, and Embedded Software Design.</p>
          <div className="mecha-skills">
            <span>Robotics</span>
            <span>Control Systems</span>
            <span>Digital Signal Processing</span>
            <span>Embedded Software Design</span>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div 
          className="certifications-box glass"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px", amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="mecha-header">
             <Award size={28} className="text-secondary" />
             <h3>Professional Certifications</h3>
          </div>
          <a 
            href="https://www.linkedin.com/learning/certificates/45db10404d77ec2906f327518305f8d52a4b415070b95fddd5dfb81898b602eb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="certification-item certification-link"
          >
            <div className="cert-header">
              <h4>Google Cloud Platform Associate Cloud Engineer Cert Prep: Setting Up a Cloud Solutions Environment</h4>
              <ExternalLink size={18} className="cert-link-icon" />
            </div>
            <p className="cert-year">2023</p>
            <p className="cert-description">Course of preparation for deploying applications, monitoring operations, and managing enterprise-grade solutions on GCP.</p>
          </a>
          <a 
            href="https://www.coursera.org/account/accomplishments/specialization/certificate/2RJZHXVX6HVH" 
            target="_blank" 
            rel="noopener noreferrer"
            className="certification-item certification-link"
          >
            <div className="cert-header">
              <h4>DeepLearning.AI: TensorFlow Developer Specialization</h4>
              <ExternalLink size={18} className="cert-link-icon" />
            </div>
            <p className="cert-year">2020</p>
            <p className="cert-description">Coursera / DeepLearning.AI — Advanced training in building and training neural networks using TensorFlow, including Computer Vision, Natural Language Processing, and Sequence Modeling.</p>
          </a>
        </motion.div>
      </div>

      <style>{`
        .skills-section {
          padding: 8rem 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .skill-card {
          padding: 2rem;
          transition: var(--transition-smooth);
        }

        .skill-card:hover {
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
        }

        .skill-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .skill-icon-box {
          color: var(--primary);
          background: rgba(139, 92, 246, 0.1);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .skill-card-header h3 {
          font-size: 1.15rem;
          font-family: var(--font-heading);
          margin: 0;
        }

        .skill-detail {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.2s ease;
        }

        .mechatronics-box {
          margin-top: 4rem;
          padding: 3rem;
          border-left: 4px solid var(--primary);
        }

        .mecha-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .mecha-header h3 {
          font-size: 1.5rem;
          margin: 0;
        }

        .mechatronics-box p {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 900px;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .mecha-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          font-weight: 700;
          color: var(--text-color);
          opacity: 0.6;
        }

        .certifications-box {
          margin-top: 4rem;
          padding: 3rem;
          border-left: 4px solid var(--primary);
        }

        .certification-item {
          margin-bottom: 2.5rem;
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .certification-item:last-child {
          margin-bottom: 0;
        }

        .certification-link {
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .certification-link:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: var(--primary);
          transform: translateX(4px);
        }

        .cert-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .certification-item h4 {
          font-size: 1.2rem;
          margin: 0;
          color: var(--text-color);
          flex: 1;
          transition: color 0.3s ease;
        }

        .certification-link:hover h4 {
          color: var(--primary);
        }

        .cert-link-icon {
          color: var(--primary);
          opacity: 0.6;
          flex-shrink: 0;
          margin-top: 0.2rem;
          transition: all 0.3s ease;
        }

        .certification-link:hover .cert-link-icon {
          opacity: 1;
          transform: translate(2px, -2px);
        }

        .cert-year {
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .cert-description {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
