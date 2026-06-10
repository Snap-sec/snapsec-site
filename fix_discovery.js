const fs = require('fs');
const file = '/home/imran/Desktop/devCurrent/snapsec-site/src/pages/DiscoveryPage/components/HeroSection.jsx';
let content = fs.readFileSync(file, 'utf8');

// Fix Tab Bars
content = content.replace(
  /borderBottom: `1px solid \$\{([^}]+)\}`, padding: '0 24px' \}\}/g,
  "borderBottom: `1px solid ${$1}`, padding: '0 24px', overflowX: 'auto' }}"
);

// Fix Tables
content = content.replace(
  /style=\{\{\s*borderRadius: '8px',\s*border: `1px solid \$\{([^}]+)\}`,\s*overflow: 'hidden'\s*\}\}>/g,
  "style={{ borderRadius: '8px', border: `1px solid ${$1}`, overflowX: 'auto' }}>\n            <div style={{ minWidth: '700px' }}>"
);

// Close the inner div for tables
content = content.replace(
  /(\s*)<\/motion\.div>\n\n\s*<\/div>\n\s*<\/motion\.div>\n\s*<\/div>\n\s*\);/g,
  "$1  </div>\n$1</motion.div>\n\n        </div>\n      </motion.div>\n    </div>\n  );"
);

fs.writeFileSync(file, content);
console.log('Fixed');
