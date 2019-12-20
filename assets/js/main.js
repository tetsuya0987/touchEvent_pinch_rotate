$(document).ready(function(e) {
    var n=0;
    var scale;
    var tc;
    var touch01,touch02;
    var h,w;
    var text="";
    var gesture=0;
    var eventType;
    var r
    var left;
    var top;
    var F=true;
    var pinchF=true;
    e.preventDefault;

    $('#target').hammer().on('touchstart',function(event){
        h=event.target.clientHeight;
        w=event.target.clientWidth;

        $('.height').text("h="+h);
        $('.width').text("w="+w);


    }).on('pinch',function(event){
        if(pinchF==true){
            pinchF=false;
            //gesture="ピンチ="+event.gesture.scale;

            scale=event.gesture.scale;
            scale=Math.floor( scale * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 )
            eventType="pinch";
            r=event.gesture.rotation;
            $('.gesture').text("scale="+scale);
            $('.eventType').text(eventType);
            $('.r').text(r);

            $(this).velocity({scale:scale,rotateZ:r},{duration: 30,complete:function(){
                pinchF=true;
            }});
        }

    }).on('touchend',function(event){
        if(F==true){
            F=false;
            left=parseInt($(this).css('left'))-(((w*scale)-w)/2)
            top=parseInt($(this).css('top'))-(((h*scale)-h)/2)
//            alert("scale="+scale+'__h='+h+'__w='+w)
            $(this).css({
                width:w*scale+'px',
                height:h*scale+'px',
                left:left+'px',
                top:top+'px',
            });
            $(this).stop().velocity({scale:1},{duration: 0});
            $('.top').text("top="+top)
            $('.left').text("left="+left )
            $('.height').text("h="+h*scale);
            $('.width').text("w="+w*scale);
        }
        setTimeout(function(){
            F=true;
        },500)

    });
    function floatFormat( number, n ) {
        var _pow = Math.pow( 10 , n ) ;

        return Math.round( number * _pow ) / _pow ;
    }
//$('#target').on('touchstart',this,function(event){
//    console.log(event.touches[0])
//})





});
