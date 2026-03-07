
export interface Expert {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  linkedin: string;
}

export interface Theme {
  id: string;
  name: string;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
}

export interface AppState {
  experts: Expert[];
  theme: Theme;
  customCss: string;
  logo: string | null;
  mainTitle: string;
  subTitle: string;
}
