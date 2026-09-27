import React, { useState, useEffect, useRef } from 'react';
import { LiveStream, ChatMessage } from '../types';
import { dbService } from '../services/database';
import { SMUK_TAG_IMAGE, SCHOOL_NAME, TIKTOK_ACCOUNT_NAME, TIKTOK_HANDLE, TIKTOK_LIVE_URL } from '../assets/logo';
import {
  Radio,
  Users,
  Send,
  MessageSquare,
  Volume2,
  VolumeX,
  Maximize2,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  ThumbsUp,
  Award,
  Play,
  Share2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface LiveSectionProps {
  streams: LiveStream[];
  onRefreshStreams: () => void;
}

export const LiveSection: React.FC<LiveSectionProps> = ({ streams, onRefreshStreams }) => {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(
    streams.find((s) => s.status === 'live')?.id || streams[0]?.id || 'LIVE-001'
  );
  const activeStream = streams.find((s) => s.id === selectedStreamId) || streams[0];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(activeStream?.chatMessages || []);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'Parent' | 'Student' | 'Teacher' | 'Admin'>('Parent');
  const [messageText, setMessageText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [reactionCounter, setReactionCounter] = useState(128);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({});
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when messages update
  useEffect(() => {
    if (activeStream) {
      setChatMessages(activeStream.chatMessages);
    }
  }, [selectedStreamId, activeStream]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const senderName = userName.trim() || 'Parent (SMUK Guardian)';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: senderName,
      role: userRole,
      message: messageText.trim(),
      timestamp: 'Just now',
    };

    dbService.sendChatMessage(activeStream.id, {
      sender: senderName,
      role: userRole,
      message: messageText.trim(),
    });

    setChatMessages((prev) => [...prev, newMsg]);
    setMessageText('');
  };

  const triggerReaction = (emoji: string) => {
    setReactionCounter((c) => c + 1);
    const newId = Date.now() + Math.random();
    const left = Math.floor(Math.random() * 80) + 10;
    setFloatingEmojis((prev) => [...prev, { id: newId, emoji, left }]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== newId));
    }, 2000);
  };

  const toggleReminder = (streamId: string) => {
    setRemindersSet((prev) => ({
      ...prev,
      [streamId]: !prev[streamId],
    }));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>SMUK SETS LIVE BROADCAST PORTAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Live Assemblies & School Events</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Stream Speech Days, STEM exhibits, debates, and morning prayers live directly from Kampala Campus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={TIKTOK_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 via-red-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
            title={`Watch live broadcast on TikTok: ${TIKTOK_ACCOUNT_NAME} (${TIKTOK_HANDLE})`}
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43 6.31 6.31 0 0 0 1.93-4.52V8.92a8.28 8.28 0 0 0 4.8 1.53V7a4.84 4.84 0 0 1-1-.31z"/>
            </svg>
            <span>Join Live on TikTok ({TIKTOK_ACCOUNT_NAME})</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">
              <strong className="text-white font-bold">{activeStream?.viewersCount || 420}</strong> Connected
            </span>
          </div>
        </div>
      </div>

      {/* Main Broadcast Screen & Live Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video Player Box */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl group flex flex-col justify-between p-4">
            {/* Background Stream Simulation Graphic */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
                 style={{ backgroundImage: `url(${activeStream?.thumbnailUrl})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60" />

            {/* Simulated Live Stage Graphics Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center space-y-3 p-4">
                <div className="relative inline-block">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-4 border-amber-400/80 p-1.5 mx-auto bg-white shadow-2xl animate-pulse flex items-center justify-center overflow-hidden">
                    <img
                      src={SMUK_TAG_IMAGE}
                      alt="St. Kalemba S.S Villamaria Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute bottom-0 right-2 px-2 py-0.5 text-[9px] font-black rounded-full bg-red-600 text-white uppercase tracking-wider shadow">
                    1080p HD
                  </span>
                </div>

                <div className="backdrop-blur-md bg-slate-900/70 p-3 rounded-2xl border border-slate-700/60 max-w-md mx-auto">
                  <span className="text-xs uppercase font-mono text-amber-400 tracking-wider font-bold">
                    Official Live Feed • SMUK SETS Studio
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                    {activeStream?.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Host: <strong className="text-amber-300">{activeStream?.speaker}</strong> ({activeStream?.speakerRole})
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Floating Emojis */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingEmojis.map((item) => (
                <div
                  key={item.id}
                  style={{ left: `${item.left}%` }}
                  className="absolute bottom-12 text-3xl animate-bounce transition-all opacity-90"
                >
                  {item.emoji}
                </div>
              ))}
            </div>

            {/* Top Bar inside Player */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  LIVE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-mono font-medium border border-slate-700">
                  {activeStream?.viewersCount} Watching
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 backdrop-blur-md border border-slate-700 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={() => alert('Full-screen mode simulated.')}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 backdrop-blur-md border border-slate-700 transition-colors cursor-pointer"
                  title="Full Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Controls Bar inside Player */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-medium">Reactions:</span>
                <div className="flex items-center gap-1.5">
                  {['❤️', '👏', '🎓', '🔥', '💡'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => triggerReaction(emoji)}
                      className="px-2 py-1 text-sm bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md rounded-lg border border-slate-700/80 transition-transform active:scale-125 cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs font-mono text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                {reactionCounter} Cheers Sent
              </div>
            </div>
          </div>

          {/* Stream Information Card */}
          <div className="p-5 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">{activeStream?.title}</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 self-start sm:self-auto font-semibold">
                {activeStream?.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStream?.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-700/50">
              <span><strong>Speaker:</strong> {activeStream?.speaker}</span>
              <span>•</span>
              <span><strong>Time:</strong> {activeStream?.scheduledFor}</span>
              <span>•</span>
              <span><strong>Duration:</strong> {activeStream?.duration}</span>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Chat Room */}
        <div className="flex flex-col h-[520px] bg-slate-900/90 border border-slate-700/70 rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Parent & Community Chat</h4>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
              Live Q&A Open
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  msg.role === 'Admin'
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-200'
                    : msg.role === 'Teacher'
                    ? 'bg-blue-500/15 border-blue-500/30 text-blue-200'
                    : 'bg-slate-800/80 border-slate-700/50 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{msg.sender}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        msg.role === 'Admin'
                          ? 'bg-amber-400 text-slate-950'
                          : msg.role === 'Teacher'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {msg.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Chat Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-800/90 border-t border-slate-700 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name (Parent / Guardian)"
                className="w-1/2 px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as any)}
                className="w-1/2 px-2 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="Parent">Role: Parent / Guardian</option>
                <option value="Student">Role: Student</option>
                <option value="Teacher">Role: Teacher / Staff</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Ask a question or cheer for students..."
                className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Broadcasts Schedule (Upcoming & Recorded Replays) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Broadcast Schedule & Video Archives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => setSelectedStreamId(stream.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedStreamId === stream.id
                  ? 'bg-slate-800/90 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2.5">
                <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                  <img
                    src={stream.thumbnailUrl}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black uppercase rounded shadow ${
                        stream.status === 'live'
                          ? 'bg-red-600 text-white animate-pulse'
                          : stream.status === 'upcoming'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      {stream.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                    {stream.duration || '45m'}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {stream.category}
                </span>
                <h5 className="font-bold text-white text-sm line-clamp-1">{stream.title}</h5>
                <p className="text-xs text-slate-400 line-clamp-2">{stream.subtitle}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {stream.scheduledFor}
                </span>

                {stream.status === 'upcoming' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReminder(stream.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      remindersSet[stream.id]
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {remindersSet[stream.id] ? <CheckCircle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                    <span>{remindersSet[stream.id] ? 'Reminder Set' : 'Notify Me'}</span>
                  </button>
                ) : (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span>{stream.status === 'live' ? 'Watch Live' : 'Watch Replay'}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
