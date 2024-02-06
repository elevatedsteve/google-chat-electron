import path from 'path';
import {app, BrowserWindow, Menu, nativeImage, Tray} from 'electron';
import log from "electron-log";
import {is} from "electron-util";

export default (window: BrowserWindow) => {
  
  const size = is.macos ? 16 : 32;
  const trayIcon = new Tray(nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/offline/${size}.png`)));

  const handleIconClick = () => {
    log.debug("clicked Icon");
    window.show();
    /*
    const shouldHide = (is.windows || is.linux) ? (window.isVisible() || window.isFocused()) : (window.isVisible() && window.isFocused());

    if (shouldHide) {
      if (is.macos) {
        app.hide()
      } else {
        window.hide()
      }
    } else {
      window.show()
    }*/
  }

  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Toggle',
      click: handleIconClick
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        // The running webpage can prevent the app from quiting via window.onbeforeunload handler
        // So lets use exit() instead of quit()
        app.exit()
      }
    }
  ]));

  trayIcon.setToolTip('Google Chat');

  if (is.windows || is.linux) {
    trayIcon.on('click', handleIconClick);
  }

  return trayIcon;
}
