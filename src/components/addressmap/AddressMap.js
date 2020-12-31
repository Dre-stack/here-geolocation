import React from 'react';
import ReactDOM from 'react-dom';
import H from '@here/maps-api-for-javascript';
import { APIKEY } from '../../utils/constants';

export default class AddressMap extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.map = null;
  }

  componentDidMount() {
    const { address } = this.props;
    document.body.setAttribute('style', 'overflow : hidden');
    if (!this.map) {
      const platform = new H.service.Platform({
        apikey: APIKEY,
      });

      const layers = platform.createDefaultLayers();

      const map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: address.position,
          zoom: 10,
        }
      );

      const ui = H.ui.UI.createDefault(map, layers);

      const svgMarkup =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';
      const icon = new H.map.Icon(svgMarkup);

      const marker = new H.map.Marker(address.position, {
        icon: icon,
      });
      map.addObject(marker);

      const bubble = new H.ui.InfoBubble(address.position, {
        content: `<div><b>${address.name}</b> <p>${address.address.label}</p></div>`,
      });
      ui.addBubble(bubble);

      this.map = map;
    }
  }

  componentWillUnmount() {
    document.body.setAttribute('style', 'overflow : auto');
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <div
          className="close-button"
          onClick={() => this.props.setDisplay(false)}
        >
          &times;
        </div>
        <div className="map" ref={this.ref} />{' '}
      </div>,

      document.getElementById('modal')
    );
  }
}
