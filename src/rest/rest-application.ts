import express, {Express} from 'express';

import {inject, injectable} from 'inversify';
import 'reflect-metadata';

import {Component} from '../shared/constants/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';
import {getMongoURI} from '../shared/helpers/index.js';
import {InfoMessage} from './rest.constant.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';
import {Controller, ExceptionFilter} from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly databaseClient: DatabaseClient,
    @inject(Component.AppExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller
  ) {
    this.server = express();
  }

  private async initDB() {
    const uri = getMongoURI(
      this.config.get('DB_USER_NAME'),
      this.config.get('DB_USER_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(uri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('six-cities/comments', this.commentController.router);
    this.server.use('six-cities/offers', this.offerController.router);
  }

  private async initMiddlewares() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info(InfoMessage.REST_APP_INIT_MESSAGE);

    this.logger.info(InfoMessage.DATABASE_INIT_MESSAGE);
    await this.initDB();
    this.logger.info(InfoMessage.DATABASE_INIT_COMPLETED_MESSAGE);

    this.logger.info('Init middlewares');
    await this.initMiddlewares();
    this.logger.info('Middlewares initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init server');
    await this.initServer();
    this.logger.info('Server started on port: %port%');
  }
}
