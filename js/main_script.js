document.addEventListener('DOMContentLoaded',function(){
    const quert_selector_fullpaeg = document.querySelectorAll('#wrap .box .full_page');
    let full_page_on_index = 0,
        window_height= window.innerHeight,
        pager_innerhtml='';
    for(let i=0; i<quert_selector_fullpaeg.length; i++){
        pager_innerhtml+='<li><a href="#">'+(i+1)+'</a></li>'
    }
    document.getElementById('pager').innerHTML= pager_innerhtml;
    let fullpaeg_inner_height = function(){
        for(let i=0; i<quert_selector_fullpaeg.length; i++){
            quert_selector_fullpaeg[i].style.height = window.innerHeight+'px';
        }
    }
    fullpaeg_inner_height();
    let animate_run = false,
        full_page_animate = function(now_offset,move_offset){
            window_height= window.innerHeight;
            let scroll_y = now_offset,
                move_scroll_y = move_offset,
                full_page_num = 0;
            if(scroll_y<move_scroll_y && animate_run==false){
                animate_run=true;
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
                        animate_run=false;
                        pager_li_if();
                        return;
                    }
                }
                requestAnimationFrame(animate_down);
            }
            if(scroll_y>move_scroll_y && animate_run==false){
                animate_run=true;
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
                        animate_run=false;
                        pager_li_if();
                        return;
                    }
                }
                requestAnimationFrame(animate_up);
            }
        }
    const background_img_animation = document.querySelector('.header_background');
    let pager_li = document.querySelectorAll('#pager li'),
        pager_li_if = function(){
        for(let i=0; i<pager_li.length; i++){
            if(pager_li[i].classList.contains('on')){
                full_page_on_index=i;
            }
        }
            background_img_animation.classList.remove('run');
            if(pager_li[0].classList.contains('on')){
                background_img_animation.classList.add('run');
            }
    }
    pager_li[0].classList.add('on');
    window.addEventListener('load',pager_li_if,false);
    let down_page_event = function(){
        if(quert_selector_fullpaeg.length-1>full_page_on_index){
            full_page_animate(quert_selector_fullpaeg[full_page_on_index].offsetTop,quert_selector_fullpaeg[full_page_on_index+1].offsetTop);
        }else{
            return;
        }
    }
    let up_page_event = function(){
        if(0<full_page_on_index){
            full_page_animate(quert_selector_fullpaeg[full_page_on_index].offsetTop,quert_selector_fullpaeg[full_page_on_index-1].offsetTop);
        }else{
            return;
        }
    }
    let id_map_if = function(e){
        let id_map_html=kakao_map.outerHTML;
        let target_html = e.target.outerHTML;
        if(id_map_html.indexOf(target_html)!=-1){
            return true;
        }
    }
    document.getElementById('wrap').addEventListener('wheel',function(e){
        e.preventDefault();
        if(id_map_if(e)){
            return;
        }
        if(e.deltaY>0){
            pager_li_if();
            down_page_event();
        }
        if(e.deltaY<0){
            pager_li_if();
            up_page_event();
        }
    },false);
    document.addEventListener('keydown',function(e){
        if(e.keyCode=='40'||e.keyCode=='34'||e.keyCode=='32'){
            e.preventDefault();
            pager_li_if();
            down_page_event();
        }
        if(e.keyCode=='38'||e.keyCode=='33'){
            e.preventDefault();
            pager_li_if();
            up_page_event();
        }
        if(e.keyCode=='36'){
            e.preventDefault();
            pager_li_if();
            if(full_page_on_index!=0){
                full_page_animate(quert_selector_fullpaeg[full_page_on_index].offsetTop,quert_selector_fullpaeg[0].offsetTop);
            }else{
                return;
            }
        }
        if(e.keyCode=='35'){
            e.preventDefault();
            pager_li_if();
            if(full_page_on_index!=quert_selector_fullpaeg.length-1){
                full_page_animate(quert_selector_fullpaeg[full_page_on_index].offsetTop,quert_selector_fullpaeg[quert_selector_fullpaeg.length-1].offsetTop);
            }else{
                return;
            }
        }
    },false);
    window.addEventListener('resize',function(e){
        fullpaeg_inner_height();
        scrollTo(0,quert_selector_fullpaeg[full_page_on_index].offsetTop); 
    },false);
    document.addEventListener('scroll',function(e){
        window_height = window.innerHeight;
        for(let i=0; i<pager_li.length; i++){
            let section_offset_top = window.pageYOffset;
            if(pager_li[i].classList.contains('on')){
                pager_li[i].classList.remove('on')
            }
            if(section_offset_top>=window_height*i && section_offset_top<window_height*(i+1)){
                pager_li[i].classList.add('on');
            }
            if(section_offset_top>=window_height*pager_li.length){
                pager_li[pager_li.length-1].classList.add('on');
            }
        }
    },false);
    for(let i=0; i<pager_li.length; i++){
        (function(i){
            pager_li[i].children[0].addEventListener('click',function(e){
                e.preventDefault();
                if(full_page_on_index!=i){
                    full_page_animate(quert_selector_fullpaeg[full_page_on_index].offsetTop,quert_selector_fullpaeg[i].offsetTop);
                }
            })
        })(i);
    }
    let pointer_down,pointer_up,pointer_val,
        mouse_bool=false,
        mouse_touch_event_function_up = function(e){
        if(0<full_page_on_index){
            full_page_animate(e,quert_selector_fullpaeg[full_page_on_index-1].offsetTop);
            pager_li_if();
        }else{
            return;
        }
    }
    let mouse_touch_event_function_down = function(e){
        if(quert_selector_fullpaeg.length-1>full_page_on_index){
            full_page_animate(e,quert_selector_fullpaeg[full_page_on_index+1].offsetTop);
            pager_li_if();
        }else{
            return;
        }
    }
    document.addEventListener('mousedown',function(e){
        if(id_map_if(e)){
            return;
        }
        pointer_down = e.screenY;
        pointer_val = e.pageY;
        mouse_bool=true;
    },false);
    document.addEventListener('mousemove',function(e){
        if(id_map_if(e)){
            return;
        }
        if(mouse_bool&&animate_run==false){
            scrollTo(0,pointer_val-e.clientY);
        }
    },false);
    document.addEventListener('mouseup',function(e){
        if(id_map_if(e)){
            return;
        }
        pointer_up = e.screenY;
        mouse_bool=false;
        if(pointer_down<pointer_up-30){
            mouse_touch_event_function_up(e.pageY-e.clientY);
            return;
        }
        if(pointer_up+30<pointer_down){
            mouse_touch_event_function_down(e.pageY-e.clientY);
            return;
        }
        full_page_animate(e.pageY-e.clientY,quert_selector_fullpaeg[full_page_on_index].offsetTop);
    },false);
    let touch_pointer_start,touch_pointer_start_pagey,touch_pointer_end = 0,
        touch_pointer_bool=true;
    document.addEventListener("touchstart",function(e){
        if(id_map_if(e)){
            return;
        }
        touch_pointer_start = e.changedTouches[0].clientY;
        touch_pointer_start_pagey = e.changedTouches[0].pageY;
        touch_pointer_bool=true;
    },false);
    document.addEventListener("touchmove",function(e){
        if(id_map_if(e)){
            return;
        }
        if(e.changedTouches.length!=1&&animate_run){
            touch_pointer_bool = false;
            return;
        }
            scrollTo(0,touch_pointer_start_pagey-e.changedTouches[0].clientY);
    },false);
    document.addEventListener("touchend",function(e){
        if(id_map_if(e)){
            return;
        }
        if(touch_pointer_bool==false){
            full_page_animate(e.pageY-e.clientY,quert_selector_fullpaeg[full_page_on_index].offsetTop);
            return;
        }
        touch_pointer_bool=false;
        touch_pointer_end = e.changedTouches[0].clientY;
        if(touch_pointer_end+30<touch_pointer_start){
            mouse_touch_event_function_down(e.changedTouches[0].pageY-e.changedTouches[0].clientY);
        }
        if(touch_pointer_end>touch_pointer_start+30){
            mouse_touch_event_function_up(e.changedTouches[0].pageY-e.changedTouches[0].clientY);
        }else{
            full_page_animate(e.changedTouches[0].pageY-e.changedTouches[0].clientY,quert_selector_fullpaeg[full_page_on_index].offsetTop);
        }
    },false);
    /*-------------------kakao_map---------------------*/
    let kakao_map = document.getElementById("map");
    let pointer_map = new daum.maps.LatLng(35.2189627, 129.11008830000003);
    let options ={
        center:pointer_map,
        level:3
    };
    let map = new daum.maps.Map(kakao_map, options);
    let marker = new daum.maps.Marker({ 
        position: pointer_map
    }); 
    marker.setMap(map);
    var infowindow = new daum.maps.InfoWindow({
        position : pointer_map,
        content : '<div style="padding:5px;"><p style="font-size:12px;white-space: nowrap;text-align: center;">부산광역시 금정구 금사로 65-6</p><p style="font-size:12px;white-space: nowrap;text-align: center;">(서동 117-15)</p></div>'
    });
    infowindow.open(map, marker);
    function kakao_map_zoomIn(e) {
        e.preventDefault();
        map.setLevel(map.getLevel() - 1);
    }
    function kakao_map_zoomOut(e) {
        e.preventDefault();
        map.setLevel(map.getLevel() + 1);
    }
    document.querySelector(".plus_btn").addEventListener("click",kakao_map_zoomIn,false);
    document.querySelector(".minus_btn").addEventListener("click",kakao_map_zoomOut,false);
});