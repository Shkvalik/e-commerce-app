import React from 'react'
import {
    Card, CardBody, CardFooter, CardHeader,
    Image,
    Stack,
    HStack,
    Heading,
    Text,
    Button,
    Flex,
    Circle,
    Tooltip,
    Icon,
    CircularProgress,
    CircularProgressLabel,
    Link,
    useToast
} from "@chakra-ui/react"
import { MdShoppingCart } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from "../redux/actions/cartActions";
import { Link as ReactLink } from 'react-router-dom';


export const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const toast = useToast();
    const cartInfo = useSelector((state) => state.cart)
    const { cart } = cartInfo;

    const addItem = (id) => {
        if (cart.some((cartItem) => cartItem.id === id)) {
            toast({
                description: 'This item has already added in your cart',
                status: 'error',
                isClosable: true
            })
        } else {
            dispatch(addCartItem(id, 1))
            toast({
                description: `Item has been add`,
                status: 'success',
                isClosable: true
            })
        }
    }
    return (
        <Card maxW='320px' shadow={'lg'}>
            <CardBody>
                <Link as={ReactLink} to={`/product/${ product._id }`} pt='2' cursor='pointer'>
                    <Image minW={280}
                        src={product.image}
                        alt={product.name}
                        borderRadius='lg'
                    />
                </Link>
                {product.productIsNew ?
                    <Circle size='20px' bg='green.200' pos={'absolute'} top={2} right={2} /> :
                    product.stock <= 0 ?
                        <Circle size='20px' bg='red.300' pos={'absolute'} top={2} right={2} /> :
                        null
                }
                <Stack mt='6' spacing='3' align={'center'}>
                    <Link as={ReactLink} to={`/product/${ product._id }`} pt='2' cursor='pointer'>
                        <Heading size='md' fontWeight={'semibold'} lineHeight={'tight'}>{product.name}</Heading>
                    </Link>
                    <HStack>
                        <Text fontWeight={'semibold'} lineHeight={'tight'}>Rating({product.numberOfReviews}):</Text>
                        <CircularProgress max={5} value={product.rating} color={product.rating > 3.5 ? 'green.400' : (product.rating <= 3.5 && product.rating > 2) ? 'yellow.400' : 'red.400'} size='35px'>
                            <CircularProgressLabel >{product.rating}</CircularProgressLabel>
                        </CircularProgress>
                    </HStack>

                </Stack>
            </CardBody>
            <CardFooter justifyContent={'space-between'}>
                <Text fontSize='2xl'>{product.stock > 0 ? '$' + product.price : "Out of Stock"}</Text>
                <Tooltip label='Add To Cart' placement='bottom-end'>
                    <Button variant='ghost' colorScheme='blue' isDisabled={product.stock <= 0} onClick={() => addItem(product._id)}>
                        <Icon as={MdShoppingCart}></Icon>
                    </Button>
                </Tooltip>
            </CardFooter>
        </Card>
    )
}
