const fs = require('fs');
let html = fs.readFileSync('src/raw-pages/main.html', 'utf8');

// Replace class with className
html = html.replace(/class=/g, 'className=');

// Replace for with htmlFor
html = html.replace(/for=/g, 'htmlFor=');

// Replace srcset with srcSet
html = html.replace(/srcset=/g, 'srcSet=');

// Replace stroke-* attributes
html = html.replace(/stroke-width=/g, 'strokeWidth=');
html = html.replace(/stroke-linecap=/g, 'strokeLinecap=');

// Self-close tags
html = html.replace(/<img([^>]+?)\s*\/?>/gi, (match, p1) => {
    return p1.trim().endsWith('/') ? match : `<img ${p1.trim()} />`;
});
html = html.replace(/<br\s*\/?>/gi, '<br />');
html = html.replace(/<input([^>]+?)\s*\/?>/gi, (match, p1) => {
    return p1.trim().endsWith('/') ? match : `<input ${p1.trim()} />`;
});

// Convert inline styles to React style objects
html = html.replace(/style="([^"]*)"/g, (match, stylesStr) => {
    if (!stylesStr.trim()) return 'style={{}}';
    const rules = stylesStr.split(';');
    const styleObjStr = rules.map(rule => {
        const parts = rule.split(':');
        if (parts.length < 2) return '';
        let key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        // Convert camelCase
        key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${key}: '${value}'`;
    }).filter(s => s).join(', ');
    return `style={{${styleObjStr}}}`;
});

// Replace HTML comments
html = html.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// FetchPriority -> fetchPriority
html = html.replace(/fetchpriority=/g, 'fetchPriority=');
// autocomplete -> autoComplete
html = html.replace(/autocomplete=/g, 'autoComplete=');
// tabindex -> tabIndex
html = html.replace(/tabindex=/g, 'tabIndex=');

const template = `export default function DiscoveryPage() {
  return (
    ${html}
  );
}
`;

fs.writeFileSync('src/pages/DiscoveryPage/index.jsx', template);
console.log('Done!');
