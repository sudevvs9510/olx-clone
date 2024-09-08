import React, { useEffect, useState } from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProduct, getUser } from '../firebase/firebaseFunctions';
function ViewPost(props) {
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState({});
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = searchParams.get('PRODUCTID');

            if (productId) {
                try {
                    const product = await getProduct(productId);
                    if (product) {
                        const user = await getUser(product.userId);
                        setProduct({ ...product, ...user });
                    } else {
                        setFetchError(true);
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    setFetchError(true);
                }
            }
        };

        fetchProduct();
    }, [searchParams]);

    if (fetchError) {
        Navigate('/');
    }

    return (
        <div>
            <Header />
            <View product={product} />
        </div>
    );
}

export default ViewPost
