import './style.css'
import { renderLogin } from './pages/Login';
import { renderDashboard } from './pages/Dashboard';
import { renderCrowdEntries } from './pages/crowdEntries';
import { AuthService } from './services/auth';

const app = document.querySelector<HTMLDivElement>('#app')!;

const router = () => {
  const hash = window.location.hash.slice(1) || 'login';

  // Guard: If not authenticated and trying to access protected routes
  if (!AuthService.isAuthenticated() && hash !== 'login') {
    window.location.hash = 'login';
    return;
  }

  // Guard: If authenticated and trying to access login
  if (AuthService.isAuthenticated() && hash === 'login') {
    window.location.hash = 'dashboard';
    return;
  }

  // Route handling
  if (hash === 'login') {
    renderLogin(app);
  } else if (hash === 'dashboard') {
    renderDashboard(app);
  } else if (hash === 'crowd-entries') {
    renderCrowdEntries(app);
  } else {
    // Default to login
    window.location.hash = 'login';
  }
};

// Listen for hash changes
window.addEventListener('hashchange', router);

// Initial Load
window.addEventListener('load', router);
