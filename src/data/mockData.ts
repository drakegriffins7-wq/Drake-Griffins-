import { defaultMovies, defaultVjs } from '../data/mockData';
import { supabase } from './supabase';
import type { Movie, UserAccount, VJ } from '../types';

const STORAGE_KEYS = {
  user: 'pearlflix-user',
  favorites: 'pearlflix-favorites',
  watchlist: 'pearlflix-watchlist',
  movies: 'pearlflix-movies',
};

export const defaultAccount: UserAccount = {
  id: 'guest-user',
  name: 'Guest Viewer',
  email: 'guest@pearlflix.ug',
  role: 'user',
  isAuthenticated: false,
  favorites: [],
  watchlist: [],
};

const readStoredAccount = (): UserAccount => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.user);
    if (!item) return defaultAccount;
    return { ...defaultAccount, ...JSON.parse(item) };
  } catch {
    return defaultAccount;
  }
};

const writeStoredAccount = (account: UserAccount) => {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(account));
};

export const getFallbackMovies = () => defaultMovies;
export const getFallbackVjs = () => defaultVjs;

export async function fetchCatalog(): Promise<{ movies: Movie[]; vjs: VJ[] }> {
  const localMovieData = localStorage.getItem(STORAGE_KEYS.movies);
  if (localMovieData) {
    try {
      const parsed = JSON.parse(localMovieData) as Movie[];
      if (parsed.length) return { movies: parsed, vjs: defaultVjs };
    } catch {
      // fallback below
    }
  }

  if (!supabase) {
    return { movies: defaultMovies, vjs: defaultVjs };
  }

  try {
    const { data: movieData, error: movieError } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: vjData, error: vjError } = await supabase
      .from('vjs')
      .select('*')
      .order('name', { ascending: true });

    if (movieError || vjError) {
      throw new Error(movieError?.message || vjError?.message || 'Unable to load catalog.');
    }

    return {
      movies: (movieData as Movie[] | null) ?? defaultMovies,
      vjs: (vjData as VJ[] | null) ?? defaultVjs,
    };
  } catch (error) {
    console.warn('Supabase catalog unavailable. Falling back to demo catalog.', error);
    return { movies: defaultMovies, vjs: defaultVjs };
  }
}

export async function signUpAccount(payload: { fullName: string; email: string; password: string }) {
  if (!supabase) {
    const account: UserAccount = {
      id: `local-${Date.now()}`,
      name: payload.fullName,
      email: payload.email,
      role: 'user',
      isAuthenticated: true,
      favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]'),
      watchlist: JSON.parse(localStorage.getItem(STORAGE_KEYS.watchlist) ?? '[]'),
    };
    writeStoredAccount(account);
    return { account, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: { full_name: payload.fullName },
    },
  });

  if (error) {
    return { account: null, error: error.message };
  }

  const account: UserAccount = {
    id: data.user?.id ?? `supabase-${Date.now()}`,
    name: payload.fullName,
    email: payload.email,
    role: 'user',
    isAuthenticated: true,
    favorites: [],
    watchlist: [],
  };

  writeStoredAccount(account);
  return { account, error: null };
}

export async function signInAccount(payload: { email: string; password: string }) {
  if (!supabase) {
    const account = readStoredAccount();
    const guest = account.email === payload.email ? account : {
      ...defaultAccount,
      id: `local-${Date.now()}`,
      name: payload.email.split('@')[0],
      email: payload.email,
      isAuthenticated: true,
      favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]'),
      watchlist: JSON.parse(localStorage.getItem(STORAGE_KEYS.watchlist) ?? '[]'),
    };

    writeStoredAccount(guest);
    return { account: guest, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    return { account: null, error: error.message };
  }

  const account: UserAccount = {
    id: data.user?.id ?? `supabase-${Date.now()}`,
    name: data.user?.user_metadata?.full_name ?? payload.email.split('@')[0],
    email: payload.email,
    role: 'user',
    isAuthenticated: true,
    favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]'),
    watchlist: JSON.parse(localStorage.getItem(STORAGE_KEYS.watchlist) ?? '[]'),
  };

  writeStoredAccount(account);
  return { account, error: null };
}

export async function resetPasswordRequest(email: string) {
  if (!supabase) {
    return { success: true, message: `Password reset instructions would be sent to ${email}.` };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Password reset email sent.' };
}

export async function signOutAccount() {
  if (supabase) {
    await supabase.auth.signOut();
  }

  const guest = { ...defaultAccount, isAuthenticated: false };
  writeStoredAccount(guest);
  return guest;
}

export function getStoredAccount() {
  return readStoredAccount();
}

export function persistFavorite(movieId: string, add: boolean) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) ?? '[]') as string[];
  const next = add ? [...new Set([...current, movieId])] : current.filter((id) => id !== movieId);
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  const account = readStoredAccount();
  const updated = { ...account, favorites: next };
  writeStoredAccount(updated);
  return next;
}

export function persistWatchlist(movieId: string, add: boolean) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.watchlist) ?? '[]') as string[];
  const next = add ? [...new Set([...current, movieId])] : current.filter((id) => id !== movieId);
  localStorage.setItem(STORAGE_KEYS.watchlist, JSON.stringify(next));
  const account = readStoredAccount();
  const updated = { ...account, watchlist: next };
  writeStoredAccount(updated);
  return next;
}

export function saveCatalogLocally(movies: Movie[]) {
  localStorage.setItem(STORAGE_KEYS.movies, JSON.stringify(movies));
}

export function seedAdminMovie(movie: Movie) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.movies) ?? '[]') as Movie[];
  const merged = [movie, ...current.filter((item) => item.id !== movie.id)];
  localStorage.setItem(STORAGE_KEYS.movies, JSON.stringify(merged));
  return merged;
}
