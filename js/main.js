import {createPhotos} from './create-photos.js';
import {addPhotos} from './add-photos.js';
import {showBigPhoto} from './show-original.js';

const photos = createPhotos();
addPhotos(photos);
showBigPhoto(photos);
