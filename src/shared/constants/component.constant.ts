export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Database: Symbol.for('Database'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  CityModel: Symbol.for('CityModel'),
  CityService: Symbol.for('CityService'),
  LocationModel: Symbol.for('LocationModel'),
  LocationService: Symbol.for('LocationService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService')
} as const;
