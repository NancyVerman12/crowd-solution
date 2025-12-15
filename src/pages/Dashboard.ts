import { analyticsApi, getTodayTimestamps, getYesterdayTimestamps, formatDwellTime } from '../services/api';
import { API_CONFIG, STORAGE_KEYS } from '../config/api';
import { AuthService } from '../services/auth';
import socketService from '../services/socket';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, annotationPlugin);

// Type for chart instances
// Type for chart instances
// Charts are scoped to renderDashboard


export const renderDashboard = (app: HTMLDivElement) => {
  app.innerHTML = ` 
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <div class="dashboard-layout" style="display: flex; width: 100%; height: 100vh; overflow: hidden;"> 
      <!-- Sidebar --> 
      <div class="dashboard-sidebar" style=" width: 240px; height: 100vh; background-image: url('/sidebar background.png'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; flex-direction: column; gap: 12px; padding-bottom: 20px; transition: transform 0.3s ease; ">
        <!-- Logo and Hamburger Header -->
        <div style=" width: 240px; height: 64px; display: flex; justify-content: space-between; align-items: center; padding-left: 12px; padding-right: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); "> 
          <img src="/Kloudspot_Horizontal-Black 1.png" alt="Kloudspot" style="width: 126.12px; height: 40px; filter: brightness(0) invert(1);" /> 
          <img id="sidebar-close-btn" src="/menu-line-horizontal.png" alt="Menu" style="width: 24px; height: 24px; cursor: pointer; filter: brightness(0) invert(1);" /> 
        </div>

      <!-- Navigation -->
      <div style="
        width: 240px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 12px;
        padding-right: 12px;
      ">
        <div style="
          width: 216px;
          height: 104px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        ">
          <!-- Overview - Active -->
          <div style="
            width: 216px;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 8px 16px;
            border-radius: 4px;
            background: #FFFFFF4D;
            cursor: pointer;
            position: relative;
          ">
            <div style="
              position: absolute;
              left: 0;
              width: 6px;
              height: 34px;
              background: #FFFFFF;
              border-radius: 9999px;
            "></div>
            <img src="/overview vector.png" alt="Overview" style="width: 20px; height: 20px; filter: brightness(0) invert(1); margin-left: 6px;" />
            <span style="
              width: 65px;
              height: 15px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 14.63px;
              letter-spacing: -0.27px;
              text-transform: capitalize;
              color: #FFFFFF;
            ">Overview</span>
          </div>
          
          <!-- Crowd Entries - Inactive -->
          <div id="crowd-entries-btn" style="
            width: 216px;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 8px 16px;
            cursor: pointer;
          ">
            <img src="/Crowd Entries vector.png" alt="Crowd Entries" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
            <span style="
              width: 98px;
              height: 15px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 14.63px;
              letter-spacing: -0.27px;
              text-transform: capitalize;
              color: #FFFFFF;
            ">Crowd Entries</span>
          </div>
        </div>

        <!-- Logout -->
        <div id="logout-btn" style="
          width: 216px;
          height: 50px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 16px;
          cursor: pointer;
        ">
          <img src="/logout button.png" alt="Logout" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
          <span style="
            width: 48px;
            height: 15px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 14.63px;
            letter-spacing: -0.27px;
            text-transform: capitalize;
            color: #FFFFFF;
          ">logout</span>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="dashboard-main" style="
      flex: 1;
      height: 100vh;
      background: #F5F5F5;
      overflow-y: auto;
      position: relative;
    ">
      <!-- Loading Overlay -->
      <div id="dashboard-loading" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        gap: 16px;
      ">
        <div style="
          width: 48px;
          height: 48px;
          border: 4px solid #E5E7EB;
          border-top-color: #4F46E5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <span style="
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 16px;
          color: #666666;
        ">Loading dashboard...</span>
      </div>
      
      <!-- Top Bar -->
      <div class="top-bar" style="
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 12px;
        background: #FFFFFF;
      ">
        <div style="
          width: 639px;
          height: 36px;
          display: flex;
          align-items: center;
          gap: 24px;
        ">
          <!-- Mobile Menu Trigger -->
          <img id="mobile-menu-btn" src="/menu-line-horizontal.png" alt="Menu" style="width: 24px; height: 24px; cursor: pointer; display: none;" class="mobile-menu-icon" />

          <div style="
            width: 140px;
            height: 20px;
            display: flex;
            align-items: center;
            gap: 24px;
          ">
            <span style="
              font-family: 'IBM Plex Sans', sans-serif;
              font-size: 18px;
              font-weight: 500;
              color: #1E1E1F;
            ">Crowd Solutions</span>
          </div>
          
          <div style="
            width: 1px;
            height: 22px;
            background: #1E1E1F80;
            border: 1px solid #1E1E1F80;
          "></div>
          
          <!-- Site Selector -->
          <div id="site-selector" style="
            width: 159px;
            height: 36px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid #E0E0E0;
            cursor: pointer;
            position: relative;
          ">
            <img src="/location-06.png" alt="Location" style="width: 16px; height: 16px;" />
            <span id="selected-site-name" style="
              width: 91px;
              height: 20px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 20px;
              letter-spacing: 0.02em;
              text-align: center;
              color: #1E1E1F;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            ">Loading...</span>
            <div style="
              width: 20px;
              height: 20px;
              transform: rotate(-90deg);
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <img src="/arrow-right-01.png" alt="Dropdown" style="
                width: 11.33px;
                height: 6.39px;
                position: absolute;
                top: 6.74px;
                left: 4.3px;
                transform: rotate(90deg);
              " />
            </div>
            
            <div id="site-dropdown" style="
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              width: 200px;
              max-height: 300px;
              overflow-y: auto;
              background: white;
              border: 1px solid #E0E0E0;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              z-index: 1000;
              margin-top: 4px;
            "></div>
          </div>
        </div>
        
        <div style="
          width: 204px;
          height: 48px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 12px;
        ">
          <div style="
            width: 80px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            border-radius: 36px;
            border: 1px solid #E0E0E0;
            cursor: pointer;
          ">
            <img src="/Sort by.png" alt="Sort" style="width: 80px; height: 48px;" />
          </div>
          
          <!-- Removed Language Selector -->
          
          <img src="/alert.png" alt="Notifications" style="width: 28px; height: 28px; cursor: pointer;" />
          <img src="/Profile.png" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; cursor: pointer;" />
        </div>
      </div>
      
      <!-- Page Content -->
      <div style="
        width: 100%;
        height: 1106px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 24px 24px 48px 24px;
      ">
        <!-- Header Frame -->
        <div style="
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 0;
        ">
          <div style="
            width: 89px;
            height: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span style="
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 500;
              font-size: 20px;
              line-height: 20px;
              letter-spacing: 0.02em;
              text-align: center;
              color: #1D1D1B;
            ">Overview</span>
          </div>
          
          <div style="
            width: 200px;
            height: 40px;
            min-height: 40px;
            max-height: 40px;
            display: flex;
            align-items: center;
            padding: 8px 12px;
            gap: 8px;
            border-radius: 4px;
            border: 1px solid #D2D4D9;
            background: #FFFFFF;
            cursor: pointer;
          ">
            <img src="/Leading Icon.png" alt="Calendar" style="width: 16px; height: 16px;" />
            <span style="
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #1E1E1F;
            ">Today</span>
          </div>
        </div>
        
        <!-- Occupancy Section -->
        <div class="stats-section" style="
          width: 100%;
          min-height: 184px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        ">
          <div style="
            width: 100%;
            height: 32px;
            display: flex;
            gap: 10px;
            padding-top: 12px;
          ">
            <span style="
              width: 94px;
              height: 20px;
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 500;
              font-size: 18px;
              line-height: 20px;
              letter-spacing: 0.02em;
              text-align: center;
              color: #1D1D1B;
            ">Occupancy</span>
          </div>
          
          <div class="stats-cards-container" style="
            width: 100%;
            display: flex;
            gap: 12px;
            flex-wrap: wrap; /* Allow wrapping */
          ">
            <!-- Card Small 1 -->
            <div class="stat-card-group" style="
              flex: 65;
              min-width: 300px;
              height: 136px;
              display: flex;
              gap: 80px;
              border-radius: 8px;
              padding: 16px;
              background: #FFFFFF;
            ">
              <div style="
                flex: 1;
                height: 104px;
                display: flex;
                flex-direction: column;
                gap: 16px;
              ">
                <div style="
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                ">
                  <span style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 100%;
                    text-transform: capitalize;
                    color: #030303;
                  ">Live Occupancy</span>
                  <span id="live-occupancy-value" style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 600;
                    font-size: 32px;
                    line-height: 100%;
                    color: #030303;
                  ">0</span>
                </div>
                
                <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 8px;
                ">
                  <img id="occupancy-trend-icon" src="/hart-arrow-up.png" alt="Up" style="width: 16px; height: 16px;" />
                  <span id="occupancy-trend-text" style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 14px;
                    letter-spacing: 0.1px;
                    color: #666666;
                  ">Loading...</span>
                </div>
              </div>
              
              <div style="
                width: 1px;
                height: 104px;
                border: 1px solid #EBF2FF;
              "></div>
              
              <div style="
                flex: 1;
                height: 104px;
                display: flex;
                flex-direction: column;
                gap: 16px;
              ">
                <div style="
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                ">
                  <span style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 100%;
                    text-transform: capitalize;
                    color: #030303;
                    white-space: nowrap;
                  ">Today's Footfall</span>
                  <span id="todays-footfall-value" style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 600;
                    font-size: 32px;
                    line-height: 100%;
                    color: #030303;
                  ">0</span>
                </div>
                
                <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 8px;
                ">
                  <img id="footfall-trend-icon" src="/hart-arrow-down.png" alt="Down" style="width: 16px; height: 16px;" />
                  <span id="footfall-trend-text" style="
                    font-family: 'IBM Plex Sans', sans-serif;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 14px;
                    letter-spacing: 0.1px;
                    color: #666666;
                  ">Loading...</span>
                </div>
              </div>
            </div>
            
            <!-- Card Small 2 -->
            <div class="stat-card-single" style="
              flex: 35;
              min-width: 200px;
              height: 136px;
              display: flex;
              flex-direction: column;
              gap: 20px;
              border-radius: 8px;
              padding: 16px;
              background: #FFFFFF;
            ">
              <div style="
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 16px;
              ">
                <span style="
                  font-family: 'IBM Plex Sans', sans-serif;
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 100%;
                  text-transform: capitalize;
                  color: #030303;
                  white-space: nowrap;
                ">Avg Dwell Time</span>
                <span id="avg-dwell-time-value" style="
                  font-family: 'IBM Plex Sans', sans-serif;
                  font-weight: 600;
                  font-size: 32px;
                  line-height: 100%;
                  color: #030303;
                ">00min 00sec</span>
              </div>
              
              <div style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
              ">
                <img id="dwell-trend-icon" src="/hart-arrow-up.png" alt="Up" style="width: 16px; height: 16px;" />
                <span id="dwell-trend-text" style="
                  font-family: 'IBM Plex Sans', sans-serif;
                  font-weight: 300;
                  font-size: 14px;
                  line-height: 14px;
                  letter-spacing: 0.1px;
                  color: #666666;
                ">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Occupancy Chart -->
        <div class="chart-card" style="
          width: 100%;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 24px;
          margin-top: 24px;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        ">
          <h3 style="
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 20px 0;
            color: #030303;
          ">Overall Occupancy</h3>
          <div class="chart-container" style="position: relative; height: 300px; width: 100%;">
            <canvas id="occupancy-chart"></canvas>
          </div>
        </div>
        
        <!-- Demographics Section Header -->
        <div style="
          width: 100%;
          height: 32px;
          display: flex;
          gap: 10px;
          padding-top: 12px;
        ">
          <span style="
            width: 123px;
            height: 20px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 20px;
            letter-spacing: 0.02em;
            color: #1D1D1B;
          ">Demographics</span>
        </div>

        <!-- Demographics Charts -->
        <!-- Demographics Charts -->
        <!-- Demographics Charts -->
        <div class="demographics-row" style="
          width: 100%;
          min-height: 423px;
          display: flex;
          gap: 12px;
          margin-top: 24px;
          margin-bottom: 24px;
          flex-wrap: wrap; 
        ">
          <!-- Left Tile: Chart of Demographics -->
          <div class="demographics-card-left" style="
            width: 328px;
            height: 375px; 
            background: #FFFFFF;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 16px;
          ">
            <h3 style="
              font-family: 'IBM Plex Sans', sans-serif;
              font-size: 18px;
              font-weight: 600;
              margin: 0;
              color: #030303;
            ">Chart of Demographics</h3>
            <!-- Reduced height for pie to make room for legend -->
            <div style="position: relative; height: 100%; width: 100%; min-height: 0;">
              <canvas id="demographics-pie-chart"></canvas>
            </div>
            <!-- Legend will be injected here via JS -->
          </div>
          
          <!-- Right Tile: Demographics Analysis -->
          <div class="demographics-card-right" style="
            flex: 1;
            min-width: 300px;
            min-height: 423px;
            height: auto;
            background: #FFFFFF;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
          ">
            <h3 style="
              font-family: 'IBM Plex Sans', sans-serif;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 20px 0;
              color: #030303;
            ">Demographics Analysis</h3>
            <div style="position: relative; height: 350px; width: 100%;">
              <canvas id="demographics-timeseries-chart"></canvas>
            </div>
          </div>
        </div>
        
        <!-- Bottom Spacer to prevent touching edge -->
        <div style="width: 100%; min-height: 50px;"></div>
        
      </div>
    </div>
  </div>
  `;

  // --- Alerts Sidebar Logic ---
  const alertsSidebarHtml = `
    <div id="alerts-sidebar" style="
      position: fixed;
      top: 0;
      right: -400px; /* Hidden */
      width: 380px;
      height: 100vh;
      background: #FFFFFF;
      box-shadow: -4px 0 12px rgba(0,0,0,0.1);
      z-index: 1001;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
    ">
      <!-- Header -->
      <div style="
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E5E7EB;
      ">
        <h2 style="margin: 0; font-family: 'IBM Plex Sans'; font-size: 18px; font-weight: 600; color: #1F2937;">Alerts</h2>
        <img id="alerts-close-btn" src="/menu-line-horizontal.png" style="width: 24px; height: 24px; cursor: pointer; transform: rotate(45deg);" />
      </div>

      <!-- Alerts List -->
      <div id="alerts-list" style="
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      ">
        <!-- Alert Items injected here -->
        <div style="text-align: center; color: #6B7280; margin-top: 20px;">Loading alerts...</div>
      </div>
    </div>
    <div id="alerts-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0,0,0,0.3);
      z-index: 1000;
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    "></div>
  `;
  document.body.insertAdjacentHTML('beforeend', alertsSidebarHtml);

  // Render Alerts Function
  async function renderAlerts() {
    try {
      // Use standard "Today" window for alerts
      const { fromUtc, toUtc } = getTodayTimestamps();
      const siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID) || API_CONFIG.DEFAULT_SITE_ID;

      // Re-use entry/exit API, assuming it returns severity
      // We might need to fetch a specific "Alerts" endpoint if exists, but plan said Entry/Exit
      const response = await analyticsApi.getEntryExit(siteId, fromUtc, toUtc, 1, 20);

      const list = document.getElementById('alerts-list');
      if (!list) return;
      list.innerHTML = '';

      if (!response.records || response.records.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #6B7280;">No alerts for today.</div>';
        return;
      }

      response.records.forEach(record => {
        // map severity to color (mock logic if severity missing)
        // 'High' -> Red, 'Medium' -> Orange, 'Low' -> Green
        // Default to Low for entrants, High for unauthorized etc.
        // Assuming record.severity exists from our updated type definition
        const severity = record.severity || 'Low';
        let badgeColor = '#10B981'; // Green
        let badgeBg = '#D1FAE5';
        let badgeText = 'Low';

        if (severity.toLowerCase() === 'high') {
          badgeColor = '#DC2626'; // Red
          badgeBg = '#FEE2E2';
          badgeText = 'High';
        } else if (severity.toLowerCase() === 'medium') {
          badgeColor = '#F59E0B'; // Orange
          badgeBg = '#FEF3C7';
          badgeText = 'Medium';
        }

        // Format Date: "March 03 2025 10:12"
        const dateObj = new Date(record.entryLocal); // entryLocal is expected to be valid date string
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
        const timeStr = dateObj.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        const cardHtml = `
          <div style="
             border: 1px solid #E5E7EB;
             border-radius: 8px;
             padding: 16px;
             background: #FFFFFF;
             display: flex;
             flex-direction: column;
             gap: 8px;
             box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          ">
             <div style="font-family: 'IBM Plex Sans'; font-size: 12px; color: #6B7280;">
               ${dateStr} <strong style="color: #1F2937;">${timeStr}</strong>
             </div>
             
             <div style="font-family: 'IBM Plex Sans'; font-size: 16px; font-weight: 500; color: #111827;">
               ${record.personName} Entered
             </div>
             
             <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
               <div style="display: flex; align-items: center; gap: 6px; color: #6B7280; font-size: 14px;">
                  <img src="/location-06.png" style="width: 14px; height: 14px; opacity: 0.6;" />
                  ${record.zoneName || 'Zone A'}
               </div>
               
               <div style="
                 background: ${badgeBg};
                 color: ${badgeColor};
                 padding: 2px 10px;
                 border-radius: 4px;
                 font-size: 12px;
                 font-weight: 600;
               ">
                 ${badgeText}
               </div>
             </div>
          </div>
        `;
        list.insertAdjacentHTML('beforeend', cardHtml);
      });

    } catch (e) {
      console.error(e);
      const list = document.getElementById('alerts-list');
      if (list) list.innerHTML = '<div style="color: red; text-align: center;">Failed to load alerts.</div>';
    }
  }

  // Interaction Logic
  const alertsSidebar = document.getElementById('alerts-sidebar');
  const alertsOverlay = document.getElementById('alerts-overlay');

  function toggleAlerts(show: boolean) {
    if (alertsSidebar && alertsOverlay) {
      alertsSidebar.style.right = show ? '0' : '-400px';
      alertsOverlay.style.display = show ? 'block' : 'none';

      // Timeout for opacity transition
      setTimeout(() => {
        alertsOverlay.style.opacity = show ? '1' : '0';
      }, 10);

      if (show) {
        renderAlerts(); // Fetch data when opening
      }
    }
  }

  // Listeners
  // Assuming the bell icon has ID 'notifications-btn' (Need to verify)
  // Or finding it by src attribute if ID is missing.
  // In previous view_file of crowdEntries, the bell icon src was "/alert.png" and didn't have an ID.
  // I should find it and attach listener.

  // Dashboard Header Search:
  // "img src="/alert.png" alt="Notifications" ... "

  // Let's select by alt="Notifications" if ID is not set.
  const bellIcon = document.querySelector('img[alt="Notifications"]');
  if (bellIcon) {
    bellIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAlerts(true);
    });
    bellIcon.style.cursor = 'pointer';
  }

  document.getElementById('alerts-close-btn')?.addEventListener('click', () => toggleAlerts(false));
  alertsOverlay?.addEventListener('click', () => toggleAlerts(false));


  // Event Listeners
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    AuthService.logout();
  });

  document.getElementById('crowd-entries-btn')?.addEventListener('click', () => {
    window.location.hash = 'crowd-entries';
  });

  async function loadDashboardData() {
    try {
      const { fromUtc: todayFrom, toUtc: todayTo } = getTodayTimestamps();
      const { fromUtc: yesterdayFrom, toUtc: yesterdayTo } = getYesterdayTimestamps();

      // Ensure we have a selected site
      let siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID);

      if (!siteId) {
        // If no site selected, fetch list and select first one
        try {
          const sites = await analyticsApi.getSites();
          if (sites && sites.length > 0) {
            siteId = sites[0].siteId;
            localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_ID, siteId);

            // Update UI name if element exists
            const paramEl = document.getElementById('selected-site-name');
            if (paramEl) paramEl.textContent = sites[0].name;
          } else {
            console.warn('No sites available for this user.');
            return;
          }
        } catch (siteError) {
          console.error('Failed to fetch sites:', siteError);
          return;
        }
      }

      // Fallback if still null (unlikely if API works)
      siteId = siteId || API_CONFIG.DEFAULT_SITE_ID;


      const [
        todayOccupancy, todayFootfall, todayDwell,
        yesterdayOccupancy, yesterdayFootfall, yesterdayDwell
      ] = await Promise.all([
        analyticsApi.getOccupancy(siteId, todayFrom, todayTo),
        analyticsApi.getFootfall(siteId, todayFrom, todayTo),
        analyticsApi.getDwell(siteId, todayFrom, todayTo),
        analyticsApi.getOccupancy(siteId, yesterdayFrom.toString(), yesterdayTo.toString()), // Ensure string type if needed
        analyticsApi.getFootfall(siteId, yesterdayFrom.toString(), yesterdayTo.toString()),
        analyticsApi.getDwell(siteId, yesterdayFrom.toString(), yesterdayTo.toString()),
      ]);

      console.log('Dashboard Data Debug:', JSON.stringify({
        todayOccupancy, todayFootfall, todayDwell,
        yesterdayOccupancy, yesterdayFootfall, yesterdayDwell
      }, null, 2));


      // Calculate live occupancy (latest non-zero)
      const liveOccupancy = todayOccupancy.buckets
        .slice()
        .reverse()
        .find(b => b.avg > 0)?.avg || 0;

      const yesterdayLiveOccupancy = yesterdayOccupancy.buckets
        .slice()
        .reverse()
        .find(b => b.avg > 0)?.avg || 0;

      // Trends Calculation Helper
      const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) {
          return current > 0 ? 100 : 0; // If prev is 0 and curr > 0, treat as 100% increase (or new)
        }
        return ((current - previous) / previous) * 100;
      };

      const occupancyChange = calculateTrend(liveOccupancy, yesterdayLiveOccupancy);
      const footfallChange = calculateTrend(todayFootfall.footfall, yesterdayFootfall.footfall);
      const dwellChange = calculateTrend(todayDwell.avgDwellMinutes, yesterdayDwell.avgDwellMinutes);


      // Update DOM
      const liveOccupancyEl = document.getElementById('live-occupancy-value');
      if (liveOccupancyEl) liveOccupancyEl.textContent = Math.round(liveOccupancy).toString();
      updateTrend('occupancy', occupancyChange, yesterdayLiveOccupancy === 0 && liveOccupancy > 0);

      const footfallEl = document.getElementById('todays-footfall-value');
      if (footfallEl) footfallEl.textContent = todayFootfall.footfall.toLocaleString();
      updateTrend('footfall', footfallChange, yesterdayFootfall.footfall === 0 && todayFootfall.footfall > 0);

      const dwellEl = document.getElementById('avg-dwell-time-value');
      if (dwellEl) dwellEl.textContent = formatDwellTime(todayDwell.avgDwellMinutes);
      updateTrend('dwell', dwellChange, yesterdayDwell.avgDwellMinutes === 0 && todayDwell.avgDwellMinutes > 0);

    } catch (error) {
      console.error('Data Load Error:', error);
    }
  }

  function updateTrend(metric: string, changePercent: number, isNewData: boolean = false) {
    const iconEl = document.getElementById(`${metric}-trend-icon`) as HTMLImageElement;
    const textEl = document.getElementById(`${metric}-trend-text`);

    if (!iconEl || !textEl) return;

    if (isNewData) {
      // Special case for 0 -> >0
      iconEl.src = '/hart-arrow-up.png';
      iconEl.alt = 'Up';
      iconEl.style.opacity = '1';
      iconEl.closest('div')!.querySelector('span')!.style.color = '#10B981'; // Green
      textEl.textContent = 'up from 0 yesterday';
      return;
    }

    const absChange = Math.abs(changePercent);
    const isPositive = changePercent > 0;
    const isNegative = changePercent < 0;

    if (isPositive) {
      iconEl.src = '/hart-arrow-up.png';
      iconEl.alt = 'Up';
      iconEl.style.opacity = '1';
      iconEl.closest('div')!.querySelector('span')!.style.color = '#10B981'; // Green
    } else if (isNegative) {
      iconEl.src = '/hart-arrow-down.png';
      iconEl.alt = 'Down';
      iconEl.style.opacity = '1';
      iconEl.closest('div')!.querySelector('span')!.style.color = '#EF4444'; // Red
    } else {
      iconEl.src = '/hart-arrow-up.png';
      iconEl.style.opacity = '0.3';
      iconEl.closest('div')!.querySelector('span')!.style.color = '#666666';
    }

    textEl.textContent = changePercent === 0
      ? 'Same as yesterday'
      : `${absChange.toFixed(1)}% ${isPositive ? 'More' : 'Less'} than yesterday`;
  }

  // --- Chart Functions ---
  let occupancyChart: any = null;
  let demographicsPieChart: any = null;
  let demographicsTimeseriesChart: any = null;

  async function renderOccupancyChart() {
    try {
      const now = new Date();
      const nowMs = now.getTime();

      // 70% sliding window implementation
      const totalWindowHours = 12;
      const msPerHour = 60 * 60 * 1000;

      const pastDuration = totalWindowHours * 0.7 * msPerHour;   // 8.4 hours
      const futureDuration = totalWindowHours * 0.3 * msPerHour; // 3.6 hours

      const minTime = nowMs - pastDuration;
      const maxTime = nowMs + futureDuration;

      const siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID) || API_CONFIG.DEFAULT_SITE_ID;

      // Fetch exact range needed (API presumably handles day boundaries via UTC timestamps)
      const data = await analyticsApi.getOccupancy(
        siteId,
        minTime.toString(),
        maxTime.toString()
      );

      // Prepare data for Time Scale (x: timestamp, y: value)
      const chartData = data.buckets.map(b => ({
        x: b.utc,
        y: b.avg
      }));

      // Extend line to "NOW" if we have data before it, to make it visualy continuous to the Live line
      // Find the last data point before NOW
      const lastPointBeforeNow = chartData.filter(d => d.x <= nowMs).pop();
      if (lastPointBeforeNow && lastPointBeforeNow.x < nowMs) {
        // Add a point exactly at NOW with the same value (step) or interpolated
        // Basic hold:
        chartData.push({
          x: nowMs,
          y: lastPointBeforeNow.y
        });
        // Resort just in case
        chartData.sort((a, b) => a.x - b.x);
      }

      if (occupancyChart) occupancyChart.destroy();

      const canvas = document.getElementById('occupancy-chart') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let gradient = null;
      if (ctx) {
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(42, 127, 125, 0.4)');
        gradient.addColorStop(1, 'rgba(42, 127, 125, 0.0)');
      }

      occupancyChart = new Chart(canvas, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Occupancy',
            data: chartData,
            borderColor: '#2A7F7D',
            backgroundColor: gradient || 'rgba(42, 127, 125, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#2A7F7D',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { top: 0, right: 12, left: 12, bottom: 0 }
          },
          plugins: {
            legend: {
              display: true,
              align: 'end',
              labels: {
                usePointStyle: true,
                boxWidth: 8,
                boxHeight: 8,
                padding: 20,
                color: '#1D1D1B',
                font: { family: "'IBM Plex Sans', sans-serif", size: 14, weight: 300 },
                generateLabels: (chart) => {
                  const datasets = chart.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label || '',
                    fillStyle: '#009490',
                    strokeStyle: '#009490',
                    lineWidth: 0,
                    hidden: !chart.isDatasetVisible(i),
                    index: i,
                    pointStyle: 'circle'
                  }));
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: '#FFFFFF',
              titleColor: '#1F2937',
              bodyColor: '#4B5563',
              borderColor: '#E5E7EB',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
            },
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  scaleID: 'x',
                  value: nowMs,
                  borderColor: '#B42018', // distinct red
                  borderWidth: 2,
                  borderDash: [4, 4],
                  label: {
                    content: 'LIVE',
                    display: true,
                    position: 'start', // Top
                    backgroundColor: '#B42018', // Red background
                    color: '#FFFFFF', // White text
                    borderColor: '#B42018', // Red border
                    borderWidth: 2,
                    borderRadius: 4,
                    font: { size: 10, weight: 'bold', family: "'IBM Plex Sans', sans-serif" },
                    rotation: -90,
                    yAdjust: 30, // Push down to clear top visual area
                    padding: { x: 8, y: 4 }, // Width/Height approximation
                    textAlign: 'center'
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              // Removed explicit max to allow auto-scaling
              grid: {
                color: '#F3F4F6',
                tickBorderDash: [4, 4]
              },
              border: { display: false },
              ticks: {
                color: '#9CA3AF',
                font: { family: "'IBM Plex Sans', sans-serif", size: 11 },
                padding: 10,
              },
              title: {
                display: true,
                text: 'Count',
                color: '#6B7280',
                font: { size: 12 }
              }
            },
            x: {
              type: 'time',
              min: minTime, // Start of Today
              max: maxTime,   // End of Today
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'h:mm a'
                },
                tooltipFormat: 'h:mm a'
              },
              grid: {
                display: false
              },
              border: {
                display: true,
                color: '#E5E7EB',
                width: 1
              },
              ticks: {
                color: '#9CA3AF',
                font: { family: "'IBM Plex Sans', sans-serif", size: 11 },
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 8,
                padding: 8
              },
              title: {
                display: true,
                text: 'Time',
                color: '#6B7280',
                font: { size: 12 },
                padding: { top: 10 }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        }
      });

    } catch (e) {
      console.error(e);
    }
  }

  async function renderDemographicsCharts() {
    try {
      const now = new Date();
      const nowMs = now.getTime();

      // Last 12 Hours Window
      const windowHours = 12;
      const msPerHour = 60 * 60 * 1000;

      const minTime = nowMs - (windowHours * msPerHour); // 12 hours ago
      const maxTime = nowMs; // Now

      const siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID) || API_CONFIG.DEFAULT_SITE_ID;
      const data = await analyticsApi.getDemographics(siteId, minTime.toString(), maxTime.toString());

      const totalMale = data.buckets.reduce((a, b) => a + b.male, 0);
      const totalFemale = data.buckets.reduce((a, b) => a + b.female, 0);

      // Doughnut Chart (Demographics)
      if (demographicsPieChart) demographicsPieChart.destroy();
      const pieCanvas = document.getElementById('demographics-pie-chart') as HTMLCanvasElement;

      // Colors from Figma
      const maleColor = '#7AB6B5';
      const femaleColor = '#BCE3E4';

      if (pieCanvas) {
        // Calculate percentages
        const total = totalMale + totalFemale;
        const malePercent = total > 0 ? Math.round((totalMale / total) * 100) : 0;
        const femalePercent = total > 0 ? Math.round((totalFemale / total) * 100) : 0;

        demographicsPieChart = new Chart(pieCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Male', 'Female'],
            datasets: [{
              data: [totalMale, totalFemale],
              backgroundColor: [maleColor, femaleColor],
              borderWidth: 2,
              borderColor: '#FFFFFF',
              borderRadius: 20, // Rounded ends
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '82%', // Thinner ring
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            }
          },
          plugins: [{
            id: 'centerText',
            beforeDraw: (chart: any) => {
              const width = chart.width;
              const height = chart.height;
              const ctx = chart.ctx;

              ctx.restore();

              // Total Crowd Label
              // const fontSizeLabel = (height / 20).toFixed(2); // Unused
              ctx.font = `400 14px "IBM Plex Sans"`; // Fixed size for consistency
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#6B7280";
              const text = "Total Crowd";
              const textX = Math.round((width - ctx.measureText(text).width) / 2);
              const textY = height / 2 - 12;
              ctx.fillText(text, textX, textY);

              // Percentage Value
              ctx.font = `600 24px "IBM Plex Sans"`;
              ctx.fillStyle = "#111827";
              const val = "100%";
              const valX = Math.round((width - ctx.measureText(val).width) / 2);
              const valY = height / 2 + 15;
              ctx.fillText(val, valX, valY);

              ctx.save();
            }
          }]
        });

        // Custom Legend Injection
        const container = pieCanvas.parentElement?.parentElement;
        if (container) {
          // Remove existing legend if any
          const existingLegend = container.querySelector('.custom-legend');
          if (existingLegend) existingLegend.remove();

          const legendHtml = `
            <div class="custom-legend" style="
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding-left: 10px;
            ">
              <!-- Males -->
              <div style="display: flex; align-items: center; gap: 8px;">
                <img src="/male.png" alt="Male" style="height: 24px; width: auto;" />
                <span style="font-family: 'IBM Plex Sans'; font-size: 16px; color: #111827;">
                  <strong style="font-weight: 600;">${malePercent}%</strong> Males
                </span>
              </div>
              
              <!-- Females -->
              <div style="display: flex; align-items: center; gap: 8px;">
                 <img src="/female.png" alt="Female" style="height: 24px; width: auto;" />
                 <span style="font-family: 'IBM Plex Sans'; font-size: 16px; color: #111827;">
                   <strong style="font-weight: 600;">${femalePercent}%</strong> Females
                 </span>
              </div>
            </div>
          `;
          container.insertAdjacentHTML('beforeend', legendHtml);
        }
      }

      // Timeseries Chart
      if (demographicsTimeseriesChart) demographicsTimeseriesChart.destroy();
      const lineCanvas = document.getElementById('demographics-timeseries-chart') as HTMLCanvasElement;

      if (lineCanvas) {
        // We do typically just rely on 'x' time scale, but let's prep data array
        const maleData = data.buckets.map(b => ({ x: b.utc, y: b.male }));
        const femaleData = data.buckets.map(b => ({ x: b.utc, y: b.female }));

        const ctx = lineCanvas.getContext('2d');
        let maleGradient = null;
        let femaleGradient = null;

        if (ctx) {
          maleGradient = ctx.createLinearGradient(0, 0, 0, 300);
          maleGradient.addColorStop(0, 'rgba(42, 127, 125, 0.4)');
          maleGradient.addColorStop(1, 'rgba(42, 127, 125, 0.0)');

          femaleGradient = ctx.createLinearGradient(0, 0, 0, 300);
          femaleGradient.addColorStop(0, 'rgba(94, 234, 212, 0.4)');
          femaleGradient.addColorStop(1, 'rgba(94, 234, 212, 0.0)');
        }

        demographicsTimeseriesChart = new Chart(lineCanvas, {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Male',
                data: maleData,
                borderColor: '#2A7F7D', // Matches Occupancy Line Color
                backgroundColor: maleGradient || 'rgba(42, 127, 125, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
              },
              {
                label: 'Female',
                data: femaleData,
                borderColor: '#5EEAD4', // Teal-300 for contrast
                backgroundColor: femaleGradient || 'rgba(94, 234, 212, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: { top: 0, right: 12, left: 12, bottom: 0 }
            },
            plugins: {
              legend: {
                display: true,
                align: 'end',
                labels: {
                  usePointStyle: true,
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 20,
                  color: '#1D1D1B',
                  font: { family: "'IBM Plex Sans', sans-serif", size: 14, weight: 300 },
                  generateLabels: (chart) => {
                    const datasets = chart.data.datasets;
                    return datasets.map((dataset, i) => ({
                      text: dataset.label || '',
                      fillStyle: dataset.borderColor as string,
                      strokeStyle: dataset.borderColor as string,
                      lineWidth: 0,
                      hidden: !chart.isDatasetVisible(i),
                      index: i,
                      pointStyle: 'circle'
                    }));
                  }
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#FFFFFF',
                titleColor: '#1F2937',
                bodyColor: '#4B5563',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                // Auto Scale
                grid: {
                  color: '#F3F4F6',
                  tickBorderDash: [4, 4]
                },
                border: { display: false },
                ticks: {
                  color: '#9CA3AF',
                  font: { family: "'IBM Plex Sans', sans-serif", size: 11 },
                  padding: 10,
                },
                title: {
                  display: true,
                  text: 'Count',
                  color: '#6B7280',
                  font: { size: 12 }
                }
              },
              x: {
                type: 'time',
                min: minTime,
                max: maxTime,
                time: {
                  unit: 'hour',
                  displayFormats: {
                    hour: 'h:mm a'
                  },
                  tooltipFormat: 'h:mm a'
                },
                grid: { display: false },
                border: {
                  display: true,
                  color: '#E5E7EB',
                  width: 1
                },
                ticks: {
                  color: '#9CA3AF',
                  font: { family: "'IBM Plex Sans', sans-serif", size: 11 },
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 8,
                  padding: 8
                },
                title: {
                  display: true,
                  text: 'Time',
                  color: '#6B7280',
                  font: { size: 12 },
                  padding: { top: 10 }
                }
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
          }
        });
      }

    } catch (e) {
      console.error(e);
    }
  }

  // --- Site Selector ---
  async function initSiteSelector() {
    try {
      const sites = await analyticsApi.getSites();
      if (!sites.length) return;

      let currentSiteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID);
      let currentSiteName = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_NAME);

      if (!currentSiteId) {
        currentSiteId = sites[0].siteId;
        currentSiteName = sites[0].name;
        localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_ID, currentSiteId);
        localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_NAME, currentSiteName);
      }

      const nameEl = document.getElementById('selected-site-name');
      if (nameEl) nameEl.textContent = currentSiteName || 'Select Site';

      const dropdown = document.getElementById('site-dropdown');
      if (dropdown) {
        dropdown.innerHTML = sites.map(site => `
                <div class="site-option" data-id="${site.siteId}" data-name="${site.name}" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #eee;">
                    ${site.name}
                </div>
            `).join('');

        dropdown.querySelectorAll('.site-option').forEach(el => {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = e.currentTarget as HTMLElement;
            const id = target.dataset.id!;
            const name = target.dataset.name!;

            localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_ID, id);
            localStorage.setItem(STORAGE_KEYS.SELECTED_SITE_NAME, name);
            if (nameEl) nameEl.textContent = name;
            dropdown.style.display = 'none';

            // Reload
            loadDashboardData();
            renderOccupancyChart();
            renderDemographicsCharts();
          });
        });
      }

      const selector = document.getElementById('site-selector');
      selector?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });

      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      });

    } catch (e) {
      console.error('Site selector init failed', e);
    }
  }


  // --- Sidebar Logic ---
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

  function toggleSidebar() {
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  if (overlay) overlay.addEventListener('click', toggleSidebar);

  // Close sidebar when clicking 'X' inside it (reused hamburger icon as close in mobile mode)
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', (e) => {
    // Only if we are in mobile mode where sidebar is fixed?
    // The class toggle mechanism is safe to run always.
    e.stopPropagation();
    toggleSidebar();
  });

  // Initial Declaration
  initSiteSelector();
  loadDashboardData();
  renderOccupancyChart();
  renderDemographicsCharts();

  // Hide loading
  const loading = document.getElementById('dashboard-loading');
  if (loading) setTimeout(() => loading.style.display = 'none', 1000);

  // --- Real-time Updates ---
  const token = AuthService.getToken();
  if (token && !socketService.isConnected()) {
    socketService.connect(token);
  }

  socketService.on('liveOccupancy', (data: any) => {
    const liveOccupancyEl = document.getElementById('live-occupancy-value');
    if (liveOccupancyEl) {
      liveOccupancyEl.textContent = Math.round(data.siteOccupancy).toString();
      liveOccupancyEl.style.color = '#4F46E5';
      setTimeout(() => liveOccupancyEl.style.color = '#030303', 1000);
    }
  });

  socketService.on('alert', (data: any) => {
    console.log('Real-time Alert received:', data);
    // Optional: Add toaster or alert UI here
  });
}
