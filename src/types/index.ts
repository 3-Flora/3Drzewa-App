export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  registrationDate: string;
  submissionsCount: number;
  verificationsCount: number;
}

export interface TreeSubmission {
  id: string;
  userId: string;
  species: string;
  speciesLatin: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  circumference: number; // pierśnica
  height?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isMonument: boolean;
  description: string;
  images: string[];
  videos?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'monument';
  submissionDate: string;
  approvalDate?: string;
  votes: {
    approve: number;
    reject: number;
  };
  userVote?: 'approve' | 'reject';
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  isLegend: boolean;
  votes: number;
  userVoted?: boolean;
}

export interface TreeSpecies {
  id: string;
  namePolish: string;
  nameLatin: string;
  family: string;
  description: string;
  identificationTips: string[];
  seasonalChanges: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  images: {
    tree: string;
    leaves: string;
    bark: string;
    fruit?: string;
  };
  characteristics: {
    maxHeight: string;
    lifespan: string;
    nativeToPoland: boolean;
  };
}

export interface MunicipalForm {
  id: string;
  treeId: string;
  userId: string;
  municipalityName: string;
  applicantName: string;
  applicantAddress: string;
  generatedDate: string;
  status: 'draft' | 'sent' | 'processed';
  content: string;
}

export interface TreeLegend {
  id: string;
  title: string;
  species: string;
  location: string;
  region: string;
  period: string;
  story: string;
  author: string;
  image: string;
  likes: number;
  treeId?: string;
}

// Nowe interfejsy dla API

export interface AppStats {
  totalTrees: number;
  monuments: number;
  activeUsers: number;
  pendingVerifications: number;
  approvedTrees: number;
  rejectedTrees: number;
  newThisMonth: number;
  topRegions: Array<{ name: string; count: number }>;
  topSpecies: Array<{ name: string; count: number }>;
  monthlyGrowth: Array<{ month: string; trees: number; users: number }>;
}

export interface Municipality {
  id: string;
  name: string;
  voivodeship: string;
}

export interface ReportType {
  id: string;
  name: string;
  description: string;
  template: string;
}

export interface MapConfig {
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
  region: string;
  language: string;
}

export interface SettingsMenu {
  mainMenuItems: Array<{
    title: string;
    description: string;
    icon: string;
    path: string;
    color: string;
    bgColor: string;
    emoji: string;
  }>;
  settingsItems: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    emoji: string;
  }>;
}

export interface HomeStats {
  icon: string;
  value: string;
  label: string;
  color: string;
}

// Interfejsy dla rejestracji i logowania
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}