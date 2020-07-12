test('anonima', () => {
  jest.mock('./anonima.js');
  jest.mock('./nombrecompleto.js');
  const foo = require('./anonima');
  const fullName = require('./nombrecompleto');

  fullName.mockImplementation((a, b) => 'Sergio Hidalgo');

  const datosUsuario = {
    nombreCompleto: fullName('Jorge', 'Castro'),
  };

  foo
    .mockImplementationOnce(() => 200)
    .mockImplementationOnce(() => 300)
    .mockImplementation(() => 100)
    .mockImplementation(() => 400);

  expect(foo()).toBe(200);
  expect(foo()).toBe(300);
  expect(foo()).toBe(400);

  expect(fullName().toUpperCase()).toBe('SERGIO HIDALGO');
  expect(datosUsuario).toEqual({ nombreCompleto: 'Sergio Hidalgo' });
});
