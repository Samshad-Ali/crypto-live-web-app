import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react'
import '../src/style/Main.scss'
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const context = createContext();
const AppWrapper=()=>{
  const [exchangeData,setExchangeData]=useState('');
  const [coinsData,setCoinsData]=useState('');
  const [loader,setLoader]=useState(true);
  const [error,setError]=useState(false);
  return(
    <context.Provider value={{
      exchangeData
      ,setExchangeData,
      loader,
      setLoader,
      coinsData,
      setCoinsData,
      error,setError
    }}>
    <App/>
    </context.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher/>
    <AppWrapper/>
    </ChakraProvider>
  </React.StrictMode>
);

export const server = `https://api.coingecko.com/api/v3`;
