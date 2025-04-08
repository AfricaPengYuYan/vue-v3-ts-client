// electron 主程序
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow } from 'electron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const idDev = process.env.NODE_ENV === 'development'

// 屏蔽安全警告
function createWindow() {
    const WINDOW = new BrowserWindow({
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'rgba(0, 0, 0, 0)',
            height: 42,
            symbolColor: 'white',
        },
        width: 1024,
        height: 768,
    })

    if (idDev) {
        console.log(process.env)
        WINDOW.loadURL(process.env.VITE_DEV_SERVER_URL)
        // 开启调试台
        WINDOW.webContents.openDevTools()
    }
    else {
        WINDOW.loadFile(join(__dirname, 'dist/index.html'))
    }
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})
