export const getOrderData=(sectionResp)=>{
    return sectionResp?.data && Array.isArray(sectionResp.data)
       ? sectionResp.data.sort((a, b) => a.orders - b.orders)
       : []
}