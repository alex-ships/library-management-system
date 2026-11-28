import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './style.css';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const MotionLink = motion(Link);
async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try { const body = await response.json(); message = Array.isArray(body.message) ? body.message.join(', ') : body.message || message; } catch {}
    throw new Error(message);
  }
  return response.status === 204 ? null : response.json();
}

function Header() {
  return <header className="topbar"><Link className="brand" to="/" aria-label="Page & Pine home"><span className="brand-mark">P</span><span>page &amp; pine</span></Link><nav className="navigation"><NavLink to="/">Home</NavLink><NavLink to="/books">Books</NavLink><NavLink to="/manage">Manage</NavLink></nav></header>;
}
function Shell({ children }) { return <main className="page"><Header />{children}<footer><span>MADE FOR CURIOUS MINDS</span><span>EST. EVERY GOOD DAY</span></footer></main>; }
function Home() {
  const reduceMotion = Boolean(useReducedMotion());
  const rise = { hidden: { opacity: 0, y: reduceMotion ? 0 : 18 }, visible: { opacity: 1, y: 0 } };
  return <Shell><motion.section className="welcome" aria-labelledby="welcome-title" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } } }}>
    <motion.div className="hero-decoration" aria-hidden="true" animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}><span>✳</span></motion.div>
    <motion.p className="eyebrow" variants={rise}>YOUR LIBRARY, IN GOOD ORDER</motion.p><motion.h1 id="welcome-title" variants={rise}><span className="type-line">A little more room</span><span className="type-line">for <em>good stories.</em></span></motion.h1><motion.p className="intro" variants={rise}>A thoughtful home for the books you share, the readers you serve, and the stories still waiting to be found.</motion.p><motion.div className="actions" variants={rise}><MotionLink className="primary-button" to="/books" whileHover={reduceMotion ? undefined : { y: -3, boxShadow: '0 9px 22px #20332824' }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>Explore the collection <span aria-hidden="true">↗</span></MotionLink><a href="#about">Get to know us</a></motion.div>
  </motion.section><motion.section id="about" className="about" initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduceMotion ? 0 : 0.45 }}><p className="eyebrow">A PLACE FOR EVERY STORY</p><h2>Good books bring us<br />a little closer.</h2><p>Page &amp; Pine helps readers find their next favorite and gives our librarians a welcoming place to care for the collection.</p></motion.section></Shell>;
}

function BookCard({ book }) {
  const reduceMotion = Boolean(useReducedMotion());
  return <motion.article className="book-card" layout initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} whileHover={reduceMotion ? undefined : { y: -4, boxShadow: '0 12px 28px #20332818' }} transition={{ layout: { duration: reduceMotion ? 0 : 0.24 }, duration: reduceMotion ? 0 : 0.28 }}>
    <Link className="book-card-main" to={`/books/${book.id}`}><span className="book-cover" aria-hidden="true">{book.title.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span><span className="book-info"><span className="eyebrow">{book.genre?.name || 'Book'}</span><strong>{book.title}</strong><span className="muted">by {book.author}</span><span className="book-meta">{book.availableCopies} / {book.totalCopies} copies <span className={`badge ${book.availableCopies ? 'in-stock' : ''}`}>{book.availableCopies ? 'Available' : 'Checked out'}</span></span></span></Link><Link className="card-read-link" to={`/books/${book.id}/read`}>Read <span aria-hidden="true">↗</span></Link>
  </motion.article>;
}
function BookSkeleton() { return <div className="book-skeleton" aria-hidden="true"><span className="skeleton-cover" /><span className="skeleton-copy"><i /><i /><i /><i /></span></div>; }
function Books() {
  const [books, setBooks] = useState([]), [genres, setGenres] = useState([]), [search, setSearch] = useState(''), [genre, setGenre] = useState(''), [status, setStatus] = useState('loading'), [error, setError] = useState('');
  useEffect(() => { request('/genres').then(setGenres).catch(() => setGenres([])); }, []);
  useEffect(() => { let live = true; setStatus('loading'); const timer = setTimeout(() => { const params = new URLSearchParams(); if (search.trim()) params.set('search', search.trim()); if (genre) params.set('genre', genre); request(`/books?${params}`).then((data) => { if (live) { setBooks(data); setStatus('ready'); } }).catch((err) => { if (live) { setError(err.message); setStatus('error'); } }); }, 180); return () => { live = false; clearTimeout(timer); }; }, [search, genre]);
  return <Shell><section className="content"><p className="eyebrow">THE COLLECTION</p><h1 className="page-heading">Find your next<br /><em>good story.</em></h1><div className="filters"><label className="search-label"><span className="sr-only">Search title or author</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or author" /></label><label><span className="sr-only">Filter by genre</span><select value={genre} onChange={(e) => setGenre(e.target.value)}><option value="">All genres</option>{genres.map((g) => <option key={g.id} value={g.slug}>{g.name}</option>)}</select></label></div>{status === 'loading' && <div className="book-grid skeleton-grid" role="status" aria-label="Loading books">{Array.from({ length: 6 }, (_, index) => <BookSkeleton key={index} />)}</div>}{status === 'error' && <p className="notice error">Could not load the collection: {error}</p>}{status === 'ready' && (books.length ? <motion.div className="book-grid" layout><AnimatePresence initial={false}>{books.map((book) => <BookCard key={book.id} book={book} />)}</AnimatePresence></motion.div> : <p className="notice">No books match those filters. Try another search.</p>)}</section></Shell>;
}
function BookDetail() {
  const { id } = useParams(); const [book, setBook] = useState(null), [error, setError] = useState('');
  useEffect(() => { request(`/books/${id}`).then(setBook).catch((err) => setError(err.message)); }, [id]);
  return <Shell><section className="content detail">{error ? <p className="notice error">{error}</p> : !book ? <p className="notice">Loading book…</p> : <><Link className="back-link" to="/books">← Back to collection</Link><p className="eyebrow">{book.genre?.name}</p><h1 className="page-heading">{book.title}</h1><p className="detail-author">by {book.author}</p><div className="detail-panel"><p><strong>Availability</strong><span>{book.availableCopies} of {book.totalCopies} copies available</span></p><p><strong>ISBN</strong><span>{book.isbn}</span></p></div><span className={`badge ${book.availableCopies ? 'in-stock' : ''}`}>{book.availableCopies ? 'Available' : 'Checked out'}</span><div className="detail-read-action"><Link className="primary-button" to={`/books/${book.id}/read`}>Read this book <span aria-hidden="true">↗</span></Link></div></>}</section></Shell>;
}

function Reader() {
  const { id } = useParams();
  const reduceMotion = Boolean(useReducedMotion());
  const [book, setBook] = useState(null), [error, setError] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('page-pine-reader-theme') || 'light');
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('page-pine-reader-size')) || 19);
  const storageKey = `page-pine-reader-page-${id}`;
  const [pageIndex, setPageIndex] = useState(() => Number(localStorage.getItem(storageKey)) || 0);

  useEffect(() => { request(`/books/${id}/read`).then(setBook).catch((err) => setError(err.message)); }, [id]);
  useEffect(() => { localStorage.setItem(storageKey, String(pageIndex)); }, [storageKey, pageIndex]);
  useEffect(() => { localStorage.setItem('page-pine-reader-theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('page-pine-reader-size', String(fontSize)); }, [fontSize]);
  const pages = book?.content ? book.content.split(/^\s*---\s*$/m).map((page) => page.trim()).filter(Boolean) : [];
  const safePageIndex = Math.min(pageIndex, Math.max(0, pages.length - 1));
  useEffect(() => { if (pageIndex !== safePageIndex) setPageIndex(safePageIndex); }, [pageIndex, safePageIndex]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(event.target.tagName)) return;
      if (event.key === 'ArrowRight') setPageIndex((page) => Math.min(page + 1, Math.max(0, pages.length - 1)));
      if (event.key === 'ArrowLeft') setPageIndex((page) => Math.max(page - 1, 0));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pages.length]);

  function renderText(page) {
    const blocks = page.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
    return blocks.map((block, index) => {
      const heading = block.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const Heading = `h${heading[1].length}`;
        return <Heading key={index}>{heading[2]}</Heading>;
      }
      const lines = block.split('\n').map((line) => line.trim());
      if (lines.every((line) => /^[-*+]\s+/.test(line))) {
        return <ul key={index}>{lines.map((line, itemIndex) => <li key={itemIndex}>{line.replace(/^[-*+]\s+/, '')}</li>)}</ul>;
      }
      if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
        return <ol key={index}>{lines.map((line, itemIndex) => <li key={itemIndex}>{line.replace(/^\d+[.)]\s+/, '')}</li>)}</ol>;
      }
      return <p key={index}>{lines.join(' ')}</p>;
    });
  }

  return <main className={`reader-shell reader-${theme}`}>
    <header className="reader-topbar"><Link className="reader-back" to={book ? `/books/${book.id}` : '/books'}>← Collection</Link><Link className="brand" to="/"><span className="brand-mark">P</span><span>page &amp; pine</span></Link><span className="reader-book-label">{book?.title || 'Reading room'}</span></header>
    <section className="reader-controls" aria-label="Reading preferences"><div className="theme-control" aria-label="Reading theme"><button type="button" className={theme === 'light' ? 'selected' : ''} onClick={() => setTheme('light')} aria-label="Light theme">☼</button><button type="button" className={theme === 'sepia' ? 'selected' : ''} onClick={() => setTheme('sepia')} aria-label="Sepia theme">◐</button><button type="button" className={theme === 'dark' ? 'selected' : ''} onClick={() => setTheme('dark')} aria-label="Dark theme">☾</button></div><label className="font-control">Aa <input aria-label="Font size" type="range" min="16" max="28" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} /> Aa</label></section>
    {error ? <p className="reader-message">We couldn’t open this book right now. {error}</p> : !book ? <p className="reader-message">Preparing your reading room…</p> : !pages.length ? <section className="reader-empty"><span className="eyebrow">A STORY WAITING TO BE ADDED</span><h1>{book.title}</h1><p>This book does not have reading content yet. Check back soon, or ask a librarian to add text they have the rights to share.</p><Link className="back-link" to={`/books/${book.id}`}>Back to book details</Link></section> : <>
      <div className="reader-progress" role="progressbar" aria-valuenow={safePageIndex + 1} aria-valuemin="1" aria-valuemax={pages.length} aria-label="Reading progress"><motion.span initial={false} animate={{ width: `${((safePageIndex + 1) / pages.length) * 100}%` }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }} /></div>
      <AnimatePresence mode="wait" initial={false}><motion.article className="reader-page" key={`${id}-${safePageIndex}`} style={{ fontSize: `${fontSize}px` }} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }} transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: 'easeOut' }}><div className="reader-page-copy">{renderText(pages[safePageIndex])}</div><span className="reader-page-number">{safePageIndex + 1} / {pages.length}</span><div className="reader-page-progress" role="progressbar" aria-valuemin="1" aria-valuemax={pages.length} aria-valuenow={safePageIndex + 1} aria-valuetext={`Page ${safePageIndex + 1} of ${pages.length}`} aria-label="Book page progress"><motion.span initial={false} animate={{ width: `${((safePageIndex + 1) / pages.length) * 100}%` }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }} /></div></motion.article></AnimatePresence>
      <nav className="reader-navigation" aria-label="Page navigation"><button className="secondary-button" onClick={() => setPageIndex((page) => Math.max(0, page - 1))} disabled={safePageIndex === 0}>← Previous</button><span>Use your arrow keys to turn pages</span><button onClick={() => setPageIndex((page) => Math.min(pages.length - 1, page + 1))} disabled={safePageIndex >= pages.length - 1}>Next →</button></nav>
    </>}
  </main>;
}

const blank = { title: '', author: '', isbn: '', totalCopies: '1', availableCopies: '1', genreId: '' };
function Manage() {
  const [books, setBooks] = useState([]), [genres, setGenres] = useState([]), [form, setForm] = useState(blank), [editing, setEditing] = useState(null), [message, setMessage] = useState(''), [error, setError] = useState('');
  const refresh = () => request('/books').then(setBooks).catch((e) => setError(e.message));
  useEffect(() => { refresh(); request('/genres').then(setGenres).catch((e) => setError(e.message)); }, []);
  const updateField = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); setMessage(''); setError(''); const payload = { ...form, totalCopies: Number(form.totalCopies), availableCopies: Number(form.availableCopies), genreId: Number(form.genreId) }; try { await request(editing ? `/books/${editing}` : '/books', { method: editing ? 'PATCH' : 'POST', body: JSON.stringify(payload) }); setForm(blank); setEditing(null); setMessage(editing ? 'Book updated.' : 'Book added.'); await refresh(); } catch (err) { setError(err.message); } };
  const edit = async (book) => { try { const fullBook = await request(`/books/${book.id}`); setEditing(book.id); setForm({ title: fullBook.title, author: fullBook.author, isbn: fullBook.isbn, totalCopies: String(fullBook.totalCopies), availableCopies: String(fullBook.availableCopies), genreId: String(fullBook.genreId), content: fullBook.content || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) { setError(err.message); } };
  const remove = async (book) => { if (!window.confirm(`Delete “${book.title}”?`)) return; try { await request(`/books/${book.id}`, { method: 'DELETE' }); setMessage('Book deleted.'); await refresh(); } catch (err) { setError(err.message); } };
  return <Shell><section className="content manage"><p className="eyebrow">LIBRARIAN DESK</p><h1 className="page-heading">Manage the<br /><em>collection.</em></h1><form className="book-form" onSubmit={submit}><h2>{editing ? 'Edit book' : 'Add a book'}</h2><div className="form-grid"><label>Title<input required name="title" value={form.title} onChange={updateField} /></label><label>Author<input required name="author" value={form.author} onChange={updateField} /></label><label>ISBN<input required name="isbn" value={form.isbn} onChange={updateField} /></label><label>Genre<select required name="genreId" value={form.genreId} onChange={updateField}><option value="">Choose a genre</option>{genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></label><label>Total copies<input required type="number" min="0" name="totalCopies" value={form.totalCopies} onChange={updateField} /></label><label>Available copies<input required type="number" min="0" name="availableCopies" value={form.availableCopies} onChange={updateField} /></label></div><label className="content-field">Reading content<textarea name="content" rows="12" value={form.content || ''} onChange={updateField} placeholder="Paste text you have the rights to share, or upload a .txt or .md file." /><span>Use a line containing --- to separate reader pages.</span><input className="file-input" type="file" accept=".txt,.md,text/plain,text/markdown" aria-label="Upload a text or Markdown file" onChange={async (event) => { const file = event.target.files?.[0]; if (file) { const content = await file.text(); setForm((current) => ({ ...current, content })); } }} /></label><div className="form-actions"><button type="submit">{editing ? 'Save changes' : 'Add book'}</button>{editing && <button type="button" className="secondary-button" onClick={() => { setEditing(null); setForm(blank); }}>Cancel</button>}</div>{message && <p className="success-message">{message}</p>}{error && <p className="error">{error}</p>}</form><h2 className="manage-subheading">Current books</h2><div className="manage-list">{books.map((book) => <div className="manage-row" key={book.id}><span><strong>{book.title}</strong><small>{book.author} · {book.genre?.name}</small></span><span className="row-actions"><button className="text-button" onClick={() => edit(book)}>Edit</button><button className="text-button danger" onClick={() => remove(book)}>Delete</button></span></div>)}{!books.length && <p className="notice">No books are in the collection yet.</p>}</div></section></Shell>;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = Boolean(useReducedMotion());
  return <AnimatePresence mode="wait" initial={false}><motion.div className="route-stage" key={location.pathname} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0.1 : 0.2, ease: 'easeOut' }}><Routes location={location}><Route path="/" element={<Home />} /><Route path="/books" element={<Books />} /><Route path="/books/:id/read" element={<Reader />} /><Route path="/books/:id" element={<BookDetail />} /><Route path="/manage" element={<Manage />} /></Routes></motion.div></AnimatePresence>;
}
function App() { return <BrowserRouter><AnimatedRoutes /></BrowserRouter>; }
createRoot(document.getElementById('root')).render(<App />);
