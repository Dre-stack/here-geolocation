import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

jest.mock('@here/maps-api-for-javascript', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
}));

// jest.mock('@here/maps-api-for-javascript', () => {
//   return jest.fn().mockImplementation(() => {
//     return { service: { platform: {} } };
//   });
// });

afterEach(cleanup);

describe('<App/>', () => {
  test('renders app without crashing', () => {
    render(<App />);
  });

  test('show address button is disabled on first render', () => {
    render(<App />);
    const button = screen.getByTestId('show-addresses');
    expect(button).toBeDisabled();
  });
});
