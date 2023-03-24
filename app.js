const {app,BrowserWindow,Tray, Menu} = require('electron')
const path = require('path');
const electron = require('electron');

var WIDTH = 800;
var HEIGHT = 600;

function createWindows()
{
    const win = new BrowserWindow({
        width:WIDTH,
        height:HEIGHT,
        frame: true,
        transparent: false,
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

app.whenReady().then(createWindows)