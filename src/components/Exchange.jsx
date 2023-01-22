import { Container, HStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { server } from '../index'
import Error from './Error'
import ExchangeCard from './ExchangeCard'
import Loader from './Loader'


const Exchange = () => {
  
  const [exchange, setExchange] = useState([]);
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(false);
  
  const fetchingData = async () => {
    try {
      const {data} = await axios.get(`${server}/exchanges`)
      setExchange(data);
      setLoder(false);
    } catch (e) {
      setError(true)
      setLoder(false)
    }
  }
  useEffect(() => {
    fetchingData()
  }, []);

  if (error) {
    return <Error message={'error while fetching the exchange data'} />
  }

  return (
    <Container py={'4'} maxW={'container.xl'} >
      {
        loader ? <Loader /> : <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'} >
            {
              exchange.map(exList =><ExchangeCard data={exList} key={exList.id} />)
            }
          </HStack>
        </>
      }
    </Container>
  )
}

export default Exchange;