const fs = require('fs');
const path = require('path');

const handlerPath = path.join(__dirname, '.open-next', 'server-functions', 'default', 'handler.mjs');

if (fs.existsSync(handlerPath)) {
    let content = fs.readFileSync(handlerPath, 'utf8');
    
    // esbuild strict mode fails on duplicate keys in object literals.
    // Next.js SWC minifier has a known bug that generates this specific duplicate.
    const duplicateKeyStr = 'euro:"\\u20AC",dollar:"$",euro:"\\u20AC"';
    const fixedStr = 'euro:"\\u20AC",dollar:"$"';
    
    if (content.includes(duplicateKeyStr)) {
        content = content.replace(duplicateKeyStr, fixedStr);
        fs.writeFileSync(handlerPath, content, 'utf8');
        console.log('[fix-esbuild] Successfully removed duplicate "euro" key from handler.mjs!');
    } else {
        console.log('[fix-esbuild] Duplicate key not found in handler.mjs.');
    }
} else {
    console.log('[fix-esbuild] handler.mjs not found. Skipping.');
}
