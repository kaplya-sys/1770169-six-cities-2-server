import {NextFunction, Request, Response} from 'express';

import {inject, injectable} from 'inversify';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateOjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer-rdo.js';
import {UpdateOfferRequest} from './types/offer-request.type.js';
import {InfoMessage} from './offer.constant.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

@injectable()
export class FavoriteOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_FAVORITE_OFFER_ROUTES_MESSAGE);
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.add,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
  }

  public async index(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offerService.findByFavorite();
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async add({params}: UpdateOfferRequest, res: Response, _next: NextFunction): Promise<void> {
    await this.offerService.addOrRemoveFavorite(params.offerId, {isFavorite: true});
    this.noContent(res, null);
  }

  public async delete({params}: UpdateOfferRequest, res: Response, _next: NextFunction): Promise<void> {
    await this.offerService.addOrRemoveFavorite(params.offerId, {isFavorite: false});
    this.noContent(res, null);
  }
}
