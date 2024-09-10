import { Response, Request } from 'express';
import { logger } from '../services';
import validUrl from 'valid-url';
import { generateRandomString, HTTP_STATUS } from '../utils';
import URL_DB from '../model/url';
import mongoose from 'mongoose';

const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { url, customName } = req.body;
    if (!url || !validUrl.isUri(url)) {
      return res.status(HTTP_STATUS.BAD_REQUEST.code).send({ messgae: 'Provide a valid URL' });
    }
    if (customName < 5) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .send({ message: 'Custom name must be at least 5 characters long' });
    }

    const randomName = customName ? customName.replace(/\s/g, '-') : generateRandomString();

    const existingUrl = await URL_DB.findOne({ originalUrl: url });

    if (existingUrl) {
      return res.status(HTTP_STATUS.CONFLICT.code).send({
        message: 'URL already shortened',
        data: { url, customName: existingUrl.customName }
      });
    }

    const existingCustomNameUrl = await URL_DB.findOne({ customName: randomName });
    if (existingCustomNameUrl) {
      return res
        .status(HTTP_STATUS.CONFLICT.code)
        .send({ message: 'Custom name already taken, try another one' });
    }

    const createdUrl = await URL_DB.create({
      originalUrl: url,
      customName: randomName,
      shortUrl: `https://short.ner/${randomName}`
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
  const mappedUrls = urls.map(({ _id: id, originalUrl, shortUrl, createdAt }) => ({
    id,
    originalUrl,
    shortUrl,
    createdAt
  }));

  res.status(HTTP_STATUS.OK.code).json({ data: mappedUrls });
};

const getUrlById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({ message: 'Provide a valid URL ID' });
  }

  const url = await URL_DB.findById(id);
  if (!url) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).send({ message: 'URL not found' });
  }

  const { _id, customName, shortUrl, originalUrl, createdAt } = url;

  return res
    .status(HTTP_STATUS.OK.code)
    .send({ data: { id: _id, customName, shortUrl, originalUrl, createdAt } });
};

export { shortenUrl, getAllUrl, getUrlById };
