import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

interface Job {
  id: string | number;
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Interactive Systems Engineer — Full Stack Developer (Freelance)",
    company: "Samsung Electronics",
    period: "Jan 2025 – Present",
    description: "I provide freelance engineering services for Samsung's high-visibility promotional events, focusing on the end-to-end development of interactive game systems. My role is to deliver the backend logic and real-time synchronization required to keep live experiences stable for large audience groups. As part of these services, I have designed and deployed several custom software solutions, including a series of themed Slot Machine games and a fully interactive Roulette system tailored specifically for live engagement. A key deliverable was the architecture of a WebSocket-based remote control framework, which allows event attendees to use their own mobile phone sensors (e.g., shake detection) to manipulate on-screen game elements. Additionally, I developed an AI-driven fitness experience that uses computer vision (TensorFlow and MediaPipe) to track barbell movements and squats, translating physical kinetics into a spaceship game interface.",
    tech: ["Python", "WebSockets", "TensorFlow", "MediaPipe", "Computer Vision", "Real-Time Systems", "Node.js"]
  },
  {
    id: 2,
    title: "Founder — AI Consultant & Engineer",
    company: "Agente.tech",
    period: "Nov 2024 – Present",
    description: "On Agente.tech, I design and deploy custom AI agents tailored to specific business objectives. My work focuses on the orchestration of LLM workflows, building RAG (Retrieval-Augmented Generation) pipelines, and automating data-driven decision-making processes. I am responsible for the entire lifecycle of these solutions—from designing data ingestion pipelines that transform raw client data into actionable insights to building the backend APIs that serve these AI models. This role bridges the gap between cutting-edge AI research and practical business automation, providing continuous optimization and integration support for diverse client systems. Also I deliver day to day Web Solutions as applications with requirements on demand.",
    tech: ["AI Agents", "RAG Pipelines", "LLM Orchestration", "FastAPI", "Python", "Data Engineering"]
  },
  {
    id: 3,
    title: "Software Engineer — Data Engineering Focus",
    company: "High5Games (High5Casino)",
    period: "May 2023 – Apr 2025",
    description: "In this role, I focused on the optimization and maintenance of a large-scale data warehouse infrastructure on Google Cloud Platform. I was responsible for managing complex ETL pipelines using Apache Airflow, ensuring the integrity and availability of data for critical business analytics. Beyond data engineering, I developed internal tools and backend services using Python and FastAPI to streamline marketing operations. A significant portion of my work involved modernizing legacy systems and supporting CI/CD pipelines to improve deployment reliability. My efforts directly contributed to more efficient data processing and time reduction on various workflows in the company.",
    tech: ["Apache Airflow", "BigQuery", "GCP", "Python", "FastAPI", "ETL Pipelines", "CI/CD"]
  },
  {
    id: 4,
    title: "Advanced Software Engineer",
    company: "Amadeus (GAP) — Agency360",
    period: "Apr 2022 – Apr 2023",
    description: "Collaborated within a high-performance cross-functional Scrum team to build and maintain a production-grade Big Data platform for the hospitality industry. I designed and implemented analytics middlewares using Apache Druid, Airflow and Pandas, which processed vast amounts of hotel reservation data to power real-time dashboards. I was also responsible for maintaining Flask-based REST APIs and optimizing data transformation pipelines to ensure high availability and low response times. This role required a deep understanding of CI/CD workflows and the ability to deliver stable software in a fast-paced, enterprise-level environment.",
    tech: ["Apache Druid", "Apache Airflow", "Pandas", "Flask", "Python", "Big Data", "REST APIs", "CI/CD"]
  },
  {
    id: 5,
    title: "Senior Software Developer",
    company: "Cognits / Onramp Invest / Banco Promerica",
    period: "Jun 2020 – Mar 2022",
    description: "Served as a core developer for a digital asset wealth management platform, where I engineered secure backend APIs using FastAPI. My work involved handling sensitive financial portfolio data and ensuring real-time updates for wealth managers and investors. On the frontend, I utilized Vue.js to build intuitive internal dashboards and subscription management platforms. This position demanded high standards of security and reliability, working within an AWS-based infrastructure and utilizing Docker and GitHub Actions to maintain a rigorous deployment schedule within a large-scale Scrum team.",
    tech: ["FastAPI", "Vue.js", "AWS", "Docker", "GitHub Actions", "PostgreSQL", "Fintech"]
  },
  {
    id: 6,
    title: "Software Developer",
    company: "URBOP",
    period: "Feb 2019 – Apr 2020",
    description: "Developed a specialized real estate analytics platform that leveraged geospatial data to provide market insights. I utilized Django and PostgreSQL with PostGIS to implement complex geospatial filtering and process large datasets related to urban development. To visualize this data, I built interactive, map-centric interfaces using Vue.js and the Google Maps API. I was also responsible for the deployment and maintenance of these services on Google Cloud, utilizing Nginx to ensure high performance and stability for the platform's user base.",
    tech: ["Django", "PostgreSQL", "PostGIS", "Vue.js", "Google Maps API", "GCP", "Nginx"]
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company: "Monad S.A",
    period: "2017 – 2018",
    description: "Developed scalable backend services using Python and Django, while building responsive frontend components with Angular. Successfully integrated Firebase services for real-time data synchronization and user authentication.",
    tech: ["Python", "Django", "Angular", "Firebase"]
  },
  {
    id: 8,
    title: "Technology Consultant",
    company: "ECO LGB",
    period: "2017 – 2018",
    description: "Provided technical consulting and software solutions focused on systems integration. Developed specialized tools using JavaScript and C++ to solve complex hardware-software communication challenges for local clients, with a self developed system for measuring remotely diesel tanks.",
    tech: ["JavaScript", "C++", "Hardware Integration", "Embedded Systems"]
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Professional <span className="text-secondary">Track</span>
        </motion.h2>

        <div className="experience-list">
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id}
              className="experience-item glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="exp-header">
                <div className="exp-icon">
                  <Briefcase size={20} />
                </div>
                <div className="exp-title-group">
                  <h3>{job.title}</h3>
                  <p className="company-info">
                    <span className="company-name">{job.company}</span>
                    <span className="dot">•</span>
                    <span className="period"><Calendar size={14} /> {job.period}</span>
                  </p>
                </div>
              </div>
              
              <p className="exp-description">{job.description}</p>
              
              <div className="exp-tech">
                {job.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-section {
          padding: 8rem 0;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 4rem;
          font-weight: 800;
        }

        .text-secondary {
          color: var(--primary);
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .experience-item {
          padding: 2.5rem;
          transition: var(--transition-smooth);
        }

        .experience-item:hover {
          transform: translateX(10px);
          border-color: var(--primary);
        }

        .exp-header {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .exp-icon {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          padding: 0.75rem;
          border-radius: 0.75rem;
          color: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .exp-title-group h3 {
          font-size: 1.35rem;
          margin-bottom: 0.25rem;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .company-name {
          font-weight: 600;
          color: var(--text-color);
        }

        .period {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .exp-description {
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          max-width: 800px;
          line-height: 1.6;
        }

        .exp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tech-tag {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          background: var(--selection-bg);
          border-radius: 2rem;
          color: var(--primary);
          border: 1px solid transparent;
          transition: var(--transition-smooth);
        }

        .tech-tag:hover {
          background: var(--primary);
          color: white;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
