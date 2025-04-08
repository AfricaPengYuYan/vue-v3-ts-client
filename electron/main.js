import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const idDev = process.env.NODE_ENV === 'development'

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
        WINDOW.loadFile(join(__dirname, './dist-web/index.html'))
    }
}

function checkForUpdates() {
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', (info) => {
        dialog.showMessageBox({
            type: 'info',
            title: '更新可用',
            message: `发现新版本 ${info.version}，是否立即更新？`,
            buttons: ['是', '否'],
        }).then((result) => {
            if (result.response === 0) {
                autoUpdater.downloadUpdate()
            }
        })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            type: 'info',
            title: '更新完成',
            message: '更新下载完成，是否立即安装？',
            buttons: ['立即安装', '稍后'],
        }).then((result) => {
            if (result.response === 0) {
                autoUpdater.quitAndInstall()
            }
        })
    })

    autoUpdater.on('error', (error) => {
        dialog.showErrorBox('更新错误', error == null ? '未知错误' : error.toString())
    })
}

checkForUpdates()

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
