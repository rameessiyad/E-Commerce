import React from 'react'
import bannerImg from '../../public/images/productsBanner.jpg'
import ProductsRow from '../../components/ProductsRow/ProductsRow'

const ProductsPage = () => {
    return (
        <div>
            <div className='w-full h-[150px] md:h-[400px] sm:h-[300px] relative'>
                <img src={bannerImg} alt="banner" className='w-full h-full object-cover' />
                <div className='flex flex-col p-4 gap-2 items-center bg-black bg-opacity-50 w-[40%] sm:w-[90%] md:w-[70%] h-[30%] sm:h-[40%] justify-center absolute top-0 bottom-0 left-0 right-0 m-auto'>
                    <h1 className="text-sm md:text-3xl sm:text-2xl text-white font-medium">Products Page</h1>
                    <p className="text-white text-center hidden md:block md:text-base sm:text-sm">Find the best products</p>
                </div>
            </div>
            {/* products here */}
            <ProductsRow />
        </div>
    )
}

export default ProductsPage