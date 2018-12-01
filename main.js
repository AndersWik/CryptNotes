
const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain, clipboard } = require('electron');

const user = electron.app.getPath('userData');

var store = require('./assets/js/store.js');
var crypt = require('./assets/js/crypt.js');

store.setHome(user);
store.homeExist();

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item'
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q' || 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: 'Command+I' || 'Ctrl+I',
        click(item, focusWindow) {
          focusWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}

function createMenu () {
  // create menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // load menu
  Menu.setApplicationMenu(mainMenu);
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 400, height: 610 })
  // and load the index.html of the app.
  win.loadFile('index.html')

  win.on('closed', function() {
    app.quit();
  });
}

ipcMain.on('unlock', (event, arg) => {

  crypt.setPassword(arg);
  let notes = store.getNotes();
  crypt.setNotes(notes);
  event.returnValue = crypt.decryptFiles();
});

ipcMain.on('addNewSave', (event, arg) => {

  let name = store.createFileName();
  let file = store.getFilePathName(name);
  let created = name+".txt";
  arg.name = created;
  let content = crypt.encryptFile(arg);
  
  if(!store.writeFile(file, content)) {
    created = false;
  }

  store.getAllFiles();
  event.returnValue = created;
});

ipcMain.on('discardAll', (event, arg) => {

  let success = true;
  let notes = store.getNotes();

  if(notes) {
    for (let i in notes) {
      if (typeof notes[i].name !== 'undefined') {
        let file = store.getFileName(notes[i].name);
        success = store.unlinkFile(file);
      }
    }
  }

  store.getAllFiles();
  event.returnValue = success;
});

ipcMain.on('noteCopy', (event, arg) => {

  clipboard.writeText(arg);
  event.returnValue = 'noteCopy-back';
});

ipcMain.on('noteDiscard', (event, arg) => {

  let file = store.getFileName(arg);
  let success = store.unlinkFile(file);

  store.getAllFiles();
  event.returnValue = success;
});

ipcMain.on('noteEdit', (event, arg) => {

  let success = true;

  if(typeof arg.name !== 'undefined' && 
    typeof arg.label !== 'undefined'&& 
    typeof arg.content !== 'undefined') {

      let file = store.getFileName(arg.name);
      let content = crypt.encryptFile(arg);

      success = store.writeFile(file, content);
  } else {
    success = false;
  }

  store.getAllFiles();
  event.returnValue = success;
});

app.on('ready', function() {
  store.getAllFiles();
  createMenu();
  createWindow();
});
