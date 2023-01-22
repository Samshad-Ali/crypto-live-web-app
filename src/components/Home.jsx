
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react'
import btc from '../assets/btc.png';
const Home = () => {
    return (
      <Box bgColor={'blackAlpha.800'} w={'full'} h={'85vh'} >
        <motion.div style={{
          height: '80vh',
          
        }}
          animate={{
            translateY: '20px'
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType:'reverse'
          }}
        >
        <Image
          src={btc}
          w={'full'}
          h={'full'}
          filter={'grayscale(-1)'}
          objectFit={'contain'}
          />
          </motion.div>
        <Heading
          size={'3xl'}
          fontWeight={'light'}
          textAlign={'center'}
          color={'white'}
          mt={'-16'}
          >
$crypto
        </Heading>
          
       </Box>
  )
}

export default Home