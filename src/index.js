import { FlexLayout, QLabel, QMainWindow, QScrollArea, QWidget, QIcon,
} from "@nodegui/nodegui";
import { searchGifs } from "./utils/searchGif.js";
import { getGifViews } from "./views/GifViews.js";
import { createSearchContainer } from "./views/SearchContainer.js";

import { searchTerms, addSearchTerm } from "./utils/searchTerms.js";

import { systemTrayIcon } from "./utils/systemTrayIcon.js"; // Import the system tray icon function
import { showModal } from "./views/Modal.js";
import { QSystemTrayIcon } from "@nodegui/nodegui"; // Import QSystemTrayIcon


import path from "path";
import { app } from "@nodegui/nodegui";


export const main = async () => {



 // state management
 let emptyLabel = null; // Track the empty label
 let gContainer = null; // Track the current GIF gContainer
  
  // Create the main window
  const win = new QMainWindow();
  win.setWindowTitle("MemeSeeker");

  // Set the app icon for the app bar
 // let assetsPath = "../assets/Kitty.png";
  const appIconPath = path.join(__dirname, "../assets/Kitty.png");
  const appIcon = new QIcon(appIconPath);
  win.setWindowIcon(appIcon);

  // Create a system tray icon
  const trayIcon = new QSystemTrayIcon();
  trayIcon.setIcon(appIcon);
  trayIcon.setToolTip("MemeSeeker");
  trayIcon.show();

  // Optional: Add a context menu to the system tray icon
  // const trayMenu = new QMenu();
  // trayMenu.addAction("Quit", () => process.exit(0));
  // trayIcon.setContextMenu(trayMenu);


  const center = new QWidget();
  const centerLayout = new FlexLayout();
  center.setLayout(centerLayout);
  center.setStyleSheet(`
    background-color: #2c3e50;
    color: white;
  `);

  const scrollArea = new QScrollArea();
  scrollArea.setWidgetResizable(false);
  scrollArea.setInlineStyle('flex: 1; width: 350px; height: 400px;');


 

  // Create the search gContainer
  const searchContainer = createSearchContainer(async (searchTerm) => {
    console.log("search Term:", searchTerm);
    // some data manipulation
    addSearchTerm(searchTerm); 
    console.log("Session search Terms:", searchTerms);

    // Remove the old GIF gContainer if it exists
    if (gContainer) {
      centerLayout.removeWidget(gContainer);
      gContainer.close();
      gContainer = null;
    }

    // Handle empty search term
    if (searchTerm === "") {
      if (!emptyLabel) {
        emptyLabel = new QLabel();
        emptyLabel.setObjectName("emptyLabel");
        emptyLabel.setText("Oopsie Woppsie, no gifs found!");
        centerLayout.removeWidget(scrollArea);
        centerLayout.addWidget(emptyLabel);
      }
    } 
     else {
      // Remove the empty label if it exists
      if (emptyLabel) {
        centerLayout.removeWidget(emptyLabel);
        emptyLabel.close();
        emptyLabel = null;
      }

      // Fetch and display new GIFs
      try {
        const newGifs = await searchGifs(searchTerm);
        const newGifsContainer = await getGifViews(newGifs);
        scrollArea.setWidget(newGifsContainer);
        gContainer = newGifsContainer;
      } catch(error) {
        showModal(
          'Error',
          'An error occurred while fetching GIFs. Please try again later.'
        );
      }
      
    }
  });

  // Default process -> onSearch is not triggered

  // Add the search gContainer to the layout
  centerLayout.addWidget(searchContainer);
  centerLayout.addWidget(scrollArea);

  // Fetch and display initial GIFs
  try {
    const listOfGifs = await searchGifs("Hello");
    gContainer = await getGifViews(listOfGifs);
    scrollArea.setWidget(gContainer);
  } catch (error) {
    showModal(
      'Error',
      'An error occurred while fetching GIFs. Please try again later.'
    );
  }


  win.setCentralWidget(center);
  win.show();
  win.setStyleSheet(`
    #emptyLabel {
      color: white;
      font-size: 20px;
      text-align: center;
      margin-top: 20px;
    }
  `);

  global.win = win;
};

main();