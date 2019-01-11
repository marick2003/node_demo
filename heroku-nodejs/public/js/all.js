///promise fun
var runpromise= function(someone,timer,success){
    console.log(someone+'running');
    return new Promise(function(resolve,reject){
        if(success){
            resolve(someone+'ok!')
        }else{

            reject(new Error(someone+'error'));
            
        }
    });
}
runpromise('rick ',2000,true).then(function(response){

    console.log(response);
}).catch(function(response){

    console.log(response);
});