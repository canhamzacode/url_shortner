import { Router } from 'express';
const router = Router();
import { getAllUrl, getUrlById, shortenUrl } from '../controllers';
import { validateShortenUrl, validateId } from '../middleware';

router.route('/').get((_, res) => {
  res.send('Hello World');
});
router.route('/shorten').post(validateShortenUrl, shortenUrl);
router.route('/urls').get(getAllUrl);
router.route('/urls/:id').get(validateId, getUrlById);

export default router;
