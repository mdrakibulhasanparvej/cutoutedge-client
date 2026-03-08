const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) {
            walk(fp, callback);
        } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
            callback(fp);
        }
    }
}

// replacements map based on the implementation plan
const replacements = [
    // regex pattern matching imports like `from ".../component/..."` or `import ".../component/..."`
    { from: /(['"])(.*?)\/component\//g, to: '$1$2/components/' },
    { from: /(['"])(.*?)\/hook\//g, to: '$1$2/hooks/' },
    { from: /(['"])(.*?)\/layout\//g, to: '$1$2/layouts/' },
    { from: /(['"])(.*?)\/provider\//g, to: '$1$2/providers/' },
    { from: /(['"])(.*?)\/pages\/auth\//g, to: '$1$2/auth/' },
    { from: /(['"])(.*?)\/pages\/Dashboard\//g, to: '$1$2/dashboard-pages/' },
    { from: /(['"])\.\.?\/pages\/auth\//g, to: '$1../auth/' }, // a bit naive, might need accurate relative path adjustment if depth changed
    { from: /(['"])\.\.?\/pages\/Dashboard\//g, to: '$1../dashboard-pages/' },
    // more exact common ones:
    { from: /from\s+['"]([^'"]*?)component([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}components${p2}"` },
    { from: /from\s+['"]([^'"]*?)hook([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}hooks${p2}"` },
    { from: /from\s+['"]([^'"]*?)layout([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}layouts${p2}"` },
    { from: /from\s+['"]([^'"]*?)provider([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}providers${p2}"` },
    { from: /from\s+['"]([^'"]*?)pages\/auth([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}auth${p2}"` },
    { from: /from\s+['"]([^'"]*?)pages\/Dashboard([^'"]*?)['"]/g, to: (match, p1, p2) => `from "${p1}dashboard-pages${p2}"` },
];

walk(srcDir, (fp) => {
    let content = fs.readFileSync(fp, 'utf8');
    let original = content;

    for (const rep of replacements) {
        content = content.replace(rep.from, rep.to);
    }

    if (content !== original) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log(`Updated imports in: ${fp.replace(srcDir, '')}`);
    }
});
console.log("Imports fixed.");
