import { Router } from 'express';
const router = Router();
import { deleteUrl, getAllUrl, getUrlById, shortenUrl, updateUrl } from '../controllers';
import { validateShortenUrl, validateId, validateUrlLength, validateUrl } from '../middleware';

router.route('/').get((_, res) => {
  res.send('Hello World');
});
router.route('/shorten').post(validateShortenUrl, shortenUrl);
router.route('/urls').get(getAllUrl);
router.route('/urls/:id')
  .get(validateId, getUrlById)
  .put(validateId, validateUrlLength, validateUrl, updateUrl)
  .delete(validateId, deleteUrl);
  
export default router;
