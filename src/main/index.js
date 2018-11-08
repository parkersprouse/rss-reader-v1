import { app, BrowserWindow } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    frame: false, // process.platform === 'darwin',
    height: 563,
    minHeight: 500,
    minWidth: 500,
    // show: false,
    title: 'RSS Feed Reader',
    // titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  /**
   * Prevent "pop-in" from happening by making sure the window
   * isn't shown until the content within is loaded.
   */
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show();
  // });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  /**
   * It's common on OSX to keep the app alive even after
   * closing all windows of the app, so this makes sure
   * that expected behavior is maintained.
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
