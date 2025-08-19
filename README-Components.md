# 3Drzewa App - Struktura Komponentów i Stron

## Struktura Katalogów

```
src/
├── components/          # Komponenty wielokrotnego użytku
├── pages/              # Strony aplikacji
├── hooks/              # Własne hooki React
├── types/              # Definicje typów TypeScript
├── utils/              # Funkcje pomocnicze i API
├── data/               # Dane mockowe
└── index.css           # Główne style CSS
```

## Strony (Pages)

### 1. Home.tsx
**Ścieżka:** `/`
**Opis:** Strona główna aplikacji z sekcjami:
- **HeroSection:** Główny baner z tytułem i opisem
- **FeaturesSection:** Prezentacja funkcji aplikacji
- **StatsSection:** Statystyki aplikacji
- **AnimatedBackground:** Animowane tło

**Komponenty:**
- `HeroSection` - Główny nagłówek z call-to-action
- `FeaturesSection` - Lista funkcji z ikonami
- `StatsSection` - Liczniki i statystyki
- `AnimatedBackground` - Animowane elementy tła

### 2. Map.tsx
**Ścieżka:** `/map`
**Opis:** Interaktywna mapa z drzewami, umożliwiająca:
- Przeglądanie drzew na mapie
- Dodawanie nowych drzew
- Filtrowanie według różnych kryteriów

**Komponenty:**
- `MapContainer` - Główny kontener mapy
- `MapInitializer` - Inicjalizacja Google Maps
- `TreeMarkers` - Markery drzew na mapie
- `AddTreeInfoWindow` - Okno informacyjne przy dodawaniu drzewa
- `MapErrorBoundary` - Obsługa błędów mapy
- `MapUtils` - Funkcje pomocnicze mapy

### 3. Community.tsx
**Ścieżka:** `/community`
**Opis:** Społeczność użytkowników z drzewami:
- Lista drzew zgłoszonych przez społeczność
- Możliwość komentowania i oceniania
- Filtrowanie i wyszukiwanie

**Komponenty:**
- `CommunityHeader` - Nagłówek z tytułem i filtrami
- `TreeCard` - Karta drzewa z informacjami
- `TreeCardHeader` - Nagłówek karty drzewa
- `TreeCardContent` - Zawartość karty drzewa
- `TreeCardActions` - Akcje dla karty drzewa
- `CommentInput` - Pole komentarza
- `EmptyState` - Stan pusty gdy brak drzew

### 4. Submit.tsx
**Ścieżka:** `/submit`
**Opis:** Formularz zgłaszania nowego drzewa:
- Wybór lokalizacji na mapie
- Wprowadzanie danych o drzewie
- Upload zdjęć
- Generowanie wniosku o pomnik przyrody

**Komponenty:**
- `SubmitHeader` - Nagłówek formularza
- `LocationMap` - Mapa do wyboru lokalizacji
- `LocationInput` - Pole adresu
- `SpeciesInput` - Wprowadzanie gatunku z pomocą
- `MeasurementsInput` - Wymiary drzewa
- `ConditionSelect` - Wybór stanu drzewa
- `MonumentCheckbox` - Checkbox pomnika przyrody
- `DescriptionInput` - Opis drzewa
- `ImageUpload` - Upload i podgląd zdjęć
- `SubmitActions` - Przyciski akcji

### 5. Forms.tsx
**Ścieżka:** `/forms`
**Opis:** Zarządzanie formularzami:
- Lista utworzonych formularzy
- Tworzenie nowych formularzy
- Podgląd i edycja istniejących

**Komponenty:**
- `FormsHeader` - Nagłówek z tytułem i akcjami
- `FormsSearchFilter` - Wyszukiwanie i filtrowanie
- `FormCard` - Karta formularza
- `FormCardHeader` - Nagłówek karty formularza
- `FormCardContent` - Zawartość karty formularza
- `FormCardActions` - Akcje dla karty formularza
- `FormPreviewModal` - Modal podglądu formularza
- `FormsEmptyState` - Stan pusty gdy brak formularzy
- `FormsHowToCreate` - Instrukcja tworzenia

### 6. CreateForm.tsx
**Ścieżka:** `/create-form`
**Opis:** Kreator formularzy z krokami:
- Wybór typu raportu
- Wybór drzewa
- Wybór gminy
- Podsumowanie i generowanie

**Komponenty:**
- `CreateFormHeader` - Nagłówek kreatora
- `ProgressSteps` - Pasek postępu
- `ReportSelection` - Wybór typu raportu
- `TreeSelection` - Wybór drzewa
- `MunicipalitySelection` - Wybór gminy
- `SummaryStep` - Podsumowanie przed generowaniem
- `NavigationButtons` - Przyciski nawigacji
- `AIAssistantModal` - Asystent AI
- `InstructionsModal` - Instrukcje

### 7. SelectTreeForForm.tsx
**Ścieżka:** `/select-tree`
**Opis:** Wybór drzewa dla formularza:
- Lista dostępnych drzew
- Wyszukiwanie i filtrowanie
- Informacje o drzewach

**Komponenty:**
- `SelectTreeHeader` - Nagłówek wyboru
- `SearchAndFilter` - Wyszukiwanie i filtrowanie
- `TreeCard` - Karta drzewa do wyboru
- `TreeCardHeader` - Nagłówek karty drzewa
- `TreeCardContent` - Zawartość karty drzewa
- `TreeCardActions` - Akcje dla karty drzewa
- `InfoBox` - Informacje pomocnicze
- `LoadingState` - Stan ładowania
- `EmptyState` - Stan pusty

### 8. TreeDetail.tsx
**Ścieżka:** `/tree/:id`
**Opis:** Szczegółowy widok drzewa:
- Pełne informacje o drzewie
- Galeria zdjęć
- Komentarze użytkowników
- Legendy i historie

**Komponenty:**
- `TreeDetailHeader` - Nagłówek szczegółów drzewa
- `TreeHero` - Główny obrazek drzewa
- `TreeContent` - Główna zawartość
- `TreeInfo` - Podstawowe informacje
- `TreeStatus` - Status drzewa
- `TreeImages` - Galeria zdjęć
- `TreeDetails` - Szczegółowe dane
- `CommentsSection` - Sekcja komentarzy
- `CommentForm` - Formularz komentarza
- `CommentItem` - Pojedynczy komentarz
- `LegendsSection` - Sekcja legend
- `LegendItem` - Pojedyncza legenda
- `LoadingState` - Stan ładowania
- `NotFoundState` - Stan nie znaleziono

### 9. Species.tsx
**Ścieżka:** `/species`
**Opis:** Encyklopedia gatunków drzew:
- Lista gatunków z opisami
- Wyszukiwanie i filtrowanie
- Szybkie wskazówki

**Komponenty:**
- `SpeciesHeader` - Nagłówek encyklopedii
- `SpeciesSearchFilter` - Wyszukiwanie i filtrowanie
- `SpeciesGrid` - Siatka gatunków
- `SpeciesCard` - Karta gatunku
- `QuickTips` - Szybkie wskazówki
- `EmptyState` - Stan pusty

### 10. SpeciesDetail.tsx
**Ścieżka:** `/species/:id`
**Opis:** Szczegółowy widok gatunku:
- Pełny opis gatunku
- Galeria zdjęć
- Informacje sezonowe
- Wskazówki identyfikacji

**Komponenty:**
- `SpeciesDetailHeader` - Nagłówek gatunku
- `SpeciesHero` - Główny obrazek gatunku
- `SpeciesTabs` - Zakładki z informacjami
- `OverviewTab` - Przegląd gatunku
- `IdentificationTab` - Wskazówki identyfikacji
- `SeasonalTab` - Informacje sezonowe
- `GalleryTab` - Galeria zdjęć
- `LoadingState` - Stan ładowania
- `NotFoundState` - Stan nie znaleziono

### 11. Legends.tsx
**Ścieżka:** `/legends`
**Opis:** Legendy i historie o drzewach:
- Lista legend
- Wyszukiwanie i filtrowanie
- Kategorie legend

**Komponenty:**
- `LegendsHeader` - Nagłówek legend
- `LegendsSearchFilter` - Wyszukiwanie i filtrowanie
- `LegendsGrid` - Siatka legend
- `LegendCard` - Karta legendy
- `LegendCardHeader` - Nagłówek karty legendy
- `LegendCardContent` - Zawartość karty legendy
- `LegendCardActions` - Akcje dla karty legendy
- `EmptyState` - Stan pusty

### 12. Verify.tsx
**Ścieżka:** `/verify`
**Opis:** Weryfikacja danych o drzewach:
- Lista drzew do weryfikacji
- Możliwość dodawania komentarzy
- System głosowania

**Komponenty:**
- `VerifyHeader` - Nagłówek weryfikacji
- `VerifyInstructions` - Instrukcje weryfikacji
- `VerifyTreeCard` - Karta drzewa do weryfikacji
- `VerifyTreeCardHeader` - Nagłówek karty weryfikacji
- `VerifyTreeCardContent` - Zawartość karty weryfikacji
- `VerifyTreeCardActions` - Akcje dla karty weryfikacji
- `VerifyCommentInput` - Pole komentarza weryfikacji
- `LoadingState` - Stan ładowania
- `EmptyState` - Stan pusty

### 13. Reports.tsx
**Ścieżka:** `/reports`
**Opis:** Raporty i statystyki:
- Główne statystyki
- Wykresy wzrostu
- Top regiony i gatunki
- Status zgłoszeń

**Komponenty:**
- `ReportsHeader` - Nagłówek raportów
- `MainStatsGrid` - Główna siatka statystyk
- `MonthlyGrowth` - Wykres wzrostu miesięcznego
- `TopRegions` - Top regiony
- `TopSpecies` - Top gatunki
- `StatusBreakdown` - Podział według statusu
- `AdditionalStats` - Dodatkowe statystyki
- `RefreshButton` - Przycisk odświeżania
- `LoadingState` - Stan ładowania
- `ErrorState` - Stan błędu

### 14. Profile.tsx
**Ścieżka:** `/profile`
**Opis:** Profil użytkownika:
- Informacje o użytkowniku
- Statystyki aktywności
- Drzewa użytkownika
- Ustawienia

**Komponenty:**
- `ProfileHeader` - Nagłówek profilu
- `ProfileSection` - Sekcja profilu
- `StatsSection` - Statystyki użytkownika
- `TreesSection` - Drzewa użytkownika
- `TreeCard` - Karta drzewa użytkownika
- `QuickActions` - Szybkie akcje
- `SettingsSection` - Sekcja ustawień
- `NotLoggedIn` - Stan niezalogowany

### 15. Settings.tsx
**Ścieżka:** `/settings`
**Opis:** Ustawienia aplikacji:
- Menu główne ustawień
- Ustawienia powiadomień
- Ustawienia prywatności
- Ustawienia języka
- O aplikacji

**Komponenty:**
- `SettingsHeader` - Nagłówek ustawień
- `SettingsContent` - Główna zawartość ustawień
- `MainMenuSection` - Główne menu ustawień
- `SettingsMenuSection` - Menu ustawień
- `NotificationSettings` - Ustawienia powiadomień
- `PrivacySettings` - Ustawienia prywatności
- `LanguageSettings` - Ustawienia języka
- `HelpSettings` - Ustawienia pomocy
- `AboutSettings` - O aplikacji
- `BackButton` - Przycisk powrotu
- `ToggleSwitch` - Przełącznik

## Komponenty Wspólne

### Layout
- `Layout.tsx` - Główny layout aplikacji
- `Navigation.tsx` - Główna nawigacja
- `ProtectedRoute.tsx` - Ochrona tras wymagających logowania

### UI
- `LoadingSpinner.tsx` - Spinner ładowania
- `Modal.tsx` - Modal wielokrotnego użytku

### Auth
- `LoginModal.tsx` - Modal logowania
- `RegisterModal.tsx` - Modal rejestracji

## Hooki

### useAuth.tsx
**Opis:** Hook do zarządzania autoryzacją użytkownika:
- Logowanie/wylogowanie
- Sprawdzanie statusu autoryzacji
- Zarządzanie tokenami

## Typy

### types/index.ts
**Opis:** Definicje typów TypeScript dla:
- Drzewa i ich właściwości
- Użytkownicy
- Komentarze i oceny
- Formularze i raporty
- API responses

## Utils

### api.ts
**Opis:** Funkcje do komunikacji z API:
- CRUD operacje dla drzew
- Autoryzacja
- Upload plików
- Generowanie raportów

## Style i Konfiguracja

### CSS
- `index.css` - Główne style CSS
- `tailwind.config.js` - Konfiguracja Tailwind CSS
- `postcss.config.js` - Konfiguracja PostCSS

### Build Tools
- `vite.config.ts` - Konfiguracja Vite
- `tsconfig.json` - Konfiguracja TypeScript
- `eslint.config.js` - Konfiguracja ESLint

## Struktura Komponentów

Każdy komponent jest zorganizowany w następujący sposób:
1. **Props Interface** - Definicja właściwości
2. **State Management** - Zarządzanie stanem lokalnym
3. **Event Handlers** - Obsługa zdarzeń
4. **Render Logic** - Logika renderowania
5. **Styling** - Klasy CSS i style

## Wzorce Projektowe

1. **Component Composition** - Komponenty są komponowane z mniejszych części
2. **Custom Hooks** - Logika biznesowa jest wydzielona do hooków
3. **Type Safety** - Pełne wsparcie TypeScript
4. **Responsive Design** - Wsparcie dla różnych rozmiarów ekranów
5. **Accessibility** - Dostępność dla wszystkich użytkowników

## Technologie

- **React 18** - Framework UI
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animacje
- **React Hook Form** - Zarządzanie formularzami
- **React Router** - Routing
- **Google Maps API** - Mapy i lokalizacja
- **Vite** - Build tool
