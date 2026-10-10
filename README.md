@import 'tailwindcss';

:root {
  --bg: #0d0f14;
  --bg-soft: #141821;
  --panel: rgba(22, 24, 31, 0.88);
  --panel-strong: #171d28;
  --gold: #d4af37;
  --gold-soft: #f2d27a;
  --red: #b71c1c;
  --red-soft: #d32f2f;
  --text: #f5f7fa;
  --text-muted: #b4bcc5;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: rgba(0, 0, 0, 0.28);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(183, 28, 28, 0.2), transparent 35%),
    linear-gradient(180deg, #090b10 0%, #111722 100%);
  color: var(--text);
  font-family: Inter, 'Segoe UI', sans-serif;
}

button, input, select, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

#root {
  min-height: 100vh;
}

.app-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  background: rgba(15, 18, 24, 0.74);
  border: 1px solid var(--border);
  border-radius: 18px;
  position: sticky;
  top: 12px;
  z-index: 20;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
  cursor: pointer;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--red), #4a0f10);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
  box-shadow: 0 10px 25px rgba(183, 28, 28, 0.4);
}

.brand-wrap strong {
  display: block;
  font-size: 1rem;
}

.brand-wrap small {
  display: block;
  color: var(--text-muted);
}

.main-nav {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.nav-item, .tab {
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  border-radius: 999px;
  padding: 9px 14px;
  transition: 0.2s ease;
}

.nav-item:hover, .tab:hover {
  border-color: rgba(212, 175, 55, 0.34);
}

.nav-item.active, .tab.active {
  background: linear-gradient(90deg, rgba(183, 28, 28, 0.4), rgba(212, 175, 55, 0.2));
  border-color: rgba(212, 175, 55, 0.52);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
}

.page-shell {
  padding-top: 28px;
}

.home-shell {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.featured-banner {
  min-height: 420px;
  border-radius: 32px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.24);
}

.featured-copy {
  max-width: 540px;
  padding: 54px 40px;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-soft);
  margin: 0 0 12px;
}

.eyebrow.small {
  font-size: 0.68rem;
}

.featured-copy h1, .detail-copy h1 {
  margin: 0 0 12px;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 1.05;
}

.featured-copy p, .detail-copy p {
  color: rgba(245, 247, 250, 0.84);
  line-height: 1.7;
}

.featured-meta, .meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 24px;
}

.featured-meta span, .meta-row span {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 0.78rem;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.primary-button, .secondary-button, .ghost-button, .tiny-button, .chip-button {
  border: 1px solid transparent;
  border-radius: 12px;
  transition: 0.2s ease;
}

.primary-button {
  background: linear-gradient(90deg, var(--red), #6f1219);
  color: white;
  padding: 12px 18px;
  box-shadow: 0 18px 30px rgba(183, 28, 28, 0.26);
}

.primary-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.secondary-button {
  background: rgba(212, 175, 55, 0.12);
  color: var(--gold-soft);
  padding: 12px 18px;
  border-color: rgba(212, 175, 55, 0.4);
}

.ghost-button {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  padding: 12px 18px;
  border-color: rgba(255, 255, 255, 0.12);
}

.tiny-button {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  padding: 8px 10px;
}

.panel, .empty-panel, .video-placeholder {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.14);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
}

.search-box {
  flex: 1;
}

.search-box input, .auth-form input, .admin-form input, .admin-form select, .admin-form textarea, .filter-row select {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 14px;
}

.filter-row {
  display: flex;
  gap: 12px;
}

.filter-row select {
  min-width: 140px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
}

.section-heading h2 {
  margin: 4px 0 0;
  font-size: clamp(1.5rem, 3vw, 2.3rem);
}

.section-heading p {
  margin: 0;
  color: var(--text-muted);
}

.movie-grid, .vj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.movie-card {
  background: rgba(18, 19, 24, 0.9);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
}

.movie-card.compact {
  min-height: 100%;
}

.poster-wrap {
  position: relative;
  cursor: pointer;
}

.poster-wrap img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.poster-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.72));
  color: white;
  font-size: 0.7rem;
}

.movie-body {
  padding: 14px 14px 16px;
}

.movie-headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.movie-headline h3 {
  margin: 0;
  font-size: 1.05rem;
}

.movie-headline span {
  color: var(--gold-soft);
  font-weight: 700;
}

.movie-body p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.vj-card {
  background: rgba(18, 19, 24, 0.9);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
}

.vj-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.vj-card-body {
  padding: 16px;
}

.vj-card-body h3 {
  margin: 0 0 10px;
}

.vj-card-body p {
  margin: 0 0 16px;
  color: var(--text-muted);
  line-height: 1.7;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip-button {
  background: rgba(212, 175, 55, 0.12);
  border-color: rgba(212, 175, 55, 0.3);
  color: var(--gold-soft);
  padding: 8px 10px;
}

.movie-detail-hero {
  background-size: cover;
  background-position: center;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.detail-grid {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 28px;
  padding: 34px;
}

.detail-poster {
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.34);
}

.detail-copy {
  align-self: center;
}

.media-section {
  margin-top: 24px;
}

.video-wrapper {
  background: rgba(9, 11, 16, 0.9);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  padding: 12px;
}

.video-player {
  width: 100%;
  border-radius: 16px;
  background: #000;
  display: block;
  aspect-ratio: 16 / 9;
}

.video-placeholder {
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
}

.account-layout, .admin-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.auth-form, .admin-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.auth-form label, .admin-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-muted);
}

.notice {
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 0.9rem;
}

.notice.success {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #b2f1bf;
}

.notice.error {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fecaca;
}

.notice.info {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.25);
  color: #dbeafe;
}

.tab-row {
  display: flex;
  gap: 8px;
  margin: 22px 0;
}

.mini-list {
  margin-top: 22px;
}

.mini-list h3 {
  margin-bottom: 12px;
}

.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--text);
  margin-bottom: 8px;
}

.muted {
  color: var(--text-muted);
}

.admin-panel {
  padding: 18px;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.toggle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.toggle-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px 12px;
  color: var(--text-muted);
}

.empty-panel {
  padding: 26px 20px;
  text-align: center;
  color: var(--text-muted);
}

.loading-state {
  display: grid;
  place-items: center;
  min-height: 300px;
  text-align: center;
  color: var(--text-muted);
}

.spinner {
  width: 46px;
  height: 46px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--gold-soft);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.site-footer {
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 18px 0;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}

.site-footer p {
  margin: 8px 0 0;
}

.footer-note {
  max-width: 420px;
  font-size: 0.82rem;
  text-align: right;
}

@media (max-width: 820px) {
  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .brand-wrap, .main-nav, .user-chip {
    justify-content: center;
  }

  .toolbar, .section-heading, .site-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .detail-grid,
  .two-column {
    grid-template-columns: 1fr;
  }

  .featured-copy {
    padding: 32px 22px;
  }
}

@media (max-width: 560px) {
  .app-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .main-nav {
    width: 100%;
  }

  .nav-item {
    flex: 1 1 44%;
  }

  .action-row, .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-button, .secondary-button, .ghost-button, .tiny-button {
    width: 100%;
    justify-content: center;
  }
}
