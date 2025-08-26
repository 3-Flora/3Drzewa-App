import { 
  TreeSubmission, 
  Comment, 
  TreeSpecies, 
  User, 
  MunicipalForm,
  TreeLegend,
  AppStats,
  Municipality,
  ReportType,
  MapConfig,
  SettingsMenu
} from '../types';
import { RegisterData } from '../hooks/useAuth';
import { 
  mockTreeSubmissions, 
  mockComments, 
  mockTreeSpecies, 
  mockUsers, 
  mockMunicipalForms,
  mockTreeLegends,
  currentUser 
} from '../data/mockData';

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export async function login(email: string, password: string): Promise<User> {
  await delay(800);
  // TODO: podłączyć do backendu .NET API POST /api/auth/login
  
  // Mock validation
  if (!email || !password) {
    throw new Error('Email i hasło są wymagane');
  }
  
  // Simulate login success
  return Promise.resolve(currentUser);
}

export async function register(userData: RegisterData): Promise<User> {
  await delay(1000);
  // TODO: podłączyć do backendu .NET API POST /api/auth/register
  
  // Mock validation
  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    throw new Error('Wszystkie pola są wymagane');
  }
  
  if (userData.password !== userData.confirmPassword) {
    throw new Error('Hasła nie są identyczne');
  }
  
  if (userData.password.length < 6) {
    throw new Error('Hasło musi mieć co najmniej 6 znaków');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    name: `${userData.firstName} ${userData.lastName}`,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
    registrationDate: new Date().toISOString(),
    submissionsCount: 0,
    verificationsCount: 0,
  };
  
  mockUsers.push(newUser);
  return Promise.resolve(newUser);
}

// Community Feed API
export async function fetchCommunityFeed(): Promise<TreeSubmission[]> {
  await delay(500);
  // TODO: podłączyć do backendu .NET API GET /api/community/feed
  return Promise.resolve(mockTreeSubmissions.slice().reverse()); // Latest first
}

// Trees API
export async function fetchTrees(): Promise<TreeSubmission[]> {
  await delay(500);
  // TODO: podłączyć do backendu .NET API GET /api/trees
  return Promise.resolve(mockTreeSubmissions);
}

export async function fetchTreeById(id: string): Promise<TreeSubmission | null> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/trees/{id}
  const tree = mockTreeSubmissions.find(t => t.id === id);
  return Promise.resolve(tree || null);
}

export async function submitTree(treeData: Omit<TreeSubmission, 'id' | 'userId' | 'submissionDate' | 'votes'>): Promise<TreeSubmission> {
  await delay(800);
  // TODO: podłączyć do backendu .NET API POST /api/trees
  const newTree: TreeSubmission = {
    ...treeData,
    id: Date.now().toString(),
    userId: currentUser.id,
    submissionDate: new Date().toISOString(),
    votes: { approve: 0, reject: 0 }
  };
  mockTreeSubmissions.unshift(newTree);
  return Promise.resolve(newTree);
}

export async function voteOnTree(treeId: string, vote: 'approve' | 'reject'): Promise<boolean> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API POST /api/trees/{treeId}/vote
  const tree = mockTreeSubmissions.find(t => t.id === treeId);
  if (tree) {
    if (tree.userVote === vote) {
      // Remove vote
      tree.votes[vote]--;
      tree.userVote = undefined;
    } else {
      // Add or change vote
      if (tree.userVote) {
        tree.votes[tree.userVote]--;
      }
      tree.votes[vote]++;
      tree.userVote = vote;
    }
  }
  return Promise.resolve(true);
}

// Comments API
export async function fetchComments(treeId: string): Promise<Comment[]> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/trees/{treeId}/comments
  return Promise.resolve(mockComments[treeId] || []);
}

export async function postComment(treeId: string, content: string, isLegend: boolean = false): Promise<Comment> {
  await delay(400);
  // TODO: podłączyć do backendu .NET API POST /api/trees/{treeId}/comments
  const newComment: Comment = {
    id: Date.now().toString(),
    userId: currentUser.id,
    userName: currentUser.name,
    userAvatar: currentUser.avatar,
    content,
    date: new Date().toISOString(),
    isLegend,
    votes: 0
  };
  
  if (!mockComments[treeId]) {
    mockComments[treeId] = [];
  }
  mockComments[treeId].push(newComment);
  return Promise.resolve(newComment);
}

export async function voteOnComment(commentId: string, treeId: string): Promise<boolean> {
  await delay(200);
  // TODO: podłączyć do backendu .NET API POST /api/comments/{commentId}/vote
  const comment = mockComments[treeId]?.find(c => c.id === commentId);
  if (comment) {
    if (comment.userVoted) {
      comment.votes--;
      comment.userVoted = false;
    } else {
      comment.votes++;
      comment.userVoted = true;
    }
  }
  return Promise.resolve(true);
}

// Species API
export async function fetchSpecies(): Promise<TreeSpecies[]> {
  await delay(400);
  // TODO: podłączyć do backendu .NET API GET /api/species
  return Promise.resolve(mockTreeSpecies);
}

export async function fetchSpeciesById(id: string): Promise<TreeSpecies | null> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/species/{id}
  const species = mockTreeSpecies.find(s => s.id === id);
  return Promise.resolve(species || null);
}

// User API
export async function fetchUserTrees(userId: string): Promise<TreeSubmission[]> {
  await delay(400);
  // TODO: podłączyć do backendu .NET API GET /api/users/{userId}/trees
  return Promise.resolve(mockTreeSubmissions.filter(t => t.userId === userId));
}

// Municipal Forms API
export async function generateMunicipalForm(treeId: string, municipalityName: string): Promise<MunicipalForm> {
  await delay(600);
  // TODO: podłączyć do backendu .NET API POST /api/forms/generate
  const tree = mockTreeSubmissions.find(t => t.id === treeId);
  if (!tree) throw new Error('Tree not found');
  
  const newForm: MunicipalForm = {
    id: Date.now().toString(),
    treeId,
    userId: currentUser.id,
    municipalityName,
    applicantName: currentUser.name,
    applicantAddress: 'ul. Przykładowa 123, 00-000 Warszawa', // Would come from user profile
    generatedDate: new Date().toISOString(),
    status: 'draft',
    content: `Wniosek o uznanie za pomnik przyrody\n\nGatunek: ${tree.species} (${tree.speciesLatin})\nLokalizacja: ${tree.location.address}\nPierśnica: ${tree.circumference} cm\n\n${tree.description}`
  };
  
  mockMunicipalForms.push(newForm);
  return Promise.resolve(newForm);
}

export async function fetchMunicipalForms(): Promise<MunicipalForm[]> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/forms
  return Promise.resolve(mockMunicipalForms.filter(f => f.userId === currentUser.id));
}

// Verification API
export async function fetchPendingVerifications(): Promise<TreeSubmission[]> {
  await delay(500);
  // TODO: podłączyć do backendu .NET API GET /api/verification/pending
  return Promise.resolve(mockTreeSubmissions.filter(t => t.status === 'pending'));
}

// Global Legends API
export async function fetchGlobalLegends(): Promise<TreeLegend[]> {
  await delay(400);
  // TODO: podłączyć do backendu .NET API GET /api/legends
  return Promise.resolve(mockTreeLegends);
}

// Reports and Statistics API
export async function fetchAppStats(): Promise<AppStats> {
  await delay(500);
  // TODO: podłączyć do backendu .NET API GET /api/reports/stats
  const { mockAppStats } = await import('../data/mockData');
  return Promise.resolve(mockAppStats);
}

// Municipalities API
export async function fetchMunicipalities(): Promise<Municipality[]> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/municipalities
  const { mockMunicipalities } = await import('../data/mockData');
  return Promise.resolve(mockMunicipalities);
}

// Report Types API
export async function fetchReportTypes(): Promise<ReportType[]> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API GET /api/reports/types
  const { mockReports } = await import('../data/mockData');
  return Promise.resolve(mockReports);
}

// Map Configuration API
export async function fetchMapConfig(): Promise<MapConfig> {
  await delay(200);
  // TODO: podłączyć do backendu .NET API GET /api/map/config
  const { mockMapConfig } = await import('../data/mockData');
  return Promise.resolve(mockMapConfig);
}

// Settings Menu API
export async function fetchSettingsMenu(): Promise<SettingsMenu> {
  await delay(200);
  // TODO: podłączyć do backendu .NET API GET /api/settings/menu
  const { mockSettingsMenu } = await import('../data/mockData');
  return Promise.resolve(mockSettingsMenu);
}

// Form Operations API
export async function downloadFormPdf(formId: string): Promise<Blob> {
  await delay(500);
  // TODO: podłączyć do backendu .NET API GET /api/forms/{formId}/pdf
  const form = mockMunicipalForms.find(f => f.id === formId);
  if (!form) throw new Error('Form not found');
  
  // Create mock PDF content
  const pdfContent = `PDF Content for form ${formId}\n\n${form.content}`;
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  return Promise.resolve(blob);
}

export async function sendForm(formId: string): Promise<boolean> {
  await delay(400);
  // TODO: podłączyć do backendu .NET API POST /api/forms/{formId}/send
  const form = mockMunicipalForms.find(f => f.id === formId);
  if (form) {
    form.status = 'sent';
    form.sentDate = new Date().toISOString();
  }
  return Promise.resolve(true);
}

export async function deleteForm(formId: string): Promise<boolean> {
  await delay(300);
  // TODO: podłączyć do backendu .NET API DELETE /api/forms/{formId}
  const index = mockMunicipalForms.findIndex(f => f.id === formId);
  if (index !== -1) {
    mockMunicipalForms.splice(index, 1);
  }
  return Promise.resolve(true);
}

// Image Upload API
export async function uploadImage(file: File): Promise<string> {
  await delay(1000);
  // TODO: podłączyć do backendu .NET API POST /api/images/upload
  // Simulate file upload and return mock URL
  const mockUrl = `https://images.pexels.com/photos/${1172675 + Math.floor(Math.random() * 1000)}/pexels-photo-${1172675 + Math.floor(Math.random() * 1000)}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`;
  return Promise.resolve(mockUrl);
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  await delay(1500);
  // TODO: podłączyć do backendu .NET API POST /api/images/upload-multiple
  const uploadPromises = files.map(file => uploadImage(file));
  return Promise.all(uploadPromises);
}