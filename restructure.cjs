const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function renameSync(oldPathRel, newPathRel) {
    const oldPath = path.join(srcDir, oldPathRel);
    const newPath = path.join(srcDir, newPathRel);
    if (fs.existsSync(oldPath)) {
        // Ensure new path directory exists
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.renameSync(oldPath, newPath);
        console.log(`Moved: ${oldPathRel} -> ${newPathRel}`);
    } else {
        console.warn(`Not found: ${oldPathRel}`);
    }
}

// 1. Rename base folders
renameSync('component', 'components');
renameSync('hook', 'hooks');
renameSync('layout', 'layouts');
renameSync('provider', 'providers');

// 2. Auth
renameSync('pages/auth/Login', 'auth/Login');
renameSync('pages/auth/Register', 'auth/Register');

// 3. Components restructuring
renameSync('pages/Dashboard/project-details', 'components/project-details');
// We need to move shared items
renameSync('components/Dashboard/shared', 'components/shared');
renameSync('components/Dashboard/MenuItem', 'components/sidebar'); // Usually MenuItem is the sidebar
// Let's create subfolders in shared
const sharedDir = path.join(srcDir, 'components/shared');
if (!fs.existsSync(sharedDir)) fs.mkdirSync(sharedDir, { recursive: true });

function moveFileIfExist(oldP, newP) {
    const fullOld = path.join(srcDir, oldP);
    const fullNew = path.join(srcDir, newP);
    if (fs.existsSync(fullOld)) {
        const dir = path.dirname(fullNew);
        if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
        fs.renameSync(fullOld, fullNew);
    }
}

moveFileIfExist('components/shared/DashboardSkeleton.jsx', 'components/shared/loading/DashboardSkeleton.jsx');
moveFileIfExist('components/shared/LoadingSpinner.jsx', 'components/shared/loading/LoadingSpinner.jsx');
moveFileIfExist('components/shared/NoOrders.jsx', 'components/shared/loading/NoOrders.jsx');

// Project details
moveFileIfExist('components/project-details/ProjectDetails.jsx', 'components/project-details/ProjectDetails.jsx');

// Dashboard Pages
renameSync('pages/Dashboard/createProject', 'dashboard-pages/create-project');
renameSync('pages/Dashboard/DesignWork', 'dashboard-pages/Design-online');

// Profile & Statistics
moveFileIfExist('pages/Dashboard/common/Profile.jsx', 'dashboard-pages/profile/Profile.jsx');
renameSync('pages/Dashboard/common/Statistics', 'dashboard-pages/statistics');
moveFileIfExist('pages/Dashboard/statistics/StatisticsPage.jsx', 'dashboard-pages/statistics/StatisticsPage.jsx');
moveFileIfExist('pages/Dashboard/statistics/Statistics.jsx', 'dashboard-pages/statistics/Statistics.jsx'); // If it exists there

console.log("Restructuring script done.");
