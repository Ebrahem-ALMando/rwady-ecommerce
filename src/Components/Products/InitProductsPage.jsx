
    import {getProducts} from "@/api/services/listProducts";
    import {getCategories} from "@/api/services/listCategories";
    import {getBrands} from "@/api/services/listBrands";
    import {getColors} from "@/api/services/colors";
    import Products from "@/Components/Products/Products";
    import FullScreenLoader from "@/Components/Shared/FullScreenLoader/FullScreenLoader";
    import {Suspense} from "react";
    import Loading from "@/Components/Shared/Loading/Loading";



    const InitProductsPage=async ()=>{

        const productsPromise   = getProducts();

        const dataPromiseCategories = getCategories();

        const dataPromiseBrands     = getBrands();

        const dataPromiseColor=getColors()

        // const dataPromiseSize=getSizes()
        return(
            <>
            <FullScreenLoader/>
            <Suspense fallback={<Loading/>}>

                <Products
                    productsPromise={productsPromise}
                    dataPromiseColor={dataPromiseColor}
                    dataPromiseBrands={dataPromiseBrands}
                    dataPromiseCategories={dataPromiseCategories}
                    getDataProducts={getProducts}
                    getDataColor={getColors}
                    getDataBrands={getBrands}
                    getDataCategory={getCategories}
                />
            </Suspense>

            </>
        )

    }
    export default InitProductsPage