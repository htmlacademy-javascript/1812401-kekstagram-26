import {createPhotos} from './create-photos.js';
import {addPhotos} from './add-photos.js';
import {showBigPhoto} from './big-photo.js';

const photos = createPhotos();
addPhotos(photos);
showBigPhoto(photos);
