import React from 'react';
import { Expert, Theme } from '../types';
import { THEMES, AVAILABLE_LOGOS } from '../constants';
import { Plus, Trash2, Upload, Link as LinkIcon, User, Briefcase, Calendar, Image as ImageIcon, X } from 'lucide-react';
import '../styles.css';

interface SidebarProps {
  activeTab: 'content' | 'theme' | 'css';
  experts: Expert[];
  setExperts: React.Dispatch<React.SetStateAction<Expert[]>>;
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
  customCss: string;
  setCustomCss: (css: string) => void;
  selectedLogoId: string | null;
  setSelectedLogoId: (id: string | null) => void;
  customLogo: string | null;
  setCustomLogo: (logo: string | null) => void;
  onRemoveLogo: () => void;
  mainTitle: string;
  setMainTitle: (title: string) => void;
  subTitle: string;
  setSubTitle: (title: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  experts,
  setExperts,
  activeTheme,
  setActiveTheme,
  customCss,
  setCustomCss,
  selectedLogoId,
  setSelectedLogoId,
  customLogo,
  setCustomLogo,
  onRemoveLogo,
  mainTitle,
  setMainTitle,
  subTitle,
  setSubTitle
}) => {
  const handleAddExpert = () => {
    const newExpert: Expert = {
      id: Date.now().toString(),
      name: 'خبير جديد',
      specialty: 'التخصص المالي',
      experience: '٥ سنوات',
      image: `https://picsum.photos/seed/${Date.now()}/400/500`,
      bio: 'وصف مختصر عن خبرة الشخص وإسهاماته.',
      linkedin: '#'
    };
    setExperts([...experts, newExpert]);
  };

  const updateExpert = (id: string, field: keyof Expert, value: string) => {
    setExperts(experts.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExpert = (id: string) => {
    if (experts.length > 1) {
      setExperts(experts.filter(e => e.id !== id));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleExpertImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateExpert(id, 'image', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (activeTab === 'theme') {
    const currentLogo = customLogo || (selectedLogoId ? AVAILABLE_LOGOS.find(l => l.id === selectedLogoId)?.path : null);

    return (
      <div className="space-y-6">
        <section className="form-section">
          <label className="form-label">سمات احترافية</label>
          <div className="theme-grid">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t)}
                className={`theme-card ${activeTheme.id === t.id ? 'theme-card-active' : 'theme-card-inactive'}`}
              >
                <div className="theme-name">{t.name}</div>
                <div className="theme-colors">
                  <div className="theme-color" style={{ background: t.accentColor }}></div>
                  <div className="theme-color" style={{ background: t.bgGradient }}></div>
                  <div className="theme-color" style={{ background: t.cardBg }}></div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <label className="form-label">شعار المنصة</label>
          
          {/* Logo Selection Grid */}
          <div className="logo-selection-grid">
            {AVAILABLE_LOGOS.map(logoOption => (
              <button
                key={logoOption.id}
                onClick={() => {
                  setSelectedLogoId(logoOption.id);
                  setCustomLogo(null);
                }}
                className={`logo-option-card ${selectedLogoId === logoOption.id && !customLogo ? 'logo-option-active' : 'logo-option-inactive'}`}
              >
                <img src={logoOption.path} alt={logoOption.name} className="logo-option-image" />
                <span className="logo-option-name">{logoOption.name}</span>
              </button>
            ))}
          </div>

          <div className="divider-text">أو</div>

          {/* Custom Logo Upload */}
          <div className="logo-upload">
            <input
              type="file"
              className="logo-upload-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCustomLogo(reader.result as string);
                    setSelectedLogoId(null);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              accept="image/*"
            />
            <div className="logo-upload-area">
              <Upload className="logo-placeholder" />
              <span className="logo-text">رفع شعار مخصص</span>
            </div>
          </div>

          {/* Current Logo Preview with Remove Button */}
          {currentLogo && (
            <div className="current-logo-preview">
              <div className="logo-preview-wrapper">
                <img src={currentLogo} alt="Current Logo" className="current-logo-image" />
                <button
                  onClick={onRemoveLogo}
                  className="remove-logo-button"
                  title="إزالة الشعار"
                >
                  <X size={16} />
                </button>
              </div>
              <span className="current-logo-label">الشعار الحالي</span>
            </div>
          )}
        </section>
      </div>
    );
  }

  if (activeTab === 'css') {
    return (
      <div className="css-editor">
        <label className="css-editor-label">محرر CSS مخصص</label>
        <p className="css-editor-hint">يمكنك هنا تغيير أنماط العناصر مباشرة للحصول على تحكم كامل في التصميم.</p>
        <textarea
          dir="ltr"
          value={customCss}
          onChange={(e) => setCustomCss(e.target.value)}
          placeholder=".expert-card { border-radius: 50px; } ..."
          className="css-editor-textarea"
        />
        <div className="css-editor-info">
            <h4 className="css-editor-info-title">تعليمات مفيدة</h4>
            <ul className="css-editor-info-list">
                <li className="css-editor-info-item">استخدم <code>.expert-card</code> لتنسيق البطاقات.</li>
                <li className="css-editor-info-item">استخدم <code>.main-title</code> للعناوين.</li>
                <li className="css-editor-info-item">استخدم <code>.accent-bg</code> للألوان التفاعلية.</li>
            </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>العنوان الرئيسي</label>
          <input
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>العنوان الفرعي</label>
          <input
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="form-input"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="expert-list-header">
          <label className="expert-list-title">قائمة الخبراء</label>
          <button
            onClick={handleAddExpert}
            className="add-expert-button"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {experts.map((expert, idx) => (
            <div key={expert.id} className="expert-item group">
              <div className="expert-item-header">
                <span className="expert-item-number">خبير #{idx + 1}</span>
                <button
                  onClick={() => removeExpert(expert.id)}
                  className="remove-expert-button"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="expert-item-content">
                <div className="expert-image-wrapper">
                  <img src={expert.image} className="expert-image" />
                  <input
                    type="file"
                    onChange={(e) => handleExpertImageUpload(expert.id, e)}
                    className="expert-image-input"
                    accept="image/*"
                  />
                  <div className="expert-image-overlay">
                    <ImageIcon size={14} className="expert-image-icon" />
                  </div>
                </div>
                <div className="expert-fields">
                  <div className="expert-input-wrapper">
                    <User size={12} className="expert-input-icon" />
                    <input
                      value={expert.name}
                      onChange={(e) => updateExpert(expert.id, 'name', e.target.value)}
                      placeholder="اسم الخبير"
                      className="expert-input"
                    />
                  </div>
                  <div className="expert-input-wrapper">
                    <Briefcase size={12} className="expert-input-icon" />
                    <input
                      value={expert.specialty}
                      onChange={(e) => updateExpert(expert.id, 'specialty', e.target.value)}
                      placeholder="التخصص"
                      className="expert-input"
                    />
                  </div>
                </div>
              </div>

              <div className="expert-grid">
                <div className="expert-input-wrapper">
                  <Calendar size={12} className="expert-input-icon" />
                  <input
                    value={expert.experience}
                    onChange={(e) => updateExpert(expert.id, 'experience', e.target.value)}
                    placeholder="الخبرة"
                    className="expert-input expert-input-small"
                  />
                </div>
                <div className="expert-input-wrapper">
                  <LinkIcon size={12} className="expert-input-icon" />
                  <input
                    value={expert.linkedin}
                    onChange={(e) => updateExpert(expert.id, 'linkedin', e.target.value)}
                    placeholder="لينكد إن"
                    className="expert-input expert-input-small"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
