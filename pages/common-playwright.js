const launchBrowser = async (browserType) => {
  const browser = await browserType.launch({
    headless: false,
    slowMo: 500,
    args: [
      "--start-maximized",
      "--window-size=1920,1080",
      "--no-sandbox",
      "--incognito",
    ],
  });

  const context = await browser.newContext({
    screen: {
      width: 1920,
      height: 1020,
    },
    viewport: {
      width: 1920,
      height: 1020,
    },
  });

  const page = await context.newPage({
    recordVideo: {
      dir: "./videos/",
      size: { width: 1024, height: 768 },
    },
  });
  return page;
};

const getRandItem = (list) => list[Math.floor(Math.random() * list.length)];

module.exports = {
  launchBrowser,
  getRandItem,
};
