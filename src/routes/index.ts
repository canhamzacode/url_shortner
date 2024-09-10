import { Router } from 'express';
const router = Router();
import { shortenUrl } from '../controllers';

router.route('/').get((_, res) => {
  res.send('Hello World');
});
router.route('/shorten').post(shortenUrl);

export default router;
