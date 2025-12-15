import { analyticsApi, getTodayTimestamps } from '../services/api';
import { API_CONFIG, STORAGE_KEYS } from '../config/api';
import { AuthService } from '../services/auth'; // Added import

export const renderCrowdEntries = (app: HTMLDivElement) => {
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
          <!-- Overview - Inactive -->
          <div id="overview-btn" style="
            width: 216px;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 8px 16px;
            cursor: pointer;
          ">
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
          
          <!-- Crowd Entries - Active -->
          <div style="
            width: 216px;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 8px 16px;
            border-radius: 4px;
            background: #FFFFFF4D; /* Active BG */
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
            <img src="/Crowd Entries vector.png" alt="Crowd Entries" style="width: 20px; height: 20px; filter: brightness(0) invert(1); margin-left: 6px;" />
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
            <span id="entries-site-name" style="
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
          
          <img src="/alert.png" alt="Notifications" style="width: 28px; height: 28px; cursor: pointer;" />
          <img src="/Profile.png" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; cursor: pointer;" />
        </div>
      </div>
      
      <!-- Page Content -->
      <div style="
        width: 100%;
        padding: 24px;
      ">
        <!-- Page Header -->
        <div style="
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 0;
          margin-bottom: 24px;
        ">
          <span style="
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 500;
            font-size: 20px;
            line-height: 20px;
            letter-spacing: 0.02em;
            color: #1D1D1B;
          ">Overview</span>
          
          <div style="
            width: 200px;
            height: 40px;
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
        
        <!-- Table Container -->
        <div style="
          width: 100%;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        ">
          <!-- Table -->
          <div style="overflow-x: auto;">
              <table style="
                width: 100%;
                border-collapse: collapse;
                min-width: 600px; /* Ensure table doesn't collapse too much on mobile */
              ">
                <thead>
                  <tr style="border-bottom: 1px solid #E5E7EB; background: #F3F4F6;">
                    <th style="padding: 12px 16px; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 14px; color: #374151;">Name</th>
                    <th style="padding: 12px 16px; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 14px; color: #374151;">Sex</th>
                    <th style="padding: 12px 16px; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 14px; color: #374151;">Entry</th>
                    <th style="padding: 12px 16px; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 14px; color: #374151;">Exit</th>
                    <th style="padding: 12px 16px; text-align: left; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 14px; color: #374151;">Dwell Time</th>
                  </tr>
                </thead>
                <tbody id="entries-table-body">
                  <tr><td colspan="5" style="padding: 20px; text-align: center;">Loading...</td></tr>
                </tbody>
              </table>
          </div>
          
          <!-- Pagination -->
          <div style="
            display: flex;
            justify-content: flex-end; /* Right aligned as per common practice, or center? Image didn't show clearly but usually right or center. Let's center. */
            justify-content: center;
            align-items: center;
            margin-top: 24px;
            padding-top: 16px;
          ">
            <div id="pagination-controls" style="display: flex; gap: 8px; align-items: center;">
               <!-- Pagination buttons injected via JS -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // --- Interaction Logic ---

  // --- Alerts Sidebar Logic ---
  const alertsSidebarHtml = `
    <div id="alerts-sidebar" style="
      position: fixed;
      top: 0;
      right: -400px;
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

  // Render Alerts Function (Copied logic)
  async function renderAlerts() {
    try {
      const { fromUtc, toUtc } = getTodayTimestamps();
      const siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID) || API_CONFIG.DEFAULT_SITE_ID;
      const response = await analyticsApi.getEntryExit(siteId, fromUtc, toUtc, 1, 20);

      const list = document.getElementById('alerts-list');
      if (!list) return;
      list.innerHTML = '';

      if (!response.records || response.records.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #6B7280;">No alerts for today.</div>';
        return;
      }

      response.records.forEach(record => {
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

        const dateObj = new Date(record.entryLocal);
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

  // Interaction
  const alertsSidebar = document.getElementById('alerts-sidebar');
  const alertsOverlay = document.getElementById('alerts-overlay');

  function toggleAlerts(show: boolean) {
    if (alertsSidebar && alertsOverlay) {
      alertsSidebar.style.right = show ? '0' : '-400px';
      alertsOverlay.style.display = show ? 'block' : 'none';

      setTimeout(() => {
        alertsOverlay.style.opacity = show ? '1' : '0';
      }, 10);

      if (show) { renderAlerts(); }
    }
  }

  const bellIcon = document.querySelector('img[alt="Notifications"]') as HTMLElement;
  if (bellIcon) {
    bellIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAlerts(true);
    });
    bellIcon.style.cursor = 'pointer';
  }

  document.getElementById('alerts-close-btn')?.addEventListener('click', () => toggleAlerts(false));
  alertsOverlay?.addEventListener('click', () => toggleAlerts(false));

  // Navigation
  document.getElementById('logout-btn')?.addEventListener('click', () => { AuthService.logout(); });
  document.getElementById('overview-btn')?.addEventListener('click', () => { window.location.hash = 'dashboard'; });

  // Sidebar Logic
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
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', toggleSidebar);

  // --- Site Selector (Reused) ---
  const siteNameLabel = document.getElementById('entries-site-name');
  async function initSiteSelector() {
    try {
      const sites = await analyticsApi.getSites();
      if (!sites.length) return;

      let currentSiteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID);
      let currentSiteName = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_NAME);

      if (!currentSiteId) {
        currentSiteId = sites[0].siteId;
        currentSiteName = sites[0].name;
      }

      if (siteNameLabel) siteNameLabel.textContent = currentSiteName || 'Select Site';

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
            if (siteNameLabel) siteNameLabel.textContent = name;
            dropdown.style.display = 'none';

            // Reload Data
            loadEntriesData(1);
          });
        });
      }

      document.getElementById('site-selector')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });

      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      });

    } catch (e) { console.error(e); }
  }
  initSiteSelector();

  // --- Data Loading ---
  let currentPage = 1;
  const pageSize = 10;

  async function loadEntriesData(page: number) {
    try {
      const { fromUtc, toUtc } = getTodayTimestamps();
      const siteId = localStorage.getItem(STORAGE_KEYS.SELECTED_SITE_ID) || API_CONFIG.DEFAULT_SITE_ID;

      const entriesData = await analyticsApi.getEntryExit(siteId, fromUtc, toUtc, page, pageSize);

      const tableBody = document.getElementById('entries-table-body');
      if (!tableBody) return;
      tableBody.innerHTML = '';

      if (entriesData.records.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="padding: 20px; text-align: center; color: #666;">No entries found for today.</td></tr>`;
      } else {
        entriesData.records.forEach(record => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid #E5E7EB';

          const dwellTimeDisplay = record.dwellMinutes !== null
            ? `${Math.floor(record.dwellMinutes / 60)}:${(record.dwellMinutes % 60).toString().padStart(2, '0')}`
            : '--';

          // Format Gender: Capitalize first letter
          const rawGender = record.gender || '-';
          const genderDisplay = rawGender.charAt(0).toUpperCase() + rawGender.slice(1).toLowerCase();

          // Format Time (assuming entryLocal is "HH:mm:ss" or Date string)
          // If entryLocal is "HH:mm:ss" (as usually returned by backend for 'Local'), we parse it to 12h.
          const formatTime = (timeStr: string | null) => {
            if (!timeStr) return '--';
            try {
              // Check if it is a full date string or just time
              // If it's a date string, we can use toLocaleTimeString
              const date = new Date(timeStr);
              if (!isNaN(date.getTime())) {
                return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
              }
              // If it is just HH:mm:ss string manually parse
              const [h, m] = timeStr.split(':');
              if (h && m) {
                const hour = parseInt(h);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12}:${m} ${ampm}`;
              }
              return timeStr;
            } catch (e) { return timeStr; }
          };

          const entryTimeDisplay = formatTime(record.entryLocal);
          const exitTimeDisplay = formatTime(record.exitLocal);


          // Avatar: Use snapshot if available, otherwise gender icon
          let avatarUrl = genderDisplay === 'Female' ? '/female.png' : '/male.png';
          let avatarStyle = "height: 24px; width: auto; opacity: 0.8;";

          if (record.snapshot) {
            // If snapshot exists (base64 or URL), use it
            // Assuming it might be a raw base64 string without prefix, or a full URL.
            // If it's pure base64 without data URI scheme, we might need to prepend 'data:image/jpeg;base64,'
            // But usually API returns full URL or data URI. Let's assume it works as src.
            avatarUrl = record.snapshot;
            // distinct style for real photos
            avatarStyle = "height: 32px; width: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #E5E7EB;";
          }

          row.innerHTML = `
              <td style="padding: 16px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #1F2937; display: flex; align-items: center; gap: 12px;">
                  <img src="${avatarUrl}" style="${avatarStyle}" onerror="this.onerror=null;this.src='/male.png';" />
                  ${record.personName || 'Unknown'}
              </td>
              <td style="padding: 16px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #1F2937;">${genderDisplay}</td>
              <td style="padding: 16px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #1F2937;">${entryTimeDisplay}</td>
              <td style="padding: 16px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #1F2937;">${exitTimeDisplay}</td>
              <td style="padding: 16px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; color: #1F2937;">${dwellTimeDisplay}</td>
            `;
          tableBody.appendChild(row);
        });
      }

      // Pagination Controls
      /* 
         Logic: < 1 2 3 ... 5 >
         Simplification: < 1 2 3 4 5 > if pages <= 5
      */
      const totalPages = Math.ceil(entriesData.totalRecords / pageSize);
      const controls = document.getElementById('pagination-controls');

      if (controls && totalPages > 0) {
        let html = '';

        // Prev
        html += `<button id="prev-btn" ${page === 1 ? 'disabled' : ''} style="width: 32px; height: 32px; border: 1px solid #D1D5DB; border-radius: 4px; background: #FFFFFF; color: #374151; cursor: pointer; display: flex; align-items: center; justify-content: center;">&lt;</button>`;

        // Page Numbers
        // Simple loop for now (up to 5 pages showed purely for demo if many)
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          const active = i === page;
          html += `<button class="page-btn" data-page="${i}" style="width: 32px; height: 32px; border: ${active ? 'none' : '1px solid #D1D5DB'}; border-radius: 4px; background: ${active ? '#0D9488' : '#FFFFFF'}; color: ${active ? '#FFFFFF' : '#374151'}; cursor: pointer;">${i}</button>`;
        }

        // Next
        html += `<button id="next-btn" ${page === totalPages ? 'disabled' : ''} style="width: 32px; height: 32px; border: 1px solid #D1D5DB; border-radius: 4px; background: #FFFFFF; color: #374151; cursor: pointer; display: flex; align-items: center; justify-content: center;">&gt;</button>`;

        controls.innerHTML = html;

        // Listeners
        document.getElementById('prev-btn')?.addEventListener('click', () => {
          if (currentPage > 1) { currentPage--; loadEntriesData(currentPage); }
        });
        document.getElementById('next-btn')?.addEventListener('click', () => {
          if (currentPage < totalPages) { currentPage++; loadEntriesData(currentPage); }
        });

        controls.querySelectorAll('.page-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const p = parseInt(target.dataset.page!);
            if (p !== currentPage) {
              currentPage = p;
              loadEntriesData(currentPage);
            }
          });
        });
      } else if (controls) {
        controls.innerHTML = '';
      }

    } catch (error) {
      console.error('Failed to load crowd entries:', error);
    }
  }

  loadEntriesData(currentPage);
};
