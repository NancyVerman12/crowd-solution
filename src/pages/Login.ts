import { analyticsApi } from '../services/api';
import { AuthService } from '../services/auth';

export const renderLogin = (app: HTMLDivElement) => {
  app.innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    position: relative;
    background-image: url('/office image.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <!-- Dark Overlay -->
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #00000066;
      z-index: 0;
    "></div>
    
    <!-- Auto Layout Container -->
    <div class="login-container" style="position: relative; z-index: 1;">
      <!-- Hero Text -->
      <div class="hero-text" style="
        gap: 12px;
        background: rgba(26, 26, 26, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      ">
        <img 
          src="/Welcome to the Crowd Management System.png" 
          alt="Welcome to the Crowd Management System"
          style="
            width: 100%;
            height: 100%;
            object-fit: contain;
          "
        />
      </div>
      
      <!-- Login Card -->
      <div class="login-card" style="
        background: #FFFFFF;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      ">
        <!-- Login Header with Logo -->
        <div style="
          width: 100%;
          height: 109.15px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <img 
            src="/login header.png" 
            alt="Login Header"
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
            "
          />
          <img 
            src="/Kloudspot_Horizontal-Black 1.png" 
            alt="Kloudspot Logo"
            style="
              width: 110.1px;
              height: 31.41px;
              position: relative;
              z-index: 1;
            "
          />
        </div>
        
        <!-- Form Container -->
        <div style="
          width: 100%;
          height: 216px;
          gap: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        ">
          <div style="position: relative; width: 100%;">
            <label style="
              position: absolute;
              top: -8px;
              left: 12px;
              background: #FFFFFF;
              padding: 0 4px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 500;
              font-size: 12px;
              line-height: 24px;
              letter-spacing: -0.44px;
              color: rgba(13, 13, 13, 0.64);
              z-index: 1;
            ">
              Log In *
            </label>
            <input 
              type="email" 
              placeholder="Email"
              id="email-input"
              value="test@test.com"
              style="
                width: 100%;
                height: 44px;
                padding: 10px 12px;
                border-radius: 2px;
                border: 1px solid rgba(13, 13, 13, 0.1);
                font-family: 'IBM Plex Sans', sans-serif;
                font-size: 14px;
                outline: none;
                box-sizing: border-box;
              "
            />
          </div>
          
          <div style="position: relative; width: 100%;">
            <label style="
              position: absolute;
              top: -8px;
              left: 12px;
              background: #FFFFFF;
              padding: 0 4px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 500;
              font-size: 12px;
              line-height: 24px;
              letter-spacing: -0.44px;
              color: rgba(13, 13, 13, 0.64);
              z-index: 1;
            ">
              Password *
            </label>
            <input 
              type="password" 
              placeholder="Password"
              id="password-input"
              value=""
              style="
                width: 100%;
                height: 44px;
                padding: 10px 12px;
                padding-right: 40px;
                border-radius: 2px;
                border: 1px solid rgba(13, 13, 13, 0.1);
                font-family: 'IBM Plex Sans', sans-serif;
                font-size: 14px;
                outline: none;
                box-sizing: border-box;
              "
            />
            <svg 
              id="toggle-password"
              style="
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                cursor: pointer;
                color: #666;
              "
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          
          <button id="login-btn" style="
            width: 100%;
            height: 44px;
            background: #0D9488;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
          ">
            Login
          </button>
          <div id="login-error" style="
            display: none;
            color: #EF4444;
            font-size: 12px;
            margin-top: 8px;
            text-align: center;
          "></div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Interaction Logic
  const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
  const emailInput = document.getElementById('email-input') as HTMLInputElement;
  const passwordInput = document.getElementById('password-input') as HTMLInputElement;
  const errorMsg = document.getElementById('login-error') as HTMLDivElement;
  const togglePassword = document.getElementById('toggle-password');

  // Add password toggle logic
  togglePassword?.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  const handleLogin = async () => {
    const email = emailInput?.value;
    const password = passwordInput?.value;

    if (!email || !password) {
      errorMsg.textContent = 'Please enter both email and password';
      errorMsg.style.display = 'block';
      return;
    }

    // Show loading state
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    errorMsg.style.display = 'none';

    try {
      // Pass actual values if user changed them, otherwise they are placeholders
      // Note: The placeholders in value attribute acts as defaults for demo
      // but in real app we might not want to hardcode them in value attribute if avoiding auto-fill
      // However the prompt says "Email: test@test.com", "Password: ••••••••••"
      // So I prefilled them for convenience as per prototype.

      const response = await analyticsApi.login(email, password);

      // Store token
      AuthService.setToken(response.token);
      AuthService.setUserEmail(email);

      // Redirect
      window.location.hash = 'dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      errorMsg.textContent = 'Invalid credentials. Please try again.';
      errorMsg.style.display = 'block';
      loginBtn.textContent = 'Login';
      loginBtn.disabled = false;
    }
  };

  loginBtn?.addEventListener('click', handleLogin);

  // Allow Enter key to submit
  passwordInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
};
