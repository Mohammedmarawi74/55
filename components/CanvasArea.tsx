import React from 'react';
import { Expert, Theme } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles.css';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  experts: Expert[];
  theme: Theme;
  logo: string | null;
  mainTitle: string;
  subTitle: string;
  centerIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  experts,
  theme,
  logo,
  mainTitle,
  subTitle,
  centerIndex,
  onNext,
  onPrev
}) => {
  const getDisplayExperts = () => {
    const len = experts.length;
    if (len === 0) return [];

    const leftIdx = (centerIndex - 1 + len) % len;
    const midIdx = centerIndex % len;
    const rightIdx = (centerIndex + 1) % len;

    return [
      { ...experts[leftIdx], position: 'left' },
      { ...experts[midIdx], position: 'center' },
      { ...experts[rightIdx], position: 'right' }
    ];
  };

  const displayExperts = getDisplayExperts();

  return (
    <div
      ref={canvasRef}
      className="radar-canvas"
      style={{ background: theme.bgGradient }}
    >
      {/* Decorative Elements (background layer) */}
      <div className="canvas-glow canvas-glow-left" style={{ background: theme.accentColor }}></div>
      <div className="canvas-glow canvas-glow-right" style={{ background: theme.accentColor }}></div>
      <div className="canvas-pattern"></div>

      {/* Structured Content Layout */}
      <div className="canvas-layout">

        {/* Row 1: Brand Identity */}
        <div className="canvas-brand-row">
          <div className="brand-identity">
            {logo ? (
              <img src={logo} alt="Brand Logo" className="brand-logo" />
            ) : (
              <div className="brand-icon-wrapper">
                <div className="brand-icon"></div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Title Area */}
        <div className="canvas-title-row">
          <h2 className="main-title" style={{ color: theme.textColor }}>
            {mainTitle}
          </h2>
          <div className="title-divider"></div>
          <p className="sub-title" style={{ color: theme.secondaryTextColor }}>
            {subTitle}
          </p>
        </div>

        {/* Row 3: Carousel */}
        <div className="canvas-carousel-row">
          <div className="carousel-container">
            {displayExperts.map((expert, idx) => {
              const isCenter = expert.position === 'center';
              return (
                <div
                  key={`${expert.id}-${idx}`}
                  className={`expert-card ${isCenter ? 'expert-card-center' : 'expert-card-side'}`}
                  style={{
                    backgroundColor: theme.cardBg,
                    border: isCenter ? `2px solid ${theme.accentColor}` : '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isCenter ? `0 20px 40px -8px ${theme.accentColor}44` : 'none',
                  }}
                >
                  <div className="expert-card-image-wrapper">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="expert-card-image"
                    />
                    {isCenter && (
                      <div className="expert-card-image-overlay"></div>
                    )}
                  </div>

                  <div className="expert-card-content">
                    <h4 className="expert-name" style={{ color: theme.textColor }}>{expert.name}</h4>
                    <div className="expert-specialty" style={{ backgroundColor: theme.accentColor, color: '#000' }}>
                      {expert.specialty}
                    </div>
                    <div className="expert-experience" style={{ color: theme.secondaryTextColor }}>
                      <span className="expert-experience-dot"></span>
                      {expert.experience} خبرة متراكمة
                    </div>
                  </div>

                  {isCenter && (
                    <div className="expert-bio-tooltip">
                      <div className="expert-bio-tooltip-title">نبذة عن الخبير</div>
                      {expert.bio.substring(0, 50)}...
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Internal Navigation Buttons */}
          <div className="canvas-nav canvas-nav-left">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="canvas-nav-button"
            >
              <ChevronRight size={28} />
            </button>
          </div>
          <div className="canvas-nav canvas-nav-right">
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="canvas-nav-button"
            >
              <ChevronLeft size={28} />
            </button>
          </div>
        </div>



      </div>

      {/* Modern Professional Footer */}
      <div className="investor-footer" style={{ borderTop: `1px solid ${theme.secondaryTextColor}22` }}>
        <div className="footer-right" style={{ color: theme.textColor }}>
          منصة المستثمر الاقتصادية
        </div>
        <div className="footer-left" style={{ color: theme.textColor }}>
          al-investor.com
        </div>
      </div>
    </div>
  );
};
