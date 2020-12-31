import Addresses from './Addresses';
import { H } from '@here/maps-api-for-javascript';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';

jest.mock('@here/maps-api-for-javascript', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
}));

// H.service.mockImplementation(() => ({
//   Platform: '',
// }));

const addressesMock = [
  {
    id: '123',
    name: 'name1',
    address: {
      label: '123 berlin',
    },
  },
  {
    id: '234',
    name: 'name2',
    address: {
      label: '123 Munich',
    },
  },
];

afterEach(cleanup);

describe('<Addresses/>', () => {
  it('renders without crashing', () => {
    render(<Addresses />);
  });

  it('renders all the addresses from the addresses prop correctly', () => {
    render(<Addresses addresses={addressesMock} />);
    const addresses = screen.getAllByTestId('address');
    expect(addresses).toHaveLength(2);

    addressesMock.forEach((address) => {
      expect(screen.getByText(address.name)).toBeInTheDocument();
      expect(
        screen.getByText(address.address.label)
      ).toBeInTheDocument();
    });
  });
});
