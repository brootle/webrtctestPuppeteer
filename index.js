const puppeteer = require('puppeteer');

(async () => {
  //const browser = await puppeteer.launch(); // await puppeteer.launch({args:['--no-sandbox']});
  const browser = await puppeteer.launch({args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({path: 'google.png'});

  await browser.close();
})();