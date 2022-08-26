const puppeteer = require('puppeteer');

(async () => {

  const url = "https://ovenplayer.netlify.app/"
  const streamUrl = process.argv[2]

  //const browser = await puppeteer.launch(); // await puppeteer.launch({args:['--no-sandbox']});
  console.log("Launching browser...")

  const browser = await puppeteer.launch(
    {
        //headless: false,
        headless: 'chrome',
        args:[
            // `--use-fake-device-for-media-stream`,
            // `--use-fake-ui-for-media-stream`,
            `--no-sandbox`,
            '--autoplay-policy=no-user-gesture-required'
        ]
    }
  );



  console.log("Browser launched!")

  console.log("Opening new page...")
  const page = await browser.newPage();
  console.log("New page opened!")

  // https://stackoverflow.com/a/59871321/6261255
  console.log("Wait for 5 seconds...")
  await page.waitForTimeout(5000)  
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  client.on('Network.webSocketFrameReceived', ({ requestId, timestamp, response }) => {
    console.log("Network.webSocketFrameReceived")
    console.log(response);
  });    
  client.on('Network.webSocketFrameSent', ({ requestId, timestamp, response }) => {
    console.log("Network.webSocketFrameSent")
    console.log(response);
  });  

  console.log("Go to ", url)
  await page.goto(url);
  console.log("Url opened")

  console.log("Wait for 5 seconds...")
  await page.waitForTimeout(5000)

  console.log("Enter webrtc stream url: ", streamUrl)
  await page.waitForSelector('#url');
  await page.type('#url', streamUrl);
  console.log("Click start to initialize connection...")
  await page.click('#start');


  for (let index = 0; index < 10; index++) {
    console.log("Wait for 10 seconds...")
    await page.waitForTimeout(10000) 
    console.log("Taking screenshot...")
    await page.screenshot({path: `screenshot${index}.png`}); 
  }
  

// START https://stackoverflow.com/a/57894554/6261255
//   const cdp = await page.target().createCDPSession();
//   await cdp.send('Network.enable');
//   await cdp.send('Page.enable');

//   const printResponse = response => console.log('response: ', response);

//   cdp.on('Network.webSocketFrameReceived', printResponse); // Fired when WebSocket message is received.
//   cdp.on('Network.webSocketFrameSent', printResponse); // Fired when WebSocket message is sent.  
// END

//   console.log("Wait for 5 seconds...")
//   await page.waitForTimeout(5000)

//   console.log("Closing browser...")
//   await browser.close();

})();