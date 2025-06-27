export async function getDataWithServer(dataPromise){
    let  dataList = [];
    let initialError=false;

    const data = await dataPromise;
    dataList = data || [];


    if(dataList.error)
    {initialError=true}


    return  {dataList,initialError}
}