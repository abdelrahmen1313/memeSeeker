import { FlexLayout, QLineEdit, QPushButton, QWidget } from "@nodegui/nodegui";

// This function creates a search container with a search input and button.
// It takes a callback function `onSearch` as an argument, which is called when the search button is clicked.


export function createSearchContainer(onSearch) {
    const searchContainer = new QWidget();
    searchContainer.setObjectName("searchContainer");
    const searchContainerLayout = new FlexLayout();
    searchContainer.setLayout(searchContainerLayout);

      const searchInput = new QLineEdit();
      searchInput.setObjectName("searchInput");
      searchInput.setPlaceholderText("Search for gifs...");
    
      const searchButton = new QPushButton();
      searchButton.setObjectName("searchButton");
      searchButton.setText("🔎");
      searchButton.addEventListener("clicked", () => {
        onSearch(searchInput.text());
       });

    searchContainerLayout.addWidget(searchInput);
    searchContainerLayout.addWidget(searchButton);


    searchContainer.setStyleSheet(`
    #searchContainer {
      flex-direction: 'row';
      padding: 10px;
      align-items: 'center';
    }
    #searchInput {
      flex: 1;
      height: 44px;
      padding: 5px;
      border: 1px solid #ccc;
    }
    #searchButton {
      margin-left: 5px;
      width: 50px;
      height: 35px;
    }
  `);

  return searchContainer;

}