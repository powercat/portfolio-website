let mobile_user_agent = ['Android','Mobile','iPad','iPhone','Windows Phone','Nokia'],
    mobile_bool = false;
for(let i=0; i<mobile_user_agent.length; i++){
    if(navigator.userAgent.indexOf(mobile_user_agent[i])!=-1){
        mobile_bool=true;
    }
}
document.addEventListener('DOMContentLoaded',function(){
    const mobile_go = document.querySelector(".mobile_go");
    if(mobile_bool){
        mobile_go.style.display="block";
    }
    /*--------------------all_menu---------------------*/
    const all_menu = document.querySelector('header .gnb .menu_in'),
          but_on = document.querySelector('header .gnb .wrap li:first-child');
    let menu_display = function(e){
        e.preventDefault();
        if(all_menu.style.display=="block"){
            all_menu.style.display="none";
            but_on.classList.remove("on");
        } else {
            all_menu.style.display="block";
            but_on.classList.add("on");
        }
    }
    document.querySelector('header .gnb .wrap li:first-child a').addEventListener('click',menu_display,false);
    /*---------------------mini_solid------------------*/
    const slider = document.querySelectorAll('.slider .img_slider li');
    slider[0].classList.add('on');
    let mini_slider_time = 5000,
        mini_auto,
        slider_next = function(){
        if(slider.length<=1){
            return;
        }
        for(let i=0; i < slider.length; i++){
            if(slider[i].classList.contains('on')){
                slider[i].classList.remove('on');
                slider[i+1].classList.add('on');
                clearInterval(mini_auto);
                mini_auto = setInterval(slider_next,mini_slider_time);
                return;
            } else if (slider[slider.length-1].classList.contains('on')) {
                slider[slider.length-1].classList.remove('on');
                slider[0].classList.add('on');
                clearInterval(mini_auto);
                mini_auto = setInterval(slider_next,mini_slider_time);
            }
        }
    }
    let slider_prev = function(){
        if(slider.length<=1){
            return;
        }
        for(let i=0; i < slider.length; i++){
            if(i == 0 && slider[i].classList.contains('on')){
                slider[i].classList.remove('on');
                slider[slider.length-1].classList.add('on');
                clearInterval(mini_auto);
                mini_auto = setInterval(slider_next,mini_slider_time);
                return;
            } else if (slider[i].classList.contains('on')) {
                slider[i].classList.remove('on');
                slider[i-1].classList.add('on');
                clearInterval(mini_auto);
                mini_auto = setInterval(slider_next,mini_slider_time);
                return;
            }
        }
    }
    mini_auto = setInterval(slider_next,mini_slider_time);
    document.querySelectorAll('.slider .control a')[0].addEventListener('click',function(e){e.preventDefault();},false);
    document.querySelectorAll('.slider .control a')[1].addEventListener('click',function(e){e.preventDefault();},false);
    document.querySelectorAll('.slider .control a')[0].addEventListener('click',slider_prev,false);
    document.querySelectorAll('.slider .control a')[1].addEventListener('click',slider_next,false);
    /*------------------------mini_solid_touch_event--------------------------*/
    const mini_slider_touch1 = document.querySelector('header .head2 .slider');
    let mini_slider_touch1_X_now,
        mini_slider_touch1_X_history,
        mini_slider_touch_bool = false;
    mini_slider_touch1.addEventListener("touchstart",function(e){
        mini_slider_touch1_X_history = e.changedTouches[0].pageX;
        mini_slider_touch_bool=false;
    },{passive:true},false);
    mini_slider_touch1.addEventListener("touchmove",function(e){
        if(e.changedTouches.length!=1){
            mini_slider_touch_bool = true;
        }
    },{passive:true},false)
    mini_slider_touch1.addEventListener("touchend",function(e){
        if(mini_slider_touch_bool==true){
            return;
        }
        mini_slider_touch1_X_now = e.changedTouches[0].pageX;
        if(mini_slider_touch1_X_now+50<mini_slider_touch1_X_history){
            slider_next();
        } else if(mini_slider_touch1_X_now>mini_slider_touch1_X_history+50){
            slider_prev();
        }
    },false);
    /*------------------main_solid---------------------*/
    window.addEventListener('load',function(){
        const main_slider = document.getElementById('main_slider'),
              main_slider_child = main_slider.children,
              main_pager = document.getElementById('main_pager').children;
        let main_slider_Width=true;
        main_slider_child[0].style.left="0px";
        main_slider_child[0].style.display="block";
        let slider_on=0,
            slider_history=0,
            main_slider_child_width = main_slider_child[0].offsetWidth,
            main_next = function(){
                if(--main_slider_child.length==slider_on){
                    slider_history=slider_on;
                    setTimeout(function(){
                        main_slider_child[slider_history].style.left="";
                        main_slider_child[slider_history].style.display="none";
                    },500)
                    main_slider_child[slider_on=0].style.left= main_slider_child_width+"px";
                    main_slider_child[slider_on].style.display="block";
                    main_auto_if();
                    main_pager_reset();
                    main_pager[slider_on].classList.add('on');
                    setTimeout(function(){
                        main_slider_child[slider_history].style.left= (main_slider_child_width*-1)+"px";
                        main_slider_child[slider_on].style.left= 0+"px";
                    },20)
                    return;
                }
                slider_history=slider_on;
                setTimeout(function(){
                    main_slider_child[slider_history].style.display="none";
                    main_slider_child[slider_history].style.left="";
                },500)
                main_slider_child[++slider_on].style.left= main_slider_child_width+"px";
                main_slider_child[slider_on].style.display="block";
                main_auto_if();
                main_pager_reset();
                main_pager[slider_on].classList.add('on');
                setTimeout(function(){
                    main_slider_child[slider_history].style.left= (main_slider_child_width*-1)+"px";
                    main_slider_child[slider_on].style.left= 0+"px";
                },20)
            }
        let main_prev = function(){
            if(0==slider_on){
                slider_history=slider_on;
                setTimeout(function(){
                    main_slider_child[slider_history].style.left="";
                    main_slider_child[slider_history].style.display="none";
                },500)
                main_slider_child[slider_on=--main_slider_child.length].style.left= (main_slider_child_width*-1)+"px";
                main_slider_child[slider_on].style.display="block";
                main_auto_if();
                main_pager_reset();
                main_pager[slider_on].classList.add('on');
                setTimeout(function(){
                    main_slider_child[slider_history].style.left=main_slider_child_width+"px";
                    main_slider_child[slider_on].style.left= 0+"px";
                },20)
                return;
            }
            slider_history=slider_on;
            setTimeout(function(){
                main_slider_child[slider_history].style.display="none";
                main_slider_child[slider_history].style.left="";
            },500)
            main_slider_child[--slider_on].style.left= (main_slider_child_width*-1)+"px";
            main_slider_child[slider_on].style.display="block";
            main_auto_if();
            main_pager_reset();
            main_pager[slider_on].classList.add('on');
            setTimeout(function(){
                main_slider_child[slider_history].style.left= main_slider_child_width+"px";
                main_slider_child[slider_on].style.left= 0+"px";
            },20)
        }
        /*-------------------------main_solid_delay-------------------*/
        let delay_on = false,
            delay_time = 520,
            main_next_delay = function(){
                if(delay_on==false){
                    if(main_slider_child.length<=1){
                        return;
                    }
                    delay_on =true;
                    main_next();
                    setTimeout(function(){
                        delay_on=false;
                    },delay_time);
                }
            }
        let main_prev_delay = function(){
            if(main_slider_child.length<=1){
                return;
            }
            if(delay_on==false){
                delay_on =true;
                main_prev();
                setTimeout(function(){
                    delay_on=false;
                },delay_time);
            }
        }
        const main_prev_btn = document.querySelector('.main_control .main_prev'),
              main_next_btn = document.querySelector('.main_control .main_next');
        main_prev_btn.addEventListener("click",function(e){e.preventDefault();},false);
        main_next_btn.addEventListener("click",function(e){e.preventDefault();},false);
        main_prev_btn.addEventListener("click",main_prev_delay,false);
        main_next_btn.addEventListener("click",main_next_delay,false);
        /*-------------------main_player--------------------*/
        const main_player = document.getElementById('main_player').children;
        let slider_auto = true,
            slider_time = 5000,
            main_auto = setInterval(main_next_delay,slider_time);
        main_player[0].classList.add('on');
        main_player[0].addEventListener("click",function(e){
            e.preventDefault();
            if(main_player[0].classList.contains('on')==false){
                main_player[0].classList.add('on');
                main_player[1].classList.remove('on');
                main_auto = setInterval(main_next_delay,slider_time);
                slider_auto=true;
            }
        })
        main_player[1].addEventListener("click",function(e){
            e.preventDefault();
            if(main_player[1].classList.contains('on')==false){
                main_player[1].classList.add('on');
                main_player[0].classList.remove('on');
                clearInterval(main_auto);
                slider_auto=false;
            }
        })
        let main_auto_if = function(){
            if(slider_auto==true){   
                clearInterval(main_auto);
                main_auto = setInterval(main_next_delay,slider_time);
            }
        }
        /*------------------------main_slider_touch_event--------------------------*/
        let main_slider_touch1_X_now,
            main_slider_touch1_X_history,
            main_slider_touch_bool = false;
        main_slider.addEventListener("touchstart",function (e){
            main_slider_touch1_X_history = e.changedTouches[0].pageX;
            main_slider_touch_bool=false;
        },{passive:true},false);
        main_slider.addEventListener("touchmove",function(e){
            if(e.changedTouches.length!=1){
                main_slider_touch_bool = true;
            }
        },{passive:true},false)
        main_slider.addEventListener("touchend",function (e){
            if(main_slider_touch_bool==true){
                return;
            }
            main_slider_touch1_X_now = e.changedTouches[0].pageX;
            if(main_slider_touch1_X_now+100<main_slider_touch1_X_history){
                main_next_delay();
            } else if(main_slider_touch1_X_now>main_slider_touch1_X_history+100){
                main_prev_delay();
            }
        },false);
        /*--------------------------main_pager--------------------------*/
        main_pager[0].classList.add('on');
        let main_pager_reset = function(){
            for(let a=0; a<main_pager.length; a++){
                if(main_pager[a].classList.contains('on')){
                    main_pager[a].classList.remove('on');
                }
            }
        }
        for(let i=0; i<main_pager.length; i++){
            (function(i){
                main_pager[i].addEventListener('click',function(e){
                    e.preventDefault();
                    let event_peger = function(){
                        if(slider_on==i){
                            return;
                        }
                        main_pager_reset()
                        main_pager[i].classList.add('on');
                        slider_history=slider_on;
                        slider_on=i;
                        if(slider_on<slider_history){
                            setTimeout(function(){
                                main_slider_child[slider_history].style.display="none";
                                main_slider_child[slider_history].style.left="";
                            },500)
                            main_slider_child[slider_on].style.left= (main_slider_child_width*-1)+"px";
                            main_slider_child[slider_on].style.display="block";
                            main_auto_if();
                            main_pager_reset();
                            main_pager[slider_on].classList.add('on');
                            setTimeout(function(){
                                main_slider_child[slider_history].style.left= main_slider_child_width+"px";
                                main_slider_child[slider_on].style.left= 0+"px";
                            },20)
                        } else {
                            setTimeout(function(){
                                main_slider_child[slider_history].style.display="none";
                                main_slider_child[slider_history].style.left="";
                            },500)
                            main_slider_child[slider_on].style.left= main_slider_child_width+"px";
                            main_slider_child[slider_on].style.display="block";
                            main_auto_if();
                            main_pager_reset();
                            main_pager[slider_on].classList.add('on');
                            setTimeout(function(){
                                main_slider_child[slider_history].style.left= (main_slider_child_width*-1)+"px";
                                main_slider_child[slider_on].style.left= 0+"px";
                            },20)
                        }
                    }
                    if(delay_on==false){
                        if(main_slider_child.length<=1){
                            return;
                        }
                        delay_on =true;
                        event_peger();
                        setTimeout(function(){
                            delay_on=false;
                        },delay_time);
                    }
                },false);
            }(i));
        }
    },false);
    /*-------------------------stuff_solid------------------------*/
    let stuff_solid_function = function(stuff_solid_node,stuff_solid_touch_node,stuff_solid_prev,stuff_solid_next){
        const stuff_solid = document.querySelectorAll(stuff_solid_node);
        stuff_solid[0].style.left="0px";
        stuff_solid[0].style.display="block";
        let stuff_solid_on = 0,
            stuff_solid_history=0,
            max_sutff_solid_move= stuff_solid[0].offsetWidth,
            sutff_solid_next = function(){
            if(--stuff_solid.length==stuff_solid_on){
                stuff_solid_history=stuff_solid_on;
                setTimeout(function(){
                    stuff_solid[stuff_solid_history].style.left="";
                    stuff_solid[stuff_solid_history].style.display="none";
                },500)
                stuff_solid[stuff_solid_on=0].style.left= max_sutff_solid_move+"px";
                stuff_solid[stuff_solid_on].style.display="block";
                setTimeout(function(){
                    stuff_solid[stuff_solid_history].style.left= (max_sutff_solid_move*-1)+"px";
                    stuff_solid[stuff_solid_on].style.left= 0+"px";
                },20)
                return;
            }
            stuff_solid_history=stuff_solid_on;
            setTimeout(function(){
                stuff_solid[stuff_solid_history].style.left="";
                stuff_solid[stuff_solid_history].style.display="none";
            },500)
            stuff_solid[++stuff_solid_on].style.left= max_sutff_solid_move+"px";
            stuff_solid[stuff_solid_on].style.display="block";
            setTimeout(function(){
                stuff_solid[stuff_solid_history].style.left= (max_sutff_solid_move*-1)+"px";
                stuff_solid[stuff_solid_on].style.left= 0+"px";
            },20)
        }
        let sutff_solid_prev = function(){
            if(0==stuff_solid_on){
                stuff_solid_history=stuff_solid_on;
                setTimeout(function(){
                    stuff_solid[stuff_solid_history].style.left="";
                    stuff_solid[stuff_solid_history].style.display="none";
                },500)
                stuff_solid[stuff_solid_on=--stuff_solid.length].style.left= (max_sutff_solid_move*-1)+"px";
                stuff_solid[stuff_solid_on].style.display="block";
                setTimeout(function(){
                    stuff_solid[stuff_solid_history].style.left= max_sutff_solid_move+"px";
                    stuff_solid[stuff_solid_on].style.left= 0+"px";
                },20)
                return;
            }
            stuff_solid_history=stuff_solid_on;
            setTimeout(function(){
                stuff_solid[stuff_solid_history].style.left="";
                stuff_solid[stuff_solid_history].style.display="none";
            },500)
            stuff_solid[--stuff_solid_on].style.left= (max_sutff_solid_move*-1)+"px";
            stuff_solid[stuff_solid_on].style.display="block";
            setTimeout(function(){
                stuff_solid[stuff_solid_history].style.left= max_sutff_solid_move+"px";
                stuff_solid[stuff_solid_on].style.left= 0+"px";
            },20)
        }
        /*--------------------sutff_solid_delay---------------------*/
        let sutff_solid_delay=false,
            sutff_solid_delay_time=520,
            sutff_solid_auto_time=10000,
            sutff_solid_next_delay = function(){
            if(stuff_solid.length<=1){
                return;
            }
            if(sutff_solid_delay==false){
                sutff_solid_delay =true;
                clearInterval(sutff_solid_auto);
                sutff_solid_auto = setInterval(sutff_solid_next_delay,sutff_solid_auto_time);
                sutff_solid_next();
                setTimeout(function(){
                sutff_solid_delay=false;
                },sutff_solid_delay_time);
            }
        }
        let sutff_solid_prev_delay = function(){
            if(stuff_solid.length<=1){
                return;
            }
            if(sutff_solid_delay==false){
                sutff_solid_delay =true;
                clearInterval(sutff_solid_auto);
                sutff_solid_auto = setInterval(sutff_solid_next_delay,sutff_solid_auto_time);
                sutff_solid_prev();
                setTimeout(function(){
                sutff_solid_delay=false;
                },sutff_solid_delay_time);
            }
        }
        document.querySelector(stuff_solid_prev).addEventListener("click",function(e){e.preventDefault();},false);
        document.querySelector(stuff_solid_next).addEventListener("click",function(e){e.preventDefault();},false);
        document.querySelector(stuff_solid_prev).addEventListener("click",sutff_solid_prev_delay,false);
        document.querySelector(stuff_solid_next).addEventListener("click",sutff_solid_next_delay,false);
        /*------------------------stuff_solid_touch_event--------------------------*/
        const stuff_solid_touch = document.querySelector(stuff_solid_touch_node);
        let stuff_solid_touch_X_now,
            stuff_solid_touch_X_history,
            stuff_solid_touch_bool = false;
        stuff_solid_touch.addEventListener("touchstart",function (e){
            stuff_solid_touch_X_history = e.changedTouches[0].pageX;
            stuff_solid_touch_bool=false;
        },{passive:true},false);
        stuff_solid_touch.addEventListener("touchmove",function(e){
            if(e.changedTouches.length!=1){
                stuff_solid_touch_bool = true;
            }
        },{passive:true},false)
        stuff_solid_touch.addEventListener("touchend",function (e){
            if(stuff_solid_touch_bool==true){
                return;
            }
            stuff_solid_touch_X_now = e.changedTouches[0].pageX;
            if(stuff_solid_touch_X_now+100<stuff_solid_touch_X_history){
                sutff_solid_next_delay();
            } else if(stuff_solid_touch_X_now>stuff_solid_touch_X_history+100){
                sutff_solid_prev_delay();
            }
        },false);
        /*--------------------sutff_solid_auto----------------------*/
        let sutff_solid_auto = setInterval(sutff_solid_next_delay,sutff_solid_auto_time);
    }
    stuff_solid_function('.stuff .new_stuff .overflow>div','.stuff .new_stuff .overflow','.stuff .new_stuff .new_stuff_control a.prev','.stuff .new_stuff .new_stuff_control a.next');
    stuff_solid_function('.stuff .best_stuff .overflow>div','.stuff .best_stuff .overflow','.stuff .best_stuff .best_stuff_control a.prev','.stuff .best_stuff .best_stuff_control a.next');
    stuff_solid_function('.stuff .sale_stuff .overflow>div','.stuff .sale_stuff .overflow','.stuff .sale_stuff .sale_stuff_control a.prev','.stuff .sale_stuff .sale_stuff_control a.next');
},false);