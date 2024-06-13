import {DEFAULT_PASSWORD, RADIX, Separator} from '../constants/index.js';
import {CityName, Offer, OfferFacilities, OfferType} from '../types/index.js';

export const createOffer = (offerData: string): Offer => {
  const [
    title,
    description,
    date,
    cityName,
    cityLatitude,
    cityLongitude,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    userName,
    email,
    avatar,
    isPro,
    comments,
    latitude,
    longitude,
  ] = offerData.replace(Separator.LINE_SEPARATOR, Separator.EMPTY_SEPARATOR).split(Separator.VALUE_SEPARATOR);

  return {
    title,
    description,
    date: new Date(date),
    city: {
      name: cityName as CityName,
      location: {
        latitude: Number.parseFloat(cityLatitude),
        longitude: Number.parseFloat(cityLongitude)
      }
    },
    previewImage,
    images: images.split(Separator.ENUMERATION_SEPARATOR).map((image) => image),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number.parseFloat(rating),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, RADIX),
    maxGuests: Number.parseInt(maxGuests, RADIX),
    price: Number.parseInt(price, RADIX),
    goods: goods.split(Separator.ENUMERATION_SEPARATOR).map((good) => good) as OfferFacilities[],
    host: {
      name: userName,
      email,
      avatar,
      password: DEFAULT_PASSWORD,
      isPro: Boolean(isPro)
    },
    comments: Number.parseInt(comments, RADIX),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    }
  };
};
