/**
 * Created by hxsd on 2016/11/30.
 */
// ===============首页==============
window.onload=function(){
    //---------轮播图--------------------------------------
    var oDiv=document.getElementById('slide');
    var aBtn=oDiv.getElementsByTagName('ol')[0].children;
    var oUl=oDiv.getElementsByTagName('ul')[0];
    var aLi=oUl.children;
    aLi[0].style.opacity=1;

    var pBtn=document.getElementById('prevBtn');
    var nBtn=document.getElementById('nextBtn');

    var n=0;//当前显示图片索引

    //隐藏和显示pBtn nBtn
    oDiv.onmouseenter=function(){
        stopShow();
    }
    oDiv.onmouseleave=function(){
        play();
    }

    //自动播放
    var timer=null;
    function play(){
        timer=setTimeout(function(){
            nBtn.onclick();
            play();
        },3000)
    };

    play();

    function stopShow() {
        clearTimeout(timer);
    }


    //添加点击事件
    for(var k=0; k<aBtn.length; k++){
        aBtn[k].index=k;//发拍照
        aBtn[k].onclick=function(){
            if(n!=this.index){
                slideItem(n,this.index);
                n=this.index;
                changeAc();
            }
        };
    };

    pBtn.onclick=function(){
        if(n<1){
            n=aLi.length;
            slideItem(0,aLi.length-1);
        }else{
            slideItem(n,n-1);
        };
        n--;
        changeAc();
    }

    nBtn.onclick=function(){
        n++;
        if(n>aLi.length-1){
            n=0;
            slideItem(aLi.length-1,0);
        }else{
            slideItem(n-1,n);
        };
        changeAc();

    };

    function slideItem(a,b){//淡出淡入
        aLi[a].style.display='block';
        aLi[a].style.opacity=1;;

        aLi[b].style.display='block';
        aLi[b].style.opacity=0;

        hxsd_tools.moveFade(aLi[a],'opacity',0,1000);//淡出
        hxsd_tools.moveFade(aLi[b],'opacity',100,1000,function(){
            aLi[a].style.display='none';
        });
    };


    function changeAc(){
        for(var j=0; j<aBtn.length; j++){
            aBtn[j].className='';
        };
        aBtn[n].className='ac';
    };
}
$(function(){
    $('.shijian .hezi').hide();
    $("ul .shijian .hezi").eq(0).show()
    $("ul .shijian").click(function(){
        var index=$(this).index()
        /* $('.shijian .hezi').eq(index).fadeIn().parent().siblings().find(".hezi").hide();*/
        $('.shijian').find(".hezi").eq(index).fadeIn().parent().siblings().find(".hezi").hide();
    });
    $(".newfloat").eq(1).on("mouseenter",function(){
        $(".two").fadeIn();

    });
    $(".newfloat").eq(3).on("mouseenter",function(){
        $(".four").fadeIn();

    })
    $(".newfloat").eq(1).on("mouseleave",function(){
        $(".two").fadeOut();

    });
    $(".newfloat").eq(3).on("mouseleave",function(){
        $(".four").fadeOut();

    });
    $("#pic1").on("mouseenter",function(){
        $(".modal_1").fadeIn();
    });
    $("#pic1").on("mouseleave",function(){
        $(".modal_1").fadeOut();
    });
});
//-----------------------aboutArrow------------------------------------------------------------------------------------
$(function(){
    $('.aboutArrowTabs').find('li').click(function(){
        var i=$(this).index();
        $(this).addClass('aboutArrowTabsAc').siblings().removeClass('aboutArrowTabsAc')
        $('.wrap>div').eq(i).show().siblings().hide();
    })
})
//-------------------newsDetail----------------------------------------------------------------------------------------
$(function(){
    //找到slide UL
    var slide=$("#slideBigImg");
    //找到自动滚动的图片
    var bigImg=slide.find("li>img");
    //图片张数
    var bigImgLength=bigImg.length;
    //图片宽度
    var imgWidth=bigImg.width();
    //定义一个变量便于清除定时器
    var timer=null;
    //为slide ul设宽
    slide.css("width",bigImgLength*imgWidth+"px");
    var n=0;
    var tog=true;
    function autoAnimate(){
        slide.animate({left: "-" + (imgWidth *n)+ "px"}, 600);
        //让滚动按钮随着滚动
        $("#slideBtn").find("li").eq(n).addClass("slideBtnAc").siblings().removeClass("slideBtnAc");
        //定义一个开关，使其在范围内滚动
        if (n == (bigImgLength - 1)) {tog = false};
        if (n == 0) {tog = true};
        tog?n++:n--;
        //console.log(n)


    }
    //定时器，让其每隔一段时间图片滚动一次
    timer=setInterval(function(){
        autoAnimate();
    }, 1000);
    //鼠标移进图片，清除定时器，移走重启定时器
    slide.find("li").hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(function(){
            autoAnimate();
        }, 1000);
    })
    //鼠标移进滚动按钮，清除定时器，并移动到按钮显示图片，移走重启定时器
    $("#slideBtn").find("li").hover(function(){
        clearInterval(timer);
        $(this).addClass("slideBtnAc").siblings().removeClass("slideBtnAc");
        var x=$(this).index();
        slide.animate({left: "-" + (imgWidth *x)+ "px"}, 600);
    },function(){
        timer=setInterval(function(){
            autoAnimate();
        }, 1000);
    })
    //-----------------------------------------------------
    var slideTabs=$("#slideTabs")
    $("#preBtn").click(function(){
        slideTabs.animate({left: "0px"}, 2000);

    })
    $("#nextBtn").click(function(){
        slideTabs.animate({left: "-1014px"}, 2000);
    })
});
//------------------newsCenter------------------------------------------------------------------------------------------
$(function(){
    $("#newsCenterTab").find("li").click(function(){
        var i=$(this).index();
        $(this).addClass("one").siblings().removeClass("one");
        $('.newsCenterTabCon>.chanpin').eq(i).show().siblings().hide();
    })
});
//------------------Products--------------------------------------------------------------------------------------------
$(function(){
    $("#productsTab").find("li").hover(function(){
        var i=$(this).index();
        $(this).addClass("ac").siblings().removeClass("ac");
        $('.pages>.page2').eq(i).show().siblings().hide();
    })
});
//------------------marketingCenter_s-----------------------------------------------------------------------------------
$(function(){
    $("#marketingCenter_sTab").find("li").click(function(){
        var i=$(this).index();
        $(this).addClass("marketingCenter_sAc").siblings().removeClass("marketingCenter_sAc");
        $('.marketingCenter_sTabCon>.marketingCenter_s').eq(i).show().siblings().hide();
    })

});
//------------------contact_s-------------------------------------------------------------------------------------------
$(function(){
    $("#contact_sTab").find("li").click(function(){
        var i=$(this).index();
        $(this).addClass("marketingCenter_sAc").siblings().removeClass("marketingCenter_sAc");
        $('.inner>.warp').eq(i).show().siblings().hide();
    })
})


