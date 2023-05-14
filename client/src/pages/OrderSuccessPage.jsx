/* eslint-disable react-hooks/rules-of-hooks */


import { Wrap, Alert, AlertIcon, AlertTitle, Stack, Button, useToast } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const OrderSuccessScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    // get userinfo for avoid excessive logout execution
    const user = useSelector((state) => state.user);
    const { userInfo } = user;
    const logoutHandler = () => {
        if (userInfo !== null) {
            dispatch(logout());
            toast({ description: 'You have been logged out.', status: 'success', isClosable: true });
        } else {
            toast({ description: 'You have been already logged out.', status: 'error', isClosable: true });
        }
        navigate('/products');
    };
    return (
        <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='auto'>
                <AlertIcon boxSize='55px' />
                <AlertTitle pt='8px' fontSize='xl'>
                    Payment Successful!
                </AlertTitle>

                <Stack mt='20px' minW='200px'>
                    <Button colorScheme='teal' variant='outline' as={ReactLink} to='/your-orders'>
                        Your Order
                    </Button>
                    <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
                        Products
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
                        Logout
                    </Button>
                </Stack>
            </Alert>
        </Wrap>
    );
};

export default OrderSuccessScreen;
