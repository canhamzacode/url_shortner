import { Response, Request } from 'express';
import { logger } from '../services';
import { BASE_URL, generateRandomString, HTTP_STATUS } from '../utils';
import URL_DB from '../model/url';

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

const updateUrl = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customName, url } = req.body;

  const urlExist = await URL_DB.findById(id);

  if(!urlExist){
    return res.status(HTTP_STATUS.BAD_REQUEST).send({messge: "URL not found"});
  };

  const updateFields: {customName?: string, originalUrl?:string, shortUrl?: string} = {};
  if (customName) {
    updateFields.customName = customName;
    updateFields.shortUrl = `${BASE_URL}/${customName}`; 
  }

  if (url) {
    updateFields.originalUrl = url;
  }
  const updateUrl = await URL_DB.findOneAndUpdate(id, updateFields, {new: true});
  
  return res.status(HTTP_STATUS.OK).send({message:"Url updated successfully", data: updateUrl});
}

const deleteUrl = async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = await URL_DB.findById(id);

  if (!url) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).send({ message: 'URL not found' });
  };

  await URL_DB.findByIdAndDelete(id);

  return res.status(HTTP_STATUS.OK.code).send({ message: 'URL deleted successfully', data: url });
};

export { shortenUrl, getAllUrl, getUrlById, updateUrl, deleteUrl };
