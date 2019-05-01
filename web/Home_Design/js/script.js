document.addEventListener('DOMContentLoaded',function(){
    const all_menu_btn = document.querySelector('header .all_menu'),
          all_menu_in = document.querySelector('header .all_menu_in'),
          all_menu_overflow = all_menu_in.querySelector('.overflow'),
          all_menu_close = document.querySelector('header .all_menu_in .all_menu_close'),
          gnb_in_btn = document.querySelectorAll('header .all_menu_in .gnb>ul>li:not(:first-child)>a'),
          gnb_in = document.querySelectorAll('header .all_menu_in .gnb>ul>li .gnb_in'),
          search_btn = document.querySelector('header>.wrap .header_utill2 li.search_btn a'),
          search_box = document.querySelector('header>.wrap .search_box'),
          body_ele = document.body,
          header_ele = document.querySelector('header');
    let all_menu_bool = false,
        gnb_in_bool = false,
        window_widht = innerWidth,
        all_menu_in_widht,
        fixed_bool,
        reset_bool,
        all_menu_evetn = function(){
            all_menu_in_widht = all_menu_overflow.clientWidth;
            all_menu_close.style.left=all_menu_in_widht+"px";
        },
        mobile_reset = function(){
            if(!reset_bool){
                return;
            }
            reset_bool=false;
            body_ele.style.overflow="";
            all_menu_in.style.opacity="";
            all_menu_overflow.style.transform="";
            all_menu_in.style.display="";
            all_menu_close.style.left="";
            all_menu_close.style.transition='';
            search_box.style.transition='';
            search_btn.classList.remove('on');
            search_box.style.top='';
            window.removeEventListener('resize',all_menu_evetn,false);
            for(let i=0; i<gnb_in_btn.length; i++){
                gnb_in[i].style.height='';
                gnb_in[i].style.display="";
                gnb_in_btn[i].classList.remove('on')
            }
        }
    let search_btn_bool = true;
    search_btn.addEventListener('click',function(e){
        e.preventDefault();
        if(!search_btn_bool){
            return;
        }
        search_btn_bool=false;
        if(search_btn.classList.contains('on')){
            search_btn.classList.remove('on');
            search_box.style.top='';
            setTimeout(function(){
                search_box.style.transition='';
                search_btn_bool=true;
            },500);
        }else{
            search_btn.classList.add('on');
            search_box.style.top='50px';
            search_box.style.transition='all 0.5s';
            setTimeout(function(){
                search_btn_bool=true;
            },500)
        }
    },false)
    all_menu_btn.addEventListener('click',function(e){
        e.preventDefault();
        if(all_menu_bool){
            return;
        }
        all_menu_bool=true;
        body_ele.style.overflow="hidden";
        all_menu_in.style.display="block";
        setTimeout(function(){
            all_menu_in_widht = all_menu_overflow.clientWidth
            all_menu_in.style.opacity="1";
            all_menu_overflow.style.transform="translateX(0)";
            all_menu_close.style.left=all_menu_in_widht+"px";
            window.addEventListener('resize',all_menu_evetn,false);
        },20);
        setTimeout(function(){
            all_menu_close.style.transition='none';
            all_menu_bool = false;
        },520);
    },false)
    all_menu_close.addEventListener('click',function(e){
        e.preventDefault();
        if(all_menu_bool){
            return;
        }
        all_menu_bool=true;
        all_menu_close.style.transition='';
        body_ele.style.overflow="";
        all_menu_in.style.opacity="";
        all_menu_overflow.style.transform="";
        all_menu_close.style.left="";
        setTimeout(function(){
            window.removeEventListener('resize',all_menu_evetn,false);
            for(let i=0; i<gnb_in_btn.length; i++){
                gnb_in[i].style.height='';
            }
            all_menu_in.style.display="";
            all_menu_bool = false;
        },520);
    },false)
    for(let i=0; i<gnb_in_btn.length; i++){
        (function(i){
            gnb_in_btn[i].addEventListener('click',function(e){
                e.preventDefault();
                if(gnb_in_bool){
                    return;
                }
                gnb_in_bool=true;
                let gnb_in_li_length = gnb_in_btn[i].parentElement.querySelectorAll('.gnb_in li').length;
                if(gnb_in_btn[i].classList.contains('on')){
                    gnb_in[i].style.height='';
                    gnb_in_btn[i].classList.remove('on');
                    setTimeout(function(){
                        gnb_in[i].style.display="";
                        gnb_in_bool=false;
                    },520);
                }else{
                    for(let m=0; m<gnb_in_btn.length; m++){
                        if(gnb_in_btn[m].classList.contains('on')){
                            gnb_in_btn[m].classList.remove('on');
                            gnb_in[m].style.height='';
                            setTimeout(function(){
                                gnb_in[m].style.display="";
                            },520);
                        }
                    }
                    gnb_in_btn[i].classList.add('on');
                    gnb_in[i].style.display="block";
                    setTimeout(function(){
                        gnb_in[i].style.height=(50*gnb_in_li_length)+'px';
                    },20)
                    setTimeout(function(){
                        gnb_in_bool=false;
                    },520)
                }
            },false)
        })(i);
    }
    if(window_widht>=1000){
        fixed_bool=false;
        reset_bool=false;
    }else{
        fixed_bool=true;
        reset_bool=true;
    }
    window.addEventListener('resize',function(){
        window_widht=innerWidth;
        if(window_widht>=1000){
            mobile_reset();
            fixed_bool=false;
            if(header_ele.classList.contains('fixed')){
                header_ele.classList.remove('fixed');
                body_ele.style.marginTop='';
            }
        }else{
            fixed_bool=true;
            reset_bool=true;
            if(!header_ele.classList.contains('fixed')){
                header_ele.classList.add('fixed');
                body_ele.style.marginTop=header_ele.offsetHeight+'px';
            }
        }
    },false)
    let header_offsettop = header_ele.offsetTop;
    window.addEventListener('scroll',function(e){
        if(window.scrollY>header_offsettop&&fixed_bool){
            header_ele.classList.add('fixed');
            body_ele.style.marginTop=header_ele.offsetHeight+'px';
        }else{
            header_ele.classList.remove('fixed');
            body_ele.style.marginTop='';
        }
    })
    /*-----------------------slider------------------------*/
    const slider = document.querySelector('.slider .slider_img'),
          slider_li = slider.querySelectorAll('li'),
          slider_pager = document.querySelector('.slider .slider_pager');
    let slider_width=0,
        slider_pager_html="",
        slider_li_copy=[],
        slider_li_width;
    if(innerWidth<=980){
        slider_li_width = body_ele.clientWidth;
    }else{
        slider_li_width = 980;
    }
    for(let i=0; i<slider_li.length*2; i++){
        slider_li_copy[i] = document.createElement('li');
        if(i>=slider_li.length){
            slider_li_copy[i].innerHTML = slider_li[i-slider_li.length].innerHTML;
        }else{
            slider_li_copy[i].innerHTML = slider_li[i].innerHTML;
            
        }
        slider.appendChild(slider_li_copy[i]);
        slider_li_copy[i].style.width = slider_li_width+"px";
    }
    for(let i=0; i<slider_li.length; i++){
        slider_li[i].style.width=slider_li_width+"px";
        slider_pager_html+='<li><a href="#">'+(i+1)+'</a></li>'
    }
    slider_width = slider_li_width*(slider_li.length*3);
    slider.style.width=slider_width+"px";
    slider_pager.innerHTML=slider_pager_html;
    slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
    window.addEventListener('resize',function(){
        if(innerWidth<=980){
            slider_li_width = body_ele.clientWidth;
        }else{
            slider_li_width = 980;
        }
        slider_width=0;
        slider_width = slider_li_width*(slider_li.length*3);
        for(let i=0; i<slider_li.length; i++){
            slider_li[i].style.width=slider_li_width+"px";
        }
        for(let i=0; i<slider_li_copy.length; i++){
            slider_li_copy[i].style.width = slider_li_width+"px";
        }
        slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
        slider.style.width=slider_width+"px";
        if(all_menu_in.style.display!="block"){
            body_ele.style.overflow="";
        }
    },false);
    const slider_pager_li = document.querySelectorAll('.slider .slider_pager li');
    slider_pager_li[0].classList.add('on');
    /*--------------------slider_next_prev-------------------*/
    let new_slider_li = slider.querySelectorAll('li'),
        slider_delay = false,
        slider_num = 0,
        slider_next = function(){
            if(slider_delay){
                return;
            }
            slider_pager_li[slider_num].classList.remove('on');
            slider_num++;
            if(slider_num>slider_li.length-1){
                slider_num=0;
            }
            slider_pager_li[slider_num].classList.add('on');
            slider_delay=true;
            slider.style.transition = "all 0.5s";
            slider.style.transform = "translateX("+-slider_li_width*(slider_li.length+1)+"px)";
            setTimeout(function(){
                slider.style.transition = "";
                slider.insertBefore(new_slider_li[0],new_slider_li[new_slider_li.length]);
                slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                new_slider_li = slider.querySelectorAll('li');
                slider_delay=false;
            },500);
        },
        slider_prev = function(){
            if(slider_delay){
                return;
            }
            slider_pager_li[slider_num].classList.remove('on');
            slider_num--;
            if(slider_num<0){
                slider_num=slider_li.length-1;
            }
            slider_pager_li[slider_num].classList.add('on');
            slider_delay=true;
            slider.style.transition = "all 0.5s";
            slider.style.transform = "translateX("+-slider_li_width*(slider_li.length-1)+"px)";
            setTimeout(function(){
                slider.style.transition = "";
                slider.insertBefore(new_slider_li[new_slider_li.length-1],new_slider_li[0]);
                slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                new_slider_li = slider.querySelectorAll('li');
                slider_delay=false;
            },500);
        },
        slider_cancel = function(){
            if(slider_delay){
                return;
            }
            slider_delay=true;
            slider.style.transition = "all 0.5s";
            slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
            setTimeout(function(){
                slider.style.transition = "";
                slider_delay=false;
            },500);
        }
    /*-----------------slider_btn------------------*/
    const slider_btn = document.querySelector('.slider .slider_btn'),
          slider_btn_next = slider_btn.querySelector('.next_btn'),
          slider_btn_prev = slider_btn.querySelector('.prev_btn'),
          slider_auto_time = 10000;
    slider_btn_next.addEventListener('click',function(e){
        e.preventDefault();
        clearInterval(slider_auto);
        slider_auto = setInterval(slider_next,slider_auto_time);
        slider_next();
    },false)
    slider_btn_prev.addEventListener('click',function(e){
        e.preventDefault();
        clearInterval(slider_auto);
        slider_auto = setInterval(slider_next,slider_auto_time);
        slider_prev();
    },false)
    slider_btn_next.addEventListener('dragstart',function(e){
        e.preventDefault();
    })
    slider_btn_prev.addEventListener('dragstart',function(e){
        e.preventDefault();
    })
    /*-----------------slider_pager--------------*/
    for(let i=0; i<slider_pager_li.length; i++){
        (function(i){
            slider_pager_li[i].addEventListener('dragstart',function(e){
                e.preventDefault();
            })
            slider_pager_li[i].addEventListener('click',function(e){
                e.preventDefault();
                clearInterval(slider_auto);
                slider_auto = setInterval(slider_next,slider_auto_time);
                if(slider_delay||slider_num==i){
                    return;
                }
                slider_pager_li[slider_num].classList.remove('on');
                let slider_history = slider_num;
                slider_num=i;
                slider_pager_li[slider_num].classList.add('on');
                let slider_calc = slider_num-slider_history,
                    slider_calc_2 = Math.abs(slider_calc);
                slider_delay=true;
                slider.style.transition = "all 0.5s";
                if(slider_num<slider_history){
                    slider.style.transform = "translateX("+-slider_li_width*(slider_li.length-slider_calc_2)+"px)";
                }
                if(slider_num>slider_history){
                    slider.style.transform = "translateX("+-slider_li_width*(slider_li.length+slider_calc)+"px)";
                }
                setTimeout(function(){
                    slider.style.transition = "";
                    if(slider_num<slider_history){
                        for(let m=slider_calc; m<0; m++){
                            slider.insertBefore(new_slider_li[new_slider_li.length+m],new_slider_li[0]);
                        }
                    }
                    if(slider_num>slider_history){
                        for(let m=0; m<slider_calc; m++){
                            slider.insertBefore(new_slider_li[0+m],new_slider_li[new_slider_li.length]);
                        }
                    }
                    slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                    new_slider_li = slider.querySelectorAll('li');
                    slider_delay=false;
                },500);
            },false);
        })(i);
    }
    /*-----------------slider_touch------------------*/
    let slider_pointer_x,
        slider_pointer_x_now,
        slider_auto = setInterval(slider_next,slider_auto_time),
        slider_auto_bool = true;
    slider.addEventListener("touchstart",function(e){
        slider_pointer_x=e.targetTouches[0].clientX;
        if(slider_auto_bool){
            clearInterval(slider_auto);
            slider_auto_bool=false;
        }
    },{passive:true},false);
    slider.addEventListener("touchmove",function(e){
        slider_pointer_x_now=e.targetTouches[0].clientX;
        let slider_calc_1 = -slider_li_width*slider_li.length;
        let slider_calc_2 = slider_pointer_x-slider_pointer_x_now;
        slider.style.transform ="translateX("+(slider_calc_1-slider_calc_2)+"px)";
    },{passive:true},false);
    slider.addEventListener("touchend",function(e){
        if(!slider_auto_bool){
            slider_auto = setInterval(slider_next,slider_auto_time);
            slider_auto_bool=true;
        }
        if(slider_pointer_x_now){
            if(slider_pointer_x+60<slider_pointer_x_now){
                slider_prev();
                slider_pointer_x_now=null;
                return;
            }
            if(slider_pointer_x>slider_pointer_x_now+60){
                slider_next();
                slider_pointer_x_now=null;
                return;
            }
        }
        slider_cancel();
    },false);
    /*------------------slider_mouse--------------------*/
    let pointer_on = function(){
        slider_btn.style.pointerEvents="";
        slider_pager.style.pointerEvents="";
    },
        pointer_off = function(){
            slider_btn.style.pointerEvents="none";
            slider_pager.style.pointerEvents="none";
        },
        mouse_down_bool = false,
        mouse_drag_bool = false;
    slider.addEventListener("dragstart",function(e){
        mouse_drag_bool=true;
        pointer_off();
        e.preventDefault();
    })
    slider.addEventListener("click",function(e){
        if(mouse_drag_bool){
            mouse_drag_bool=false;
            e.preventDefault();
        }
    })
    slider.addEventListener("mousedown",function(e){
        mouse_down_bool=true;
        slider_pointer_x=e.clientX;
        if(slider_auto_bool){
            clearInterval(slider_auto);
            slider_auto_bool=false;
        }
    },false);
    slider.addEventListener("mousemove",function(e){
        if(mouse_down_bool){
            slider_pointer_x_now=e.clientX;
            let slider_calc_1 = -slider_li_width*slider_li.length;
            let slider_calc_2 = slider_pointer_x-slider_pointer_x_now;
            slider.style.transform ="translateX("+(slider_calc_1-slider_calc_2)+"px)";
        }
    },false);
    let mouse_end = function(e){
        pointer_on();
        mouse_down_bool=false;
        if(!slider_auto_bool){
            slider_auto = setInterval(slider_next,slider_auto_time);
            slider_auto_bool=true;
        }
        if(slider_pointer_x_now){
            if(slider_pointer_x+60<slider_pointer_x_now){
                e.preventDefault();
                slider_prev();
                slider_pointer_x_now=null;
                return;
            }
            if(slider_pointer_x>slider_pointer_x_now+60){
                e.preventDefault();
                slider_next();
                slider_pointer_x_now=null;
                return;
            }
        }
        if(mouse_drag_bool){
            slider_cancel();
        }
    }
    slider.addEventListener("mouseout",mouse_end,false);
    slider.addEventListener("mouseup",mouse_end,false);
    /*--------------item_list-----------------------------*/
    const item_btn = document.querySelectorAll('.item_list .item_btn li'),
          item_on_list = document.querySelectorAll('.item_list .item_on>li');
    let item_on_num = 0;
    for(let i=0; i<item_btn.length; i++){
        (function(i){
            item_btn[i].addEventListener('click',function(e){
                e.preventDefault();
                item_btn[item_on_num].classList.remove('on');
                item_on_list[item_on_num].classList.remove('on');
                item_on_num=i;
                item_btn[i].classList.add('on');
                item_on_list[i].classList.add('on');
            },false);
        }(i));
    }
})