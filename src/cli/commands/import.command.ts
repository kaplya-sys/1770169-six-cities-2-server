import chalk from 'chalk';

import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import {CommandName, ErrorMessage, InfoMessage} from './command.constant.js';
import {Command} from './command.interface.js';
import {createMessage, createOffer, getErrorMessage} from '../../shared/helpers/index.js';
import {DefaultUserService, UserModel, UserService} from '../../shared/modules/user/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {Logger, PinoLogger} from '../../shared/libs/logger/index.js';
import {Offer} from '../../shared/types/index.js';
import {getMongoURI} from '../../shared/helpers/index.js';
import {DefaultLocationService, LocationModel, LocationService} from '../../shared/modules/location/index.js';
import {CityModel, CityService, DefaultCityService} from '../../shared/modules/city/index.js';

export default class ImportCommand implements Command {
  readonly name: string = CommandName.Import;
  private userService: UserService;
  private offerService: OfferService;
  private locationService: LocationService;
  private cityService: CityService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.locationService = new DefaultLocationService(this.logger, LocationModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get(): string {
    return this.name;
  }

  public async execute(
    filename: string,
    userName: string,
    password: string,
    host: string,
    port: string,
    dbName: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(userName, password, host, port, dbName);
    this.salt = salt;

    this.databaseClient.connect(uri);

    if (!filename) {
      throw new Error(ErrorMessage.UNSPECIFIED_PATH_ERROR);
    }

    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(ErrorMessage.IMPORT_ERROR, filename));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private onImportedLine = async(line: string, resolve: () => void) => {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  };

  private onCompleteImport = (count: number) => {
    console.info(chalk.yellow(createMessage(InfoMessage.COUNT_ROW_IMPORTED_INFO, [count])));
    this.databaseClient.disconnect();
  };

  private async saveOffer(offer: Offer) {
    const user = await this.userService.create(offer.user, this.salt);
    const cityLocation = await this.locationService.create(offer.city.location);
    const city = await this.cityService.create({
      name: offer.city.name,
      locationId: cityLocation.id
    });
    const location = await this.locationService.create(offer.location);
    await this.offerService.create({
      ...offer,
      cityId: city.id,
      userId: user.id,
      locationId: location.id
    });
  }
}
