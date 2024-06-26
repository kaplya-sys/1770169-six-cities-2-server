import {Ref, defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import {Facilities, Housing, OfferFacilities, OfferType} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {
  Bedroom,
  COLLECTION_NAME,
  Description,
  Guest,
  Price,
  Title
} from './offer.constant.js';
import {CityEntity} from '../city/index.js';
import {LocationEntity} from '../location/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: Title.Min, maxlength: Title.Max})
  public title: string;

  @prop({trim: true, required: true, minlength: Description.Min, maxlength: Description.Max})
  public description: string;

  @prop({required: true})
  public date: Date;

  @prop({required: true, ref: CityEntity})
  public cityId: Ref<CityEntity>;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true, type: () => String})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true, type: () => String, enum: Housing})
  public type: OfferType;

  @prop({required: true, min: Bedroom.Min, max: Bedroom.Max})
  public bedrooms: number;

  @prop({required: true, min: Guest.Min, max: Guest.Max})
  public guests: number;

  @prop({required: true, min: Price.Min, max: Price.Max})
  public price: number;

  @prop({required: true, type: () => String, enum: Facilities})
  public goods: OfferFacilities[];

  @prop({required: true, ref: UserEntity})
  public userId: Ref<UserEntity>;

  @prop({required: true, ref: LocationEntity})
  public locationId: Ref<LocationEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
