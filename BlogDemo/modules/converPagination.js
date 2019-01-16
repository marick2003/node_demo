  const converPagination=function(sourceData, currentPage){

        ///分頁製作
        const totalResult=sourceData.length;
        const perpage=3; ///每頁三筆
        const pageTotal=Math.ceil(totalResult/perpage);
        console.log(pageTotal);
        //目前頁數
        //let currentPage=getcurrentPage;
        if(currentPage>pageTotal){
        currentPage=pageTotal;
        }
        const minItem= (currentPage*perpage)-perpage+1;
        const maxItem=(currentPage*perpage); 
        
        const data=[];
        sourceData.forEach(function(item,i){
        let itemNum=i+1;
        if (itemNum>= minItem && itemNum<=maxItem){

            //console.log(item.title,i);
            data.push(item);
        }

        });
        const page={
        pageTotal,
        currentPage,
        hasPre: currentPage>1,
        hasNext: currentPage<pageTotal
        }

        return {

            page,
            data
        }
  }
  
  module.exports = converPagination;