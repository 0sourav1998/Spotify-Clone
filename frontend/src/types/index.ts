export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Albums {
  _id: string;
  title: string;
  imageUrl: string;
  releaseYear: string;
  createdAt: Date;
  artist: string;
  songs: Song[] | null | undefined;
}

export interface User {
  _id: string;
  name: string;
  imageUrl: string;
  clerkId: string;
}

export interface Stats {
  songCount: number;
  albumCount: number;
  userCount: number;
  uniqueArtistCount: number;
}
