import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Main page
app.get('/', (c) => {
  return c.html(homePage())
})

// Thank you page after form submit
app.post('/contact', async (c) => {
  return c.html(thankYouPage())
})

function homePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AkshTech Solutions | SAP PP · QM · PS Consulting</title>
  <meta name="description" content="Expert SAP PP, QM, and PS consulting and implementation services. Ronit Rao – certified SAP contractor delivering end-to-end manufacturing, quality, and project systems solutions." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">

  <!-- AOS Animation -->
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">

  <style>
    /* ===== CSS VARIABLES ===== */
    :root {
      --primary: #0052CC;
      --primary-dark: #003B96;
      --primary-light: #1A6FE6;
      --accent: #00B4D8;
      --accent2: #F59E0B;
      --dark: #0A0E1A;
      --dark2: #131929;
      --dark3: #1C2539;
      --text-primary: #F0F4FF;
      --text-secondary: #9BA8C3;
      --text-muted: #5C6B8A;
      --border: rgba(255,255,255,0.08);
      --glass: rgba(255,255,255,0.04);
      --glass-hover: rgba(255,255,255,0.08);
      --gradient: linear-gradient(135deg, #0052CC 0%, #00B4D8 100%);
      --gradient2: linear-gradient(135deg, #0A0E1A 0%, #1C2539 100%);
      --shadow: 0 20px 60px rgba(0,82,204,0.2);
      --shadow-sm: 0 4px 20px rgba(0,0,0,0.3);
      --radius: 16px;
      --radius-lg: 24px;
    }

    /* ===== RESET & BASE ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--dark);
      color: var(--text-primary);
      overflow-x: hidden;
      line-height: 1.6;
    }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; color: inherit; }
    ul { list-style: none; }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--dark2); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 3px; }

    /* ===== NAVIGATION ===== */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 16px 0;
      transition: all 0.3s ease;
    }
    .nav.scrolled {
      background: rgba(10,14,26,0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 12px 0;
    }
    .nav-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 0 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo {
      display: flex; align-items: center; gap: 12px;
    }
    .logo-icon {
      width: 44px; height: 44px;
      background: var(--gradient);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: 900;
      font-family: 'Poppins', sans-serif;
      color: white;
      box-shadow: 0 4px 15px rgba(0,82,204,0.4);
    }
    .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
    .logo-text span:first-child {
      font-family: 'Poppins', sans-serif;
      font-weight: 800; font-size: 18px;
      background: var(--gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .logo-text span:last-child {
      font-size: 10px; color: var(--text-secondary); font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    }
    .nav-links {
      display: flex; align-items: center; gap: 8px;
    }
    .nav-links a {
      padding: 8px 16px; font-size: 14px; font-weight: 500;
      color: var(--text-secondary);
      border-radius: 8px;
      transition: all 0.2s;
    }
    .nav-links a:hover { color: var(--text-primary); background: var(--glass-hover); }
    .nav-cta {
      padding: 10px 24px !important;
      background: var(--gradient) !important;
      color: white !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      box-shadow: 0 4px 15px rgba(0,82,204,0.3);
    }
    .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,82,204,0.5) !important; }
    .nav-toggle {
      display: none;
      background: none; border: none; cursor: pointer;
      color: var(--text-primary); font-size: 22px; padding: 4px;
    }
    .mobile-menu {
      display: none;
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(10,14,26,0.98);
      backdrop-filter: blur(20px);
      z-index: 999;
      flex-direction: column; align-items: center; justify-content: center; gap: 24px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      font-size: 22px; font-weight: 600;
      color: var(--text-secondary);
      transition: color 0.2s;
    }
    .mobile-menu a:hover { color: white; }
    .mobile-close {
      position: absolute; top: 24px; right: 24px;
      background: none; border: none; color: white; font-size: 28px; cursor: pointer;
    }

    /* ===== HERO ===== */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center;
      position: relative; overflow: hidden;
      padding: 120px 0 80px;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,82,204,0.25) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,180,216,0.15) 0%, transparent 60%),
                  var(--dark);
    }
    .hero-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(0,82,204,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,82,204,0.06) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
    }
    .hero-orb1 {
      position: absolute; top: 10%; right: 5%;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(0,82,204,0.18) 0%, transparent 70%);
      border-radius: 50%;
      animation: float 8s ease-in-out infinite;
    }
    .hero-orb2 {
      position: absolute; bottom: 20%; left: -5%;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%);
      border-radius: 50%;
      animation: float 10s ease-in-out infinite reverse;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(5deg); }
    }
    .hero-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 0 24px;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 60px; align-items: center;
      position: relative; z-index: 1;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 16px;
      background: rgba(0,82,204,0.15);
      border: 1px solid rgba(0,82,204,0.3);
      border-radius: 100px;
      font-size: 13px; font-weight: 500; color: var(--accent);
      margin-bottom: 24px;
    }
    .hero-badge span { display: inline-block; width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
    .hero-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(36px, 5vw, 64px);
      font-weight: 800; line-height: 1.1;
      margin-bottom: 24px;
    }
    .hero-title .gradient-text {
      background: var(--gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 17px; color: var(--text-secondary); line-height: 1.7;
      margin-bottom: 40px; max-width: 500px;
    }
    .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px;
      background: var(--gradient);
      color: white; font-size: 15px; font-weight: 600;
      border-radius: var(--radius); border: none; cursor: pointer;
      box-shadow: var(--shadow);
      transition: all 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 25px 70px rgba(0,82,204,0.4); }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px;
      background: var(--glass);
      color: var(--text-primary); font-size: 15px; font-weight: 600;
      border-radius: var(--radius); border: 1px solid var(--border); cursor: pointer;
      transition: all 0.3s;
    }
    .btn-secondary:hover { background: var(--glass-hover); border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

    .hero-stats {
      display: flex; gap: 32px; margin-top: 48px;
      padding-top: 32px; border-top: 1px solid var(--border);
    }
    .hero-stat-num {
      font-family: 'Poppins', sans-serif;
      font-size: 32px; font-weight: 800;
      background: var(--gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-stat-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

    /* Hero Right - Profile Card */
    .hero-visual { position: relative; }
    .profile-card {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
      position: relative;
      overflow: hidden;
    }
    .profile-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: var(--gradient);
    }
    .profile-top {
      display: flex; align-items: center; gap: 20px; margin-bottom: 24px;
    }
    .profile-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; font-weight: 800; color: white;
      font-family: 'Poppins', sans-serif;
      flex-shrink: 0;
      box-shadow: 0 8px 30px rgba(0,82,204,0.4);
    }
    .profile-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .profile-title { font-size: 14px; color: var(--accent); font-weight: 500; }
    .profile-company { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
    .profile-modules {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .module-badge {
      padding: 6px 14px;
      background: rgba(0,82,204,0.15);
      border: 1px solid rgba(0,82,204,0.3);
      border-radius: 100px;
      font-size: 13px; font-weight: 600; color: #60A5FA;
    }
    .profile-meta {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;
    }
    .meta-item {
      background: var(--glass);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 14px;
    }
    .meta-value { font-size: 20px; font-weight: 700; color: var(--accent); }
    .meta-key { font-size: 11px; color: var(--text-muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
    .profile-availability {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px;
      background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.2);
      border-radius: 10px;
      font-size: 14px; color: #34D399; font-weight: 500;
    }
    .avail-dot { width: 8px; height: 8px; background: #34D399; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }

    /* Floating badges */
    .floating-badge {
      position: absolute;
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 10px 16px;
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; font-weight: 600;
      box-shadow: var(--shadow-sm);
      animation: float 6s ease-in-out infinite;
    }
    .fb1 { top: -20px; right: -30px; animation-delay: 0s; }
    .fb2 { bottom: 60px; left: -40px; animation-delay: 2s; }
    .fb3 { bottom: -20px; right: 20px; animation-delay: 4s; }

    /* ===== SECTION BASE ===== */
    section { padding: 100px 0; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 16px;
    }
    .section-label::before {
      content: ''; display: block; width: 24px; height: 2px; background: var(--accent); border-radius: 1px;
    }
    .section-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(28px, 4vw, 48px);
      font-weight: 800; line-height: 1.2;
      margin-bottom: 16px;
    }
    .section-desc {
      font-size: 17px; color: var(--text-secondary); max-width: 600px; line-height: 1.7;
    }

    /* ===== TRUSTED BY ===== */
    .trusted-section {
      padding: 40px 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .trusted-label {
      font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: var(--text-muted); margin-bottom: 28px; text-align: center;
    }
    .trusted-logos {
      display: flex; align-items: center; justify-content: center;
      gap: 48px; flex-wrap: wrap;
    }
    .trusted-logo-item {
      font-size: 16px; font-weight: 700; color: var(--text-muted);
      letter-spacing: 1px; transition: color 0.2s;
      display: flex; align-items: center; gap: 8px;
    }
    .trusted-logo-item:hover { color: var(--text-secondary); }
    .trusted-logo-item i { font-size: 20px; }

    /* ===== SERVICES ===== */
    .services-section { background: var(--dark2); }
    .services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 24px; margin-top: 60px;
    }
    .service-card {
      background: var(--dark);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px;
      position: relative; overflow: hidden;
      transition: all 0.3s ease;
      cursor: default;
    }
    .service-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: var(--gradient); opacity: 0;
      transition: opacity 0.3s;
    }
    .service-card:hover { transform: translateY(-6px); border-color: rgba(0,82,204,0.3); box-shadow: 0 30px 80px rgba(0,82,204,0.15); }
    .service-card:hover::before { opacity: 1; }
    .service-icon {
      width: 60px; height: 60px;
      background: rgba(0,82,204,0.15);
      border: 1px solid rgba(0,82,204,0.2);
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; margin-bottom: 24px;
      transition: all 0.3s;
    }
    .service-card:hover .service-icon { background: rgba(0,82,204,0.25); border-color: rgba(0,82,204,0.4); }
    .service-module-tag {
      display: inline-block; padding: 4px 12px;
      background: rgba(0,180,216,0.1);
      border: 1px solid rgba(0,180,216,0.2);
      border-radius: 100px;
      font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 16px;
    }
    .service-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
    .service-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; }
    .service-features { display: flex; flex-direction: column; gap: 10px; }
    .service-feature {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 13px; color: var(--text-secondary);
    }
    .service-feature i { color: var(--accent); font-size: 12px; margin-top: 3px; flex-shrink: 0; }

    /* ===== EXPERTISE ===== */
    .expertise-section { overflow: hidden; }
    .expertise-inner {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 80px; align-items: center;
    }
    .expertise-visual { position: relative; }
    .expertise-img-bg {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
    }
    .skill-bar-group { display: flex; flex-direction: column; gap: 20px; }
    .skill-item {}
    .skill-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .skill-name { font-size: 14px; font-weight: 600; }
    .skill-pct { font-size: 14px; font-weight: 700; color: var(--accent); }
    .skill-track {
      height: 8px; background: var(--dark3); border-radius: 4px; overflow: hidden;
    }
    .skill-fill {
      height: 100%; border-radius: 4px;
      background: var(--gradient);
      transition: width 1.5s ease;
      width: 0;
    }
    .skill-fill.animated { width: var(--target-width); }

    .certifications {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px;
    }
    .cert-badge {
      background: var(--glass);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .cert-icon { font-size: 22px; }
    .cert-text { font-size: 12px; font-weight: 600; color: var(--text-secondary); }

    .expertise-points { display: flex; flex-direction: column; gap: 20px; margin-top: 40px; }
    .exp-point {
      display: flex; gap: 16px;
      padding: 20px;
      background: var(--glass);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all 0.3s;
    }
    .exp-point:hover { background: var(--glass-hover); border-color: rgba(0,82,204,0.3); }
    .exp-point-icon {
      width: 44px; height: 44px; flex-shrink: 0;
      background: rgba(0,82,204,0.15);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    .exp-point-title { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
    .exp-point-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

    /* ===== ABOUT / CONSULTANT ===== */
    .about-section { background: var(--dark2); }
    .about-inner {
      display: grid; grid-template-columns: 1fr 1.4fr;
      gap: 80px; align-items: center;
    }
    .about-card {
      background: var(--dark);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .about-card-header {
      background: var(--gradient);
      padding: 40px; text-align: center;
    }
    .about-avatar {
      width: 110px; height: 110px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: 4px solid rgba(255,255,255,0.4);
      display: flex; align-items: center; justify-content: center;
      font-size: 44px; font-weight: 800;
      font-family: 'Poppins', sans-serif;
      color: white; margin: 0 auto 16px;
    }
    .about-name { font-size: 24px; font-weight: 800; color: white; margin-bottom: 4px; }
    .about-role { font-size: 14px; color: rgba(255,255,255,0.8); }
    .about-card-body { padding: 28px; }
    .about-info-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
    .about-info-item {
      display: flex; align-items: center; gap: 12px;
      font-size: 14px; color: var(--text-secondary);
    }
    .about-info-item i { color: var(--accent); width: 16px; text-align: center; }
    .about-info-item span { font-weight: 500; color: var(--text-primary); margin-left: 4px; }
    .linkedin-btn {
      display: flex; align-items: center; gap: 10px; justify-content: center;
      width: 100%; padding: 12px;
      background: rgba(0,119,181,0.15);
      border: 1px solid rgba(0,119,181,0.3);
      border-radius: 10px;
      color: #60A5FA; font-size: 14px; font-weight: 600;
      transition: all 0.2s; margin-bottom: 12px;
    }
    .linkedin-btn:hover { background: rgba(0,119,181,0.25); }

    .about-content {}
    .about-headline {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(24px, 3vw, 38px);
      font-weight: 800; line-height: 1.2; margin-bottom: 24px;
    }
    .about-desc { font-size: 16px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px; }
    .about-highlights {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 32px 0;
    }
    .highlight-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 16px;
      background: var(--glass);
      border: 1px solid var(--border);
      border-radius: 12px;
    }
    .highlight-icon { font-size: 20px; flex-shrink: 0; }
    .highlight-text { font-size: 13px; color: var(--text-secondary); }
    .highlight-text strong { color: var(--text-primary); display: block; margin-bottom: 2px; }

    .timeline { margin-top: 32px; }
    .timeline-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; }
    .timeline-items { display: flex; flex-direction: column; gap: 0; position: relative; }
    .timeline-items::before {
      content: ''; position: absolute; left: 16px; top: 0; bottom: 0;
      width: 2px; background: linear-gradient(to bottom, var(--primary), transparent);
    }
    .timeline-item {
      display: flex; gap: 24px; padding-left: 40px; padding-bottom: 24px; position: relative;
    }
    .timeline-dot {
      position: absolute; left: 8px; top: 4px;
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--dark2);
      border: 2px solid var(--primary);
      display: flex; align-items: center; justify-content: center;
    }
    .timeline-dot::after {
      content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--primary);
    }
    .timeline-content {}
    .timeline-period { font-size: 11px; color: var(--text-muted); font-weight: 600; letter-spacing: 1px; margin-bottom: 4px; text-transform: uppercase; }
    .timeline-role { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
    .timeline-company { font-size: 13px; color: var(--text-secondary); }

    /* ===== CASE STUDIES ===== */
    .cases-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 24px; margin-top: 60px;
    }
    .case-card {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all 0.3s;
    }
    .case-card:hover { transform: translateY(-6px); border-color: rgba(0,82,204,0.3); box-shadow: 0 30px 80px rgba(0,82,204,0.15); }
    .case-header {
      padding: 24px 28px;
      display: flex; align-items: center; gap: 14px;
      border-bottom: 1px solid var(--border);
    }
    .case-icon {
      width: 48px; height: 48px; border-radius: 12px;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; flex-shrink: 0;
    }
    .case-company { font-size: 15px; font-weight: 700; }
    .case-industry { font-size: 12px; color: var(--text-muted); }
    .case-body { padding: 28px; }
    .case-challenge { font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6; }
    .case-results { display: flex; flex-direction: column; gap: 8px; }
    .case-result {
      display: flex; align-items: center; gap: 10px;
      font-size: 13px; color: var(--text-secondary);
    }
    .case-result i { color: #34D399; font-size: 12px; }
    .case-result strong { color: var(--text-primary); }
    .case-modules { padding: 16px 28px; border-top: 1px solid var(--border); display: flex; gap: 8px; flex-wrap: wrap; }
    .case-module { padding: 4px 10px; background: rgba(0,82,204,0.1); border: 1px solid rgba(0,82,204,0.2); border-radius: 6px; font-size: 11px; font-weight: 600; color: #93C5FD; }

    /* ===== TESTIMONIALS ===== */
    .testimonials-section { background: var(--dark2); }
    .testimonials-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 24px; margin-top: 60px;
    }
    .testimonial-card {
      background: var(--dark);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 32px;
      position: relative;
      transition: all 0.3s;
    }
    .testimonial-card:hover { transform: translateY(-4px); border-color: rgba(0,82,204,0.3); }
    .quote-mark {
      font-size: 64px; line-height: 0.5;
      color: rgba(0,82,204,0.2); font-family: Georgia, serif; font-weight: 900;
      margin-bottom: 16px; display: block;
    }
    .testimonial-text {
      font-size: 15px; color: var(--text-secondary); line-height: 1.7;
      font-style: italic; margin-bottom: 28px;
    }
    .testimonial-author { display: flex; align-items: center; gap: 14px; }
    .author-avatar {
      width: 48px; height: 48px; border-radius: 50%;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700; color: white; flex-shrink: 0;
    }
    .author-name { font-size: 15px; font-weight: 700; }
    .author-role { font-size: 12px; color: var(--text-muted); }
    .rating { display: flex; gap: 2px; margin-bottom: 12px; }
    .rating i { color: var(--accent2); font-size: 12px; }

    /* ===== INDUSTRIES ===== */
    .industries-section {}
    .industries-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 20px; margin-top: 60px;
    }
    .industry-card {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px 20px;
      text-align: center;
      transition: all 0.3s;
    }
    .industry-card:hover { transform: translateY(-4px); border-color: rgba(0,82,204,0.3); background: var(--dark3); }
    .industry-icon { font-size: 36px; margin-bottom: 14px; }
    .industry-name { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
    .industry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

    /* ===== PROCESS ===== */
    .process-section { background: var(--dark2); }
    .process-steps {
      display: grid; grid-template-columns: repeat(5, 1fr);
      gap: 16px; margin-top: 60px; position: relative;
    }
    .process-steps::before {
      content: '';
      position: absolute; top: 40px; left: 10%; right: 10%;
      height: 2px;
      background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
      z-index: 0;
    }
    .process-step {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      position: relative; z-index: 1;
    }
    .step-num {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--dark);
      border: 2px solid var(--primary);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 800;
      color: var(--primary); margin-bottom: 16px;
      transition: all 0.3s;
    }
    .process-step:hover .step-num { background: var(--gradient); color: white; border-color: transparent; }
    .step-name { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
    .step-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

    /* ===== CTA SECTION ===== */
    .cta-section {
      background: var(--gradient2);
    }
    .cta-inner {
      background: var(--dark2);
      border: 1px solid rgba(0,82,204,0.2);
      border-radius: var(--radius-lg);
      padding: 80px;
      text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-inner::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,82,204,0.15) 0%, transparent 60%);
    }
    .cta-inner > * { position: relative; z-index: 1; }
    .cta-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(28px, 4vw, 48px);
      font-weight: 800; margin-bottom: 16px;
    }
    .cta-desc { font-size: 17px; color: var(--text-secondary); margin-bottom: 40px; }
    .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

    /* ===== CONTACT ===== */
    .contact-section {}
    .contact-inner {
      display: grid; grid-template-columns: 1fr 1.4fr;
      gap: 60px;
    }
    .contact-info { display: flex; flex-direction: column; gap: 24px; }
    .contact-card {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
    }
    .contact-card-icon { font-size: 28px; margin-bottom: 12px; }
    .contact-card-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
    .contact-card-text { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
    .contact-card-link { color: var(--accent); font-weight: 500; margin-top: 8px; display: block; }
    .contact-form-wrap {
      background: var(--dark2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 48px;
    }
    .form-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
    .form-subtitle { font-size: 14px; color: var(--text-secondary); margin-bottom: 32px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .form-input, .form-select, .form-textarea {
      width: 100%; padding: 14px 16px;
      background: var(--dark3);
      border: 1px solid var(--border);
      border-radius: 10px;
      color: var(--text-primary); font-size: 15px; font-family: 'Inter', sans-serif;
      transition: all 0.2s; outline: none;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--primary); background: rgba(0,82,204,0.05);
      box-shadow: 0 0 0 3px rgba(0,82,204,0.15);
    }
    .form-select { cursor: pointer; }
    .form-select option { background: var(--dark3); }
    .form-textarea { resize: vertical; min-height: 120px; }
    .form-submit {
      width: 100%; padding: 16px;
      background: var(--gradient);
      color: white; font-size: 16px; font-weight: 700;
      border: none; border-radius: 10px; cursor: pointer;
      transition: all 0.3s;
      box-shadow: var(--shadow);
    }
    .form-submit:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(0,82,204,0.4); }

    /* ===== FOOTER ===== */
    .footer {
      background: var(--dark);
      border-top: 1px solid var(--border);
      padding: 60px 0 0;
    }
    .footer-inner {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px; padding-bottom: 48px;
    }
    .footer-brand {}
    .footer-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-top: 16px; margin-bottom: 24px; max-width: 280px; }
    .footer-social { display: flex; gap: 12px; }
    .social-link {
      width: 40px; height: 40px;
      background: var(--glass); border: 1px solid var(--border);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: var(--text-muted);
      transition: all 0.2s;
    }
    .social-link:hover { background: var(--primary); color: white; border-color: var(--primary); }
    .footer-col-title { font-size: 14px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-links a { font-size: 14px; color: var(--text-muted); transition: color 0.2s; }
    .footer-links a:hover { color: var(--text-primary); }
    .footer-bottom {
      border-top: 1px solid var(--border);
      padding: 20px 0;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-copy { font-size: 13px; color: var(--text-muted); }
    .footer-badges { display: flex; gap: 8px; }
    .footer-badge {
      padding: 4px 10px;
      background: var(--glass); border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 11px; font-weight: 600; color: var(--text-muted);
    }

    /* ===== BACK TO TOP ===== */
    .back-top {
      position: fixed; bottom: 32px; right: 32px; z-index: 999;
      width: 48px; height: 48px;
      background: var(--gradient); border-radius: 50%; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 18px;
      box-shadow: var(--shadow);
      opacity: 0; transform: translateY(20px);
      transition: all 0.3s;
    }
    .back-top.visible { opacity: 1; transform: translateY(0); }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1100px) {
      .services-grid, .cases-grid, .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
      .industries-grid { grid-template-columns: repeat(2, 1fr); }
      .process-steps { grid-template-columns: repeat(3, 1fr); }
      .process-steps::before { display: none; }
      .footer-inner { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; }
      .hero-visual { display: none; }
      .expertise-inner, .about-inner, .contact-inner { grid-template-columns: 1fr; }
      .hero-stats { flex-wrap: wrap; gap: 20px; }
    }
    @media (max-width: 700px) {
      .nav-links { display: none; }
      .nav-toggle { display: block; }
      .services-grid, .cases-grid, .testimonials-grid { grid-template-columns: 1fr; }
      .industries-grid { grid-template-columns: repeat(2, 1fr); }
      .process-steps { grid-template-columns: 1fr 1fr; }
      .about-highlights { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .cta-inner { padding: 40px 24px; }
      .footer-inner { grid-template-columns: 1fr; }
      .fb1, .fb2, .fb3 { display: none; }
    }
  </style>
</head>
<body>

<!-- NAVIGATION -->
<nav class="nav" id="navbar">
  <div class="nav-inner">
    <a href="#home" class="logo">
      <div class="logo-icon">A</div>
      <div class="logo-text">
        <span>AkshTech</span>
        <span>SAP Solutions</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#cases">Case Studies</a></li>
      <li><a href="#testimonials">Clients</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#contact" class="nav-cta">Get a Consultation</a></li>
    </ul>
    <button class="nav-toggle" id="navToggle"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
  <a href="#services" onclick="closeMobile()">Services</a>
  <a href="#about" onclick="closeMobile()">About</a>
  <a href="#cases" onclick="closeMobile()">Case Studies</a>
  <a href="#testimonials" onclick="closeMobile()">Clients</a>
  <a href="#process" onclick="closeMobile()">Process</a>
  <a href="#contact" onclick="closeMobile()" class="btn-primary">Get a Consultation</a>
</div>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-orb1"></div>
  <div class="hero-orb2"></div>
  <div class="hero-inner container">
    <!-- Left -->
    <div class="hero-content" data-aos="fade-right" data-aos-duration="800">
      <div class="hero-badge">
        <span></span>
        Available for New Projects · SAP Contractor
      </div>
      <h1 class="hero-title">
        Expert SAP<br />
        <span class="gradient-text">PP · QM · PS</span><br />
        Consulting
      </h1>
      <p class="hero-subtitle">
        Delivering precision-grade SAP manufacturing, quality management, and project systems solutions across support and full-cycle implementations — as a trusted independent contractor.
      </p>
      <div class="hero-actions">
        <a href="#contact" class="btn-primary">
          <i class="fas fa-calendar-check"></i> Book a Free Discovery Call
        </a>
        <a href="#services" class="btn-secondary">
          <i class="fas fa-arrow-right"></i> Explore Services
        </a>
      </div>
      <div class="hero-stats">
        <div>
          <div class="hero-stat-num">12+</div>
          <div class="hero-stat-label">Years Experience</div>
        </div>
        <div>
          <div class="hero-stat-num">40+</div>
          <div class="hero-stat-label">Projects Delivered</div>
        </div>
        <div>
          <div class="hero-stat-num">20+</div>
          <div class="hero-stat-label">Global Clients</div>
        </div>
        <div>
          <div class="hero-stat-num">3</div>
          <div class="hero-stat-label">SAP Modules</div>
        </div>
      </div>
    </div>
    <!-- Right - Profile Card -->
    <div class="hero-visual" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
      <div class="floating-badge fb1">
        <i class="fas fa-check-circle" style="color:#34D399"></i> SAP Certified
      </div>
      <div class="floating-badge fb2">
        <i class="fas fa-star" style="color:#F59E0B"></i> Top Rated Contractor
      </div>
      <div class="floating-badge fb3">
        <i class="fas fa-globe" style="color:#60A5FA"></i> Remote Available
      </div>
      <div class="profile-card">
        <div class="profile-top">
          <div class="profile-avatar">RR</div>
          <div>
            <div class="profile-name">Ronit Rao</div>
            <div class="profile-title">Senior SAP Functional Consultant</div>
            <div class="profile-company">AkshTech Solutions · Independent Contractor</div>
          </div>
        </div>
        <div class="profile-modules">
          <span class="module-badge">SAP PP</span>
          <span class="module-badge">SAP QM</span>
          <span class="module-badge">SAP PS</span>
          <span class="module-badge">S/4HANA</span>
          <span class="module-badge">ECC 6.0</span>
        </div>
        <div class="profile-meta">
          <div class="meta-item">
            <div class="meta-value">12+</div>
            <div class="meta-key">Years SAP</div>
          </div>
          <div class="meta-item">
            <div class="meta-value">40+</div>
            <div class="meta-key">Engagements</div>
          </div>
          <div class="meta-item">
            <div class="meta-value">S/4</div>
            <div class="meta-key">HANA Ready</div>
          </div>
          <div class="meta-item">
            <div class="meta-value">Full</div>
            <div class="meta-key">Lifecycle</div>
          </div>
        </div>
        <div class="profile-availability">
          <div class="avail-dot"></div>
          Available for contract engagements
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRUSTED BY -->
<div class="trusted-section">
  <div class="container">
    <p class="trusted-label">Trusted by industry leaders across</p>
    <div class="trusted-logos">
      <div class="trusted-logo-item"><i class="fas fa-industry"></i> Manufacturing</div>
      <div class="trusted-logo-item"><i class="fas fa-hard-hat"></i> Engineering & Construction</div>
      <div class="trusted-logo-item"><i class="fas fa-pills"></i> Pharmaceuticals</div>
      <div class="trusted-logo-item"><i class="fas fa-car"></i> Automotive</div>
      <div class="trusted-logo-item"><i class="fas fa-oil-can"></i> Oil & Gas</div>
      <div class="trusted-logo-item"><i class="fas fa-microchip"></i> Hi-Tech & Electronics</div>
    </div>
  </div>
</div>

<!-- SERVICES -->
<section class="services-section" id="services">
  <div class="container">
    <div data-aos="fade-up">
      <div class="section-label">What We Offer</div>
      <h2 class="section-title">Specialist SAP Module Services</h2>
      <p class="section-desc">Deep expertise across three critical SAP modules — delivering both long-term support engagements and full-cycle implementation projects as an independent SAP contractor.</p>
    </div>
    <div class="services-grid">

      <!-- SAP PP -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="100">
        <div class="service-icon">🏭</div>
        <div class="service-module-tag">SAP PP</div>
        <h3 class="service-title">Production Planning</h3>
        <p class="service-desc">End-to-end production planning and control for discrete, process, and repetitive manufacturing environments.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>Material Requirements Planning (MRP/MRP II)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Production Orders & Shop Floor Control</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Capacity Planning & Scheduling (CRP)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>BOM & Routing Management</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>S/4HANA Manufacturing Integration</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>PP-PI Process Industries Support</li>
        </ul>
      </div>

      <!-- SAP QM -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="200">
        <div class="service-icon">✅</div>
        <div class="service-module-tag">SAP QM</div>
        <h3 class="service-title">Quality Management</h3>
        <p class="service-desc">Comprehensive quality assurance solutions that integrate seamlessly with production, procurement, and sales processes.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>Quality Planning & Inspection Setup</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Goods Receipt & In-Process Inspection</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Defect Recording & Usage Decision</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Statistical Process Control (SPC)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Quality Notifications & CAPA</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Calibration & Equipment Management</li>
        </ul>
      </div>

      <!-- SAP PS -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="300">
        <div class="service-icon">📊</div>
        <div class="service-module-tag">SAP PS</div>
        <h3 class="service-title">Project Systems</h3>
        <p class="service-desc">Robust project management framework enabling precise planning, execution monitoring, and cost control for complex projects.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>Work Breakdown Structure (WBS) Design</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Project Costing & Budget Management</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Network & Activity Scheduling</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Resource & Capacity Planning</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Project Progress Billing (RA)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Integration with FI/CO/MM/SD</li>
        </ul>
      </div>

      <!-- Support Services -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="100">
        <div class="service-icon">🛠️</div>
        <div class="service-module-tag">AMS Support</div>
        <h3 class="service-title">Application Support</h3>
        <p class="service-desc">Ongoing Application Management Services (AMS) to keep your SAP landscape stable, optimised, and running at peak efficiency.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>L2 & L3 Incident Management</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Root Cause Analysis & Bug Fixes</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>System Configuration Changes</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Month-end & Year-end Support</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Enhancement Pack Upgrades</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Retainer & Dedicated Support Models</li>
        </ul>
      </div>

      <!-- Implementation -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="200">
        <div class="service-icon">🚀</div>
        <div class="service-module-tag">Implementation</div>
        <h3 class="service-title">Full-Cycle Implementation</h3>
        <p class="service-desc">Greenfield, brownfield, and selective data transition implementations following SAP Activate methodology for on-time, on-budget delivery.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>Blueprint & Fit-Gap Analysis</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Configuration & Customisation</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Test Cycle Management (UT, SIT, UAT)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Data Migration & Legacy Cut-over</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Hypercare Go-live Support</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>End-user Training & Documentation</li>
        </ul>
      </div>

      <!-- S/4HANA Migration -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="300">
        <div class="service-icon">⚡</div>
        <div class="service-module-tag">S/4HANA</div>
        <h3 class="service-title">S/4HANA Transformation</h3>
        <p class="service-desc">Navigate your SAP S/4HANA journey with a proven migration blueprint — from readiness assessment through to post-migration optimisation.</p>
        <ul class="service-features">
          <li class="service-feature"><i class="fas fa-check-circle"></i>S/4HANA Readiness Assessment</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Conversion Strategy (SLT / SLO)</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Custom Code Remediation</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Fiori App Activation & UX Design</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Business Process Re-engineering</li>
          <li class="service-feature"><i class="fas fa-check-circle"></i>Parallel Landscape Testing</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<!-- EXPERTISE -->
<section class="expertise-section" id="expertise">
  <div class="container">
    <div class="expertise-inner">
      <div class="expertise-visual" data-aos="fade-right" data-aos-duration="800">
        <div class="expertise-img-bg">
          <div class="skill-bar-group">
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">SAP PP (Production Planning)</span><span class="skill-pct">95%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:95%"></div></div>
            </div>
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">SAP QM (Quality Management)</span><span class="skill-pct">92%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:92%"></div></div>
            </div>
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">SAP PS (Project Systems)</span><span class="skill-pct">88%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:88%"></div></div>
            </div>
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">S/4HANA Implementation</span><span class="skill-pct">90%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:90%"></div></div>
            </div>
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">SAP Activate Methodology</span><span class="skill-pct">85%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:85%"></div></div>
            </div>
            <div class="skill-item">
              <div class="skill-header"><span class="skill-name">Cross-Module Integration</span><span class="skill-pct">93%</span></div>
              <div class="skill-track"><div class="skill-fill" style="--target-width:93%"></div></div>
            </div>
          </div>
          <div class="certifications">
            <div class="cert-badge"><div class="cert-icon">🏆</div><div class="cert-text">SAP Certified PP Associate</div></div>
            <div class="cert-badge"><div class="cert-icon">🎖️</div><div class="cert-text">SAP Certified QM Associate</div></div>
            <div class="cert-badge"><div class="cert-icon">⭐</div><div class="cert-text">S/4HANA Manufacturing</div></div>
            <div class="cert-badge"><div class="cert-icon">✅</div><div class="cert-text">SAP PS Project Mgmt</div></div>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
        <div class="section-label">Core Expertise</div>
        <h2 class="section-title">Proven Depth Across Every Engagement</h2>
        <p class="section-desc" style="margin-bottom:0">Over a decade of hands-on SAP delivery — from resolving critical production outages to designing multi-country S/4HANA rollouts.</p>
        <div class="expertise-points">
          <div class="exp-point">
            <div class="exp-point-icon">🎯</div>
            <div>
              <div class="exp-point-title">Laser-Focused Specialisation</div>
              <div class="exp-point-desc">Not a generalist. Focused exclusively on SAP PP, QM, and PS to deliver deeper insight and faster time-to-value than broad-spectrum consultants.</div>
            </div>
          </div>
          <div class="exp-point">
            <div class="exp-point-icon">🔗</div>
            <div>
              <div class="exp-point-title">Integration-First Mindset</div>
              <div class="exp-point-desc">Strong understanding of how PP, QM, and PS connect with MM, SD, FI/CO — designing solutions that eliminate process silos.</div>
            </div>
          </div>
          <div class="exp-point">
            <div class="exp-point-icon">🌍</div>
            <div>
              <div class="exp-point-title">Global Delivery Experience</div>
              <div class="exp-point-desc">Delivered projects across India, APAC, Europe, and the Middle East — comfortable with multi-timezone, multi-language deployments.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section class="about-section" id="about">
  <div class="container">
    <div class="about-inner">
      <!-- Left: Profile Card -->
      <div data-aos="fade-right" data-aos-duration="800">
        <div class="about-card">
          <div class="about-card-header">
            <div class="about-avatar">RR</div>
            <div class="about-name">Ronit Rao</div>
            <div class="about-role">Senior SAP PP | QM | PS Consultant & Contractor</div>
          </div>
          <div class="about-card-body">
            <div class="about-info-list">
              <div class="about-info-item">
                <i class="fas fa-briefcase"></i>
                <span>12+ years</span> of SAP functional experience
              </div>
              <div class="about-info-item">
                <i class="fas fa-map-marker-alt"></i>
                Available <span>Globally</span> (Remote & On-site)
              </div>
              <div class="about-info-item">
                <i class="fas fa-code-branch"></i>
                SAP ECC 6.0 & <span>S/4HANA</span> expertise
              </div>
              <div class="about-info-item">
                <i class="fas fa-industry"></i>
                Manufacturing, Engineering, <span>Pharma</span>, O&G
              </div>
              <div class="about-info-item">
                <i class="fas fa-language"></i>
                English, Hindi — <span>Professional Fluency</span>
              </div>
              <div class="about-info-item">
                <i class="fas fa-user-tie"></i>
                Independent Contractor — <span>Flexible Engagement</span>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/ronit-rao-14666084/" target="_blank" class="linkedin-btn">
              <i class="fab fa-linkedin"></i> View LinkedIn Profile
            </a>
            <a href="#contact" class="btn-primary" style="width:100%; display:flex; justify-content:center;">
              <i class="fas fa-envelope"></i> Get in Touch
            </a>
          </div>
        </div>
      </div>

      <!-- Right: Content -->
      <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
        <div class="section-label">Meet the Consultant</div>
        <h2 class="about-headline">12+ Years Turning SAP Complexity into Business Value</h2>
        <p class="about-desc">
          Ronit Rao is a seasoned SAP functional consultant and independent contractor specialising in Production Planning (PP), Quality Management (QM), and Project Systems (PS). With over 12 years of hands-on project experience, Ronit has guided organisations across manufacturing, engineering, pharmaceuticals, and oil & gas through complex SAP transformations.
        </p>
        <p class="about-desc">
          Operating as an independent contractor through AkshTech Solutions, Ronit brings the accountability and personal commitment of a specialist combined with the rigour and process discipline of enterprise-grade delivery. Every engagement — from rapid AMS fixes to multi-year S/4HANA programmes — receives the same level of dedicated focus and quality.
        </p>
        <div class="about-highlights">
          <div class="highlight-item">
            <div class="highlight-icon">🏆</div>
            <div class="highlight-text"><strong>Full Lifecycle</strong>Blueprint through hypercare & post go-live support</div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">⚡</div>
            <div class="highlight-text"><strong>Rapid Onboarding</strong>Production-ready within 1–2 weeks of engagement start</div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🌐</div>
            <div class="highlight-text"><strong>Remote-First</strong>Full remote delivery with optional on-site mobilisation</div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">📋</div>
            <div class="highlight-text"><strong>Documentation</strong>Comprehensive solution design & knowledge transfer docs</div>
          </div>
        </div>

        <div class="timeline">
          <div class="timeline-title">Career Highlights</div>
          <div class="timeline-items">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-period">2022 – Present</div>
                <div class="timeline-role">Independent SAP Contractor</div>
                <div class="timeline-company">AkshTech Solutions · Global Clients</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-period">2018 – 2022</div>
                <div class="timeline-role">Senior SAP PP/QM/PS Consultant</div>
                <div class="timeline-company">Major SAP Systems Integrator · APAC & Middle East</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-period">2014 – 2018</div>
                <div class="timeline-role">SAP Functional Consultant</div>
                <div class="timeline-company">Manufacturing & Engineering Sector · India & Europe</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-period">2012 – 2014</div>
                <div class="timeline-role">SAP PP Junior Consultant</div>
                <div class="timeline-company">ERP Implementation Partner · India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CASE STUDIES -->
<section class="cases-section" id="cases">
  <div class="container">
    <div data-aos="fade-up">
      <div class="section-label">Proven Results</div>
      <h2 class="section-title">Client Success Stories</h2>
      <p class="section-desc">Real projects. Real outcomes. A representative sample of engagements delivered across industries.</p>
    </div>
    <div class="cases-grid">

      <div class="case-card" data-aos="fade-up" data-aos-delay="100">
        <div class="case-header">
          <div class="case-icon">🏗️</div>
          <div>
            <div class="case-company">Global Engineering Firm</div>
            <div class="case-industry">Heavy Engineering & Construction · UAE</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">Large EPC contractor running ECC 6.0 with fragmented project cost tracking and no QM integration. Manual inspection records were causing audit failures and delays in project closeouts.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>40% reduction</strong> in inspection-related project delays</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Unified PS/QM</strong> dashboard for project managers</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Zero audit findings</strong> post go-live for 18 months</div>
            <div class="case-result"><i class="fas fa-check"></i>Real-time budget vs. actuals visibility</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP PS</span>
          <span class="case-module">SAP QM</span>
          <span class="case-module">SAP MM</span>
        </div>
      </div>

      <div class="case-card" data-aos="fade-up" data-aos-delay="200">
        <div class="case-header">
          <div class="case-icon">💊</div>
          <div>
            <div class="case-company">Pharmaceutical Manufacturer</div>
            <div class="case-industry">Life Sciences · India (GMP)</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">Mid-size pharma producer needed to achieve GMP-compliant QM processes ahead of a USFDA audit. Existing SAP QM was partially configured with critical batch management gaps.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>100% GMP compliance</strong> achieved pre-audit</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Batch classification</strong> & traceability fully configured</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>USFDA audit</strong> passed with zero critical observations</div>
            <div class="case-result"><i class="fas fa-check"></i>Electronic batch records (EBR) integration</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP QM</span>
          <span class="case-module">SAP PP-PI</span>
          <span class="case-module">Batch Mgmt</span>
        </div>
      </div>

      <div class="case-card" data-aos="fade-up" data-aos-delay="300">
        <div class="case-header">
          <div class="case-icon">🚗</div>
          <div>
            <div class="case-company">Automotive Tier-1 Supplier</div>
            <div class="case-industry">Automotive Manufacturing · Germany / India</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">High-volume auto components manufacturer required S/4HANA migration of PP/QM from ECC 6.0 with minimal disruption to 3-shift production schedules. Critical MRP performance issues in legacy system.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>S/4HANA go-live</strong> with zero production stoppage</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>MRP run time</strong> reduced from 4hrs to 22 mins</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>OEE improved</strong> by 18% through better planning data</div>
            <div class="case-result"><i class="fas fa-check"></i>Fiori-based production floor apps deployed</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP PP</span>
          <span class="case-module">SAP QM</span>
          <span class="case-module">S/4HANA</span>
        </div>
      </div>

      <div class="case-card" data-aos="fade-up" data-aos-delay="100">
        <div class="case-header">
          <div class="case-icon">⚡</div>
          <div>
            <div class="case-company">Energy Infrastructure Company</div>
            <div class="case-industry">Oil & Gas · Middle East</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">National O&G company required SAP PS implementation to manage capital project portfolios of $500M+ with structured WBS, resource planning, and milestone billing to clients.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>$500M+ portfolio</strong> now managed in SAP PS</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Milestone billing</strong> accuracy improved to 99%</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>CAPEX overrun</strong> reduced by 22% in first year</div>
            <div class="case-result"><i class="fas fa-check"></i>PS/PM integration for turnaround management</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP PS</span>
          <span class="case-module">SAP PM</span>
          <span class="case-module">SAP FI/CO</span>
        </div>
      </div>

      <div class="case-card" data-aos="fade-up" data-aos-delay="200">
        <div class="case-header">
          <div class="case-icon">🔩</div>
          <div>
            <div class="case-company">Discrete Manufacturer</div>
            <div class="case-industry">Industrial Equipment · India</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">Indian mid-market manufacturer implementing SAP for the first time. Required greenfield PP implementation covering MTO/MTS mixed planning strategies for complex multi-level BOMs.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>Greenfield go-live</strong> in 14 weeks on budget</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Inventory turns</strong> improved by 30% within 6 months</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>On-time delivery</strong> rate jumped from 72% to 91%</div>
            <div class="case-result"><i class="fas fa-check"></i>100 end users trained and self-sufficient</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP PP</span>
          <span class="case-module">SAP MM</span>
          <span class="case-module">SAP SD</span>
        </div>
      </div>

      <div class="case-card" data-aos="fade-up" data-aos-delay="300">
        <div class="case-header">
          <div class="case-icon">🔬</div>
          <div>
            <div class="case-company">Specialty Chemicals Group</div>
            <div class="case-industry">Chemical Manufacturing · Singapore/APAC</div>
          </div>
        </div>
        <div class="case-body">
          <p class="case-challenge">Multi-plant specialty chemicals group with inconsistent QM processes across 4 APAC sites. Needed harmonised quality inspection catalogue and cross-plant QM reporting in ECC.</p>
          <div class="case-results">
            <div class="case-result"><i class="fas fa-check"></i><strong>4-site QM</strong> harmonisation completed in 20 weeks</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>Customer complaints</strong> reduced by 35%</div>
            <div class="case-result"><i class="fas fa-check"></i><strong>ISO 9001:2015</strong> audit readiness achieved</div>
            <div class="case-result"><i class="fas fa-check"></i>Centralised quality catalogue & master data</div>
          </div>
        </div>
        <div class="case-modules">
          <span class="case-module">SAP QM</span>
          <span class="case-module">SAP PP</span>
          <span class="case-module">Multi-Plant</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section" id="testimonials">
  <div class="container">
    <div data-aos="fade-up">
      <div class="section-label">Client Feedback</div>
      <h2 class="section-title">What Clients Say</h2>
      <p class="section-desc">Feedback from project managers, IT leads, and operations heads across past engagements.</p>
    </div>
    <div class="testimonials-grid">

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">Ronit's depth in SAP QM is exceptional. He not only configured our GMP-compliant inspection processes but proactively identified gaps we hadn't even scoped. The USFDA audit result speaks for itself.</p>
        <div class="testimonial-author">
          <div class="author-avatar">VK</div>
          <div>
            <div class="author-name">Vikram Kapoor</div>
            <div class="author-role">VP Operations · Pharmaceutical Manufacturer, India</div>
          </div>
        </div>
      </div>

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">We brought Ronit in to rescue an S/4HANA PP migration that was behind schedule. He re-planned the approach, resolved critical MRP configuration issues, and delivered a flawless go-live within 8 weeks.</p>
        <div class="testimonial-author">
          <div class="author-avatar">PL</div>
          <div>
            <div class="author-name">Peter Lindqvist</div>
            <div class="author-role">SAP Programme Manager · Automotive Supplier, Germany</div>
          </div>
        </div>
      </div>

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">The PS implementation Ronit delivered transformed how we manage capital projects. Our finance team now has real-time project costing and the project managers love the WBS structure he designed.</p>
        <div class="testimonial-author">
          <div class="author-avatar">AM</div>
          <div>
            <div class="author-name">Ahmed Al-Mansoori</div>
            <div class="author-role">IT Director · Energy Infrastructure, UAE</div>
          </div>
        </div>
      </div>

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">Ronit acted as our dedicated SAP PP/QM AMS resource for 18 months. Response times were excellent, his documentation was superb, and he consistently went beyond his defined scope to help the business.</p>
        <div class="testimonial-author">
          <div class="author-avatar">SR</div>
          <div>
            <div class="author-name">Sanjay Rao</div>
            <div class="author-role">Head of IT · Discrete Manufacturer, India</div>
          </div>
        </div>
      </div>

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
        <p class="testimonial-text">I've worked with many SAP consultants over the years. Ronit stands out because he understands the business first, then designs the SAP solution around it — not the other way around. Highly recommended.</p>
        <div class="testimonial-author">
          <div class="author-avatar">TC</div>
          <div>
            <div class="author-name">Thomas Chen</div>
            <div class="author-role">Operations Director · Specialty Chemicals, Singapore</div>
          </div>
        </div>
      </div>

      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
        <span class="quote-mark">"</span>
        <div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">Our greenfield SAP implementation was Ronit's project to lead. He delivered on time, within budget, and left our team fully capable of running the system. The training material he prepared is still our go-to reference.</p>
        <div class="testimonial-author">
          <div class="author-avatar">RG</div>
          <div>
            <div class="author-name">Rashmi Gupta</div>
            <div class="author-role">CEO · Industrial Equipment Manufacturer, India</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- INDUSTRIES -->
<section class="industries-section" id="industries">
  <div class="container">
    <div data-aos="fade-up" style="text-align:center; margin-bottom:0;">
      <div class="section-label" style="justify-content:center">Industries Served</div>
      <h2 class="section-title">Sector Experience</h2>
      <p class="section-desc" style="margin:0 auto">Deep familiarity with the unique SAP configurations and compliance requirements of each industry sector.</p>
    </div>
    <div class="industries-grid">
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="50">
        <div class="industry-icon">🏭</div>
        <div class="industry-name">Discrete Manufacturing</div>
        <div class="industry-desc">MTO/MTS/ETO planning strategies, variant configuration, shop floor integration</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="100">
        <div class="industry-icon">⚗️</div>
        <div class="industry-name">Process / Chemical</div>
        <div class="industry-desc">PP-PI, batch management, recipe management, regulatory compliance</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="150">
        <div class="industry-icon">💊</div>
        <div class="industry-name">Pharmaceuticals</div>
        <div class="industry-desc">GMP/GxP compliance, electronic batch records, FDA/EMA audit readiness</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="200">
        <div class="industry-icon">🚗</div>
        <div class="industry-name">Automotive</div>
        <div class="industry-desc">JIT/JIS planning, repetitive manufacturing, supplier quality management</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="250">
        <div class="industry-icon">🏗️</div>
        <div class="industry-name">Engineering & Construction</div>
        <div class="industry-desc">EPC project management, WBS structures, CAPEX tracking, milestone billing</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="300">
        <div class="industry-icon">⛽</div>
        <div class="industry-name">Oil & Gas</div>
        <div class="industry-desc">Plant maintenance integration, turnaround management, project portfolio oversight</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="350">
        <div class="industry-icon">🔩</div>
        <div class="industry-name">Industrial Equipment</div>
        <div class="industry-desc">Complex BOMs, multi-level assembly, capacity planning, service parts</div>
      </div>
      <div class="industry-card" data-aos="zoom-in" data-aos-delay="400">
        <div class="industry-icon">🔬</div>
        <div class="industry-name">Hi-Tech / Electronics</div>
        <div class="industry-desc">New product introduction, yield management, supplier quality integration</div>
      </div>
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="process-section" id="process">
  <div class="container">
    <div data-aos="fade-up" style="text-align:center">
      <div class="section-label" style="justify-content:center">How We Work</div>
      <h2 class="section-title">Engagement Process</h2>
      <p class="section-desc" style="margin:0 auto">A structured, transparent process from initial conversation to post-go-live success — with clear milestones and deliverables at every stage.</p>
    </div>
    <div class="process-steps">
      <div class="process-step" data-aos="fade-up" data-aos-delay="100">
        <div class="step-num">01</div>
        <div class="step-name">Discovery Call</div>
        <div class="step-desc">30-min free consultation to understand your requirements, scope, and timeline</div>
      </div>
      <div class="process-step" data-aos="fade-up" data-aos-delay="200">
        <div class="step-num">02</div>
        <div class="step-name">Proposal</div>
        <div class="step-desc">Tailored SOW with fixed scope, timeline, deliverables, and transparent pricing</div>
      </div>
      <div class="process-step" data-aos="fade-up" data-aos-delay="300">
        <div class="step-num">03</div>
        <div class="step-name">Analysis</div>
        <div class="step-desc">Fit-gap analysis, AS-IS process review, and solution blueprint design</div>
      </div>
      <div class="process-step" data-aos="fade-up" data-aos-delay="400">
        <div class="step-num">04</div>
        <div class="step-name">Delivery</div>
        <div class="step-desc">Configuration, testing (UT/SIT/UAT), training, data migration, and go-live</div>
      </div>
      <div class="process-step" data-aos="fade-up" data-aos-delay="500">
        <div class="step-num">05</div>
        <div class="step-name">Hypercare</div>
        <div class="step-desc">Post-launch support period to ensure system stability and user adoption</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container">
    <div class="cta-inner" data-aos="zoom-in">
      <div class="hero-badge" style="margin:0 auto 20px; display:inline-flex">
        <span></span> Limited Availability — Currently Accepting New Projects
      </div>
      <h2 class="cta-title">Ready to Solve Your SAP<br /><span class="gradient-text">PP · QM · PS</span> Challenges?</h2>
      <p class="cta-desc">Whether you need urgent AMS support, a scoped implementation, or an S/4HANA migration partner — let's talk. Free discovery call, no commitment.</p>
      <div class="cta-actions">
        <a href="#contact" class="btn-primary"><i class="fas fa-calendar-check"></i> Book a Discovery Call</a>
        <a href="mailto:info@akshtech.co.in" class="btn-secondary"><i class="fas fa-envelope"></i> info@akshtech.co.in</a>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="contact-section" id="contact">
  <div class="container">
    <div data-aos="fade-up">
      <div class="section-label">Get in Touch</div>
      <h2 class="section-title">Start a Conversation</h2>
      <p class="section-desc">Tell us about your SAP challenge. We'll respond within 24 hours with initial thoughts and availability.</p>
    </div>
    <div class="contact-inner" style="margin-top:60px">
      <div class="contact-info" data-aos="fade-right">
        <div class="contact-card">
          <div class="contact-card-icon">📧</div>
          <div class="contact-card-title">Email</div>
          <div class="contact-card-text">For project enquiries, RFPs, and AMS retainer discussions</div>
          <a href="mailto:info@akshtech.co.in" class="contact-card-link">info@akshtech.co.in</a>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">💼</div>
          <div class="contact-card-title">LinkedIn</div>
          <div class="contact-card-text">Connect professionally and review verified project endorsements</div>
          <a href="https://www.linkedin.com/in/ronit-rao-14666084/" target="_blank" class="contact-card-link">linkedin.com/in/ronit-rao-14666084</a>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">🕐</div>
          <div class="contact-card-title">Response Time</div>
          <div class="contact-card-text">All enquiries acknowledged within <strong style="color:var(--text-primary)">24 business hours</strong>. Discovery calls typically scheduled within 48–72 hours of initial contact.</div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">🌍</div>
          <div class="contact-card-title">Engagement Model</div>
          <div class="contact-card-text">Remote-first with on-site availability for critical phases. Flexible contract structures: fixed-price, time & materials, and retained AMS agreements.</div>
        </div>
      </div>
      <div data-aos="fade-left">
        <div class="contact-form-wrap">
          <div class="form-title">Send an Enquiry</div>
          <div class="form-subtitle">Complete the form below and we'll get back to you shortly.</div>
          <form action="/contact" method="POST">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name *</label>
                <input type="text" class="form-input" name="first_name" placeholder="John" required />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name *</label>
                <input type="text" class="form-input" name="last_name" placeholder="Smith" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Work Email *</label>
                <input type="email" class="form-input" name="email" placeholder="john@company.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-input" name="company" placeholder="Your Company" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">SAP Module(s) Required *</label>
              <select class="form-select" name="module" required>
                <option value="">Select module(s)...</option>
                <option>SAP PP – Production Planning</option>
                <option>SAP QM – Quality Management</option>
                <option>SAP PS – Project Systems</option>
                <option>SAP PP + QM</option>
                <option>SAP PP + PS</option>
                <option>SAP QM + PS</option>
                <option>All Three – PP + QM + PS</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Engagement Type *</label>
              <select class="form-select" name="engagement" required>
                <option value="">Select type...</option>
                <option>AMS / Ongoing Support</option>
                <option>New Implementation (Greenfield)</option>
                <option>ECC to S/4HANA Migration</option>
                <option>Process Optimisation</option>
                <option>Emergency / Critical Issue</option>
                <option>Other / Not Sure</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tell Us About Your Project *</label>
              <textarea class="form-textarea" name="message" placeholder="Please describe your SAP challenge, current system version, industry, and approximate project timeline..." required></textarea>
            </div>
            <button type="submit" class="form-submit">
              <i class="fas fa-paper-plane" style="margin-right:8px"></i> Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="#home" class="logo">
          <div class="logo-icon">A</div>
          <div class="logo-text">
            <span>AkshTech</span>
            <span>SAP Solutions</span>
          </div>
        </a>
        <p class="footer-desc">Independent SAP PP, QM & PS consulting and contracting services. Trusted by global manufacturers, engineering firms, and project-driven organisations.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/ronit-rao-14666084/" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
          <a href="mailto:info@akshtech.co.in" class="social-link"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Services</div>
        <div class="footer-links">
          <a href="#services">SAP PP Consulting</a>
          <a href="#services">SAP QM Consulting</a>
          <a href="#services">SAP PS Consulting</a>
          <a href="#services">AMS Support</a>
          <a href="#services">S/4HANA Migration</a>
          <a href="#services">Implementation</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Industries</div>
        <div class="footer-links">
          <a href="#industries">Manufacturing</a>
          <a href="#industries">Pharmaceuticals</a>
          <a href="#industries">Automotive</a>
          <a href="#industries">Oil & Gas</a>
          <a href="#industries">Engineering & EPC</a>
          <a href="#industries">Chemicals</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Company</div>
        <div class="footer-links">
          <a href="#about">About Ronit Rao</a>
          <a href="#cases">Case Studies</a>
          <a href="#testimonials">Client Reviews</a>
          <a href="#process">Our Process</a>
          <a href="#contact">Contact</a>
          <a href="https://www.linkedin.com/in/ronit-rao-14666084/" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 AkshTech Solutions. All rights reserved. | <a href="#" style="color:var(--text-muted)">akshtech.co.in</a></div>
      <div class="footer-badges">
        <div class="footer-badge">SAP PP</div>
        <div class="footer-badge">SAP QM</div>
        <div class="footer-badge">SAP PS</div>
        <div class="footer-badge">S/4HANA</div>
      </div>
    </div>
  </div>
</footer>

<!-- Back to top -->
<button class="back-top" id="backTop" onclick="window.scrollTo({top:0,behavior:'smooth'})">
  <i class="fas fa-chevron-up"></i>
</button>

<!-- Scripts -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  // AOS
  AOS.init({ once: true, duration: 700, offset: 60 });

  // Navbar scroll
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
  });

  // Mobile menu
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
  });
  document.getElementById('mobileClose').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
  function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

  // Skill bars animation
  function animateBars() {
    document.querySelectorAll('.skill-fill').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add('animated');
    });
  }
  window.addEventListener('scroll', animateBars);
  animateBars();
</script>

</body>
</html>`
}

function thankYouPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You | AkshTech Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Inter',sans-serif;background:#0A0E1A;color:#F0F4FF;display:flex;align-items:center;justify-content:center;min-height:100vh;}
    .card{background:#131929;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:64px;text-align:center;max-width:560px;width:90%;}
    .icon{width:80px;height:80px;background:linear-gradient(135deg,#0052CC,#00B4D8);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;font-size:36px;}
    h1{font-family:'Poppins',sans-serif;font-size:32px;font-weight:800;margin-bottom:16px;}
    p{color:#9BA8C3;font-size:16px;line-height:1.7;margin-bottom:32px;}
    a{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:linear-gradient(135deg,#0052CC,#00B4D8);color:white;font-size:15px;font-weight:600;border-radius:12px;text-decoration:none;}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✅</div>
    <h1>Enquiry Received!</h1>
    <p>Thank you for reaching out to AkshTech Solutions. Ronit will personally review your message and respond within 24 business hours.</p>
    <a href="/"><i class="fas fa-home"></i> Back to Home</a>
  </div>
</body>
</html>`
}

export default app
