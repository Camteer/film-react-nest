import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('tskv log', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'tskv log message';
    const optionalParams = 'params text';
    logger.log(message, optionalParams);
    const mockRes = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });

  it('tskv error', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'tskv error message';
    const optionalParams = 'params text';
    logger.error(message, optionalParams);
    const mockRes = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });
  
  it('tskv warn', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'tskv warning message';
    const optionalParams = 'params text';
    logger.warn(message, optionalParams);
    const mockRes = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(mockRes);
  });
});
