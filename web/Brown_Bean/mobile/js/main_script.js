document.addEventListener('DOMContentLoaded',function(){
    /*-----------------------------main_bn_img_show------------------------*/
    const main_bn = document.querySelectorAll('.main_bn .img_box img'),
          main_bn_txt = document.querySelector('.main_bn p'),
          doc_body = document.body;
    let main_bn_on = 0,
        main_bn_img_show = function(){
            main_bn[main_bn_on++].style.opacity="";
            if(main_bn_on<=main_bn.length-1){
                main_bn[main_bn_on].style.opacity="1";
            }else{
                main_bn_on=0;
                main_bn[main_bn_on].style.opacity="1";
            }
        }
    main_bn[main_bn_on].style.opacity="1";
    setInterval(main_bn_img_show,10000);
    /*-----------------------evetn_slider---------------------------*/
    const evetn_slider = document.querySelector('.evetn .slider'),
          evetn_slider_li = document.querySelectorAll('.evetn .slider li');
    let evetn_slider_new_li,
        evetn_slider_copy = [],
        evetn_slider_width = function(){
            evetn_slider_new_li=document.querySelectorAll('.evetn .slider li')
            let slider_width = 0;
            const slider_width_li = doc_body.clientWidth-140;
            for(let i=0; i<evetn_slider_new_li.length; i++){
                evetn_slider_new_li[i].style.width = slider_width_li+"px";
                slider_width+=evetn_slider_new_li[i].offsetWidth;
            }
            evetn_slider.style.width=slider_width+"px";
        },
        evetn_slider_child = function(){
            for(let i=0; i<evetn_slider_li.length*2; i++){
                if(i<evetn_slider_li.length){
                    evetn_slider_copy[i]=document.createElement('li');
                    evetn_slider_copy[i].innerHTML=evetn_slider_li[i].innerHTML;
                }else{
                    evetn_slider_copy[i]=document.createElement('li');
                    evetn_slider_copy[i].innerHTML=evetn_slider_li[i-evetn_slider_li.length].innerHTML;
                }
                evetn_slider.appendChild(evetn_slider_copy[i]);
            }
        }
    let evetn_slider_move = function(move_txt){
        let body_width = doc_body.clientWidth,
            evetn_slider_li_width = evetn_slider_new_li[0].offsetWidth,
            calc_val1 = (body_width-evetn_slider_li_width)/2,
            txt_num=0;
        if(move_txt=="left"){
            txt_num=1;
        }
        if(move_txt=="right"){
            txt_num=-1;
        }
        let calc_val2 = (evetn_slider_li_width*(evetn_slider_li.length+txt_num))-calc_val1;
        if(move_txt=="return"){
            return calc_val2;
        }
        evetn_slider.style.transform="translateX("+-calc_val2+"px)";
    }
    let slider_pointer_x,
        slider_pointer_x_now,
        slider_pointer_x_move,
        slider_pointer_start,
        slider_bool = false,
        slider_move_right= function(){
        slider_bool=true;
        evetn_slider.style.transition="all 0.5s";
        evetn_slider_move("right");
        setTimeout(function(){
            evetn_slider.style.transition="";
            evetn_slider.insertBefore(evetn_slider_new_li[evetn_slider_new_li.length-1],evetn_slider_new_li[0]);
            evetn_slider_move();
            evetn_slider_new_li=document.querySelectorAll('.evetn .slider li');
            slider_bool=false;
        },500)
    }
    let slider_move_left= function(){
        slider_bool=true;
        evetn_slider.style.transition="all 0.5s";
        evetn_slider_move("left");
        setTimeout(function(){
            evetn_slider.style.transition="";
            evetn_slider.insertBefore(evetn_slider_new_li[0],evetn_slider_new_li[evetn_slider_new_li.length]);
            evetn_slider_move();
            evetn_slider_new_li=document.querySelectorAll('.evetn .slider li');
            slider_bool=false;
        },500)
    },
        slider_auto = setInterval(slider_move_left,5000);
    let evetn_slider_touchmove_function = function(e){
        slider_pointer_x_now=e.targetTouches[0].clientX;
        let slider_move_now = slider_pointer_x-slider_pointer_x_now;
        slider_pointer_x_move= slider_pointer_start+slider_move_now ;
        evetn_slider.style.transform ="translateX("+ -(slider_pointer_x_move) +"px)";
    }
    let evetn_slider_bool = true;
    let evetn_slider_touchend_function = function(e){
        evetn_slider.removeEventListener("touchmove",evetn_slider_touchmove_function,{passive:true},false);
        evetn_slider.removeEventListener("touchend",evetn_slider_touchend_function,false)
        if(slider_pointer_x+50<slider_pointer_x_now){
            slider_move_right();
            return;
        }
        if(slider_pointer_x>slider_pointer_x_now+50){
            slider_move_left();
            return;
        }
        slider_bool=true;
        evetn_slider.style.transition="all 0.3s";
        evetn_slider_move();
        setTimeout(function(){
            evetn_slider.style.transition="";
            slider_bool=false;
        },300)
    }
    evetn_slider.addEventListener("touchstart",function(e){
        slider_pointer_x=e.targetTouches[0].clientX;
        slider_pointer_start=evetn_slider_move("return");
        if(evetn_slider_bool){
            clearInterval(slider_auto);
            evetn_slider_bool=false;
        }
        if(!slider_bool){
            evetn_slider.addEventListener("touchmove",evetn_slider_touchmove_function,{passive:true},false);
            evetn_slider.addEventListener("touchend",evetn_slider_touchend_function,false);
        }
    },{passive:true},false);
    evetn_slider.addEventListener("touchend",function(){
        if(!evetn_slider_bool){
            slider_auto = setInterval(slider_move_left,5000);
            evetn_slider_bool=true;
        }
    },false);
        /*------------------------item_slider--------------------*/
    let item_slider = function(ele_li){
        const item_slider_li = document.querySelectorAll(ele_li),
              item_slider_li_parent_ele = item_slider_li[0].parentElement,
              item_slider_overflow = item_slider_li_parent_ele.parentElement;
        let item_slider_new_li,
            item_slider_width = function(){
                item_slider_new_li = document.querySelectorAll(ele_li);
                let slider_width = 0;
                const slider_width_li = item_slider_overflow.clientWidth*0.3155,
                      slider_padding = slider_width_li*0.076;
                let math_width = Math.round(slider_width_li),
                    math_padding = Math.round(slider_padding);
                for(let i=0; i<item_slider_new_li.length; i++){
                    item_slider_new_li[i].style.width = math_width+"px";
                    item_slider_new_li[i].style.paddingRight = math_padding+"px";
                    slider_width+=item_slider_new_li[i].offsetWidth;
                }
                item_slider_li_parent_ele.style.width=slider_width+"px";
            }
        let item_slider_copy = [],
            item_slider_child = function(){
            for(let i=0; i<item_slider_li.length*2; i++){
                if(i<item_slider_li.length){
                    item_slider_copy[i]=document.createElement('li');
                    item_slider_copy[i].innerHTML=item_slider_li[i].innerHTML;
                }else{
                    item_slider_copy[i]=document.createElement('li');
                    item_slider_copy[i].innerHTML=item_slider_li[i-item_slider_li.length].innerHTML;
                }
                item_slider_li_parent_ele.appendChild(item_slider_copy[i]);
            }
        }
        let item_slider_move_pointer = function(move_txt){
            let item_slider_li_width =  item_slider_new_li[0].offsetWidth,
                move_num = 0;
            if(move_txt=="left"){
                move_num=1;
            }
            if(move_txt=="right"){
                move_num=-1;
            }
            let item_slider_move = item_slider_li_width*(item_slider_li.length+move_num);
            if(move_txt=="return"){
                return item_slider_move;
            }
            item_slider_li_parent_ele.style.transform="translateX("+-item_slider_move+"px)";
        }
        let item_slider_pointer_x,
            item_slider_pointer_x_now,
            item_slider_pointer_x_move,
            item_slider_pointer_start,
            item_slider_bool = false,
            item_slider_right = function(){
                item_slider_bool=true;
                item_slider_li_parent_ele.style.transition="all 0.5s";
                item_slider_move_pointer("right");
                setTimeout(function(){
                    item_slider_li_parent_ele.style.transition="";
                    item_slider_li_parent_ele.insertBefore(item_slider_new_li[item_slider_new_li.length-1],item_slider_new_li[0]);
                    item_slider_move_pointer();
                    item_slider_new_li = document.querySelectorAll(ele_li);
                    item_slider_bool=false;
                },500)
            }
        let item_slider_left = function(){
            item_slider_bool=true;
            item_slider_li_parent_ele.style.transition="all 0.5s";
            item_slider_move_pointer("left");
            setTimeout(function(){
                item_slider_li_parent_ele.style.transition="";
                item_slider_li_parent_ele.insertBefore(item_slider_new_li[0],item_slider_new_li[item_slider_new_li.length]);
                item_slider_move_pointer();
                item_slider_new_li = document.querySelectorAll(ele_li);
                item_slider_bool=false;
            },500)
        },
            item_slider_auto_bool = true,
            item_slider_auto = setInterval(item_slider_left,5000);
        item_slider_li_parent_ele.addEventListener("touchstart",function(e){
            item_slider_pointer_x=e.targetTouches[0].clientX;
            item_slider_pointer_start = item_slider_move_pointer("return");
            if(item_slider_auto_bool){
                item_slider_auto_bool = false;
                clearInterval(item_slider_auto);
            }
            if(!item_slider_bool){
                item_slider_li_parent_ele.addEventListener("touchmove",item_slider_touchmove_function,{passive:true},false);
                item_slider_li_parent_ele.addEventListener("touchend",item_slider_touchend_function,false);
            }
        },{passive:true},false);
        item_slider_li_parent_ele.addEventListener("touchend",function(){
            if(!item_slider_auto_bool){
                item_slider_auto = setInterval(item_slider_left,5000);
                item_slider_auto_bool = true;
            }
        },false);
        let item_slider_touchmove_function = function(e){
            item_slider_pointer_x_now = e.targetTouches[0].clientX;
            let slider_move_now = item_slider_pointer_x-item_slider_pointer_x_now;
            item_slider_pointer_x_move = item_slider_pointer_start+slider_move_now ;
            item_slider_li_parent_ele.style.transform = "translateX("+ -(item_slider_pointer_x_move) +"px)";
        }
        let item_slider_touchend_function = function(e){
            item_slider_li_parent_ele.removeEventListener("touchmove",item_slider_touchmove_function,{passive:true},false);
            item_slider_li_parent_ele.removeEventListener("touchend",item_slider_touchend_function,false);
            if(item_slider_pointer_x+20<item_slider_pointer_x_now){
                item_slider_right();
                return;
            }
            if(item_slider_pointer_x>item_slider_pointer_x_now+20){
                item_slider_left();
                return;
            }
            item_slider_bool=true;
            item_slider_li_parent_ele.style.transition="all 0.3s";
            item_slider_move_pointer();
            setTimeout(function(){
                item_slider_li_parent_ele.style.transition="";
                item_slider_bool=false;
            },300)
        }
        let slider_load_function = function(){
            item_slider_child();
            item_slider_width();
            item_slider_move_pointer();
        },
            slider_resize_function = function(){
                item_slider_width();
                item_slider_move_pointer();
            }
        window.addEventListener('load',slider_load_function,false);
        window.addEventListener('resize',slider_resize_function,false);
    }
    item_slider(".item .best_overflow .best_item_slider li");
    item_slider(".item .new_overflow .new_item_slider li");
    /*----------------------fixed-----------------------------*/
    const header_ele = document.querySelector('header'),
          header_ele_next = header_ele.nextElementSibling;
    let header_ele_offset = header_ele.offsetTop;
    window.addEventListener('scroll',function(){
        if(scrollY>header_ele_offset){
            header_ele_next.style.marginTop = header_ele.offsetHeight+"px";
            header_ele.classList.add('fixed');
            return;
        }
        header_ele_next.style.marginTop = "";
        header_ele.classList.remove('fixed');
    },false);
    /*------------------------all_manu------------------------------*/
    const all_manu_btn = document.querySelector('header .all_manu'),
          all_manu_in = document.querySelector('header .all_manu_in');
    let all_manu_bool = false;
    all_manu_btn.addEventListener('click',function(e){
        e.preventDefault();
        if(all_manu_bool){
            return;
        }
        all_manu_bool=true;
        if(all_manu_btn.classList.contains('close')){
            this.classList.remove('close');
            doc_body.style.overflow="";
            all_manu_in.style.opacity="0";
            setTimeout(function(){
                all_manu_in.style.display="none";
            },500);
        }else{
            this.classList.add('close');
            doc_body.style.overflow="hidden";
            all_manu_in.style.display="";
            setTimeout(function(){
                all_manu_in.style.opacity="";
            },20);
        }
        setTimeout(function(){
            all_manu_bool=false;
        },520);
    },false);
    /*----------------------all_manu_in------------------*/
    const manu_box1_btn = document.querySelectorAll('header .all_manu_in .manu_box1 li a:not(.link):not(.accordion)'),
          accordion_btn = document.querySelector('header .all_manu_in .manu_box1 li a.accordion'),
          samole_list_ele = accordion_btn.nextElementSibling,
          manu_box2_in = document.querySelectorAll('header .all_manu_in .manu_box2>li');
    for(let i=0; i<manu_box1_btn.length; i++){
        manu_box1_btn[i].addEventListener('click',function(e){
            e.preventDefault();
            for(let m=0; m<manu_box1_btn.length; m++){
                manu_box1_btn[m].classList.remove('on');
                manu_box2_in[m].classList.remove('on');
            }
            manu_box1_btn[i].classList.add('on')
            manu_box2_in[i].classList.add('on')
        },false);
    }
    let samole_list_ele_height,
        accordion_bool = false,
        all_manu_setup = function(){
            samole_list_ele_height = samole_list_ele.clientHeight;
            all_manu_in.style.display="none";
            all_manu_in.style.opacity="0";
            samole_list_ele.style.display = "none";
            samole_list_ele.style.height = "0px";
            manu_box1_btn[0].classList.add('on')
            manu_box2_in[0].classList.add('on')
        }
    all_manu_setup();
    accordion_btn.addEventListener('click',function(e){
        e.preventDefault();
        if(accordion_bool){
            return;
        }
        accordion_bool=true;
        if(this.classList.contains('on')){
            this.classList.remove('on');
            samole_list_ele.style.height = "0px";
            setTimeout(function(){
                samole_list_ele.style.display = "none";
            },500)
        }else{
            this.classList.add('on');
            samole_list_ele.style.display = "";
            setTimeout(function(){
                samole_list_ele.style.height = samole_list_ele_height+"px";
            },20);
        }
        setTimeout(function(){
            accordion_bool=false;
        },520);
    },false);
    /*-----------------------load_resize----------------------------*/
    let load_event_function = function(){
        evetn_slider_child();
        evetn_slider_width();
        evetn_slider_move();
    },
        resize_event_function = function(){
            evetn_slider_width();
            evetn_slider_move();
        }
    window.addEventListener('load',load_event_function,false);
    window.addEventListener('resize',resize_event_function,false);
});