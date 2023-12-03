const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "Raid Management Service",
    width: 500,
    height: 500
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

const createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: "About Raid Management Service",
    width: 300,
    height: 300
  });

  aboutWindow.loadFile(path.join(__dirname, 'renderer', 'about.html'));
}

const menu = isMac ? [{
  label: app.name,
  submenu: [{
    label: 'About'
  }]
}] : [{
  label: 'File',
  submenu: [{
    label: 'Exit',
    click: () => app.quit()
  }]
}, {
  label: 'Help',
  submenu: [{
    label: 'About',
    click: createAboutWindow
  }]
}];

app.whenReady().then(() => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  // keep application running if on MacOS
  if (!isMac) app.quit();
});

