import React, { useEffect, useState } from 'react';
import { getAllInfoByISO } from 'iso-country-currency';
import ConvertService from '../../API/ConvertService';
import useFetching from '../../hooks/useFetching';
import { ICurrencies } from '../../types/types';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';

import cl from './ConvertConfig.module.css';

// const testOptions = [
//   {
//     name: 'Rubble',
//     symbol: 'RUB',
//   },
//   {
//     name: 'Dollar',
//     symbol: 'USD',
//   },
// ];

interface IConvertConfig {
  from: string;
  to: string;
  setFrom: (newFrom: string) => void;
  setTo: (newTo: string) => void;
  setError: (errorMessage: string) => void;
}

const ConvertConfig: React.FC<IConvertConfig> = ({
  from, to, setFrom, setTo, setError,
}) => {
  const [supportedCurrencies, setSupportedCurrencies] = useState<ICurrencies[] | null>(null);

  const { fetching: fetchCurrencies, error: currenciesError } = useFetching(async () => {
    const response = await ConvertService.getCurrencies();
    const { data } = response;
    if (data.length) {
      setSupportedCurrencies(data.slice(0, data.length - 1));
    }
  });

  useEffect(() => {
    if (currenciesError) {
      setError(currenciesError);
    }
  }, [currenciesError]);

  useEffect(() => {
    fetchCurrencies();
    const iso = Intl.NumberFormat().resolvedOptions().locale.slice(-2);
    const localeCurrency = getAllInfoByISO(iso).currency;
    setFrom(localeCurrency);
  }, []);

  const swapCurrencies = () => {
    if (from || to) {
      setTo(from);
      setFrom(to);
    }
  };

  return (
    <div className={cl.container}>
      <Select options={supportedCurrencies} defaultValue="Convert from" value={from} onChange={setFrom} />
      <Button onClick={swapCurrencies} className={cl.swapBtn} />
      <Select options={supportedCurrencies} defaultValue="Convert to" value={to} onChange={setTo} />
    </div>
  );
};

export default ConvertConfig;
