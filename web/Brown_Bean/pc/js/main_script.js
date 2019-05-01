let mobile_user_agent = ['Android','Mobile','iPad','iPhone','Windows Phone','Nokia'],
    mobile_bool = false;
for(let i=0; i<mobile_user_agent.length; i++){
    if(navigator.userAgent.indexOf(mobile_user_agent[i])!=-1){
        mobile_bool=true;
    }
}
document.addEventListener('DOMContentLoaded',function(){
    if(mobile_bool){
        document.querySelector('.mobile_link').style.display="block";
    }
    /*--------------------------main_bn------------------------------*/
    const main_bn = document.querySelectorAll('.main_bn .over_hide .main_img li');
    let main_bn_opacity_on=0;
    main_bn[0].classList.add('on');
    let main_bn_opacity = function(){
        main_bn[main_bn_opacity_on].classList.remove('on');
        if(main_bn[main_bn_opacity_on+1]){
            main_bn_opacity_on++;
            main_bn[main_bn_opacity_on].classList.add('on');
        } else {
            main_bn_opacity_on=0;
            main_bn[main_bn_opacity_on].classList.add('on');
        }
    }
    if(main_bn.length>1){
        setInterval(main_bn_opacity,10000);
    }
    /*-------------------------event_slider-------------------------*/
    window.addEventListener('load',function(){
        const event_slider = document.querySelector('.event .event_slider');
        let event_slider_chlid = event_slider.children,
            event_slider_chlid_margin=30,
            event_slider_width=0,
            event_slider_on=0,
            event_slider_delay=false;
        if(event_slider_chlid.length<5){
            let event_slider_chlid_txt='',
                num=0;
            if(event_slider_chlid.length<6){
                for(i=0; i<6||i<event_slider_chlid.length*2; ++i){
                    if(event_slider_chlid[i]){
                        event_slider_chlid_txt+=event_slider_chlid[i].outerHTML;
                    } else {
                        if(event_slider_chlid.length>num){
                            event_slider_chlid_txt+=event_slider_chlid[num].outerHTML;
                            num++;
                        } else {
                            num=0;
                            event_slider_chlid_txt+=event_slider_chlid[num++].outerHTML;
                        }
                    }
                }
            } else {
                for(i=0; i<event_slider_chlid.length; ++i){
                    if(event_slider_chlid[i]){
                        event_slider_chlid_txt+=event_slider_chlid[i].outerHTML;
                    } else {
                        if(event_slider_chlid.length>num){
                            event_slider_chlid_txt+=event_slider_chlid[num].outerHTML;
                            num++;
                        } else {
                            num=0;
                            event_slider_chlid_txt+=event_slider_chlid[num++].outerHTML;
                        }
                    }
                }
            }
            event_slider.innerHTML=event_slider_chlid_txt;
        }
        const over_hide = document.querySelector('.event .over_hide'),
              li_margin_left = over_hide.querySelectorAll('li');
        let event_setting = function(){
            let event_chlid_width = event_slider_chlid[0].offsetWidth;
            for(let m=0; m<li_margin_left.length; m++){
                li_margin_left[m].style.marginLeft= -(event_chlid_width/2)+"px";
            }
            for(let i=0; i<5; i++){
                event_slider_width+=event_chlid_width;
                event_slider_width+=event_slider_chlid_margin;
                if(i==2){
                    over_hide.style.width = event_slider_width+'px';
                    over_hide.style.marginLeft = -(event_slider_width/2)+'px';
                }
            }
            event_slider.style.width = event_slider_width+"px";
            event_slider.style.marginLeft = -(event_slider_width/2)+"px";
        }
        event_setting();
        event_slider_chlid[0].style.left='50%';
        event_slider_chlid[1].style.left='70%';
        event_slider_chlid[event_slider_chlid.length-1].style.left='30%';
        for(let i=2; i<event_slider_chlid.length-1; i++){
            event_slider_chlid[i].style.display='none';
        }
        let event_slider_vanum1=25,
            event_slider_vanum2=430,
            event_slider_delay_time=450,
            event_slider_next = function(){
            let event_slider_in1,event_slider_in2,event_slider_in3;
            if(event_slider_delay==false&&document.hidden==false){
                event_slider_delay=true;
                clearInterval(event_slider_auto);
                event_slider_auto=setInterval(event_slider_next,10000);
                setTimeout(function(){
                    event_slider_delay=false;
                },event_slider_delay_time);
            } else {
                return;
            }
            if(event_slider_on<event_slider_chlid.length-1){
                if(event_slider_on<1){
                    event_slider_in1=event_slider_chlid.length-1-event_slider_on;
                    event_slider_on++;
                } else {
                    event_slider_in1=event_slider_on-1;
                    event_slider_on++;
                }
                event_slider_in2=event_slider_on-1;
                if(event_slider_chlid.length-1==event_slider_on){
                    event_slider_in3=0;
                } else {
                    event_slider_in3=event_slider_on+1;
                }
            } else {
                event_slider_in1=event_slider_chlid.length-2;
                event_slider_on=0;
                event_slider_in2=event_slider_chlid.length-1;
                event_slider_in3=event_slider_on+1;
            }
            event_slider_chlid[event_slider_in3].style.display='';
            event_slider_chlid[event_slider_in3].style.left='90%';
            setTimeout(function(){
                event_slider_chlid[event_slider_in1].style.left='10%';
                event_slider_chlid[event_slider_in2].style.left='30%';
                event_slider_chlid[event_slider_on].style.left='50%';
                event_slider_chlid[event_slider_in3].style.left='70%';
            },event_slider_vanum1);
            setTimeout(function(){
                event_slider_chlid[event_slider_in1].style.left='';
                event_slider_chlid[event_slider_in1].style.display='none';
            },event_slider_vanum2);
        }
        let event_slider_perv = function(){
            let event_slider_in1,event_slider_in2,event_slider_in3;
            if(event_slider_delay==false){
                event_slider_delay=true;
                clearInterval(event_slider_auto);
                event_slider_auto=setInterval(event_slider_next,10000);
                setTimeout(function(){
                    event_slider_delay=false;
                },event_slider_delay_time);
            } else {
                return;
            }
            if(event_slider_on!=0){
                event_slider_on--;
                if(event_slider_on==0){
                    event_slider_in1=event_slider_chlid.length-1;
                } else {
                    event_slider_in1=event_slider_on-1;
                }
                event_slider_in2=event_slider_on+1;
                if(event_slider_chlid.length==event_slider_on+2){
                    event_slider_in3=0;
                } else {
                    event_slider_in3=event_slider_on+2;
                }
            } else {
                event_slider_on=event_slider_chlid.length-1;
                event_slider_in1=event_slider_on-1;
                event_slider_in2=0;
                event_slider_in3=1;
            }
            event_slider_chlid[event_slider_in1].style.display='';
            event_slider_chlid[event_slider_in1].style.left='10%';
            setTimeout(function(){
                event_slider_chlid[event_slider_in1].style.left='30%';
                event_slider_chlid[event_slider_on].style.left='50%';
                event_slider_chlid[event_slider_in2].style.left='70%';
                event_slider_chlid[event_slider_in3].style.left='90%';
            },event_slider_vanum1);
            setTimeout(function(){
                event_slider_chlid[event_slider_in3].style.left='';
                event_slider_chlid[event_slider_in3].style.display='none';
            },event_slider_vanum2);
        }
        let event_slider_auto=setInterval(event_slider_next,10000);
        document.querySelector('.event .event_slider_control a.prev img').addEventListener('click',function(e){e.preventDefault();},false);
        document.querySelector('.event .event_slider_control a.next img').addEventListener('click',function(e){e.preventDefault();},false);
        document.querySelector('.event .event_slider_control a.prev img').addEventListener('click',event_slider_perv,false);
        document.querySelector('.event .event_slider_control a.next img').addEventListener('click',event_slider_next,false);
        /*-------------------event_slider_touch_event-------------------------*/
        let event_slider_touch_x_now,
            event_slider_touch_x_history,
            event_slider_touch_bool = false;
        event_slider.addEventListener("touchstart",function(e){
            event_slider_touch_x_history = e.changedTouches[0].pageX;
            event_slider_touch_bool=false;
        },{passive:true},false);
        event_slider.addEventListener("touchmove",function(e){
            if(e.changedTouches.length!=1){
                event_slider_touch_bool = true;
            }
        },{passive:true},false);
        event_slider.addEventListener("touchend",function(e){
            if(event_slider_touch_bool==true){
                return;
            }
            event_slider_touch_x_now = e.changedTouches[0].pageX;
            if(event_slider_touch_x_now+100<event_slider_touch_x_history){
                event_slider_next();
            } else if(event_slider_touch_x_now>event_slider_touch_x_history+100) {
                event_slider_perv();
            }
        },false);
    },false);
    /*------------------------------sub_slider_function-----------------------------*/
    let sub_slider_function = function(querySelector_slider,querySelector_next,querySelector_prev){
        const sub_slider =document.querySelector(querySelector_slider);
        let sub_slider_child = sub_slider.children,
            sub_slider_in1 = sub_slider_child.length-1,
            sub_slider_in2 = 0,
            sub_slider_in3 = 1,
            sub_slider_in4 = 2,
            sub_slider_delay = false;
        if(sub_slider_child[0]){
            sub_slider_child[0].style.left='17%';
        }
        if(sub_slider_child[1]){
            sub_slider_child[1].style.left='50%';
        }
        if(sub_slider_child[2]){
            sub_slider_child[2].style.left='83%';
        }
        for(i=3; i<sub_slider_child.length; i++){
            sub_slider_child[i].style.display='none';
        }
        let sub_slider_next = function(){
            if(sub_slider_delay||3>sub_slider_child.length-1||document.hidden){
                return;
            } else {
                clearInterval(sub_slider_auto);
                sub_slider_auto = setInterval(sub_slider_next,5000)
                sub_slider_delay=true;
                setTimeout(function(){
                    sub_slider_delay=false;
                },450);
            }
            let sub_slider_child_next_in = function(a){
                a++;
                if(a>sub_slider_child.length-1){
                    return 0;
                } else {
                    return a;
                }
            };
            sub_slider_in1=sub_slider_child_next_in(sub_slider_in1);
            sub_slider_in2=sub_slider_child_next_in(sub_slider_in2);
            sub_slider_in3=sub_slider_child_next_in(sub_slider_in3);
            sub_slider_in4=sub_slider_child_next_in(sub_slider_in4);
            
            sub_slider_child[sub_slider_in4].style.display='';
            sub_slider_child[sub_slider_in4].style.left='116%';
            setTimeout(function(){
                sub_slider_child[sub_slider_in1].style.left='-16%';
                sub_slider_child[sub_slider_in2].style.left='17%';
                sub_slider_child[sub_slider_in3].style.left='50%';
                sub_slider_child[sub_slider_in4].style.left='83%';
            },25);
            setTimeout(function(){
                sub_slider_child[sub_slider_in1].style.left='';
                sub_slider_child[sub_slider_in1].style.display='none';
            },430);
        }
        let sub_slider_prev = function(){
            if(sub_slider_delay||3>sub_slider_child.length-1||document.hidden){
                return;
            } else {
                clearInterval(sub_slider_auto);
                sub_slider_auto = setInterval(sub_slider_next,5000)
                sub_slider_delay=true;
                setTimeout(function(){
                    sub_slider_delay=false;
                },450);
            }
            let sub_slider_child_prev_in = function(a){
                a--;
                if(a>=0){
                    return a;
                } else {
                    return sub_slider_child.length+a;
                }
            }
            let sub_slider_in5=sub_slider_in4;
            sub_slider_in1=sub_slider_child_prev_in(sub_slider_in1);
            sub_slider_in2=sub_slider_child_prev_in(sub_slider_in2);
            sub_slider_in3=sub_slider_child_prev_in(sub_slider_in3);
            sub_slider_in4=sub_slider_child_prev_in(sub_slider_in4);
            sub_slider_child[sub_slider_in2].style.display='';
            sub_slider_child[sub_slider_in2].style.left='-16%';
            setTimeout(function(){
                sub_slider_child[sub_slider_in2].style.left='17%';
                sub_slider_child[sub_slider_in3].style.left='50%';
                sub_slider_child[sub_slider_in4].style.left='83%';
                sub_slider_child[sub_slider_in5].style.left='116%';
            },25);
            setTimeout(function(){
                sub_slider_child[sub_slider_in5].style.left='';
                sub_slider_child[sub_slider_in5].style.display='none';
            },430);
        }
        let sub_slider_auto = setInterval(sub_slider_next,5000);
        document.querySelector(querySelector_next).addEventListener('click',function(e){e.preventDefault();},false);
        document.querySelector(querySelector_prev).addEventListener('click',function(e){e.preventDefault();},false);
        document.querySelector(querySelector_next).addEventListener('click',sub_slider_next,false);
        document.querySelector(querySelector_prev).addEventListener('click',sub_slider_prev,false);
        /*--------------------sub_slider_touch_evetn------------------------*/
        let sub_slider_touch_x_now,
            sub_slider_touch_x_history,
            sub_slider_touch_bool = false;
        sub_slider.addEventListener("touchstart",function(e){
            sub_slider_touch_x_history = e.changedTouches[0].pageX;
            sub_slider_touch_bool=false;
        },{passive:true},false);
        sub_slider.addEventListener("touchmove",function(e){
            if(e.changedTouches.length!=1){
                sub_slider_touch_bool = true;
            }
        },{passive:true},false);
        sub_slider.addEventListener("touchend",function(e){
            if(sub_slider_touch_bool==true){
                return;
            }
            sub_slider_touch_x_now = e.changedTouches[0].pageX;
            if(sub_slider_touch_x_now+100<sub_slider_touch_x_history){
                sub_slider_next();
            } else if(sub_slider_touch_x_now>sub_slider_touch_x_history+100) {
                sub_slider_prev();
            }
        },false);
    };
    sub_slider_function('.best_product .over_hide .event_slider','.best_product .event_slider_control a.next','.best_product .event_slider_control a.prev');
    sub_slider_function('.new_arrival .over_hide .event_slider','.new_arrival .event_slider_control a.next','.new_arrival .event_slider_control a.prev');
    /*--------------------------------quick_menu---------------------------------*/
    
    let full_page_animate = function(now_offset,move_offset){
        window_height= window.innerHeight;
        let scroll_y = now_offset,
            move_scroll_y = move_offset,
            full_page_num = 0;
        if(scroll_y<move_scroll_y){
            let animate_down = function(){
                let scrool_move = move_scroll_y - scroll_y;
                if(scrool_move >= full_page_num){
                    full_page_num+=scrool_move*0.04;
                    if(scrool_move<full_page_num){
                        scrollTo(0,scroll_y + scrool_move)
                    }else{
                        scrollTo(0,scroll_y + full_page_num);
                    }
                    requestAnimationFrame(animate_down);
                }else{
                    return;
                }
            }
            requestAnimationFrame(animate_down);
        }
        if(scroll_y>move_scroll_y){
            let animate_up = function(){
                let scrool_move = (scroll_y - move_scroll_y)*-1;
                if(scrool_move<=full_page_num){
                    full_page_num+=scrool_move*0.04;
                    if(scrool_move<full_page_num){
                        scrollTo(0,scroll_y + full_page_num);
                    }else{
                        scrollTo(0,scroll_y + scrool_move);
                    }
                    requestAnimationFrame(animate_up);
                }else{
                    return;
                }
            }
            requestAnimationFrame(animate_up);
        }
    }
    quick_menu_function = function(quick_menu_querySelector){
        const offser_arrow = [document.querySelector('.about'), document.querySelector('.event'), document.querySelector('.best_product'), document.querySelector('.new_arrival'), document.querySelector('.contact_us')];
        const quick_menu = document.querySelectorAll(quick_menu_querySelector);
        for(let i=0; i<quick_menu.length; i++){
            (function(i){
                quick_menu[i].addEventListener('click',function(e){
                    e.preventDefault();
                    full_page_animate(pageYOffset,offser_arrow[i].offsetTop);
                },false);
            })(i);
        }
    }
    quick_menu_function('.about .quick_wrap .quick li a');
    quick_menu_function('.contact_us .quick_wrap .quick li a');
},false);