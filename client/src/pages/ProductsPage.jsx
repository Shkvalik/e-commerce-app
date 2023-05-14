import React from 'react'
import {
    SimpleGrid,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/actions/productActions'
import { ProductCard } from '../components/ProductCard'
import { useEffect } from 'react'
export const ProductsPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products)
    const { products, loading, error } = productList;
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <SimpleGrid minChildWidth='320px' spacing='30px' justifyItems={'center'} margin={30}>
            {loading
                ? <Spinner />
                : error
                    ? <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Upps!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    : products.map((product, index) => {
                        return <ProductCard key={index} product={product} />
                    })}
        </SimpleGrid>
    )
}
