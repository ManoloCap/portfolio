import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
  folderName: string;
  assets: Array<{ type: 'image' | 'video'; src: string }>;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Driven Fitness Experience",
    category: "Samsung Electronics",
    description: "An AI-driven fitness experience that uses computer vision (TensorFlow and MediaPipe) to track barbell movements and squats, translating physical kinetics into a spaceship game interface. Designed for live promotional events with real-time performance tracking.",
    tags: ["Python", "TensorFlow", "MediaPipe", "Computer Vision", "Real-Time Systems"],
    link: "#",
    github: "#",
    image: "/impactful_projects/AI-Driven-Fitnes-Experience/IMG_6519.jpg",
    folderName: "AI-Driven-Fitnes-Experience",
    assets: [
      { type: 'image', src: '/impactful_projects/AI-Driven-Fitnes-Experience/IMG_6519.jpg' },
      { type: 'image', src: '/impactful_projects/AI-Driven-Fitnes-Experience/stickman.jpg' },
      { type: 'video', src: '/impactful_projects/AI-Driven-Fitnes-Experience/1.mov' },
      { type: 'video', src: '/impactful_projects/AI-Driven-Fitnes-Experience/2.mov' },
      { type: 'video', src: '/impactful_projects/AI-Driven-Fitnes-Experience/3.mp4' }
    ]
  },
  {
    id: 2,
    title: "Websocket Remote control Shake Game",
    category: "Samsung Electronics",
    description: "Architecture of a WebSocket-based remote control framework that allows event attendees to use their own mobile phone sensors (e.g., shake detection) to manipulate on-screen game elements during live events. Ensures stable real-time synchronization for large audience groups.",
    tags: ["WebSockets", "Node.js", "Real-Time", "Mobile Sensors", "Interactive Systems"],
    link: "#",
    github: "#",
    image: "/websocket-remote-control-shake-game/video1.mp4",
    folderName: "websocket-remote-control-shake-game",
    assets: [
      { type: 'video', src: '/websocket-remote-control-shake-game/video1.mp4' }
    ]
  },
  {
    id: 3,
    title: "Interactive Roulette System",
    category: "Samsung Electronics",
    description: "A fully interactive Roulette system tailored specifically for live engagement during high-visibility promotional events. Features real-time game logic and backend synchronization to maintain stability for large audience groups.",
    tags: ["Python", "WebSockets", "Real-Time", "Game Logic", "Interactive Systems"],
    link: "#",
    github: "#",
    image: "/impactful_projects/Interactive-roulette-system/image.jpg",
    folderName: "Interactive-roulette-system",
    assets: [
      { type: 'image', src: '/impactful_projects/Interactive-roulette-system/image.jpg' }
    ]
  },
  {
    id: 4,
    title: "Themed Slot Machine Games",
    category: "Samsung Electronics",
    description: "A series of themed Slot Machine games designed and deployed for Samsung's promotional events. Custom software solutions with backend logic and real-time synchronization for stable live experiences.",
    tags: ["Python", "Real-Time", "Game Development", "WebSockets"],
    link: "#",
    github: "#",
    image: "/impactful_projects/Themed-slot-machine-games/1.jpg",
    folderName: "Themed-slot-machine-games",
    assets: [
      { type: 'image', src: '/impactful_projects/Themed-slot-machine-games/1.jpg' },
      { type: 'image', src: '/impactful_projects/Themed-slot-machine-games/2.jpg' },
      { type: 'image', src: '/impactful_projects/Themed-slot-machine-games/3.jpg' },
      { type: 'image', src: '/impactful_projects/Themed-slot-machine-games/4.jpg' }
    ]
  },
  {
    id: 5,
    title: "Real Estate Analytics Platform",
    category: "URBOP",
    description: "A specialized real estate analytics platform that leveraged geospatial data to provide market insights. Utilized Django and PostgreSQL with PostGIS to implement complex geospatial filtering and process large datasets related to urban development. Built interactive, map-centric interfaces using Vue.js and the Google Maps API.",
    tags: ["Django", "PostgreSQL", "PostGIS", "Vue.js", "Google Maps API", "GCP"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    folderName: "",
    assets: []
  },
  {
    id: 6,
    title: "Big Data Platform for Hospitality",
    category: "Amadeus (GAP) — Agency360",
    description: "Production-grade Big Data platform for the hospitality industry. Designed and implemented analytics middlewares using Apache Druid, Airflow and Pandas, which processed vast amounts of hotel reservation data to power real-time dashboards. Maintained Flask-based REST APIs and optimized data transformation pipelines.",
    tags: ["Apache Druid", "Apache Airflow", "Pandas", "Flask", "Big Data", "REST APIs"],
    link: "#",
    github: "#",
    image: "/impactful_projects/big-data-platform-for-hospitality/druid.jpg",
    folderName: "big-data-platform-for-hospitality",
    assets: [
      { type: 'image', src: '/impactful_projects/big-data-platform-for-hospitality/druid.jpg' }
    ]
  }
];

// Carousel Component
interface CarouselProps {
  assets: Array<{ type: 'image' | 'video'; src: string }>;
  fallbackImage: string;
}

const Carousel: React.FC<CarouselProps> = ({ assets, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // If no assets, show fallback
  if (assets.length === 0) {
    return (
      <div className="carousel-container">
        <img src={fallbackImage} alt="Project" className="carousel-media" />
      </div>
    );
  }

  // If only one asset, don't animate - just show it
  if (assets.length === 1) {
    const singleAsset = assets[0];
    return (
      <div className="carousel-container">
        {singleAsset.type === 'image' ? (
          <img src={singleAsset.src} alt="Project" className="carousel-media" />
        ) : (
          <video
            src={singleAsset.src}
            className="carousel-media"
            muted
            playsInline
            loop
            autoPlay
          />
        )}
      </div>
    );
  }

  const currentAsset = assets[currentIndex];
  
  const goToNext = () => {
    // Only advance if visible and has multiple assets
    if (isVisible && assets.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % assets.length);
    }
  };

  // Intersection Observer to pause carousel when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Don't run carousel if not visible or only one asset
    if (!isVisible || assets.length <= 1) {
      if (imageTimeoutRef.current) {
        clearTimeout(imageTimeoutRef.current);
      }
      return;
    }
    // Clear any existing timeout
    if (imageTimeoutRef.current) {
      clearTimeout(imageTimeoutRef.current);
    }

    setIsLoading(true);

    if (currentAsset.type === 'image') {
      // Images stay for 4 seconds
      const img = new Image();
      img.src = currentAsset.src;
      img.onload = () => {
        setIsLoading(false);
        imageTimeoutRef.current = setTimeout(() => {
          goToNext();
        }, 4000);
      };
      img.onerror = () => {
        setIsLoading(false);
        // If image fails, move to next after a short delay
        imageTimeoutRef.current = setTimeout(() => {
          goToNext();
        }, 1000);
      };
    } else if (currentAsset.type === 'video') {
      // Videos play until they finish
      const video = videoRef.current;
      if (video) {
        const handleCanPlay = () => {
          setIsLoading(false);
          video.play().catch(() => {
            // If autoplay fails, move to next after a delay
            setTimeout(() => {
              goToNext();
            }, 1000);
          });
        };

        const handleEnded = () => {
          goToNext();
        };

        const handleError = () => {
          setIsLoading(false);
          // If video fails, move to next
          setTimeout(() => {
            goToNext();
          }, 1000);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);
        
        // Reset and load video
        video.currentTime = 0;
        video.load();

        return () => {
          video.removeEventListener('canplay', handleCanPlay);
          video.removeEventListener('ended', handleEnded);
          video.removeEventListener('error', handleError);
        };
      }
    }

    return () => {
      if (imageTimeoutRef.current) {
        clearTimeout(imageTimeoutRef.current);
      }
    };
  }, [currentIndex, currentAsset, assets.length, isVisible]);

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-wrapper">
        {assets.map((asset, index) => {
          const isActive = index === currentIndex;
          const slideOffset = index - currentIndex;
          
          // Calculate position based on direction (reel effect: new from right, old exits left)
          let translateX = 0;
          if (slideOffset === 0) {
            translateX = 0; // Active slide
          } else if (slideOffset === 1 || (slideOffset === -(assets.length - 1))) {
            translateX = 100; // Next slide (to the right, coming in)
          } else if (slideOffset === -1 || (slideOffset === assets.length - 1)) {
            translateX = -100; // Previous slide (to the left, exiting)
          } else {
            // Hide slides that are far away
            translateX = slideOffset > 0 ? 100 : -100;
          }
          
          // Only show active and adjacent slides during transition
          const isVisible = Math.abs(slideOffset) <= 1;
          
          return (
            <div 
              key={`${asset.src}-${index}`} 
              className={`carousel-slide ${isActive ? 'active' : ''}`}
              style={{
                transform: `translateX(${translateX}%) translateZ(0)`,
                opacity: isVisible ? 1 : 0,
                zIndex: isActive ? 3 : (isVisible ? 2 : 1),
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              {asset.type === 'image' ? (
                <img 
                  src={asset.src} 
                  alt="Project" 
                  className="carousel-media"
                  onError={(e) => {
                    // Fallback to default image if asset fails to load
                    (e.target as HTMLImageElement).src = fallbackImage;
                    setIsLoading(false);
                  }}
                />
              ) : (
                <video
                  ref={isActive ? videoRef : null}
                  src={asset.src}
                  className="carousel-media"
                  muted
                  playsInline
                  loop={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="section-title">Impactful <span className="text-secondary">Projects</span></h2>
          <p className="section-subtitle">Highlighting work across interactive systems, big data, and mechatronics.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card glass"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="project-image-container">
                <Carousel assets={project.assets} fallbackImage={project.image} />
                <div className="category-badge">{project.category}</div>
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-pill">
                       {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          padding: 8rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
          margin-top: 1rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }

        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
          position: relative;
          transform: translateZ(0);
        }
        
        .project-card:hover {
          will-change: transform;
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
          will-change: opacity;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          box-shadow: 
            inset 0 0 60px rgba(139, 92, 246, 0.15),
            0 20px 60px rgba(139, 92, 246, 0.2),
            0 0 0 1px rgba(139, 92, 246, 0.1);
          transform: translateY(-4px) translateZ(0);
        }

        .project-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .carousel-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .carousel-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        .carousel-slide.active {
          will-change: transform;
        }

        .carousel-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .project-card:hover .carousel-media {
          transform: scale(1.05) translateZ(0);
        }
        
        .project-card:hover .carousel-slide.active {
          will-change: transform;
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.4rem 1rem;
          background: var(--primary);
          color: white;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 10;
          pointer-events: none;
        }

        .project-info {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .project-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .project-info p {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .project-tags {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-pill {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.3rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 0.5rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};
