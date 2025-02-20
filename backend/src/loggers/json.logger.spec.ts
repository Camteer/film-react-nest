import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('json log', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'json log message';
    logger.log(message);
    const mockRes = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });

  it('json error', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'json error message';
    logger.error(message);
    const mockRes = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });

  it('json warn', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'json warning message';
    logger.warn(message);
    const mockRes = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });

});
