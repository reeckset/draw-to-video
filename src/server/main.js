const { app, BrowserWindow } = require('electron');

const path = require('path');

const distDir = path.join(__dirname, '../../public');

const isDev = require('electron-is-dev');

function createWindow() {
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        }
    });

    win.loadURL(isDev ? 'http://localhost:3000' : `${distDir}/index.html`);
    // win.webContents.openDevTools();
    win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
