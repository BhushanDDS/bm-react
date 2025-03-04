import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    getAllCategories, 
    getProductByCategories, 
    getAllProductsApi 
} from '../../api/AdminApi';
import { 
    Box, Button, Spinner, Grid, Card, CardBody, Image, Text, Heading 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => selectedCategory ? getProductByCategories(selectedCategory) : getAllProductsApi(),
        enabled: !!selectedCategory || selectedCategory === null
    });

    return (
        <Box>
            <Heading size="lg" mb={4}>Product Categories</Heading>
            
            <Box mb={4}>
                <Button 
                    colorScheme={selectedCategory === null ? "blue" : "gray"} 
                    onClick={() => setSelectedCategory(null)}
                    mr={2}
                >
                    All Products
                </Button>
                {categoriesLoading ? <Spinner /> : categories?.map((category) => (
                    <Button 
                        key={category} 
                        colorScheme={selectedCategory === category ? "blue" : "gray"} 
                        onClick={() => setSelectedCategory(category)}
                        mr={2}
                    >
                        {category}
                    </Button>
                ))}
            </Box>

            <Heading size="md" mb={4}>
                {selectedCategory ? `Products in "${selectedCategory}"` : "All Products"}
            </Heading>

            {productsLoading ? <Spinner /> : (
                <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
                    {products?.map((product) => (
                        <Card key={product.id} boxShadow="md" p={4} borderRadius="md">
                            <Image src={product.image} alt={product.title} boxSize="150px" objectFit="contain" mx="auto" />
                            <CardBody textAlign="center">
                                <Heading size="sm" mb={2}>{product.title}</Heading>
                                <Text fontWeight="bold" color="green.500">${product.price}</Text>
                                <Button 
                                    colorScheme="cyan" 
                                    mt={3} 
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    View Product
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </Grid>
            )}

            {productsError && <Text color="red.500">Error loading products: {productsError.message}</Text>}
        </Box>
    );
};

export default ProductList;
