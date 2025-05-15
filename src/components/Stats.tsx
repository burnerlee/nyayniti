import React, { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const StatItem: React.FC<StatItemProps> = ({ end, suffix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.5, // Trigger when at least 50% of the element is visible
        rootMargin: "-10% 0px" // Slightly offset to better center in viewport
      }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Use easeOutQuad for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(easedProgress * end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, end, duration]);
  
  return (
    <div className="py-10 px-6 text-center" ref={countRef}>
      <h3 className="text-4xl font-bold mb-2">
        {count}{suffix}
      </h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          // Once we've seen it, we can disconnect the observer
          observer.disconnect();
        }
      },
      { 
        threshold: 0.6, // Trigger when section is mostly in view
        rootMargin: "-20% 0px" // Adjust to trigger closer to center of viewport
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="bg-transparent py-8 relative z-20" 
      style={{ marginTop: '-100px' }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {hasBeenVisible ? (
              <>
                <StatItem end={99} suffix="%" label="Customer satisfaction" />
                <StatItem end={500} suffix="+" label="Clients Served" />
                <StatItem end={10} suffix="+" label="Years of Experience" />
                <StatItem end={15} suffix="+" label="Practice areas" />
              </>
            ) : (
              <>
                <div className="py-10 px-6 text-center">
                  <h3 className="text-4xl font-bold mb-2">0%</h3>
                  <p className="text-gray-600">Customer satisfaction</p>
                </div>
                <div className="py-10 px-6 text-center">
                  <h3 className="text-4xl font-bold mb-2">0+</h3>
                  <p className="text-gray-600">Clients Served</p>
                </div>
                <div className="py-10 px-6 text-center">
                  <h3 className="text-4xl font-bold mb-2">0+</h3>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
                <div className="py-10 px-6 text-center">
                  <h3 className="text-4xl font-bold mb-2">0+</h3>
                  <p className="text-gray-600">Practice areas</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
