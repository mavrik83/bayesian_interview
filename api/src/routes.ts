import { Router } from 'express';
import * as artistController from '@/modules/artist/controllers';
import * as songController from '@/modules/song/controllers';
import * as albumController from '@/modules/album/controllers';

export const routes = Router();

// Artist routes
routes.get('/artist', artistController.allArtists);
routes.get('/artist/:id', artistController.findArtistById);
routes.get('/artist/find', artistController.findArtist);
routes.post('/artist', artistController.createArtist);

// Song routes
routes.get('/song', songController.allSongs);
routes.get('/song/:id', songController.findSongById);
routes.get('/song/find', songController.findSongs);
routes.post('/song', songController.createSong);

// Album routes
routes.get('/album', albumController.allAlbums);
routes.get('/album/:id', albumController.findAlbumById);
routes.get('/album/find', albumController.findAlbums);
routes.post('/album', albumController.createAlbum);
