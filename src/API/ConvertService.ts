import axios, { AxiosRequestConfig } from 'axios';
import { IDataToConvert, IConvertedData, ICurrencies } from '../types/types';

export default class ConvertService {
  static async convert(convertData: IDataToConvert) {
    const { from, to, amount } = convertData;
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
      params: { from, to, amount },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY as string,
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com',
      },
    };

    const response = await axios.request<IConvertedData>(config);
    return response;
  }

  static async getCurrencies() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY as string,
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com',
      },
    };

    const response = await axios.request<ICurrencies[]>(config);
    return response;
  }
}
