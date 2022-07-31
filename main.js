const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  // On MacOS, we keep the application running even if there are no windows and create one on activate
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// On Windows & Linux, we quit the application when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});