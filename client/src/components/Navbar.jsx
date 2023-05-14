/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Icon,
    Text,
    useDisclosure,
    Button,
    Stack,
    useColorModeValue,
    useColorMode,
    Progress,
    Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader,
    useToast,
    Menu, MenuItem, MenuDivider, MenuButton, MenuList,
} from "@chakra-ui/react"

//icons
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { GrApple } from 'react-icons/gr'

import { Link as ReactLink } from "react-router-dom"

import routes from "../buttonsRoutes"
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/actions/userActions'

const NavComponents = ({ components }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
        <>
            {components.map((component, index) => {
                return (
                    <Button key={index}
                        as={ReactLink}
                        to={component.path}
                        px={2} py={2}
                        rounded={'md'}
                        aria-label='Add to friends'
                        leftIcon={component.icon}
                        _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.800') }}
                    >
                        {component.name}
                    </Button>
                )
            })}
        </>
    )
}

const Navbar = () => {
    // ChakraUI states
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    // redux states
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const dispatch = useDispatch();
    // chakraUi function for display status info message
    const toast = useToast();

    const logoutHandler = () => {
        dispatch(logout());
        toast({ description: 'You have been logged out.', status: 'success', isClosable: true });
    };

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='sticky' top={0} zIndex={1}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen} />

                <HStack>
                    <Link as={ReactLink} to='/'>
                        <Flex alignItems={'center'}>
                            <Icon as={GrApple} h={8} w={8}><Progress size='xs' isIndeterminate /></Icon>
                        </Flex>
                    </Link>
                    <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <NavComponents components={routes.navbar}></NavComponents>
                    </HStack>
                </HStack>
                <Flex alignItems='center'>
                    <Icon
                        cursor='pointer'
                        mr='3'
                        as={colorMode === 'light' ? MoonIcon : SunIcon}
                        alignSelf='center'
                        onClick={() => toggleColorMode()}
                    />
                    {userInfo ? (
                        <Menu>
                            <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                                {userInfo.name} <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={ReactLink} to='/profile'>
                                    <CgProfile />
                                    <Text ml='2'>Profile</Text>
                                </MenuItem>
                                <MenuItem as={ReactLink} to='/your-orders'>
                                    <MdLocalShipping />
                                    <Text ml='2'>Your Orders</Text>
                                </MenuItem>
                                {userInfo.isAdmin === true && (
                                    <>
                                        <MenuDivider />
                                        <MenuItem as={ReactLink} to={'/admin-panel'}>
                                            <MdOutlineAdminPanelSettings />
                                            <Text ml='2'>Admin Console</Text>
                                        </MenuItem>
                                    </>
                                )}
                                <MenuDivider />
                                <MenuItem onClick={logoutHandler}>
                                    <MdLogout />
                                    <Text ml='2'>Logout</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link' display={{ base: 'none', md: 'inline-flex' }}>
                                Sign In
                            </Button>
                            <Button
                                as={ReactLink}
                                to='/registration'
                                m={2}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize='sm'
                                fontWeight={600}
                                _hover={{ bg: 'orange.400' }}
                                bg='orange.500'
                                color='white'>
                                Sign Up
                            </Button>{' '}
                        </>
                    )}
                </Flex>
            </Flex>
            {
                // Mobile Drawer
            }
            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'><IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen} /></DrawerHeader>
                    <DrawerBody>
                        <Stack>
                            <NavComponents components={routes.navbar}></NavComponents>
                            {userInfo ? (<NavComponents components={routes.userMenu}></NavComponents>) :
                            (
                                <Flex alignItems={'center'} justifyContent={'space-between'} p={4}>
                                    <NavComponents components={routes.authorization} />
                                </Flex>
                            )}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}
export default Navbar