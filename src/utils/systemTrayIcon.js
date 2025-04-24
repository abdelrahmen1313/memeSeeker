import { QIcon, QSystemTrayIcon, QMenu, QAction } from "@nodegui/nodegui";



export function systemTrayIcon(win) {

 const iconImg = "../assets/systray.png";
 const icon = new QIcon(iconImg);
 const tray = new QSystemTrayIcon();
 tray.setIcon(icon);
 //tray.setToolTip("Giphy App");
 tray.show();

// Menu that should pop up when clicking on systray icon.
const menu = new QMenu();
tray.setContextMenu(menu);

//Each item in the menu is called an action
const visibleAction = new QAction();
visibleAction.setText("Show/Hide");
visibleAction.addEvenetListener("triggered", () => {
    if (win.isVisible()) {
        win.hide();
    } else {
        win.show();
    }
});

menu.addAction(visibleAction);



global.tray = tray; // Store the tray icon in a global variable


}

