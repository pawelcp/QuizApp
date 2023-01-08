import { 
    Box,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Spacer,
    Text
 } from "@chakra-ui/react"
import { useGetAllProductsQuery } from "../store/apiSlice";
import { AiFillStar } from "react-icons/ai";
import { Product } from "../store/apiSlice";

const ProductsSection = () => { 

    const {data} = useGetAllProductsQuery()    
    
    return(
        <Container maxW='10xl'>
            <Grid mt='3vh' templateColumns={{lg:'repeat(3, 1fr)',md:'repeat(2, 1fr)', sm:'repeat(1, 1fr)', xl:'repeat(4, 1fr)'}} gap='6'>
                {data && data.map((product:Product)=>{
                    
                    return(
                        <GridItem rounded='xl' bg='blackAlpha.800' w='100%' h='20vh' shadow='2xl'>
                        <Flex h='100%'>
                        <Box w='50%'>
                       <Image roundedLeft='xl' opacity='0.7' maxH='100%' shadow='2xl' minH='100%' maxW='100%' src={product.image}></Image>
                        </Box>
                        <Box w='50%' position='relative'>
                            {product.title.length < 15 && <Text p='6' textAlign='center' fontSize='2xl' color='white' fontWeight='medium'>{product.title}</Text>}  
                            {product.title.length > 15 && <Text pb='5' pt='3' textAlign='center' fontSize='md' color='white' fontWeight='medium'>{product.title}</Text>}
                            <Center>
                            </Center> 
                            <Text position='absolute' left='3' bottom='4' textAlign='center' fontSize='xl' color='white' fontWeight='medium' >{product.price} $</Text>
                            <Box position='absolute' right='2' bottom='5'>
                                <Flex>
                                    <Text fontSize='md' color='white' fontWeight='medium'>{product.rating[1]}/5</Text>
                                    <Center>
                                        <AiFillStar fontSize='md' color='white' fontWeight='medium'/>
                                    </Center>
                                </Flex>
                            </Box>
                            
                        </Box>
                    </Flex>
                </GridItem>
                    )
                })}
                
            </Grid>
        </Container>

    )
 }
 export default ProductsSection