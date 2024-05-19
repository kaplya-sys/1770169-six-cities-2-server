import {City} from './city.type.js';
import {Location} from './location.type.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxGuests: number;
  price: number;
  goods: string[];
  host: User;
  comments: number;
  location: Location;
}
