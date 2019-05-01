let mobile_user_agent = ['Android','Mobile','iPad','iPhone','Windows Phone','Nokia'],
    mobile_bool = false;
for(let i=0; i<mobile_user_agent.length; i++){
    if(navigator.userAgent.indexOf(mobile_user_agent[i])!=-1){
        mobile_bool=true;
    }
}
document.addEventListener('DOMContentLoaded',function(){
    const mobile_link = document.querySelector(".mobile_link");
    if(mobile_bool){
        mobile_link.style.display="block";
    }
    const slider_img = document.querySelectorAll('.info .news2 .slider .slider_img li'),
          slider_pager = document.querySelectorAll('.info .news2 .slider .slider_pager a');
    let slider_on = 0,
        slider_history = 0,
        slider_delay = false,
        slider_delay_time = 430,
        slider_auto_time = 5000,
        slider_width = 290;
    slider_img[0].style.display='block';
    slider_img[0].style.left='0px';
    slider_pager[0].classList.add('on');
    let slider_next = function(){
        if(document.hidden){
            return;
        }
        if(slider_delay==false&&slider_img.length>1){
            slider_delay=true;
            setTimeout(function(){
                slider_delay=false;
            },slider_delay_time);
        } else {
            return;
        }
        clearInterval(slider_auto);
        slider_auto = setInterval(slider_next,slider_auto_time);
        slider_history=slider_on;
        slider_on++;
        setTimeout(function(){
            slider_pager[slider_history].classList.remove('on');
            slider_img[slider_history].style.left= -slider_width+'px';
        },15)
        setTimeout(function(){
            slider_img[slider_history].style.display='none';
            slider_img[slider_history].style.left='';
        },400);
        if(slider_on<slider_pager.length){
            slider_img[slider_on].style.display='block';
            slider_img[slider_on].style.left= slider_width+'px';
            setTimeout(function(){
                slider_pager[slider_on].classList.add('on');
                slider_img[slider_on].style.left='0px';
            },15);
        }else{
            slider_on=0;
            slider_img[slider_on].style.display='block';
            slider_img[slider_on].style.left= slider_width+'px';
            setTimeout(function(){
                slider_pager[slider_on].classList.add('on');
                slider_img[slider_on].style.left='0px';
            },15);
        }
    }
    let slider_prev = function(){
        if(slider_delay==false&&slider_img.length>1){
            slider_delay=true;
            setTimeout(function(){
                slider_delay=false;
            },slider_delay_time);
        } else {
            return;
        }
        clearInterval(slider_auto);
        slider_auto = setInterval(slider_next,slider_auto_time);
        slider_history=slider_on;
        slider_on--;
        setTimeout(function(){  
            slider_pager[slider_history].classList.remove('on');
            slider_img[slider_history].style.left= slider_width+'px';
        },15)
        setTimeout(function(){
            slider_img[slider_history].style.display='none';
            slider_img[slider_history].style.left='';
        },400);
        if(slider_on>=0){
            slider_img[slider_on].style.display='block';
            slider_img[slider_on].style.left= -slider_width+'px';
            setTimeout(function(){
                slider_pager[slider_on].classList.add('on');
                slider_img[slider_on].style.left='0px';
            },15);
        }else{
            slider_on = slider_pager.length-1;
            slider_img[slider_on].style.display='block';
            slider_img[slider_on].style.left= -slider_width+'px';
            setTimeout(function(){
                slider_pager[slider_on].classList.add('on');
                slider_img[slider_on].style.left='0px';
            },15);
        }
    }
    for(let i=0; i<slider_pager.length; i++){
        (function(i){
            slider_pager[i].addEventListener('click',function(e){
                e.preventDefault();
                if(slider_on==i){
                    return;
                }
                if(slider_delay==false&&slider_img.length>1){
                    slider_delay=true;
                    setTimeout(function(){
                        slider_delay=false;
                    },slider_delay_time);
                } else {
                    return;
                }
                clearInterval(slider_auto);
                slider_auto = setInterval(slider_next,slider_auto_time);
                slider_history=slider_on;
                slider_on=i;
                if(slider_on>slider_history){
                    setTimeout(function(){
                        slider_img[slider_history].style.display='none';
                        slider_img[slider_history].style.left='';
                    },400);
                    slider_img[slider_on].style.display='block';
                    slider_img[slider_on].style.left= slider_width+'px';
                    setTimeout(function(){
                        slider_pager[slider_history].classList.remove('on');
                        slider_pager[slider_on].classList.add('on');
                        slider_img[slider_history].style.left= -slider_width+'px';
                        slider_img[slider_on].style.left='0px';
                    },15);
                } else {
                    setTimeout(function(){
                        slider_img[slider_history].style.display='none';
                        slider_img[slider_history].style.left='';
                    },400);
                    slider_img[slider_on].style.display='block';
                    slider_img[slider_on].style.left= -slider_width+'px';
                    setTimeout(function(){
                        slider_pager[slider_history].classList.remove('on');
                        slider_pager[slider_on].classList.add('on');
                        slider_img[slider_history].style.left= slider_width+'px';
                        slider_img[slider_on].style.left='0px';
                    },15);
                }
            },false)
        }(i));
    }
    let slider_auto = setInterval(slider_next,slider_auto_time);
    /*--------------------slider_img_touch_evetn--------------------------*/
    const slider_touch = document.querySelector('.info .news2 .slider');
    let slider_touch_X_now,
        slider_touch_X_history,
        slider_touch_bool = false;
    slider_touch.addEventListener("touchstart",function (e){
        slider_touch_X_history = e.changedTouches[0].pageX;
        slider_touch_bool=false;
    },{passive:true},false);
    slider_touch.addEventListener("touchmove",function(e){
        if(e.changedTouches.length!=1)
            slider_touch_bool = true;
    },{passive:true},false)
    slider_touch.addEventListener("touchend",function (e){
        if(slider_touch_bool==true){
            return;
        }
        slider_touch_X_now = e.changedTouches[0].pageX;
        if(slider_touch_X_now+50<slider_touch_X_history){
            slider_next();
        } else if(slider_touch_X_now>slider_touch_X_history+50){
            slider_prev();
        }
    },false);
    /*------------------info_menu---------------------*/
    const info_menu_btn = document.querySelectorAll('.info2 .wrap .info_menu .btn li'),
          info_menu = document.querySelectorAll('.info2 .wrap .info_menu .info_in li');
    info_menu[0].style.display='block';
    info_menu_btn[0].classList.add('on');
    for(let i=0; i<info_menu_btn.length; i++){
        (function(i){
            info_menu_btn[i].addEventListener('click',function(e){
                e.preventDefault();
                for(let m=0; m<info_menu.length; m++){
                    if(info_menu_btn[m].classList.contains('on')){
                        info_menu[m].style.display='none';
                        info_menu_btn[m].classList.remove('on');
                    }
                }
                info_menu[i].style.display='block';
                info_menu_btn[i].classList.add('on');
            },false);
        })(i);
    }
},false);