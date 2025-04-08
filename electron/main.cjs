// 从 'path' 模块中导入 'path'，用于处理文件和目录路径
import path from 'node:path'
// 从 'url' 模块中导入 'fileURLToPath'，用于将 file URL 转换为路径
import { fileURLToPath } from 'node:url'
// 从 'electron' 模块中导入所需的类和函数
import { app, BrowserWindow, Menu, Tray } from 'electron'

// 定义 __filename 和 __dirname，用于获取当前文件的路径和目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 声明主窗口和托盘图标的变量
let mainWindow
let tray

// 创建应用程序的主窗口
function createWindow() {
    // 判断当前环境是否为开发环境
    const isDev = process.env.NODE_ENV === 'development'

    // 创建一个新的 BrowserWindow 实例
    mainWindow = new BrowserWindow({
        width: 1280, // 窗口宽度
        height: 800, // 窗口高度
        center: true, // 窗口居中
        show: false, // 创建窗口时不立即显示
        autoHideMenuBar: true, // 自动隐藏菜单栏
        title: 'GenAI-Search', // 窗口标题
        vibrancy: 'ultra-dark', // 设置窗口的背景模糊效果
        transparent: true, // 窗口透明
        icon: path.join(__dirname, 'img', 'meowoof-logo.jpg'), // 窗口图标
        titleBarStyle: 'hidden', // 隐藏标题栏
        titleBarOverlay: { // 标题栏覆盖设置
            color: '#311D28', // 标题栏背景色
            symbolColor: '#ffffff', // 标题栏符号颜色
            height: 30, // 标题栏高度
        },
        backgroundColor: '#311D28', // 窗口背景颜色
        webPreferences: {
            backgroundThrottling: false, // 禁用后台节流
            preload: path.join(__dirname, 'preload.cjs'), // 预加载脚本
            nodeIntegration: isDev, // 仅在开发环境中启用 Node.js 集成
            contextIsolation: !isDev, // 仅在生产环境中启用上下文隔离
        },
    })

    // 延迟显示窗口以确保内容完全加载
    setTimeout(() => {
        console.log('Showing main window...')
        mainWindow.show()
    }, 2000) // 你可以根据需要调整这个延迟时间

    // 根据环境加载不同的 URL
    if (isDev) {
        mainWindow.loadURL('http://thinkcat:8080/') // 开发环境加载本地服务器
        mainWindow.webContents.openDevTools() // 打开开发者工具
    }
    else {
        mainWindow.loadFile('/dist/index.html') // 生产环境加载本地文件
    }
}

// 创建托盘图标
function createTray() {
    // 根据操作系统选择不同的托盘图标
    const menubarPic = process.platform === 'darwin'
        ? path.join(__dirname, '../img', 'meowoof-logo2.png') // macOS 系统使用的图标路径
        : path.join(__dirname, '../img', 'meowoof-logo.png') // 非 macOS 系统使用的图标路径

    // 检查路径是否正确
    console.log('Tray icon path:', menubarPic)

    // 创建一个新的 Tray 实例
    tray = new Tray(menubarPic) // 指定图片的路径

    // 创建托盘图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', // 菜单项标签
            click: () => { // 菜单项点击事件
                mainWindow.show() // 显示主窗口
            },
        },
        {
            label: 'Quit', // 菜单项标签
            click: () => { // 菜单项点击事件
                app.quit() // 退出应用程序
            },
        },
    ])

    // 设置托盘图标的提示
    tray.setToolTip('GenAI-Search')

    // 设置托盘图标的上下文菜单
    tray.setContextMenu(contextMenu)
}

// 当 Electron 初始化完成时，调用 createWindow 和 createTray 函数
app.whenReady().then(() => {
    createWindow() // 创建主窗口
    createTray() // 创建托盘图标

    // 当应用被激活时（例如，点击应用图标或从其他窗口切换回来）
    app.on('activate', () => {
    // 如果没有打开的窗口，则创建一个新的窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 当所有窗口都关闭时，退出应用程序（除非是在 macOS 上）
app.on('window-all-closed', () => {
    // 在 macOS 上，通常应用会保持活跃，直到用户明确退出
    if (process.platform !== 'darwin') {
        app.quit() // 退出应用程序
    }
})
