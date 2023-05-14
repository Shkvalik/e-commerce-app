import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert, AlertIcon, AlertDescription, AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Textarea,
  Input,
  Toast as toast,
  Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb,
  CircularProgress, CircularProgressLabel, Center
} from '@chakra-ui/react';

import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';
import { createProductReview, resetProductError } from '../redux/actions/productActions';


export const ProductDetailPage = () => {
  let { id } = useParams()
  //states
  const [amount, setAmount] = useState(1)
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  //redux
  const dispatch = useDispatch()
  // redux product component
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = products;
  // redux cart component
  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;
  // redux user component
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));

    if (reviewSend) {
      toast({ description: 'Product review saved.', status: 'success', isClosable: true });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend]);

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({ description: 'Item has been added.', status: 'success', isClosable: true });
  };

  const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);

  //styles for Circular dot
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }


  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}>
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}>
                {product.productIsNew && (
                  <Badge rounded='full' w='40px' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                    Sold out
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='xl'>${product.price}</Text>
                    <Flex>
                      <HStack spacing='2px' marginTop={2}>
                        <CircularProgress max={5} value={product.rating} color={product.rating > 3.5 ? 'green.400' : (product.rating <= 3.5 && product.rating > 2) ? 'yellow.400' : 'red.400'} size='35px'>
                          <CircularProgressLabel >{product.rating}</CircularProgressLabel>
                        </CircularProgress>
                        <Text fontSize='md' fontWeight='bold' ml='4px'>
                          {product.numberOfReviews} Reviews
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={'bold'}>Quantity</Text>
                  <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                    <Button isDisabled={amount <= 1} onClick={() => setAmount(amount - 1)}>
                      <MinusIcon />
                    </Button>
                    <Text mx='30px'>{amount}</Text>
                    <Button isDisabled={amount >= product.stock} onClick={() => setAmount(amount + 1)}>
                      <SmallAddIcon w='20px' h='25px' />
                    </Button>
                  </Flex>
                  <Button isDisabled={product.stock === 0} colorScheme='orange' onClick={() => addItem()}>
                    Add to cart
                  </Button>
                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        2 year extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiSupport size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
                <Image mb='30px' src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            {userInfo && (
              <>
                <Tooltip label={hasUserReviewed() ? 'You have already reviewed this product.' : ''} fontSize='md'>
                  <Button
                    isDisabled={hasUserReviewed()}
                    my='20px'
                    w='140px'
                    colorScheme='orange'
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}>
                    Write a review
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb='20px' >
                    <Center><Box pt={6} pb={2} >
                      <CircularProgress max={5} value={rating} color={rating >= 4.5 ? 'green.400' : rating >= 4 ? 'green.200' : rating >= 3 ? 'yellow.400' : (rating <= 3 && rating > 2) ? 'orange.400' : 'red.600'} size='80px' >
                        <CircularProgressLabel as='bold' >{rating}</CircularProgressLabel>
                      </CircularProgress>
                    </Box></Center>

                    <Slider aria-label='slider-ex-1' colorScheme='orange' min={0.5} max={5} step={0.5} onChange={(val) => setRating(val)}>
                      <SliderMark
                        value={rating}
                        textAlign='center'
                        bg='orange.500'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='12'
                      >
                        {rating}
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Review title (optional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`The ${product.name} is...`}
                    />
                    <Button w='140px' colorScheme='orange' onClick={() => dispatch(createProductReview(product._id, userInfo._id, comment, rating, title))}>
                      Publish review
                    </Button>
                  </Stack>
                )}
              </>
            )}
            <Stack>
              <Text fontSize='xl' fontWeight='bold'>
                Reviews
              </Text>
              <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <CircularProgress max={5} value={review.rating} color={review.rating > 3.5 ? 'green.400' : (review.rating <= 3.5 && review.rating > 2) ? 'yellow.400' : 'red.400'} size='35px'>
                        <CircularProgressLabel >{review.rating}</CircularProgressLabel>
                      </CircularProgress>
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py='12px'>{review.comment}</Box>
                    <Text fontSize='sm' color='gray.400'>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>))
      }</Wrap>
  )
}