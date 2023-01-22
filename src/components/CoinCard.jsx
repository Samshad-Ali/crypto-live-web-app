import { VStack,Image, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const CoinCard = ({ data,currenySymbol,}) => {
    const {id,name,symbol,image,current_price:price,url} = data;
    
  return (
      <Link to={`/coin/${id}`} >
          <VStack w={'52'}  shadow={'xl'} m={'4'} p={'8'} borderRadius={'lg'} transition={'all .4s'}
              css={{
                  '&:hover': {
                  transform:'scale(1.1)'
              }
          }}
          >
              <Image
                  w={'10'}
                  h={'10'}
                  objectFit={'contain'}
                  alt={'coins'}
              src={image}
              />
              <Heading color={'black'} size={'md'} noOfLines={1} >  {symbol} </Heading>
              <Text>{name}</Text>
              <Heading size={'sm'} color={'blackAlpha.800'} noOfLines={1}>{price?`${currenySymbol}${price}`:'NA'} </Heading>
              
          </VStack>
    </Link>
  )
}

export default CoinCard