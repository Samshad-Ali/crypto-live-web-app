import { VStack,Image, Heading, Text } from '@chakra-ui/react';
import React from 'react'

const ExchangeCard = ({data}) => {
    const {name,image,trust_score_rank:rank,url} = data;
  return (
    <a href={url} target='_blank' >
        <VStack w={'52'} p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all .3s'} m={'4'} css={{
            "&:hover":{
                transform:"scale(1.1)"
            }
        }} >
            <Image
            w={'10'}
            h={'10'}
            objectFit={'contain'}
            alt={'Exchanges'}
             src={image} />
             <Heading size={'md'} noOfLines={1} color={'black'} > {rank} </Heading>
             <Text noOfLines={1} color={'blackAlpha.800'} >{name}</Text>
        </VStack>
    </a>
  )
}

export default ExchangeCard;