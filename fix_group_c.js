const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf-8');

// Replace the old random Group C results
content = content.replace(
  /applyRealResult\('BRA', 'MAR', 2, 1\);\napplyRealResult\('HAI', 'SCO', 1, 2\);\napplyRealResult\('BRA', 'HAI', 0, 2\);\napplyRealResult\('MAR', 'SCO', 0, 0\);/g,
  `applyRealResult('BRA', 'MAR', 0, 0);\napplyRealResult('HAI', 'SCO', 0, 1);\napplyRealResult('BRA', 'HAI', 3, 0);\napplyRealResult('SCO', 'MAR', 0, 1);`
);

// We need to move the sorting block and export to the very end of the file.
const sortBlock = `// Ensure all matches are sorted by date and time
INITIAL_MATCHES.sort((a, b) => {
  if (!a.date || !b.date) return 0;
  // date format is DD/MM/YYYY
  const parseDate = (d, t) => {
    const [day, month, year] = d.split('/');
    const timeStr = t || '00:00';
    return new Date(\`\${year}-\${month}-\${day}T\${timeStr}:00Z\`).getTime();
  };
  return parseDate(a.date, a.time || '') - parseDate(b.date, b.time || '');
});

export const getInitialMatches = () => {
  return INITIAL_MATCHES;
};
`;

// Remove the existing sortBlock and export
content = content.replace(/\/\/ Ensure all matches are sorted by date and time[\s\S]*?export const getInitialMatches = \(\) => {\n  return INITIAL_MATCHES;\n};\n/g, '');

// Append it to the end
content = content + '\n' + sortBlock;

fs.writeFileSync('src/lib/data.ts', content);
