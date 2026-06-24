const fs = require('fs');
const content = fs.readFileSync('src/lib/data.ts', 'utf-8');

const regex = /{ id: '([A-Z]{3})', name: '[^']+', flagUrl: '[^']+', group: '([A-Z])' }/g;
let match;
const groups = {};

while ((match = regex.exec(content)) !== null) {
  const teamId = match[1];
  const group = match[2];
  if (!groups[group]) groups[group] = [];
  groups[group].push(teamId);
}

const realisticScores = [
  [0, 0], [1, 0], [0, 1], [1, 1], [2, 0], [0, 2], [2, 1], [1, 2],
  [3, 0], [0, 3], [2, 2], [3, 1], [1, 3]
];

let appendedCode = '\n// --- PREENCHIMENTO COMPLETO (SIMULADO) ATÉ 23 DE JUNHO ---\n';

for (const group in groups) {
  const teams = groups[group];
  // Rodada 1
  let s1 = realisticScores[Math.floor(Math.random() * realisticScores.length)];
  appendedCode += `applyRealResult('${teams[0]}', '${teams[1]}', ${s1[0]}, ${s1[1]});\n`;
  let s2 = realisticScores[Math.floor(Math.random() * realisticScores.length)];
  appendedCode += `applyRealResult('${teams[2]}', '${teams[3]}', ${s2[0]}, ${s2[1]});\n`;
  
  // Rodada 2
  let s3 = realisticScores[Math.floor(Math.random() * realisticScores.length)];
  appendedCode += `applyRealResult('${teams[0]}', '${teams[2]}', ${s3[0]}, ${s3[1]});\n`;
  let s4 = realisticScores[Math.floor(Math.random() * realisticScores.length)];
  appendedCode += `applyRealResult('${teams[1]}', '${teams[3]}', ${s4[0]}, ${s4[1]});\n`;
}

fs.appendFileSync('src/lib/data.ts', appendedCode);
console.log("Scores generated and appended!");
