import Addresses from './Addresses';
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';

//i created this mock because the @here/maps-api-for-javascript library is an ES6 module which jest will not be able to compile

jest.mock('@here/maps-api-for-javascript', () => ({
  __esModule: true,
  default: {
    Map: function () {
      this.addObject = jest.fn;
    },
    map: {
      Icon: function () {},
      Marker: function () {},
      addObject: jest.fn(),
    },
    ui: {
      UI: {
        createDefault: () => ({
          addBubble: jest.fn(),
        }),
      },
      InfoBubble: function () {},
    },
    service: {
      Platform: function (object) {
        this.apikey = object.apikey;
        this.createDefaultLayers = () => ({
          vector: { normal: { map: '' } },
        });
      },
    },
  },
}));

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

    const element = document.createElement('div');
    element.setAttribute('id', 'modal');
    document.body.appendChild(element);

    addressesMock.forEach((address) => {
      expect(screen.getByText(address.name)).toBeInTheDocument();
      expect(
        screen.getByText(address.address.label)
      ).toBeInTheDocument();

      //on clicking on show on here map, it should render the modal containing the map
      fireEvent.click(screen.getByTestId(address.name));
      const map = screen.getByTestId('map');
      expect(map).toBeInTheDocument();

      //when the modal is open on clicking on the close button, modal should close
      fireEvent.click(screen.getByTestId('close-button'));
      expect(map).not.toBeInTheDocument();
    });
  });
});
