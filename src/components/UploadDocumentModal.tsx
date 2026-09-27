import React, { useState, useRef } from 'react';
import { dbService } from '../services/database';
import { SchoolDocument } from '../types';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, File, Trash2, ArrowUpRight } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentUploaded: (newDoc: SchoolDocument) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onDocumentUploaded,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SchoolDocument['category']>('Circular');
  const [targetAudience, setTargetAudience] = useState('All Parents & Students');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedBy, setUploadedBy] = useState('School Administration / Teacher');
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!title) {
        // Auto-fill title from filename without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-\s]+/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileType = (fileName: string): SchoolDocument['fileType'] => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext)) return 'IMAGE';
    if (['xlsx', 'xls', 'csv'].includes(ext)) return 'XLSX';
    if (['docx', 'doc'].includes(ext)) return 'DOCX';
    return 'PDF';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please enter a document title.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      let fileDataUrl: string | undefined = undefined;
      const fileName = selectedFile ? selectedFile.name : `${title.replace(/\s+/g, '_')}.pdf`;
      const fileSize = selectedFile ? formatFileSize(selectedFile.size) : '1.2 MB';
      const fileType = selectedFile ? getFileType(selectedFile.name) : 'PDF';

      if (selectedFile) {
        fileDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(selectedFile);
        });
      }

      const newDoc = dbService.uploadDocument({
        title: title.trim(),
        category,
        targetAudience,
        fileSize,
        fileType,
        fileName,
        fileContent: fileDataUrl,
        description: description.trim() || 'Official school document published via SMUK SETS Go Digital Portal.',
        uploadedBy: uploadedBy.trim() || 'School Administration',
        isImportant: category === 'Exam Timetable' || category === 'Fee Structure' || category === 'Circular',
      });

      setIsUploading(false);
      setSuccessMessage(`Document "${newDoc.title}" successfully uploaded and saved to SMUK Database!`);
      onDocumentUploaded(newDoc);

      setTimeout(() => {
        // Reset form
        setTitle('');
        setDescription('');
        setSelectedFile(null);
        setSuccessMessage(null);
        onClose();
      }, 1400);
    } catch (err) {
      setIsUploading(false);
      setErrorMessage('Failed to save document. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/70">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <UploadCloud className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">School Database Document Upload</h3>
              <p className="text-xs text-slate-400">Add circulars, exam timetables, fee schedules, or student results sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {successMessage && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 bg-red-500/15 border border-red-500/40 rounded-xl flex items-center gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* File Picker Drag & Drop Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Select Document File (PDF, DOCX, XLSX, Image)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-5 text-center cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className="w-8 h-8 mx-auto text-slate-400 group-hover:text-amber-400 transition-colors mb-2" />
              {selectedFile ? (
                <div>
                  <p className="text-sm font-bold text-amber-400">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(selectedFile.size)} • Click to replace file</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Click to browse or drop school document here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports PDF timetables, fees sheets, syllabi, Word docs, spreadsheets
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Document Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SMUK Term 3 Final Results Summary & Statistics"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Category & Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SchoolDocument['category'])}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="New Curriculum Guide">Uganda NCDC Curriculum Guide</option>
                <option value="NCDC AoI Assessment">NCDC AoI / Continuous Assessment</option>
                <option value="Exam Timetable">Exam Timetable</option>
                <option value="Results Sheet">Student Results Sheet</option>
                <option value="Fee Structure">Fee Structure</option>
                <option value="Circular">School Circular / Memo</option>
                <option value="Syllabus">SETS Syllabus & Learning Guide</option>
                <option value="Newsletter">Newsletter / Gala Digest</option>
                <option value="SETS Policy">School Policy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="All Parents & Students">All Parents & Students</option>
                <option value="Senior 1 & 2 Classes">Senior 1 & 2 Classes</option>
                <option value="Senior 3 & 4 (Candidate Classes)">Senior 3 & 4 (Candidates)</option>
                <option value="Senior 5 & 6 Advanced Level">Senior 5 & 6 (A-Level)</option>
                <option value="SETS Tech & Robotics Club">SETS Robotics Club</option>
                <option value="General Public">General Public</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Document Description / Instructions
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a short description or guide for parents regarding this document..."
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Uploaded By */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Publishing Authority / Teacher
            </label>
            <input
              type="text"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
              placeholder="e.g. Director of Studies (DOS)"
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Uploading to DB...' : 'Upload & Publish to Database'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
