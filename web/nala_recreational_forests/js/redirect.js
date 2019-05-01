let mobile_user_agent = ['Android','Mobile','iPad','iPhone','Windows Phone','Nokia'],
    redirect = function(){
    for(let i=0; i<mobile_user_agent.length; i++){
        if(navigator.userAgent.indexOf(mobile_user_agent[i])!=-1){
            location.replace("mobile/index.html");
            return;
        }
    }
    location.replace("pc/index.html");
}
redirect();