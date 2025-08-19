# 3Drzewa - Dokumentacja API

## Przegląd
Aplikacja 3Drzewa to społecznościowy rejestr polskich pomników przyrody. Użytkownicy mogą zgłaszać drzewa, weryfikować zgłoszenia, generować wnioski do gmin oraz przeglądanie encyklopedii gatunków.

## Technologie
- **Frontend**: React + TypeScript + Vite
- **Backend**: .NET API (do implementacji)
- **Uwierzytelnianie**: Email/hasło (bez magic links, social login)
- **Mapy**: Google Maps API

## Zmienne środowiskowe

### Frontend (.env)
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend
```env
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

## Modele danych

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  registrationDate: string; // ISO date
  submissionsCount: number;
  verificationsCount: number;
}
```

### TreeSubmission
```typescript
interface TreeSubmission {
  id: string;
  userId: string;
  species: string; // nazwa polska
  speciesLatin: string; // nazwa łacińska
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  circumference: number; // pierśnica w cm
  height?: number; // wysokość w metrach (opcjonalne)
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isMonument: boolean; // czy kandydat na pomnik przyrody
  description: string;
  images: string[]; // URLs do zdjęć
  videos?: string[]; // URLs do filmów (opcjonalne)
  status: 'pending' | 'approved' | 'rejected' | 'monument';
  submissionDate: string; // ISO date
  approvalDate?: string; // ISO date (opcjonalne)
  votes: {
    approve: number;
    reject: number;
  };
  userVote?: 'approve' | 'reject'; // głos aktualnego użytkownika
}
```

### Comment
```typescript
interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string; // ISO date
  isLegend: boolean; // czy to legenda/historia
  votes: number; // liczba polubień
  userVoted?: boolean; // czy aktualny użytkownik polubił
}
```

### TreeSpecies
```typescript
interface TreeSpecies {
  id: string;
  namePolish: string;
  nameLatin: string;
  family: string; // rodzina botaniczna
  description: string;
  identificationTips: string[]; // wskazówki identyfikacji
  seasonalChanges: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  images: {
    tree: string; // URL zdjęcia drzewa
    leaves: string; // URL zdjęcia liści
    bark: string; // URL zdjęcia kory
    fruit?: string; // URL zdjęcia owoców (opcjonalne)
  };
  characteristics: {
    maxHeight: string; // np. "40 m"
    lifespan: string; // np. "300-500 lat"
    nativeToPoland: boolean;
  };
}
```

### MunicipalForm
```typescript
interface MunicipalForm {
  id: string;
  treeId: string;
  userId: string;
  municipalityName: string;
  applicantName: string;
  applicantAddress: string;
  generatedDate: string; // ISO date
  status: 'draft' | 'sent' | 'processed';
  content: string; // treść wniosku
}
```

### TreeLegend
```typescript
interface TreeLegend {
  id: string;
  title: string;
  species: string;
  location: string;
  region: string;
  period: string; // np. "Około 300 lat"
  story: string; // treść legendy
  author: string;
  image: string; // URL zdjęcia
  likes: number;
  treeId?: string; // powiązanie z konkretnym drzewem (opcjonalne)
}
```

### AppStats (dla raportów)
```typescript
interface AppStats {
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
```

### Municipality (dla formularzy)
```typescript
interface Municipality {
  id: string;
  name: string;
  voivodeship: string;
}
```

### ReportType (dla formularzy)
```typescript
interface ReportType {
  id: string;
  name: string;
  description: string;
  template: string;
}
```

### MapConfig (dla mapy)
```typescript
interface MapConfig {
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
  region: string;
  language: string;
}
```

### SettingsMenu (dla ustawień)
```typescript
interface SettingsMenu {
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
```

### HomeStats (dla strony głównej)
```typescript
interface HomeStats {
  icon: string;
  value: string;
  label: string;
  color: string;
}
```

### RegisterData (dla rejestracji)
```typescript
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}
```

### LoginData (dla logowania)
```typescript
interface LoginData {
  email: string;
  password: string;
}
```

### AuthResponse (dla odpowiedzi autoryzacji)
```typescript
interface AuthResponse {
  user: User;
  token: string;
}
```

## Endpointy API

### Uwierzytelnianie

#### POST /api/auth/login
Logowanie użytkownika
```json
// Request
{
  "email": "jan.kowalski@email.com",
  "password": "haslo123"
}

// Response 200
{
  "user": {
    "id": "1",
    "email": "jan.kowalski@email.com",
    "name": "Jan Kowalski",
    "avatar": "https://example.com/avatar.jpg",
    "registrationDate": "2024-01-15T00:00:00Z",
    "submissionsCount": 12,
    "verificationsCount": 45
  },
  "token": "jwt_token_here"
}

// Response 401
{
  "error": "Nieprawidłowe dane logowania"
}
```

#### POST /api/auth/register
Rejestracja nowego użytkownika
```json
// Request
{
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jan.kowalski@email.com",
  "phone": "+48123456789",
  "password": "haslo123",
  "confirmPassword": "haslo123"
}

// Response 201
{
  "user": {
    "id": "1",
    "email": "jan.kowalski@email.com",
    "name": "Jan Kowalski",
    "avatar": null,
    "registrationDate": "2024-01-15T00:00:00Z",
    "submissionsCount": 0,
    "verificationsCount": 0
  },
  "token": "jwt_token_here"
}

// Response 400
{
  "error": "Email już istnieje"
}
```

### Drzewa

#### GET /api/trees
Pobierz wszystkie drzewa
```json
// Query parameters (opcjonalne)
// ?status=approved&species=Dąb&region=mazowieckie&page=1&limit=20

// Response 200
[
  {
    "id": "1",
    "userId": "1",
    "species": "Dąb szypułkowy",
    "speciesLatin": "Quercus robur",
    "location": {
      "lat": 52.2297,
      "lng": 21.0122,
      "address": "Warszawa, Park Łazienkowski"
    },
    "circumference": 520,
    "height": 28,
    "condition": "excellent",
    "isMonument": true,
    "description": "Wspaniały okaz dębu...",
    "images": ["https://example.com/tree1.jpg"],
    "status": "monument",
    "submissionDate": "2024-01-15T00:00:00Z",
    "approvalDate": "2024-01-20T00:00:00Z",
    "votes": {
      "approve": 25,
      "reject": 1
    },
    "userVote": "approve"
  }
]
```

#### GET /api/trees/{id}
Pobierz szczegóły drzewa
```json
// Response 200
{
  "id": "1",
  "userId": "1",
  "species": "Dąb szypułkowy",
  // ... reszta pól TreeSubmission
}

// Response 404
{
  "error": "Drzewo nie znalezione"
}
```

#### POST /api/trees
Dodaj nowe drzewo
```json
// Request
{
  "species": "Dąb szypułkowy",
  "speciesLatin": "Quercus robur",
  "location": {
    "lat": 52.2297,
    "lng": 21.0122,
    "address": "Warszawa, Park Łazienkowski"
  },
  "circumference": 520,
  "height": 28,
  "condition": "excellent",
  "isMonument": true,
  "description": "Wspaniały okaz dębu...",
  "images": ["https://example.com/tree1.jpg"]
}

// Response 201
{
  "id": "1",
  "userId": "1", // z tokena JWT
  "species": "Dąb szypułkowy",
  // ... reszta pól + wygenerowane pola
  "status": "pending",
  "submissionDate": "2024-01-15T00:00:00Z",
  "votes": {
    "approve": 0,
    "reject": 0
  }
}
```

#### POST /api/trees/{id}/vote
Zagłosuj na drzewo
```json
// Request
{
  "vote": "approve" // lub "reject"
}

// Response 200
{
  "success": true,
  "votes": {
    "approve": 26,
    "reject": 1
  },
  "userVote": "approve"
}
```

### Społeczność

#### GET /api/community/feed
Pobierz feed społeczności (najnowsze drzewa)
```json
// Query parameters (opcjonalne)
// ?status=all&limit=20&offset=0

// Response 200
[
  // Array of TreeSubmission objects, sorted by submissionDate DESC
]
```

### Weryfikacja

#### GET /api/verification/pending
Pobierz drzewa oczekujące na weryfikację
```json
// Response 200
[
  // Array of TreeSubmission objects with status "pending"
]
```

### Komentarze

#### GET /api/trees/{treeId}/comments
Pobierz komentarze do drzewa
```json
// Response 200
[
  {
    "id": "1",
    "userId": "2",
    "userName": "Maria Kowalska",
    "userAvatar": "https://example.com/avatar2.jpg",
    "content": "Wspaniały okaz!",
    "date": "2024-01-21T00:00:00Z",
    "isLegend": false,
    "votes": 8,
    "userVoted": true
  }
]
```

#### POST /api/trees/{treeId}/comments
Dodaj komentarz
```json
// Request
{
  "content": "Wspaniały okaz drzewa!",
  "isLegend": false
}

// Response 201
{
  "id": "1",
  "userId": "1", // z tokena JWT
  "userName": "Jan Kowalski", // z tokena JWT
  "userAvatar": "https://example.com/avatar.jpg",
  "content": "Wspaniały okaz drzewa!",
  "date": "2024-01-21T00:00:00Z",
  "isLegend": false,
  "votes": 0,
  "userVoted": false
}
```

#### POST /api/comments/{commentId}/vote
Polub komentarz
```json
// Response 200
{
  "success": true,
  "votes": 9,
  "userVoted": true
}
```

### Gatunki

#### GET /api/species
Pobierz wszystkie gatunki drzew
```json
// Response 200
[
  {
    "id": "1",
    "namePolish": "Dąb szypułkowy",
    "nameLatin": "Quercus robur",
    "family": "Fagaceae",
    "description": "Dąb szypułkowy to jeden z najważniejszych...",
    "identificationTips": [
      "Liście z wyraźnymi wcięciami...",
      "Żołędzie na długich szypułkach..."
    ],
    "seasonalChanges": {
      "spring": "Młode liście jasno-zielone...",
      "summer": "Liście ciemno-zielone...",
      "autumn": "Liście żółto-brązowe...",
      "winter": "Charakterystyczna sylwetka..."
    },
    "images": {
      "tree": "https://example.com/oak-tree.jpg",
      "leaves": "https://example.com/oak-leaves.jpg",
      "bark": "https://example.com/oak-bark.jpg",
      "fruit": "https://example.com/oak-acorns.jpg"
    },
    "characteristics": {
      "maxHeight": "40 m",
      "lifespan": "Ponad 1000 lat",
      "nativeToPoland": true
    }
  }
]
```

#### GET /api/species/{id}
Pobierz szczegóły gatunku
```json
// Response 200
{
  "id": "1",
  "namePolish": "Dąb szypułkowy",
  // ... reszta pól TreeSpecies
}

// Response 404
{
  "error": "Gatunek nie znaleziony"
}
```

### Użytkownicy

#### GET /api/users/{userId}/trees
Pobierz drzewa użytkownika
```json
// Response 200
[
  // Array of TreeSubmission objects for specific user
]
```

#### GET /api/users/{userId}/profile
Pobierz profil użytkownika
```json
// Response 200
{
  "id": "1",
  "email": "jan.kowalski@email.com",
  "name": "Jan Kowalski",
  "avatar": "https://example.com/avatar.jpg",
  "registrationDate": "2024-01-15T00:00:00Z",
  "submissionsCount": 12,
  "verificationsCount": 45
}
```

### Wnioski do gmin

#### GET /api/municipalities
Pobierz listę dostępnych gmin
```json
// Response 200
[
  {
    "id": "1",
    "name": "Gmina Kraków",
    "voivodeship": "Małopolskie"
  },
  {
    "id": "2", 
    "name": "Gmina Warszawa",
    "voivodeship": "Mazowieckie"
  }
]
```

#### GET /api/reports/types
Pobierz dostępne typy raportów
```json
// Response 200
[
  {
    "id": "1",
    "name": "Wniosek o uznanie za pomnik przyrody",
    "description": "Standardowy wniosek zgodny z ustawą o ochronie przyrody",
    "template": "standard_monument_request"
  },
  {
    "id": "2",
    "name": "Wniosek o objęcie ochroną prawną", 
    "description": "Wniosek o objęcie drzewa szczególną ochroną prawną",
    "template": "legal_protection_request"
  }
]
```

#### GET /api/forms
Pobierz wnioski aktualnego użytkownika
```json
// Response 200
[
  {
    "id": "1",
    "treeId": "2",
    "userId": "2", // z tokena JWT
    "municipalityName": "Gmina Kraków",
    "applicantName": "Maria Nowak",
    "applicantAddress": "ul. Floriańska 45/12, 31-019 Kraków",
    "generatedDate": "2024-12-20T00:00:00Z",
    "status": "draft",
    "content": "WNIOSEK O UZNANIE ZA POMNIK PRZYRODY..."
  }
]
```

#### POST /api/forms/generate
Wygeneruj wniosek do gminy
```json
// Request
{
  "treeId": "2",
  "municipalityName": "Gmina Kraków",
  "additionalInfo": "Dodatkowe informacje...",
  "justification": "Uzasadnienie wniosku..."
}

// Response 201
{
  "id": "1",
  "treeId": "2",
  "userId": "2", // z tokena JWT
  "municipalityName": "Gmina Kraków",
  "applicantName": "Maria Nowak", // z profilu użytkownika
  "applicantAddress": "ul. Floriańska 45/12, 31-019 Kraków", // z profilu
  "generatedDate": "2024-12-20T00:00:00Z",
  "status": "draft",
  "content": "WNIOSEK O UZNANIE ZA POMNIK PRZYRODY..." // wygenerowana treść
}
```

#### GET /api/forms/{formId}/pdf
Pobierz wniosek jako PDF
```
// Response 200
Content-Type: application/pdf
// Binary PDF content
```

#### POST /api/forms/{formId}/send
Wyślij wniosek do gminy
```json
// Response 200
{
  "success": true,
  "status": "sent"
}
```

#### DELETE /api/forms/{formId}
Usuń wniosek
```json
// Response 200
{
  "success": true,
  "message": "Wniosek został usunięty"
}
```

### Legendy

#### GET /api/legends
Pobierz globalne legendy
```json
// Response 200
[
  {
    "id": "1",
    "title": "Dąb Bartek - Najsłynniejszy Dąb Polski",
    "species": "Dąb szypułkowy",
    "location": "Zagnańsk, województwo świętokrzyskie",
    "region": "Świętokrzyskie",
    "period": "Około 700 lat",
    "story": "Dąb Bartek to najsłynniejszy dąb w Polsce...",
    "author": "Maria Nowak",
    "image": "https://example.com/bartek-oak.jpg",
    "likes": 234,
    "treeId": "1"
  }
]
```

#### POST /api/legends
Dodaj nową legendę
```json
// Request
{
  "title": "Tytuł legendy",
  "species": "Gatunek drzewa",
  "location": "Lokalizacja",
  "region": "Region",
  "period": "Okres",
  "story": "Treść legendy",
  "image": "https://example.com/image.jpg",
  "treeId": "1" // opcjonalne
}

// Response 201
{
  "id": "1",
  "title": "Tytuł legendy",
  // ... reszta pól
  "author": "Jan Kowalski", // z tokena JWT
  "likes": 0
}
```

#### POST /api/legends/{legendId}/like
Polub legendę
```json
// Response 200
{
  "success": true,
  "likes": 235,
  "userLiked": true
}
```

### Konfiguracja mapy

#### GET /api/map/config
Pobierz konfigurację mapy
```json
// Response 200
{
  "defaultCenter": {
    "lat": 50.0412,
    "lng": 21.9991
  },
  "defaultZoom": 13,
  "region": "PL",
  "language": "pl"
}
```

### Ustawienia

#### GET /api/settings/menu
Pobierz menu ustawień
```json
// Response 200
{
  "mainMenuItems": [
    {
      "title": "Moje wnioski",
      "description": "Przeglądaj wygenerowane wnioski do gmin",
      "icon": "FileText",
      "path": "/forms",
      "color": "text-emerald-600",
      "bgColor": "bg-emerald-50",
      "emoji": "📄"
    }
  ],
  "settingsItems": [
    {
      "id": "notifications",
      "title": "Powiadomienia",
      "description": "Zarządzaj powiadomieniami push i email",
      "icon": "Bell",
      "emoji": "🔔"
    }
  ]
}
```

### Raporty i statystyki

#### GET /api/reports/stats
Pobierz statystyki aplikacji
```json
// Response 200
{
  "totalTrees": 2847,
  "monuments": 156,
  "activeUsers": 1234,
  "pendingVerifications": 543,
  "approvedTrees": 2148,
  "rejectedTrees": 156,
  "newThisMonth": 89,
  "topRegions": [
    { "name": "Mazowieckie", "count": 487 },
    { "name": "Małopolskie", "count": 423 },
    { "name": "Śląskie", "count": 356 },
    { "name": "Wielkopolskie", "count": 298 },
    { "name": "Dolnośląskie", "count": 267 }
  ],
  "topSpecies": [
    { "name": "Dąb szypułkowy", "count": 634 },
    { "name": "Lipa drobnolistna", "count": 456 },
    { "name": "Buk zwyczajny", "count": 389 },
    { "name": "Klon pospolity", "count": 298 },
    { "name": "Jesion wyniosły", "count": 234 }
  ],
  "monthlyGrowth": [
    { "month": "Sty", "trees": 156, "users": 89 },
    { "month": "Lut", "trees": 234, "users": 123 },
    { "month": "Mar", "trees": 298, "users": 167 },
    { "month": "Kwi", "trees": 367, "users": 201 },
    { "month": "Maj", "trees": 445, "users": 245 },
    { "month": "Cze", "trees": 523, "users": 289 }
  ]
}
```

#### GET /api/reports/export
Eksportuj dane do CSV/Excel
```json
// Query parameters
// ?format=csv&type=trees&dateFrom=2024-01-01&dateTo=2024-12-31

// Response 200
Content-Type: text/csv
// CSV data
```

## Upload plików

### POST /api/upload/images
Upload zdjęć drzew
```json
// Request: multipart/form-data
// files: File[]

// Response 200
{
  "urls": [
    "https://example.com/uploads/tree1.jpg",
    "https://example.com/uploads/tree2.jpg"
  ]
}
```

**Wymagania:**
- Maksymalnie 5 plików na raz
- Formaty: JPG, PNG, WebP
- Maksymalny rozmiar: 5MB per plik
- Automatyczne skalowanie do maksymalnie 1920x1080px

## Uwierzytelnianie

### JWT Token
- Wszystkie chronione endpointy wymagają nagłówka: `Authorization: Bearer {token}`
- Token powinien zawierać: `userId`, `email`, `name`
- Czas wygaśnięcia: 24 godziny (zalecane)

### Uprawnienia
- **Wszyscy użytkownicy**: mogą przeglądać drzewa, gatunki, legendy, statystyki
- **Zalogowani użytkownicy**: mogą dodawać drzewa, komentarze, głosować
- **Administratorzy**: mogą moderować treści (do rozważenia w przyszłości)

## Walidacja

### Drzewa
- `species`: wymagane, min 2 znaki
- `speciesLatin`: wymagane, format nazwy łacińskiej
- `circumference`: wymagane, min 1cm, max 2000cm
- `height`: opcjonalne, min 1m, max 100m
- `description`: wymagane, min 10 znaków, max 2000 znaków
- `location.lat`: wymagane, zakres dla Polski: 49-55
- `location.lng`: wymagane, zakres dla Polski: 14-25

### Komentarze
- `content`: wymagane, min 1 znak, max 1000 znaków

### Rejestracja
- `email`: wymagane, format email, unikalny
- `password`: wymagane, min 6 znaków
- `firstName`, `lastName`: wymagane, min 2 znaki

### Wnioski do gmin
- `treeId`: wymagane, musi istnieć
- `municipalityName`: wymagane, min 3 znaki
- `justification`: wymagane, min 50 znaków

## Błędy

### Standardowe kody HTTP
- `200` - OK
- `201` - Created
- `400` - Bad Request (błędne dane)
- `401` - Unauthorized (brak tokena/nieprawidłowy token)
- `403` - Forbidden (brak uprawnień)
- `404` - Not Found
- `409` - Conflict (np. email już istnieje)
- `422` - Unprocessable Entity (błędy walidacji)
- `500` - Internal Server Error

### Format błędów
```json
{
  "error": "Opis błędu",
  "details": {
    "field": "Szczegółowy opis błędu pola"
  }
}
```

## Paginacja

Dla endpointów zwracających listy:
```
GET /api/trees?page=1&limit=20&sort=submissionDate&order=desc
```

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Filtrowanie

### Drzewa
```
GET /api/trees?status=approved&species=Dąb&region=mazowieckie
```

### Społeczność
```
GET /api/community/feed?status=pending&isMonument=true
```

### Raporty
```
GET /api/reports/stats?dateFrom=2024-01-01&dateTo=2024-12-31&region=mazowieckie
```

## Baza danych

### Zalecane tabele
1. `users` - użytkownicy
2. `tree_submissions` - zgłoszenia drzew
3. `tree_species` - gatunki drzew
4. `comments` - komentarze
5. `votes` - głosy na drzewa
6. `comment_votes` - polubienia komentarzy
7. `municipal_forms` - wnioski do gmin
8. `tree_legends` - legendy drzew
9. `tree_images` - zdjęcia drzew (jeśli osobna tabela)
10. `app_stats` - cache statystyk aplikacji

### Indeksy
- `tree_submissions.status`
- `tree_submissions.user_id`
- `tree_submissions.location` (spatial index)
- `tree_submissions.submission_date`
- `comments.tree_id`
- `votes.tree_id, votes.user_id`
- `municipal_forms.user_id`
- `tree_legends.region`

## Notatki implementacyjne

1. **Geolokalizacja**: Użyj PostGIS dla PostgreSQL lub spatial types dla SQL Server
2. **Upload plików**: Zalecane przechowywanie w cloud storage (AWS S3, Azure Blob)
3. **Generowanie PDF**: Użyj biblioteki do generowania PDF z szablonów
4. **Email**: Konfiguracja SMTP do wysyłania wniosków do gmin
5. **Cache**: Redis dla często pobieranych danych (gatunki, legendy, statystyki)
6. **Logi**: Logowanie wszystkich operacji CRUD dla audytu
7. **Google Maps**: Klucz API z ograniczeniami domenowymi
8. **Statystyki**: Cache wyników na 1 godzinę, aktualizacja w tle

## Środowiska

### Development
- Base URL: `http://localhost:5000/api`
- CORS: `http://localhost:5173`
- Google Maps: Development key

### Production
- Base URL: `https://api.3drzewa.pl/api`
- CORS: `https://3drzewa.pl`
- Google Maps: Production key z ograniczeniami

## Testowanie

Zalecane endpointy do testowania:
1. `GET /api/health` - health check
2. `GET /api/trees` - podstawowe pobieranie danych
3. `POST /api/auth/login` - uwierzytelnianie
4. `POST /api/trees` - dodawanie danych
5. `GET /api/reports/stats` - statystyki aplikacji

## Monitoring i analityka

### Metryki do śledzenia
- Liczba aktywnych użytkowników
- Liczba nowych zgłoszeń drzew
- Wskaźnik weryfikacji społecznościowej
- Liczba wygenerowanych wniosków do gmin
- Czas odpowiedzi API
- Błędy i wyjątki

### Logi
- Wszystkie operacje CRUD
- Logowania i rejestracje
- Błędy aplikacji
- Wolne zapytania do bazy danych

---