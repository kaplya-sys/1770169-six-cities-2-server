export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Database: Symbol.for('Database'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  OfferController: Symbol.for('OfferController'),
  PremiumOfferController: Symbol.for('PremiumOfferController'),
  FavoriteOfferController: Symbol.for('FavoriteOfferController'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),
  CityModel: Symbol.for('CityModel'),
  CityService: Symbol.for('CityService'),
  LocationModel: Symbol.for('LocationModel'),
  LocationService: Symbol.for('LocationService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  CommentController: Symbol.for('CommentController'),
  AppExceptionFilter: Symbol.for('AppExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  AuthService: Symbol.for('AuthService'),
  PathTransformer: Symbol.for('PathTransformer')
} as const;
