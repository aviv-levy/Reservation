const ip = 'http://localhost:3000';


let date = document.getElementById('date');

date.addEventListener('input',async()=>{
    await fetch(ip+'/times',{
        method:'GET'
    }).then((response)=>response.json())
    .then((data) =>{console.log(data);})
})