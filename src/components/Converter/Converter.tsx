/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import ConvertService from '../../API/ConvertService';
import useFetching from '../../hooks/useFetching';
import { IDataToConvert } from '../../types/types';
import ConvertConfig from '../ConvertConfig/ConvertConfig';
import TextInput from '../UI/TextInput/TextInput';

import cl from './Converter.module.css';

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<string | undefined>(undefined);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {
    fetching: fetchConverions,
    isLoading: isconvertingLoading,
    error: convertingError,
  } = useFetching(async (data: IDataToConvert) => {
    const response = await ConvertService.convert(data);
    const { success, result } = response.data;
    if (success) {
      const rawConverted = result?.convertedAmount;
      const fixed = rawConverted && rawConverted > 1 ? 2 : 5;
      setConvertedAmount(rawConverted?.toFixed(fixed));
    }
  });

  useEffect(() => {
    if (convertingError) {
      setError(convertingError);
    }
  }, [convertingError]);

  useEffect(() => {
    const amount = +inputValue.replace(',', '.');
    if (amount && fromCurrency && toCurrency) {
      fetchConverions({ amount, from: fromCurrency, to: toCurrency });
    } else {
      setConvertedAmount('');
    }
  }, [inputValue, fromCurrency, toCurrency]);

  const configToConvert = useMemo(
    () => ({
      from: fromCurrency,
      to: toCurrency,
      setFrom: setFromCurrency,
      setTo: setToCurrency,
      setError,
    }),
    [fromCurrency, toCurrency],
  );

  return (
    <div className={cl.container}>
      <TextInput
        className={cl.input}
        value={inputValue}
        onChange={setInputValue}
        placeholder="Enter the amount"
      />
      <ConvertConfig {...configToConvert} />
      <div className={cl.resBlock}>
        {!error && <p className={cl.preText}>Your result:</p>}
        {convertedAmount && !isconvertingLoading && <p>{convertedAmount}</p>}
        {isconvertingLoading && <p>Loading...</p>}
        {error && <p className={cl.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Converter;
