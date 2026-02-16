// check-encoding.js
import fs from 'fs';
import path from 'path';

const filesToCheck = [
    'src/index.css',
    'src/App.jsx',
    'vite.config.js',
    'postcss.config.js',
    'tailwind.config.js'
];

console.log('Starting Encoding Check...');

let hasErrors = false;

filesToCheck.forEach(file => {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
        console.log(`[SKIPPING] ${file} not found`);
        return;
    }

    try {
        const buffer = fs.readFileSync(filePath);

        // Check for null bytes (0x00)
        if (buffer.includes(0x00)) {
            console.error(`[FAIL] ${file}: Contains NULL bytes! (Possible corruption)`);
            hasErrors = true;
        } else {
            // Check if valid UTF-8
            try {
                new TextDecoder('utf-8', { fatal: true }).decode(buffer);
                console.log(`[PASS] ${file}: Valid UTF-8`);
            } catch (e) {
                console.error(`[FAIL] ${file}: Invalid UTF-8 sequence`);
                hasErrors = true;
            }
        }
    } catch (err) {
        console.error(`[ERROR] Could not read ${file}:`, err.message);
        hasErrors = true;
    }
});

if (hasErrors) {
    console.error('\n⚠️  Encoding issues found! Please ensure files are saved as UTF-8 without BOM.');
    process.exit(1);
} else {
    console.log('\n✅ All checks passed. Files look clean.');
}
