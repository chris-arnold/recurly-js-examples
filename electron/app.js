const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  const url = require('url').format({
    pathname: require('path').join(__dirname, "client/build/index.html"),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(url);
}

app.whenReady().then(createWindow);
