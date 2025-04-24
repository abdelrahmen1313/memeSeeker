import { FlexLayout, QApplication, QClipboardMode, QLabel, QWidget, WidgetEventTypes } from "@nodegui/nodegui";

import { getMovie } from "../utils/getMovie.js";

import { showModal } from "./Modal.js"; // Import the showModal function

// This functions receives a list of gifs(urls) and returns a container with the gifs as views

export async function getGifViews(listOfGifs) {
  const container = new QWidget();
  const containerLayout = new FlexLayout();
  container.setLayout(containerLayout); // Set the layout for the container

  const promises = listOfGifs.map(async (gif) => {
    const { url, width } = gif.images.fixed_width_small;

    const movie = await getMovie(url);

    const gifView = new QLabel();
    gifView.setMovie(movie);
    gifView.setInlineStyle(`width: ${width}px;`); 
    gifView.addEventListener(WidgetEventTypes.MouseButtonRelease, () => {
      const clipboard = QApplication.clipboard();
      clipboard.setText(url, QClipboardMode.Clipboard);

     // console.log(clipboard.text(QClipboardMode.Clipboard)); // Log the copied URL to the console
      
      showModal(
        'Copied to clipboard!',
        `You can press Cmd/Ctrl + V to paste the GIF url: ${url}`
      );  
     }); 
    containerLayout.addWidget(gifView); 
  });

  await Promise.all(promises); // Wait for all promises to resolve

  container.setInlineStyle(`
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 330px;
      
    `);

  return container;
}
