const { app, BrowserWindow } = require('electron')
const path = require('path')

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false,
        },
        icon: __dirname + '/logo.ico',
    })

    // mainWindow.setMenu(null);
    
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.whenReady().then(() => {

    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
});