import React from 'react';
import { Flex, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi'; // Import the icon from react-icons library

const OpenSchoolProfile = ({ userName, userEmail, userAvatarUrl }) => {
  return (
    <Flex alignItems="center" justifyContent="flex-end" paddingRight="4" marginTop="2">
      <Menu>
        
        <MenuList>
          <MenuItem>{userName}</MenuItem>
          <MenuItem>{userEmail}</MenuItem>
          {/* Add more menu items if needed */}
        </MenuList>
        <MenuButton
          as={IconButton}
          aria-label="User menu"
          icon={<FiChevronDown />}
          variant="ghost"
          fontSize="24px"
          mr={2}
        />
      </Menu>
      <Flex alignItems="center" mr={4}>
        <Avatar name={userName} src={userAvatarUrl} size="sm" />
        <Text ml={2} fontWeight="bold" display={{ base: 'none', md: 'block' }}>
          {userName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default OpenSchoolProfile;
