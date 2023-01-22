import { Alert } from '@chakra-ui/react'
import React from 'react'

const Error = ({message}) => {
  return (
    <Alert status={'error'}
      position={'fixed'}
      left={'50%'}
      bottom={'50%'}
      transform={'translateX(-50%)'}
      w={'container.lg'}
      borderRadius={'4'}
    
    >
{message}
    </Alert>
  )
}

export default Error