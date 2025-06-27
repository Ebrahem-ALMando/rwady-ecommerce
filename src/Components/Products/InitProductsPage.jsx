    // //
    // // import {getProducts} from "@/api/services/listProducts";
    // import {getCategories} from "@/api/services/listCategories";
    // import {getBrands} from "@/api/services/listBrands";
    // import {getColors} from "@/api/services/colors";
    // import Products from "@/Components/Products/Products";
    // import FullScreenLoader from "@/Components/Shared/FullScreenLoader/FullScreenLoader";
    // import {Suspense} from "react";
    // import Loading from "@/Components/Shared/Loading/Loading";
    // import {getProducts} from "@/api/services/listProducts";
    //
    //
    //
    // const InitProductsPage=async ({ searchParams })=>{
    //
    //     let initError=false;
    //     const searchQueryRaw = searchParams?.search || "";
    //     const queryString = Object.entries(searchParams)
    //         .map(([key, value]) => Array.isArray(value)
    //             ? value.map(v => `${key}=${v}`).join("&")
    //             : `${key}=${value}`
    //         ).join("&");
    //
    //
    //
    //     const [products, categoriesRes] = await Promise.all([
    //         getProducts(queryString),
    //         getCategories()
    //     ]);
    //     const productsData = products?.data || [];
    //     const categories = categoriesRes?.data || [];
    //
    //     if (!productsData || products.error||categoriesRes.error)  initError=true;
    //
    //
    //
    //     // const productsPromise   =await getProducts();
    //     // const dataPromiseCategories = getCategories();
    //     //
    //     // const dataPromiseBrands     = getBrands();
    //     //
    //     // const dataPromiseColor=getColors()
    //
    //     // const dataPromiseSize=getSizes()
    //     return(
    //         <>
    //         {/*<FullScreenLoader/>*/}
    //         <Suspense fallback={<Loading/>}>
    //             <Products
    //                 initError={initError}
    //                 data={productsData || []}
    //                 searchParams={queryString}
    //                 categoriesData={categories}
    //                 // productsPromise={productsPromise}
    //                 // dataPromiseColor={dataPromiseColor}
    //                 // dataPromiseBrands={dataPromiseBrands}
    //                 // dataPromiseCategories={dataPromiseCategories}
    //                 // getDataProducts={getProducts}
    //                 // getDataColor={getColors}
    //                 // getDataBrands={getBrands}
    //                 // getDataCategory={getCategories}
    //             />
    //         </Suspense>
    //
    //         </>
    //     )
    //
    // }
    // export default InitProductsPage

    //

    import {getCategories} from "@/api/services/listCategories";
    import {getBrands} from "@/api/services/listBrands";
    import {getColors} from "@/api/services/colors";
    import Products from "@/Components/Products/Products";
    import FullScreenLoader from "@/Components/Shared/FullScreenLoader/FullScreenLoader";
    import {Suspense} from "react";
    import Loading from "@/Components/Shared/Loading/Loading";
    import {getProducts} from "@/api/services/listProducts";



    const InitProductsPage=async ({ searchParams })=>{

        let initError=false;
        const searchQueryRaw = searchParams?.search || "";
        const queryString = Object.entries(searchParams)
            .map(([key, value]) => Array.isArray(value)
                ? value.map(v => `${key}=${v}`).join("&")
                : `${key}=${value}`
            ).join("&");


        const [products, categoriesRes,brandsRes] = await Promise.all([
            getProducts(queryString),
            getCategories(),
            getBrands()
        ]);
        const productsData = products?.data || [];
        const categories = categoriesRes?.data || [];
        const brands = brandsRes?.data || [];

        if (!productsData || products.error||categoriesRes.error||brandsRes.error)  initError=true;


        // const productsPromise   =await getProducts();
        // const dataPromiseCategories = getCategories();
        //
        // const dataPromiseBrands     = getBrands();
        //
        // const dataPromiseColor=getColors()

        // const dataPromiseSize=getSizes()
        return(
            <>
                {/*<FullScreenLoader/>*/}
                <Suspense fallback={<Loading/>}>
                    <Products
                        initError={initError}
                        data={productsData || []}
                        searchParams={searchParams}
                        categoriesData={categories}
                        brandsData={brands}
                    />
                </Suspense>

            </>
        )

    }
    export default InitProductsPage