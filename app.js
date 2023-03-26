const {app,BrowserWindow,Tray, Menu, dialog,ipcMain} = require('electron')
const path = require('path');
const electron = require('electron');

var WIDTH = 800;
var HEIGHT = 600;

let win = null;

function createWindows()
{
    win = new BrowserWindow({
        width:WIDTH,
        height:HEIGHT,
        frame: true,
        transparent: false,
        resizable: false,
        alwaysOnTop:false,
        title: "CodeRush",
        autoHideMenuBar: false,
        minimizable:true,
        //icon : "img/icon.png",
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            preload : path.join(__dirname, "index.js"),
        },
        

    })

    win.loadFile("index.html");

    //TRAY
    tray = new Tray('img/icon.png')
    tray.setToolTip('CodeRush is currently running...')
    tray.on("click",()=>{
        if(!win.isVisible())
        {
            win.show()
        }
    })

    //TRAY MENU
    let template = [{label:'Exit'}]
    let contextMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
}

ipcMain.on('open-main', async(event,arg) => {
    win.close();
    let main = new BrowserWindow({width:1200, height: 800})
    main.loadFile("index.html");    
    main.show();
})

app.whenReady().then(createWindows)