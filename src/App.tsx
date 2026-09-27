/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, StudentResult, SchoolDocument, SchoolUpdate, LiveStream } from './types';
import { dbService } from './services/database';
import { SMUK_TAG_IMAGE, APP_NAME, SCHOOL_NAME, SCHOOL_MOTTO } from './assets/logo';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { LiveSection } from './components/LiveSection';
import { UpdatesSection } from './components/UpdatesSection';
import { ProfileSection } from './components/ProfileSection';
import { ReportCardModal } from './components/ReportCardModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [students, setStudents] = useState<StudentResult[]>([]);
  const [documents, setDocuments] = useState<SchoolDocument[]>([]);
  const [updates, setUpdates] = useState<SchoolUpdate[]>([]);
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);

  // Search & Active Student State
  const [searchQuery, setSearchQuery] = useState('');
  const [foundStudent, setFoundStudent] = useState<StudentResult | null>(null);
  const [activeStudent, setActiveStudent] = useState<StudentResult | null>(null);

  // Modals
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Load initial database data
  const loadDatabaseData = () => {
    const allStudents = dbService.getAllStudents();
    const allDocs = dbService.getAllDocuments();
    const allUpd = dbService.getAllUpdates();
    const allStreams = dbService.getAllLiveStreams();

    setStudents(allStudents);
    setDocuments(allDocs);
    setUpdates(allUpd);
    setLiveStreams(allStreams);

    const activeId = dbService.getActiveStudentId();
    const current = allStudents.find((s) => s.studentId === activeId) || allStudents[0] || null;
    setActiveStudent(current);

    // Initial search preview for easy exploration
    if (!foundStudent && current) {
      setFoundStudent(current);
      setSearchQuery(current.studentId);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  const handleSearchStudent = (query: string) => {
    const student = dbService.getStudentById(query);
    setFoundStudent(student);
    if (student) {
      setActiveStudent(student);
      dbService.setActiveStudentId(student.studentId);
    }
  };

  const handleOpenQuickSearch = () => {
    setCurrentTab('home');
    const el = document.getElementById('results-lookup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeLiveStream = liveStreams.find((s) => s.status === 'live') || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenQuickSearch={handleOpenQuickSearch}
        activeStudentName={activeStudent?.fullName}
        hasLiveNow={Boolean(activeLiveStream)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'home' && (
          <HomeSection
            onSearchStudent={handleSearchStudent}
            foundStudent={foundStudent}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenReportCard={() => setIsReportCardOpen(true)}
            onNavigateTab={setCurrentTab}
            documents={documents}
            updates={updates}
            liveStream={activeLiveStream}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {currentTab === 'live' && (
          <LiveSection
            streams={liveStreams}
            onRefreshStreams={loadDatabaseData}
          />
        )}

        {currentTab === 'updates' && (
          <UpdatesSection
            updates={updates}
            onUpdateAdded={(newUpd) => {
              setUpdates((prev) => [newUpd, ...prev]);
            }}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileSection
            currentStudent={activeStudent || foundStudent}
            allStudents={students}
            documents={documents}
            onSelectStudent={(selected) => {
              setActiveStudent(selected);
              setFoundStudent(selected);
              setSearchQuery(selected.studentId);
              dbService.setActiveStudentId(selected.studentId);
            }}
            onOpenReportCard={() => setIsReportCardOpen(true)}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onRefreshData={loadDatabaseData}
          />
        )}
      </main>

      {/* Official Academic Report Card Modal */}
      <ReportCardModal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        student={foundStudent || activeStudent}
      />

      {/* Document Upload to Database Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onDocumentUploaded={(newDoc) => {
          setDocuments((prev) => [newDoc, ...prev]);
        }}
      />

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 rounded-lg bg-white p-0.5 border border-amber-400/50 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={SMUK_TAG_IMAGE}
                alt="St. Kalemba S.S Villamaria Badge"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">{SCHOOL_NAME} (ST. KALEMBA S.S VILLAMARIA) • {APP_NAME}</p>
              <p className="text-[11px] text-slate-300 font-semibold italic">&quot;{SCHOOL_MOTTO}&quot; • All Rights Reserved © 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentTab('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('live')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Live
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('updates')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Updates
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('profile')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Profile & Database
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
