import { Badge, Box, Button, Container, HStack, Image,Heading , Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import CustomBar from './CustomBar';
import Loader from './Loader';
import Error from './Error';
import Items from './Items';
import Chart from './Chart';
const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [days,setDays] = useState('24h')
  const [chartArray,setChartArray] = useState([])
  const params = useParams();

  const btnsArray = ['24H', '7D', '1M', '6M', '1Y', 'MAX']
  
  const switchChartStats = (i) => {
    switch (i) {
      case '24H':
        setDays('24h');
        setLoder(true);
        break;
      case '7D':
        setDays('7d');
        setLoder(true);
        break;
      case '1M':
        setDays('30d');
        setLoder(true);
        break;
      case '6M':
        setDays('180d');
        setLoder(true);
        break;
      case '1Y':
        setDays('365d');
        setLoder(true);
        break;
      case 'MAX':
        setDays('max');
        setLoder(true);
        break;
     default:
        setDays('24h');
        setLoder(true);
      
    }
  }

  const fetchingCoinDetail = async () => {
    try {
      const { data } =
        await axios.get(`${server}/coins/${params.id}`);
      const {data : ChartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
      setCoin(data);
      setChartArray(ChartData.prices)
      setLoder(false);
    } catch (e) {
      setError(true);
      setLoder(false);
    }
  };
  useEffect(() => {
    fetchingCoinDetail();
    
  }, [params.id,currency,days]);

  if (error) {
    return <Error message={"error while fetching the coin data"} />;
  }

const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  return (
    <Container maxW={'container.xl'} >
      {
        loader ? <Loader /> : (
          <>
            <Box borderWidth={1} w={'full'} >
              <Chart currency={currencySymbol} arr={chartArray} days={days} />
            </Box>
            
            <HStack p={'4'}  overflowX={'auto'} >
              {
                btnsArray.map((item) => {
                  return <Button  css={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      border: "2px solid black",
                    },
                  }} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>switchChartStats(item)} >{item}</Button>
                })
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={'4'} >
          <Radio value={"inr"}>₹ INR</Radio>
          <Radio value={"usd"}>$ USD</Radio>
          <Radio value={"eur"}>€ EUR</Radio>
        </HStack>
            </RadioGroup>
            <VStack p={'16'} spacing={'4'} alignItems={'flex-start'} >
              <Heading  fontSize={'small'} alignSelf={'center'} >
                Last updated on {Date(coin.market_data.last_updated).split('G')[0]}
              </Heading>
              <Image src={coin.image.large}
                w={'16'}
                h={'16'}
                objectFit={'contain'}
                
              />
              <Stat>
                <StatLabel>
                  {coin.name}
                </StatLabel>
                <StatNumber>
                  {currencySymbol}{coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>

                </StatHelpText>
                <StatArrow  type={coin.market_data.price_change_percentage_24h>0?'increase':'decrease'}/>
                  {coin.market_data.price_change_percentage_24h}%
              </Stat>

              <Badge  borderRadius='2' bgColor={'blackAlpha.900'} color={'white'} fontSize={'2xl'}>
                # {coin.market_cap_rank}
              </Badge>

              <CustomBar
       
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />
              
              <Box w={'full'} p={'2'}>
                  <Items title='Max Supply' value={coin.market_data.max_supply} />
                  <Items title='Circulating Supply' value={coin.market_data.circulating_supply} />
                  <Items title='Market Cap' value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                  <Items title='All Time Low' value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                  <Items title='All Time High' value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>

            </VStack>
          </>
        )
}
    </Container>
  )
}




    export default CoinDetails;