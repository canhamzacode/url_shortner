import { Router } from 'express';
const router = Router();
import { getAllUrl, getUrlById, shortenUrl } from '../controllers';

router.route('/').get((_, res) => {
  res.send('Hello World');
});
router.route('/shorten').post(shortenUrl);
router.route('/urls').get(getAllUrl);
router.route('/urls/:id').get(getUrlById);

export default router;
