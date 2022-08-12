const puppeteer = require('puppeteer');

(async () => {

  const url = "https://html-static.qencode.com/qencode5-portal/play-webrtc/"
  const streamUrl = process.argv[2]

  //const browser = await puppeteer.launch(); // await puppeteer.launch({args:['--no-sandbox']});
  console.log("Launching browser...")
  const browser = await puppeteer.launch({args:['--no-sandbox']});
  console.log("Browser launched!")

  console.log("Opening new page...")
  const page = await browser.newPage();
  console.log("New page opened!")

  console.log("Go to ", url)
  await page.goto(url);
  console.log("Url opened")

  console.log("Wait for 5 seconds...")
  await page.waitForTimeout(5000)

  await page.waitForSelector('#url');
  await page.type('#url', streamUrl);
  await page.click('#start');
  console.log("Wait for 10 seconds...")
  await page.waitForTimeout(10000)  

  console.log("Taking screenshot...")
  await page.screenshot({path: 'screenshot.png'});

  console.log("Wait for 5 seconds...")
  await page.waitForTimeout(5000)

  console.log("Closing browser...")
  await browser.close();
})();