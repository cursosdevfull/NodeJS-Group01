const forEach = require('./function');
const mockCallback = jest.fn((x) => x + 1);

test('Testing callback', () => {
  forEach([3, 4], mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(3);
  expect(mockCallback.mock.calls[1][0]).toBe(4);
  expect(mockCallback.mock.results[0].value).toBe(4);
  expect(mockCallback.mock.results[1].value).toBe(5);
});

test('Sync values', () => {
  const mockFind = jest.fn();

  mockFind
    .mockReturnValueOnce(['a', 'b'])
    .mockReturnValueOnce(['c', 'd'])
    .mockReturnValue(false)
    .mockReturnValue(true);

  // console.log(mockFind(), mockFind(), mockFind(), mockFind());
});

test('Async values', async () => {
  const mockFind = jest.fn();

  mockFind.mockResolvedValue(30);

  const valueReturned = await mockFind();

  expect(valueReturned).toBe(30);
});

test('Testing repository', async () => {
  const values = ['a', 'b', 'c'];
  const getRepository = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue(values),
  });

  const userRepository = getRepository('User');

  const users = await userRepository.find();

  expect(users).toEqual(values);
});
