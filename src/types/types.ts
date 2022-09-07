export interface IDataToConvert {
  from: string;
  to: string;
  amount: number;
}

export interface IConvertedData {
  success: boolean;
  result?: {
    convertedAmount: number;
  };
}

export interface ICurrencies {
  symbol: string;
  name: string;
}
