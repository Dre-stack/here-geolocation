import axios from 'axios';
import { APIKEY } from './constants';

export const fetchAddresses = async (coordinates) => {
  const addressArray = [];
  await Promise.all(
    coordinates.map(async (item) => {
      const response = await axios.get(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${item.Latitude},${item.Longitude}&apiKey=${APIKEY}&q='berlin'`
      );
      addressArray.push({
        name: item.Name,
        ...response.data.items[0],
      });
    })
  );

  return addressArray;
};
