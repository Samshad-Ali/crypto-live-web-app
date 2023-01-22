import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Items = ({ title, value }) => {
    return (
        <HStack w={'full'} justifyContent={'space-between'} my={'4'} >
            <Text fontSize={['.7rem','sm']} fontWeight={'semibold'}  letterSpacing={'widest'} fontFamily={'Bebas Neue'} >{title}</Text>
            <Text fontSize={['.7rem','sm']} fontWeight={'extrabold'} > {value} </Text>
      </HStack>
  )
}

export default Items