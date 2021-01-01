import React, { useState } from 'react';
import DropArea from './components/droparea/DropArea';
import './sass/App.scss';
import Addresses from './components/addresses/Addresses';
import Header from './components/header/Header';
import { fetchAddresses } from './utils/api';

function App() {
  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(false);

  const processFile = async (file) => {
    setLoading(true);
    var reader = new FileReader();
    let coordinatesArray;
    reader.onload = async () => {
      coordinatesArray = JSON.parse(reader.result);
      const addressArray = await fetchAddresses(coordinatesArray);
      setAddresses(addressArray);
      setLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <Header />
      <DropArea loading={loading} processFile={processFile} />
      <div className="App__addresses">
        {loading ? (
          <div className="loading" data-testid="loading">
            Loading...
          </div>
        ) : (
          <Addresses loading={loading} addresses={addresses} />
        )}
      </div>
    </div>
  );
}

export default App;
