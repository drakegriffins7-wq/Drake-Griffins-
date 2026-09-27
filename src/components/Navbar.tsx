import React from 'react';
import { TabType } from '../types';
import { SMUK_TAG_IMAGE, APP_NAME, SCHOOL_NAME } from '../assets/logo';
import { Home, Radio, Bell, User, Upload, Search, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenUploadModal: () => void;
  onOpenQuickSearch: () => void;
  activeStudentName?: string;
  hasLiveNow?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenUploadModal,
  onOpenQuickSearch,
  activeStudentName,
  hasLiveNow = true,
}) => {
  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-900/85 border-b border-slate-800 transition-all shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Brand Logo & Name */}
            <div
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3.5 cursor-pointer group select-none"
            >
              <div className="relative">
                <div className="w-10 h-13 sm:w-11 sm:h-14 rounded-xl bg-white p-1 ring-2 ring-amber-400/80 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                  <img
                    src={SMUK_TAG_IMAGE}
                    alt="St. Kalemba S.S Villamaria Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-900">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-lg sm:text-xl tracking-tight group-hover:text-amber-300 transition-colors">
                    {SCHOOL_NAME}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                    SETS
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <span>Go Digital</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">Parent & Student Portal</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/60">
              <button
                onClick={() => onSelectTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => onSelectTab('live')}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'live'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Radio className={`w-4 h-4 ${hasLiveNow ? 'text-red-400 animate-pulse' : ''}`} />
                <span>Live</span>
                {hasLiveNow && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectTab('updates')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'updates'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Updates</span>
              </button>

              <button
                onClick={() => onSelectTab('profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'profile'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick ID Lookup Search Trigger */}
              <button
                onClick={onOpenQuickSearch}
                className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-all cursor-pointer"
                title="Input Student ID to view results"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Input Student ID</span>
              </button>

              {/* Database Upload Documents Button */}
              <button
                onClick={onOpenUploadModal}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                title="Upload documents to school database"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload Docs</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 print:hidden shadow-2xl">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'home' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('live')}
            className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'live' ? 'text-red-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Live</span>
            {hasLiveNow && (
              <span className="absolute top-1 right-5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('updates')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'updates' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Updates</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'profile' ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};
