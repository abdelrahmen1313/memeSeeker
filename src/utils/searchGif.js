import axios from "axios";

const GIPHY_API_KEY = 'yUT66dokdNIImmQk98k97Xfx9ZcUDhPc';

export async function searchGifs(searchTerm) {
  const url = 'https://api.giphy.com/v1/gifs/search';
  const res = await axios.get(url, {
    params: {
        api_key: GIPHY_API_KEY,
        q: searchTerm,
        limit: 24,
        offset: 0,
        rating: 'g',
        lang: 'en',
    }
  });
  return res.data.data;
}

//searchGifs("funny cats")
// .then(payload => {
//    console.log("Payload: ", JSON.stringify(payload, null, 2));
// });