document.addEventListener('DOMContentLoaded',function(){
    const element_header = document.querySelector('header'),
          main_bn= document.querySelector('.main_bn');
    let element_header_offset_top = element_header.offsetTop;
    window.addEventListener('scroll',function(){
        if(window.scrollY>element_header_offset_top){
            main_bn.style.marginTop=element_header.offsetHeight+"px";
            element_header.style.position="fixed";
        }else if(window.scrollY<=element_header_offset_top){
            main_bn.style.marginTop="";
            element_header.style.position="";
        }
    },false);
    const slider = document.querySelector('.main_bn .slider'),
          slider_li = document.querySelectorAll('.main_bn .slider li'),
          slider_pager = document.querySelector('.main_bn .pager');
    let slider_width = 0,
        slider_on = 1,
        delay_bool = false,
        first_children = document.createElement("li"),
        last_children = document.createElement("li"),
        slider_setup = function(){
            slider.style.width = (window.innerWidth*(slider_li.length+2))+"px";
            slider.style.transition="none";
            for(let i=0; i<slider_li.length; i++){
                slider_li[i].style.width = innerWidth+"px";
            }
            slider.style.left = -(innerWidth*slider_on)+"px";
            first_children.innerHTML = slider_li[0].children[0].outerHTML;
            last_children.innerHTML = slider_li[slider_li.length-1].children[0].outerHTML;
            first_children.style.width = slider_li[0].style.width;
            last_children.style.width = slider_li[slider_li.length-1].style.width;
            setTimeout(function(){
                slider.style.transition="";
            },1);
        }
    slider_setup();
    slider.appendChild(first_children);
    slider.insertBefore(last_children,slider.children[0]);
    let pager_html="";
    for(let i=0; i<slider_li.length; i++){
        pager_html += '<li><a href="#">'+i+'</a></li>';
    }
    slider_pager.innerHTML = pager_html;
    let delay_bool_function = function(){
        if(!delay_bool){
            delay_bool=true;
            setTimeout(function(){
                delay_bool=false;
            },300);
        }else{
            return;
        }
    }
    const slider_pager_li = document.querySelectorAll('.main_bn .pager li');
    for(let i=0; i<slider_pager_li.length; i++){
        slider_pager_li[i].children[0].addEventListener("click",function(e){
            e.preventDefault();
            delay_bool_function();
            clearInterval(slider_auto);
            slider_auto = setInterval(slider_move_next,10000);
            slider.style.transition="";
            slider.style.left = -(innerWidth*(i+1))+"px";
            for(let i=0; i<slider_pager_li.length; i++){
                slider_pager_li[i].classList.remove('on');
            }
            slider_pager_li[i].classList.add('on');
            slider_on=i+1;
        },false);
        
    }
    slider_pager_li[0].classList.add('on');
    let slider_move_next = function(){
        delay_bool_function();
        slider_on++;
        if(slider_on<=slider_li.length){
            slider.style.transition="";
            slider.style.left = -(innerWidth*slider_on)+"px";
        }else{
            slider.style.left = -(innerWidth*slider_on)+"px";
            slider_on=1;
            setTimeout(function(){
                slider.style.transition="none";
                slider.style.left = -(innerWidth*slider_on)+"px";
            },300);
        }
        for(let i=0; i<slider_pager_li.length; i++){
            slider_pager_li[i].classList.remove('on');
        }
        slider_pager_li[slider_on-1].classList.add('on');
    },
        slider_move_prev = function(){
            delay_bool_function();
            slider_on--;
            if(slider_on>=1){
                slider.style.transition="";
                slider.style.left = -(innerWidth*slider_on)+"px";
            }else{
                slider.style.left = -(innerWidth*slider_on)+"px";
                slider_on=slider_li.length;
                setTimeout(function(){
                    slider.style.transition="none";
                    slider.style.left = -(innerWidth*slider_on)+"px";
                },300);
            }
            for(let i=0; i<slider_pager_li.length; i++){
                slider_pager_li[i].classList.remove('on');
            }
            slider_pager_li[slider_on-1].classList.add('on');
        }
    window.addEventListener('resize',slider_setup,false);
    let slider_auto = setInterval(slider_move_next,10000),
        touch_slider_start_x,
        touch_slider_start_x2,
        touch_auto_bool = true,
        touch_move_function = function(e){
            let move_touch = touch_slider_start_x2-e.changedTouches[0].clientX;
            slider.style.left=(touch_slider_start_x - move_touch)+"px";
        },
        touch_end_function = function(e){
            slider.style.transition="";
            slider.removeEventListener("touchmove",touch_move_function,{passive: true},false);
            if(touch_slider_start_x2+50<e.changedTouches[0].clientX){
                slider_move_prev();
                slider.removeEventListener("touchend",touch_end_function,false);
                return;
            }
            if(touch_slider_start_x2>e.changedTouches[0].clientX+50){
                slider_move_next();
                slider.removeEventListener("touchend",touch_end_function,false);
                return;
            }
            slider.style.left = -(innerWidth*slider_on)+"px";
            slider.removeEventListener("touchend",touch_end_function,false);
        }
    slider.addEventListener("touchstart",function(e){
        if(touch_auto_bool){
            clearInterval(slider_auto);
            touch_auto_bool = false;
        }
        if(delay_bool){
            return;
        }
        slider.addEventListener("touchmove",touch_move_function,{passive: true},false);
        slider.addEventListener("touchend",touch_end_function,false);
        slider.style.transition="none";
        touch_slider_start_x = this.style.left;
        touch_slider_start_x = parseInt(touch_slider_start_x);
        touch_slider_start_x2 = e.changedTouches[0].clientX;
    },{passive: true},false);
    slider.addEventListener("touchend",function(){
        if(!touch_auto_bool){
            slider_auto = setInterval(slider_move_next,10000);
            touch_auto_bool = true;
        }
    },false);
    const all_menu = document.querySelector('header .all_menu'),
          all_menu_in = document.querySelector('header .all_menu_in'),
          all_menu_background = document.querySelector('header .all_menu_background'),
          all_menu_close = all_menu_in.querySelector('.close'),
          all_menu_scroll_wrap = all_menu_in.querySelector(".sroll_wrap"),
          body_element_style = document.body.style,
          search_element = document.querySelector('header .right .search'),
          search_in_element = document.querySelector('.search_in');
    all_menu.addEventListener("click",function(e){
        e.preventDefault();
        body_element_style.overflow="hidden";
        all_menu_background.style.display="block";
        all_menu_close.style.display="block";
        all_menu_in.style.boxShadow="5px 0px 10px rgba(0, 0, 0, 0.5)";
        all_menu_in.style.left="0%";
        all_menu_scroll_wrap.scrollTo(0,0);
        setTimeout(function(){
            all_menu_background.style.opacity=1;
            all_menu_close.style.opacity=1;
        },1)
    },false);
    all_menu_close.addEventListener('click',function(e){
        e.preventDefault();
        if(!search_element.classList.contains("on")){
            body_element_style.overflow="";
        }
        all_menu_in.style.boxShadow="";
        all_menu_in.style.left="";
        all_menu_background.style.opacity="";
        all_menu_close.style.opacity="";
        setTimeout(function(){
            all_menu_background.style.display="";
            all_menu_close.style.display="";
        },500)
    },false);
    search_element.addEventListener('click',function(e){
        e.preventDefault();
        if(this.classList.contains("on")){
            this.classList.remove("on");
            body_element_style.overflow="";
            search_in_element.style.display="";
        }else{
            this.classList.add("on");
            body_element_style.overflow="hidden";
            search_in_element.style.display="block";
            search_in_element.querySelector('.hot').scrollTo(0,0);
            search_in_element.querySelector('input[type=text]').value = "";
        }
    })
},false);