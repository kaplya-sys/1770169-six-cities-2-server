import {OfferFacilities, OfferType} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public cityId: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public bedrooms: number;
  public maxGuests: number;
  public price: number;
  public goods: OfferFacilities[];
  public userId: string;
  public locationId: string;
}
