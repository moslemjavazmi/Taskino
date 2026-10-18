
// backend/Offer-service/src/routes/offer.routes.ts
import { Router } from 'express';
import {
  createOffer,
  getOffers,
  acceptOffer,
  updateOffer,
  getMyOfferForTask,
} from '../controllers/offer.controller';

const router = Router();

router.post('/tasks/:taskId/offers', createOffer);
router.get('/tasks/:taskId/offers/my', getMyOfferForTask);
router.get('/tasks/:taskId/offers', getOffers);
router.post('/offers/:offerId/accept', acceptOffer);
router.put('/offers/:offerId', updateOffer); // ← حتماً این خط وجود داشته باشد

export default router;