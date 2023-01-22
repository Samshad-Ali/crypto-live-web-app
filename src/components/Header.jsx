import { Button, Container, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Header.scss'
const Header = () => {
  return (
  

      <HStack  p={['4','6']} shadow={'base'} bgColor={'blackAlpha.900'} >
      
       <Button px={['2','6']} variant={'unstyled'} color={'white'}><Link className='link' to={'/'}>Home</Link></Button>
          <Button px={['2','6']} variant={'unstyled'} color={'white'}><Link className='link' to={'/coin'}>Coin</Link></Button>
          <Button px={['2','6']} variant={'unstyled'} color={'white'}><Link className='link' to={'/exchange'}>Exchange</Link></Button>
      
      
    </HStack>
    
    
  )
}

export default Header