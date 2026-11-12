// "Build web": o app é HTML/CSS/JS puro em www/. Aqui só validamos que ele existe e que o JS não tem erro de sintaxe.
const fs = require("fs");
const f = "www/index.html";
if (!fs.existsSync(f) || fs.statSync(f).size < 1000) { console.error("ERRO: www/index.html ausente ou vazio"); process.exit(1); }
const html = fs.readFileSync(f, "utf8");
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error("ERRO: <script> não encontrado"); process.exit(1); }
try { new Function(m[1]); } catch (e) { console.error("ERRO de sintaxe no JS:", e.message); process.exit(1); }
console.log("OK: www/index.html válido (" + html.length + " bytes)");
