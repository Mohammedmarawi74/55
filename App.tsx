
import React, { useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { CanvasArea } from './components/CanvasArea';
import { Expert, Theme } from './types';
import { INITIAL_EXPERTS, THEMES, AVAILABLE_LOGOS } from './constants';
import { Download, Share2, Eye, Layout, Type, Palette, Code } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import './styles.css';

const App: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>(INITIAL_EXPERTS);
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [customCss, setCustomCss] = useState<string>('');
  const [selectedLogoId, setSelectedLogoId] = useState<string | null>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [mainTitle, setMainTitle] = useState<string>('الركائز الاستراتيجية للتحول الرقمي');
  const [subTitle, setSubTitle] = useState<string>('تحليل البيانات والنمو الاقتصادي');
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'css'>('content');
  const [isExporting, setIsExporting] = useState(false);
  const [centerIndex, setCenterIndex] = useState(1);

  const canvasRef = useRef<HTMLDivElement>(null);

  const getLogoUrl = () => {
    if (customLogo) return customLogo;
    if (selectedLogoId) {
      const logo = AVAILABLE_LOGOS.find(l => l.id === selectedLogoId);
      return logo ? logo.path : null;
    }
    return null;
  };

  const handleRemoveLogo = () => {
    setSelectedLogoId(null);
    setCustomLogo(null);
  };

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: 3, // High-definition export
        skipFonts: false,
        fontEmbedCSS: true,
      });
      const link = document.createElement('a');
      link.download = `radar-carousel-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('حدث خطأ أثناء تصدير الصورة، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  };

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % experts.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + experts.length) % experts.length);
  };

  return (
    <div className="app-container" dir="rtl">
      <style dangerouslySetInnerHTML={{ __html: customCss }} />

      {/* Sidebar Controls */}
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Layout className="sidebar-logo-icon" />
          </div>
          <h1 className="sidebar-title">رادار المستثمر</h1>
        </div>

        <div className="sidebar-tabs">
          <button
            onClick={() => setActiveTab('content')}
            className={`sidebar-tab ${activeTab === 'content' ? 'sidebar-tab-active' : 'sidebar-tab-inactive'}`}
          >
            <Type size={18} />
            المحتوى
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`sidebar-tab ${activeTab === 'theme' ? 'sidebar-tab-active' : 'sidebar-tab-inactive'}`}
          >
            <Palette size={18} />
            المظهر
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`sidebar-tab ${activeTab === 'css' ? 'sidebar-tab-active' : 'sidebar-tab-inactive'}`}
          >
            <Code size={18} />
            CSS مخصص
          </button>
        </div>

        <div className="sidebar-content custom-scrollbar">
          <Sidebar
            activeTab={activeTab}
            experts={experts}
            setExperts={setExperts}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
            customCss={customCss}
            setCustomCss={setCustomCss}
            selectedLogoId={selectedLogoId}
            setSelectedLogoId={setSelectedLogoId}
            customLogo={customLogo}
            setCustomLogo={setCustomLogo}
            onRemoveLogo={handleRemoveLogo}
            mainTitle={mainTitle}
            setMainTitle={setMainTitle}
            subTitle={subTitle}
            setSubTitle={setSubTitle}
          />
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="flex items-center gap-4">
            <div className="preview-badge">
              <Eye size={14} />
              معاينة التصميم
            </div>
            <div className="vision-badge">
              <span className="vision-dot"></span>
              رؤية ٢٠٣٠
            </div>
          </div>

          <div className="action-buttons">
            <button className="icon-button">
              <Share2 size={20} />
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="export-button"
            >
              <Download size={20} />
              {isExporting ? 'جاري التصدير...' : 'تصدير الصورة'}
            </button>
          </div>
        </div>

        <div className="workspace">
          <div className="canvas-wrapper group">
            <CanvasArea
              canvasRef={canvasRef}
              experts={experts}
              theme={activeTheme}
              logo={getLogoUrl()}
              mainTitle={mainTitle}
              subTitle={subTitle}
              centerIndex={centerIndex}
              onNext={nextSlide}
              onPrev={prevSlide}
            />

            {/* Design Controls outside Canvas for workspace interaction */}
            <div className="nav-arrow nav-arrow-left">
                <button onClick={prevSlide} className="nav-arrow-icon nav-arrow-icon-left">➜</button>
            </div>
            <div className="nav-arrow nav-arrow-right">
                <button onClick={nextSlide} className="nav-arrow-icon">➜</button>
            </div>
          </div>
        </div>

        <div className="slide-indicators">
          {experts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCenterIndex(idx)}
              className={`slide-indicator ${centerIndex === idx ? 'slide-indicator-active' : ''}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
