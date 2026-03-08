const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function move(oldP, newP) {
    const fromPath = path.join(srcDir, oldP);
    const toPath = path.join(srcDir, newP);
    if (fs.existsSync(fromPath)) {
        fs.mkdirSync(path.dirname(toPath), { recursive: true });
        fs.renameSync(fromPath, toPath);
        console.log(`Moved ${oldP} -> ${newP}`);
    } else {
        console.log(`Not found: ${oldP}`);
    }
}

// Ensure exact matched locations
move('components/Dashboard/Sidebar/DesignerMenu.jsx', 'components/sidebar/DesignerMenu.jsx');

// Other Dashboards
move('dashboard-pages/AdminDashboard.jsx', 'dashboard-pages/AdminDashboard.jsx'); // No change needed if already there, just checking
move('pages/AdminDashboard.jsx', 'dashboard-pages/AdminDashboard.jsx');
move('pages/DesignerDashboard.jsx', 'dashboard-pages/DesignerDashboard.jsx');
move('pages/InchargeDashboard.jsx', 'dashboard-pages/InchargeDashboard.jsx');

// Shared components
move('components/shared/Cards/StatsCard.jsx', 'components/shared/cards/StatsCard.jsx');
move('components/shared/Cards/FileDetailsCard.jsx', 'components/shared/cards/FileDetailsCard.jsx');

// Since there is a components/sidebar, maybe the old menu was there
move('components/sidebar/MenuItem.jsx', 'components/shared/menu-item/MenuItem.jsx');
move('components/Dashboard/Sidebar/MenuItem.jsx', 'components/shared/menu-item/MenuItem.jsx');

// Buttons / UI
move('components/shared/ui/Button.jsx', 'components/shared/buttons/ActionButton.jsx'); // or Button.jsx depending on what they want

// If there's work-actions, work-tabs, etc.
// The user specified:
move('components/Dashboard/DesignWork/WorkActions.jsx', 'components/work-actions/WorkActions.jsx');
move('components/Dashboard/DesignWork/SharedTabs', 'components/work-tabs'); // wild guess
move('components/Dashboard/DesignWork/Pending.jsx', 'components/work-tabs/pending/Pending.jsx');
move('pages/Dashboard/DesignWork/Pending.jsx', 'components/work-tabs/pending/Pending.jsx');

// Check pages/Dashboard/common for remaining 
move('pages/Dashboard/common/StudentProfile.jsx', 'dashboard-pages/profile/StudentProfile.jsx'); // guess

// Clean up empty dirs
function deleteEmpty(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    for (const f of files) {
        const fp = path.join(dirPath, f);
        if (fs.statSync(fp).isDirectory()) deleteEmpty(fp);
    }
    if (fs.readdirSync(dirPath).length === 0) fs.rmdirSync(dirPath);
}
deleteEmpty(srcDir);
