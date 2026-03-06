const puppeteer = require('puppeteer');

async function test() {
    console.log('Testing Puppeteer launch...');
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        console.log('Puppeteer launched successfully!');
        const page = await browser.newPage();
        await page.setContent('<h1>Test</h1>');
        const pdf = await page.pdf({ format: 'A4' });
        console.log(`PDF generated successfully! Size: ${pdf.length} bytes`);
        await browser.close();
        process.exit(0);
    } catch (err) {
        console.error('Puppeteer launch failed:', err);
        process.exit(1);
    }
}

test();
