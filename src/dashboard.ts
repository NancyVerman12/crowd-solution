import './style.css'

// Dashboard Page
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div style="display: flex; width: 100vw; height: 100vh; overflow: hidden;">
    <!-- Sidebar -->
    <div style="
      width: 204px;
      height: 100vh;
      background-image: url('/sidebar background.png');
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 0;
    ">
      <!-- Logo and Menu -->
      <div>
        <!-- Logo -->
        <div style="padding: 0 20px 30px 20px;">
          <img src="/Kloudspot_Horizontal-Black 1.png" alt="Kloudspot" style="width: 100px; filter: brightness(0) invert(1);" />
          <img src="/content.png" alt="Menu" style="width: 24px; float: right; margin-top: -20px; cursor: pointer;" />
        </div>
        
        <!-- Navigation -->
        <nav>
          <!-- Overview - Active -->
          <div id="overview-btn" style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.2);
            margin: 0 10px 8px 10px;
            border-radius: 4px;
            cursor: pointer;
          ">
            <img src="/Overview.svg" alt="Overview" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
            <span style="color: white; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;">Overview</span>
          </div>
          
          <!-- Crowd Entries -->
          <div id="crowd-entries-btn" style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            margin: 0 10px;
            cursor: pointer;
          ">
            <img src="/Crowd Entries vector.png" alt="Crowd Entries" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
            <span style="color: rgba(255, 255, 255, 0.8); font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;">Crowd Entries</span>
          </div>
        </nav>
      </div>
      
      <!-- Logout -->
      <div id="logout-btn" style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 20px;
        margin: 0 10px;
        cursor: pointer;
      ">
        <img src="/logout button.png" alt="Logout" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
        <span style="color: rgba(255, 255, 255, 0.8); font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;">Logout</span>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="flex: 1; background: #F5F5F5; overflow-y: auto;">
      <!-- Header -->
      <div style="
        background: white;
        padding: 16px 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
      ">
        <!-- Left: Title and Site Selector -->
        <div style="display: flex; align-items: center; gap: 24px;">
          <h1 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 18px; font-weight: 500; margin: 0;">Crowd Solutions</h1>
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
            cursor: pointer;
          ">
            <img src="/Vector.png" alt="Location" style="width: 16px; height: 16px;" />
            <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;">Avenue Mall</span>
            <span style="font-size: 12px;">▼</span>
          </div>
        </div>
        
        <!-- Right: Icons and Profile -->
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="
            width: 40px;
            height: 40px;
            background: #0D9488;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 14px;
            font-weight: 500;
          ">E</div>
          <img src="/alert.png" alt="Notifications" style="width: 24px; height: 24px; cursor: pointer;" />
          <img src="/Profile.png" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; cursor: pointer;" />
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div style="padding: 32px;">
        <!-- Overview Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 24px; font-weight: 600; margin: 0;">Overview</h2>
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: white;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
            cursor: pointer;
          ">
            <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;">📅 Today</span>
          </div>
        </div>
        
        <!-- Occupancy Section -->
        <h3 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Occupancy</h3>
        
        <!-- Stat Cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
          <!-- Live Occupancy -->
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #666; margin-bottom: 8px;">Live Occupancy</div>
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 36px; font-weight: 600; margin-bottom: 8px;">734</div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #10B981;">
              <span>↑</span>
              <span>10% More than yesterday</span>
            </div>
          </div>
          
          <!-- Today's Footfall -->
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #666; margin-bottom: 8px;">Today's Footfall</div>
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 36px; font-weight: 600; margin-bottom: 8px;">2,436</div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #EF4444;">
              <span>↓</span>
              <span>10% Less than yesterday</span>
            </div>
          </div>
          
          <!-- Avg Dwell Time -->
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #666; margin-bottom: 8px;">Avg Dwell Time</div>
            <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 36px; font-weight: 600; margin-bottom: 8px;">08min 30sec</div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #10B981;">
              <span>↑</span>
              <span>6% More than yesterday</span>
            </div>
          </div>
        </div>
        
        <!-- Overall Occupancy Chart -->
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h4 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 16px; font-weight: 600; margin: 0;">Overall Occupancy</h4>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 8px; height: 8px; background: #0D9488; border-radius: 50%;"></div>
              <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; color: #666;">Occupancy</span>
            </div>
          </div>
          <div style="height: 300px; background: #F9FAFB; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">
            Chart Placeholder - Will be implemented with charting library
          </div>
        </div>
        
        <!-- Demographics Section -->
        <h3 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Demographics</h3>
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
          <!-- Chart of Demographics -->
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h5 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 600; margin: 0 0 16px 0;">Chart of Demographics</h5>
            <div style="height: 200px; background: #F9FAFB; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">
              Pie Chart Placeholder
            </div>
          </div>
          
          <!-- Demographics Analysis -->
          <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h5 style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 600; margin: 0;">Demographics Analysis</h5>
              <div style="display: flex; gap: 16px; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <div style="width: 8px; height: 8px; background: #0D9488; border-radius: 50%;"></div>
                  <span>Male</span>
                </div>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <div style="width: 8px; height: 8px; background: #A7F3D0; border-radius: 50%;"></div>
                  <span>Female</span>
                </div>
              </div>
            </div>
            <div style="height: 200px; background: #F9FAFB; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">
              Line Chart Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`

// Add navigation event listeners
document.getElementById('crowd-entries-btn')?.addEventListener('click', () => {
  window.location.hash = 'crowd-entries';
});

document.getElementById('overview-btn')?.addEventListener('click', () => {
  window.location.hash = 'dashboard';
});

document.getElementById('logout-btn')?.addEventListener('click', () => {
  window.location.hash = 'login';
});
