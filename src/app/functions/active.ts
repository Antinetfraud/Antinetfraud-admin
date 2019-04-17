export function active(name :String ){
    let menu=document.getElementById("menu");
    let a=menu.getElementsByTagName("li");
    let length=a.length;
    for(let i=0;i<length;i++){
        if(a[i].textContent===name){
            a[i].setAttribute("class","actived");
        }else{
            a[i].setAttribute("class","");
        }
    } 
}
