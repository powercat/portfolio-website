document.addEventListener('DOMContentLoaded',function(){
    const background_video = document.getElementById('background_video'),
          header_ele = document.querySelector('header'),
          bottom_menu = document.querySelector('.fixed .bottom_menu'),
          introduction = document.querySelector('.introduction'),
          all_menu_btn =document.querySelector('header .rgba_background .all_menu'),
          all_menu_in_ele = document.querySelector('header .rgba_background .all_menu_in'),
          menu_in_a_btn = all_menu_in_ele.querySelectorAll('.menu_name li .menu_in_a'),
          menu_in_a_click = all_menu_in_ele.querySelectorAll('.menu_name li h5'),
          animation_stop = document.querySelector('header .rgba_background .animation'),
          body_ele =document.body;
    let top_scroll_bool = true,
        menu_in_a_height = [],
        all_menu_btn_delay = false;
    /*--------------------all_menu_btn_event--------------------*/
    all_menu_btn.addEventListener('click',function(e){
        e.preventDefault();
        if(all_menu_btn_delay){
            return;
        }
        all_menu_btn_delay=true;
        setTimeout(function(){
            all_menu_btn_delay=false;
        },530);
        if(this.classList.contains('on')){
            this.classList.remove('on');
            body_ele.style.overflow="";
            all_menu_in_ele.style.opacity="";
            setTimeout(function(){
                all_menu_in_ele.style.display="none";
                all_menu_btn_delay=false;
            },500);
        }else{
            this.classList.add('on');
            all_menu_in_ele.style.display=""
            setTimeout(function(){
                body_ele.style.overflow="hidden";
                all_menu_in_ele.style.opacity=1;
            },30);
        }
    },false);
    /*-------------------resize_fuction---------------------*/
    let background_video_resize = function(){
        let bottom_menu_height = innerHeight-bottom_menu.offsetHeight;
        header_ele.style.height = bottom_menu_height+"px";
        background_video.style.height = "";
        background_video.style.width = "";
        if(bottom_menu_height>innerWidth){
            if(background_video.offsetWidth < innerWidth){
                background_video.style.height = "100%";
                background_video.style.width = "auto";
            }
        }
        if(bottom_menu_height<innerWidth){
            if(background_video.offsetHeight < bottom_menu_height){
                background_video.style.height = "100%";
                background_video.style.width = "auto";
            }
        }
    }
    /*---------------------scroll_animation---------------------------*/
    let scroll_move_introduction = function(bool){
        let scrollY_move;
        if(bool){
            scrollY_move = scrollY+2;
        }else{
            scrollY_move = scrollY+15;
        }
        if(scrollY_move<introduction.offsetTop){
            top_scroll_bool=false;
            body_ele.style.overflow="hidden"
            scrollTo(0,scrollY_move);
            requestAnimationFrame(function(){scroll_move_introduction(bool)});
        }else{
            scrollTo(0,introduction.offsetTop);
            setTimeout(function(){
                body_ele.style.overflow=""
                top_scroll_bool=true;
            },20);
        }
    }
    let scroll_move_header_ele = function(bool){
        let scrollY_move;
        if(bool){
            scrollY_move = scrollY-2;
        }else{
            scrollY_move = scrollY-15;
        }
        if(scrollY_move>header_ele.offsetTop){
            top_scroll_bool=false;
            body_ele.style.overflow="hidden"
            scrollTo(0,scrollY_move);
            requestAnimationFrame(function(){scroll_move_header_ele(bool)});
        }else{
            scrollTo(0,header_ele.offsetTop);
            setTimeout(function(){
                body_ele.style.overflow=""
                top_scroll_bool=true;
            },20);
        }
    }
    /*-------------------setup-------------------------*/
    window.addEventListener('load',function(){
        background_video_resize();
        for(let i=0; i<menu_in_a_btn.length; i++){
            menu_in_a_height[i]=menu_in_a_btn[i].clientHeight+"px";
            menu_in_a_btn[i].style.height = "0px";
        }
        for(let i=0; i<menu_in_a_click.length; i++){
            menu_in_a_click[i].addEventListener('click',function(){
                if(menu_in_a_btn[i].classList.contains('on')){
                    menu_in_a_btn[i].classList.remove('on');
                    menu_in_a_btn[i].style.height = "0px";
                    this.classList.remove('on');
                }else{
                    menu_in_a_btn[i].classList.add('on');
                    menu_in_a_btn[i].style.height = menu_in_a_height[i];
                    this.classList.add('on');
                }
            },false);
        }
        all_menu_in_ele.style.display="none";
    },false)
    window.addEventListener("resize",background_video_resize,false)
    header_ele.addEventListener('wheel',function(e){
        e.preventDefault();
        if(e.deltaY>0&&top_scroll_bool&&top_scroll_bool&&!all_menu_btn.classList.contains('on')){
            scroll_move_introduction(false);
        }
    },false);
    /*--------------------scroll_touch_event----------------*/
    let touch_y,
        touch_y_now,
        touch_y_start,
        touch_bool=false;
    header_ele.addEventListener("touchstart",function(e){
        if(!all_menu_btn.classList.contains('on')){
            touch_bool=true;
            touch_y=e.targetTouches[0].pageY;
            touch_y_start=e.targetTouches[0].clientY
        }
    },{passive:true},false);
    header_ele.addEventListener("touchmove",function(e){
        touch_y_now=e.targetTouches[0].clientY;
        if(top_scroll_bool&&!all_menu_btn.classList.contains('on')){
            scrollTo(0,touch_y-touch_y_now);
        }
    },{passive:true},false);
    header_ele.addEventListener("touchend",function(e){
        if(all_menu_btn.classList.contains('on')){
           return; 
        }
        if(top_scroll_bool&&touch_y_now){
            if(touch_y_start>touch_y_now+60){
                scroll_move_introduction(false);
            }else{
                scroll_move_header_ele(true);
            }
            touch_y_now=null;
        }
        touch_bool=false;
    },false);
    introduction.addEventListener('wheel',function(e){
        body_ele.style.overflow=""
        if(introduction.offsetTop>scrollY&&!top_scroll_bool){
            e.preventDefault();
        }
        if(e.deltaY<0&&introduction.offsetTop>=scrollY&&top_scroll_bool){
            scroll_move_header_ele(false);
        }
    },false);
    let touch_cancel = false;
    introduction.addEventListener("touchstart",function(e){
        let slider_html = document.querySelector('.introduction .slider').innerHTML;
        if(slider_html.indexOf(e.targetTouches[0].target.outerHTML)!=-1){
            touch_cancel = true;
            return;
        }
        body_ele.style.overflow=""
        touch_y=e.targetTouches[0].pageY;
        touch_y_start=e.targetTouches[0].clientY;
        if(introduction.offsetTop==scrollY){
            this.classList.add("not_touch");
        }
    },{passive:true},false);
    introduction.addEventListener("touchmove",function(e){
        if(touch_cancel){
            return;
        }
        touch_y_now=e.targetTouches[0].clientY;
        if(this.classList.contains("not_touch")&&top_scroll_bool){
            scrollTo(0,touch_y-touch_y_now);
        }
    },{passive:true},false);
    introduction.addEventListener("touchend",function(e){
        if(touch_cancel){
            touch_cancel=false;
            return;
        }
        this.classList.remove("not_touch");
        if(top_scroll_bool&&touch_y_now){
            if(this.offsetTop>=scrollY){   
                if(touch_y_start+60>touch_y_now){
                    scroll_move_introduction(true);
                }else{
                    scroll_move_header_ele(false);
                }
            }
            touch_y_now=null;
        }
    },false);
    /*-----------------------scroll_event--------------------*/
    window.addEventListener('scroll',function(){
        if(introduction.offsetTop>scrollY){
            animation_stop.classList.remove('stop');
        }else{
            animation_stop.classList.add('stop');
        }
        if(introduction.classList.contains("not_touch")||touch_bool){
            return;
        }else{
            if(introduction.offsetTop>scrollY&&top_scroll_bool){
                body_ele.style.overflow="hidden"
                scrollTo(0,introduction.offsetTop);
            }
        }
    },false);
    /*------------------slider-----------------*/
    const slider = document.querySelector('.introduction .slider .slider_img'),
          slider_li = slider.querySelectorAll('li'),
          slider_pager = document.querySelector('.introduction .slider .slider_pager');
    let slider_width=0,
        slider_pager_html="",
        slider_li_copy=[];
    for(let i=0; i<slider_li.length*2; i++){
        slider_li_copy[i] = document.createElement('li');
        if(i>=slider_li.length){
            slider_li_copy[i].innerHTML = slider_li[i-slider_li.length].innerHTML;
        }else{
            slider_li_copy[i].innerHTML = slider_li[i].innerHTML;
            
        }
        slider.appendChild(slider_li_copy[i]);
        slider_li_copy[i].style.width = innerWidth+"px";
    }
    for(let i=0; i<slider_li.length; i++){
        slider_li[i].style.width=innerWidth+"px";
        slider_pager_html+='<li><a href="#">'+(i+1)+'</a></li>'
    }
    slider_width = innerWidth*(slider_li.length*3);
    slider.style.width=slider_width+"px";
    slider_pager.innerHTML=slider_pager_html;
    slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
    window.addEventListener('resize',function(){
        slider_width=0;
        slider_width = innerWidth*(slider_li.length*3);
        for(let i=0; i<slider_li.length; i++){
            slider_li[i].style.width=innerWidth+"px";
        }
        for(let i=0; i<slider_li_copy.length; i++){
            slider_li_copy[i].style.width = innerWidth+"px";
        }
        slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
        slider.style.width=slider_width+"px";
    },false);
    const slider_pager_li = document.querySelectorAll('.introduction .slider .slider_pager li');
    slider_pager_li[0].classList.add('on');
    /*--------------------slider_next_prev-------------------*/
    let new_slider_li = slider.querySelectorAll('li'),
        slider_delay = false,
        slider_num = 0;
    let slider_next = function(){
        if(slider_delay){
            return
        }
        slider_pager_li[slider_num].classList.remove('on');
        slider_num++;
        if(slider_num>slider_li.length-1){
            slider_num=0;
        }
        slider_pager_li[slider_num].classList.add('on');
        slider_delay=true;
        slider.style.transition = "all 0.5s";
        slider.style.transform = "translateX("+-innerWidth*(slider_li.length+1)+"px)";
        setTimeout(function(){
            slider.style.transition = "";
            slider.insertBefore(new_slider_li[0],new_slider_li[new_slider_li.length]);
            slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
            new_slider_li = slider.querySelectorAll('li');
            slider_delay=false;
        },500);
    }
    let slider_prev = function(){
        if(slider_delay){
            return
        }
        slider_pager_li[slider_num].classList.remove('on');
        slider_num--;
        if(slider_num<0){
            slider_num=slider_li.length-1;
        }
        slider_pager_li[slider_num].classList.add('on');
        slider_delay=true;
        slider.style.transition = "all 0.5s";
        slider.style.transform = "translateX("+-innerWidth*(slider_li.length-1)+"px)";
        setTimeout(function(){
            slider.style.transition = "";
            slider.insertBefore(new_slider_li[new_slider_li.length-1],new_slider_li[0]);
            slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
            new_slider_li = slider.querySelectorAll('li');
            slider_delay=false;
        },500);
    }
    /*-----------------slider_touch------------------*/
    let slider_pointer_x,
        slider_pointer_x_now,
        slider_auto = setInterval(slider_next,5000),
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
        let slider_calc_1 = -innerWidth*slider_li.length;
        let slider_calc_2 = slider_pointer_x-slider_pointer_x_now;
        slider.style.transform ="translateX("+(slider_calc_1-slider_calc_2)+"px)";
    },{passive:true},false);
    slider.addEventListener("touchend",function(e){
        if(!slider_auto_bool){
            slider_auto = setInterval(slider_next,5000);
            slider_auto_bool=true;
        }
        if(slider_pointer_x_now){
            if(slider_pointer_x+60<slider_pointer_x_now){
                slider_prev();
            }
            if(slider_pointer_x>slider_pointer_x_now+60){
                slider_next();
            }
            slider_pointer_x_now=null;
        }
        if(slider_delay){
            return;
        }
        slider_delay=true;
        slider.style.transition = "all 0.5s";
        slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
        setTimeout(function(){
            slider.style.transition = "";
            slider_delay=false;
        },500);
    },false);
    /*-----------------slier_pager--------------*/
    for(let i=0; i<slider_pager_li.length; i++){
        slider_pager_li[i].addEventListener('click',function(e){
            e.preventDefault();
            clearInterval(slider_auto);
            slider_auto = setInterval(slider_next,5000);
            if(slider_delay||slider_num==i){
                return
            }
            slider_pager_li[slider_num].classList.remove('on');
            let slider_history = slider_num;
            slider_num=i;
            slider_pager_li[slider_num].classList.add('on');
            let slider_calc = slider_num-slider_history;
            let slider_calc_2 = Math.abs(slider_calc);
            slider_delay=true;
            slider.style.transition = "all 0.5s";
            if(slider_num<slider_history){
                slider.style.transform = "translateX("+-innerWidth*(slider_li.length-slider_calc_2)+"px)";
            }
            if(slider_num>slider_history){
                slider.style.transform = "translateX("+-innerWidth*(slider_li.length+slider_calc)+"px)";
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
                slider.style.transform = "translateX("+-innerWidth*slider_li.length+"px)";
                new_slider_li = slider.querySelectorAll('li');
                slider_delay=false;
            },500);
        },false);
    }
    /*-----------------------caution_btn_event----------------------*/
    const caution_btn_event = document.querySelectorAll('.info .caution .title_box li'),
          caution_txt_box = document.querySelectorAll('.info .caution .txt_box li');
    for(let i=0; i<caution_btn_event.length; i++){
        caution_btn_event[i].addEventListener('click',function(e){
            e.preventDefault();
            for(let m=0; m<caution_btn_event.length; m++){
                caution_btn_event[m].classList.remove('on');
                caution_txt_box[m].classList.remove('on');
            }
            this.classList.add('on');
            caution_txt_box[i].classList.add('on');
        },false);
    }
},false);