import { TestFactory } from './factory';

describe('POST /shorten', () => {
  const factory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  it('It creates a short URL successfully', async () => {
    const testData = {
      url: 'https://www.google.com/long-url',
      customName: 'biscuit'
    };
    const response = await factory.app.post('/api/v1/shorten').send(testData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('URL shortened successfully');
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      shortUrl: `https://short.ner/${testData.customName}`
    });

    const response2 = await factory.app
      .post('/api/v1/shorten')
      .send({ url: 'https://www.google.com/very-long-test-url' });

    expect(response2.status).toBe(201);
    expect(response2.body.message).toBe('URL shortened successfully');
    expect(response2.body.data).toMatchObject({
      id: expect.any(String),
      shortUrl: expect.any(String)
    });
  });

  it.todo('It returns a 400 error when the URL is not valid');
  it.todo('It returns a 400 error when the URL is not provided');
  it.todo('It returns a 400 error when the custom name is not valid');
  it.todo('It returns a 409 error when the URL already exists');
});
