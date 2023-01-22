import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { BsFillSunFill,BsFillMoonStarsFill } from 'react-icons/bs';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(BsFillMoonStarsFill, BsFillSunFill);

  return (
    <IconButton
      variant='unstyled'
      color='rgb(97, 97, 97)'
      pos={'fixed'}
      borderRadius='100'
      right={'1'}
      top={'4'}
      zIndex={2000}
      onClick={toggleColorMode}
      size={'lg'}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

