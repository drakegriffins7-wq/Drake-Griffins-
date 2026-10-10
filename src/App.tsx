export type PageView = 'home' | 'details' | 'vjs' | 'account' | 'admin';
export type MovieAvailability = 'authorized' | 'unavailable';
export type UserRole = 'user' | 'admin';
export type AuthMode = 'login' | 'register' | 'reset';

export interface VJ {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  movies: string[];
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  releaseYear: number;
  genre: string;
  language: string;
  durationMinutes: number;
  vjId: string;
  vjName: string;
  isUgandan: boolean;
  isLugandaTranslation: boolean;
  featured: boolean;
  trailerUrl?: string;
  videoUrl?: string;
  subtitlesUrl?: string;
  authorizationRequired: boolean;
  availability: MovieAvailability;
  rating: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
  favorites: string[];
  watchlist: string[];
}

export interface MovieFormState {
  title: string;
  description: string;
  genre: string;
  language: string;
  releaseYear: number;
  durationMinutes: number;
  vjName: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  videoUrl: string;
  subtitlesUrl: string;
  isUgandan: boolean;
  isLugandaTranslation: boolean;
  authorizationRequired: boolean;
  availability: MovieAvailability;
}
