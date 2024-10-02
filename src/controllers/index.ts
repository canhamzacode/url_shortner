import { Response, Request } from 'express';
import { logger } from '../services';
import { generateRandomString, HTTP_STATUS } from '../utils';
import URL_DB from '../model/url';
import { BASE_URL } from '../constant';

const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { url, customName } = req.body;

    const nameOrUrlUniqueness = await URL_DB.findOne({
      $or: [{ originalUrl: url }, { customName }]
    });

    if (nameOrUrlUniqueness) {
      return res.status(HTTP_STATUS.CONFLICT.code).send({
        message: 'URL already shortened or custom name already taken'
      });
    }
    const randomName = customName ? customName.replace(/\s/g, '-') : generateRandomString();

    const createdUrl = await URL_DB.create({
      originalUrl: url,
      customName: randomName,
      shortUrl: `${BASE_URL}/${randomName}`
    });

    return res.status(HTTP_STATUS.CREATED.code).send({
      message: 'URL shortened successfully',
      data: { shortUrl: createdUrl.shortUrl, id: createdUrl._id }
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
      .send({ message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message });
  }
};

const getAllUrl = async (_, res: Request) => {
  const urls = await URL_DB.find();

  res.status(HTTP_STATUS.OK.code).json({ data: urls });
};

const getUrlById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = await URL_DB.findById(id);

  if (!url) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).send({ message: 'URL not found' });
  }

  return res.status(HTTP_STATUS.OK.code).send({ data: url });
};

export { shortenUrl, getAllUrl, getUrlById };
