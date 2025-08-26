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

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7274/api';

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 API Call:', url);
  console.log('🔧 Options:', options);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        console.log('🚨 Error details:', errorData);
        
        // Handle different error formats from backend
        if (errorData.title && errorData.errors) {
          // Validation errors from .NET backend
          console.log('🔍 Validation errors:', errorData.errors);
          
          // Extract only the first validation error message
          const firstError = Object.entries(errorData.errors)[0];
          if (firstError) {
            const [field, messages] = firstError;
            if (Array.isArray(messages)) {
              errorMessage = messages[0]; // Take first message from array
            } else {
              errorMessage = messages as string;
            }
          } else {
            errorMessage = errorData.title;
          }
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        }
      } catch (parseError) {
        console.log('Could not parse error response');
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
};

// Utility function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Authentication API
export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await apiCall('/Auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response.user;
  } catch (error) {
    // Log detailed error information
    console.error('🔴 Login failed:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      email: email
    });
    
    // Re-throw the error so the UI can handle it
    throw error;
  }
}

export async function register(userData: RegisterData): Promise<User> {
  // Frontend validation - check if passwords match
  if (userData.password !== userData.confirmPassword) {
    throw new Error('Hasła nie są identyczne');
  }
  
  // Frontend validation - check password length
  if (userData.password.length < 6) {
    throw new Error('Hasło musi mieć co najmniej 6 znaków');
  }
  
  try {
    const response = await apiCall('/Auth/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      }),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response.user;
  } catch (error) {
    // Log detailed error information
    console.error('🔴 Registration failed:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    });
    
    // Re-throw the error so the UI can handle it
    throw error;
  }
}

// Community Feed API
export async function fetchCommunityFeed(): Promise<TreeSubmission[]> {
  try {
    const response = await apiCall('/Trees', { headers: getAuthHeaders() });
    
    // Backend now returns userData directly, so just map the response
    const mappedTrees = response.map((tree: any) => mapBackendTree(tree));
    
    // Reverse for latest first
    return mappedTrees.reverse();
  } catch (error) {
    console.error('🔴 Failed to fetch community feed:', error);
    // Fallback to mock data if API fails
    return Promise.resolve(mockTreeSubmissions.slice().reverse());
  }
}

// Helper function to map backend status to frontend status
const mapBackendStatus = (backendStatus: string): string => {
  switch (backendStatus.toLowerCase()) {
    case 'pending':
      return 'pending';
    case 'approved':
      return 'approved';
    case 'monument':
      return 'monument';
    case 'rejected':
      return 'rejected';
    default:
      return 'pending';
  }
};

// Helper function to map backend tree to frontend format
const mapBackendTree = (backendTree: any): TreeSubmission => {
  return {
    ...backendTree,
    isMonument: backendTree.isMonument || false,
    status: mapBackendStatus(backendTree.status),
    // Backend now provides userData directly, so we can use it
    user: backendTree.userData ? {
      id: backendTree.userData.userId || 'unknown',
      name: backendTree.userData.userName,
      avatar: backendTree.userData.avatar,
      email: backendTree.userData.email || 'unknown@example.com'
    } : undefined
  };
};

// Trees API
export async function fetchTrees(): Promise<TreeSubmission[]> {
  try {
    const response = await apiCall('/Trees', { headers: getAuthHeaders() });
    
    // Backend now returns userData directly, so just map the response
    return response.map((tree: any) => mapBackendTree(tree));
  } catch (error) {
    console.error('🔴 Failed to fetch trees:', error);
    // Fallback to mock data if API fails
    return Promise.resolve(mockTreeSubmissions);
  }
}

export async function fetchTreeById(id: string): Promise<TreeSubmission | null> {
  try {
    const response = await apiCall(`/Trees/${id}`, {
      headers: getAuthHeaders() // Include auth token
    });
    // Map backend response to frontend format
    return mapBackendTree(response);
  } catch (error) {
    console.error('🔴 Failed to fetch tree by ID:', error);
    // Fallback to mock data if API fails
    const tree = mockTreeSubmissions.find(t => t.id === id);
    return Promise.resolve(tree || null);
  }
}

export async function submitTree(treeData: Omit<TreeSubmission, 'id' | 'userId' | 'submissionDate' | 'votes'>): Promise<TreeSubmission> {
  try {
    // Map frontend data to backend format
    const backendData = {
      speciesId: treeData.species || 'unknown', // Use species name as speciesId for now
      location: treeData.location,
      circumference: treeData.circumference,
      height: treeData.height || 0,
      condition: treeData.condition,
      isAlive: treeData.isAlive || true,
      estimatedAge: treeData.estimatedAge || 0,
      description: treeData.description,
      images: treeData.images || [],
      isMonument: treeData.isMonument || false,
      status: 'Pending' // Set initial status
    };

    // Send to backend API
    const response = await apiCall('/Trees', {
      method: 'POST',
      body: JSON.stringify(backendData),
      headers: getAuthHeaders() // Include auth token
    });

    // Map backend response to frontend format
    const newTree = mapBackendTree(response);
    
    // Add to mock data for immediate UI update (will be replaced by API refresh)
    mockTreeSubmissions.unshift(newTree);
    
    return newTree;
  } catch (error) {
    console.error('🔴 Failed to submit tree to backend:', error);
    // Fallback to mock data if API fails
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
}

export async function voteOnTree(treeId: string, vote: 'approve' | 'reject'): Promise<boolean> {
  try {
    // TODO: podłączyć do backendu .NET API POST /api/trees/{treeId}/vote
    // For now, use mock data as fallback
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
  } catch (error) {
    console.error('🔴 Failed to vote on tree:', error);
    return Promise.resolve(false);
  }
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
  try {
    const response = await apiCall('/Species');
    return response;
  } catch (error) {
    console.error('🔴 Failed to fetch species:', error);
    // Fallback to mock data if API fails
    return Promise.resolve(mockTreeSpecies);
  }
}

export async function fetchSpeciesById(id: string): Promise<TreeSpecies | null> {
  try {
    const response = await apiCall(`/Species/${id}`);
    return response;
  } catch (error) {
    console.error('🔴 Failed to fetch species by ID:', error);
    // Fallback to mock data if API fails
    const species = mockTreeSpecies.find(s => s.id === id);
    return Promise.resolve(species || null);
  }
}

// User API
export async function fetchUserTrees(userId: string): Promise<TreeSubmission[]> {
  try {
    // Use fetchTrees which now handles users properly
    const allTrees = await fetchTrees();
    // Filter for user's trees
    return allTrees.filter((t: TreeSubmission) => t.userId === userId);
  } catch (error) {
    console.error('🔴 Failed to fetch user trees:', error);
    // Fallback to mock data if API fails
    return Promise.resolve(mockTreeSubmissions.filter(t => t.userId === userId));
  }
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
  try {
    // Use fetchTrees which now handles users properly
    const allTrees = await fetchTrees();
    // Filter for pending trees
    return allTrees.filter((t: TreeSubmission) => t.status === 'pending');
  } catch (error) {
    console.error('🔴 Failed to fetch pending verifications:', error);
    // Fallback to mock data if API fails
    return Promise.resolve(mockTreeSubmissions.filter(t => t.status === 'pending'));
  }
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