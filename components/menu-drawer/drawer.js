let drawerHTML = '';
const aside = document.getElementById("menuDrawer");
const header = document.querySelector(".header");
const user ={
    name: "Tahir Abdulkadir Dan Wawu",
    accountType: "Retailer",
    avater:"TD"
}
let headerHTML = `
     <div class="header-left">
         <button
             class="menu-open"
             id="menuOpen"
             aria-label="Open menu">
             ☰
         </button>
         <h1 class="header-title">
             PITMS
         </h1>
     </div>
     <div class="header-right">
         <button
             class="notification"
             aria-label="Notifications">
             🔔
         </button>
          <button
             class="quick-menu-button"
             id="quickMenuButton"
             aria-label="Open quick settings"
             aria-expanded="false">
             ⋮
       </button>
           <!-- 3-Dot Quick Settings -->
             <div class="quick-menu">
             
             
              
             
                 <div
                     class="quick-menu-content"
                     id="quickMenuContent">
                     <div class="quick-menu-header">
                         <strong>Quick Settings</strong>
                     </div>                 
                     <a href="../../frontend/pages/profile.html" class="quick-menu-item">
                         <span>👤</span>
                         <span>Profile</span>
                     </a>
                     <a href="../../frontend/pages/acccount.html" class="quick-menu-item">
                         <span>⚙</span>
                         <span>Account</span>
                     </a>
                     <a href="../../frontend/pages/setting.html" class="quick-menu-item">
                         <span>☷</span>
                         <span>System Settings</span>
                     </a>
                  <a href="../../frontend/pages/feedback.html" class="quick-menu-item">
                         <span>🗨️</span>
                         <span>Feedback</span>
                     </a>
                     <div class="quick-menu-divider">
                     </div>
                     <button
                         type="button"
                         class="quick-menu-item sign-out"
                         id="quickSignOut">
                 
                 
                         <span>→</span>
                         <span>Sign out</span>
                 
                 
                     </button>
                 
                 
                 </div>
             
             
             </div>
             <div
                 class="drawer-overlay"
                 id="drawerOverlay">
             </div>
     </div>
`;

let asideHTML = `
    <!-- Drawer Header -->
    <div class="drawer-header">
        <div class="brand">
            <span class="brand-icon">
                ◆
            </span>
            <span class="brand-name">
                PITMS
            </span>
        </div>
        <button
            class="drawer-close"
            id="drawerClose"
            aria-label="Close menu">
            ×
        </button>
    </div>
    <!-- Navigation -->
    <nav class="drawer-navigation">
        <p class="menu-title">
            MENU
        </p>
        <a
            href="../../frontend/pages/dashboard.html"
            class="menu-item active">
            <span class="menu-icon">
                ▦
            </span>
            <span>
                Dashboard
            </span>
        </a>
        <a
            href="../../frontend/pages/products.html"
            class="menu-item">
            <span class="menu-icon">
                ◇
            </span>
            <span>
                Product Records
            </span>
        </a>
        <a
            href="../../frontend/pages/import.html"
            class="menu-item">
            <span class="menu-icon">
                ↑
            </span>
            <span>
                Import
            </span>
        </a>
        <a
            href="../../frontend/pages/export.html"
            class="menu-item">
            <span class="menu-icon">
                ↓
            </span>
            <span>
                Export
            </span>
        </a>
        <a
            href="../../frontend/pages/tracking.html"
            class="menu-item">
            <span class="menu-icon">
                ◎
            </span>
            <span>
                Tracking
            </span>
        </a>
        <a
            href="../../frontend/pages/history.html"
            class="menu-item">
            <span class="menu-icon">
                ↶
            </span>
            <span>
                History
            </span>
        </a>
    </nav>
    <!-- User -->
    <div class="drawer-user">
        <div class="user-information">
            <div class="user-avatar">
                ${user.avater}
            </div>
            <div class="user-details">
                <strong>
                    ${user.name}
                </strong>
                <span>
                    ${user.accountType}
                </span>
            </div>
        </div>
        <button
            class="sign-out"
            id="signOut">
            <span class="menu-icon">
                →
            </span>
            <span>
                Sign out
            </span>
        </button>
    </div>
    

`;
aside.innerHTML = `${asideHTML}`;
header.innerHTML = `${headerHTML}`;
//drawerHTML = `${headerHTML} ${asideHTML}`;


//console.log(drawerHTML);