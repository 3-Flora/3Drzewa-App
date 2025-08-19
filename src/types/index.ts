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