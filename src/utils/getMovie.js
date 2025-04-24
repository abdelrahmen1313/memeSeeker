import { QMovie } from "@nodegui/nodegui";
import axios from "axios";


export async function getMovie(url) {
    const {data} = await axios.get(url, {
        responseType: 'arraybuffer',

    });

    const movie = new QMovie();
    movie.loadFromData(data);
    movie.start();
    return movie;
}