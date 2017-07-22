export const mockCalls = mockedFunction => mockedFunction.mock.calls;

export const mockCallsCount = mockedFunction => mockCalls(mockedFunction).length;

export const mockCall = (mockedFunction, i = 0) => mockCalls(mockedFunction)[i];
