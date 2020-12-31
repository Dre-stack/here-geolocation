import React, { useState } from 'react';

import AddressMap from './AddressMap';

const Addresses = ({ addresses }) => {
  const [showMap, setShowMap] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState();
  return (
    <React.Fragment>
      <React.Fragment>
        {addresses &&
          addresses.map((address) => (
            <div key={address.id} className="address">
              <div className="address__name">{address.name}</div>
              <div className="address__place">
                {address.address.label}
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedAddress(address);
                  setShowMap(true);
                }}
              >
                Show on Here Map
              </button>
            </div>
          ))}
      </React.Fragment>
      {showMap && selectedAddress && (
        <AddressMap
          address={selectedAddress}
          setDisplay={setShowMap}
        />
      )}
    </React.Fragment>
  );
};

export default Addresses;
