/* eslint-disable */

import { app, BrowserWindow, Menu } from 'electron';
import windowStateKeeper from 'electron-window-state';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

const mac_os = process.platform === 'darwin';

let mainWindow;

function createWindow() {
  const windowState = windowStateKeeper({
    defaultHeight: 563,
    defaultWidth: 1000,
    file: 'win.json'
  });

  mainWindow = new BrowserWindow({
    backgroundColor: 'rgb(63, 65, 71)',
    frame: mac_os,
    height: windowState.height,
    minHeight: 500,
    minWidth: 500,
    title: 'RSS Feed Reader',
    titleBarStyle: mac_os ? 'hidden' : 'default',
    useContentSize: false,
    webPreferences: {
      nodeIntegration: true
    },
    width: windowState.width,
    x: windowState.x,
    y: windowState.y
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  windowState.manage(mainWindow);
}

function generateMenu() {
  const template = [
    {
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'About RSS Feed Reader' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide', label: 'Hide RSS Feed Reader' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit', label: 'Quit RSS Feed Reader' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        // { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
  // in case we want to allow a mac menu, allow here
  if (mac_os) {
    generateMenu();
  }
  createWindow();
});

app.on('window-all-closed', () => {
  /**
   * It's common on OSX to keep the app alive even after
   * closing all windows of the app, so this makes sure
   * that expected behavior is maintained.
   */
  if (!mac_os) {
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
