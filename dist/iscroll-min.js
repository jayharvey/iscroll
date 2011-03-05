(function(){function p(r,m){var s=this,t=document,u,q;s.wrapper=typeof r=="object"?r:t.getElementById(r);s.wrapper.style.overflow="hidden";s.scroller=s.wrapper.children[0];s.options={HWTransition:true,HWCompositing:true,hScroll:true,vScroll:true,bounce:k,bounceLock:false,momentum:k,lockDirection:true,zoom:false,hScrollbar:true,vScrollbar:true,fixedScrollbar:n,fadeScrollbar:(o&&k)||!j,hideScrollbar:o||!j,scrollbarClass:"",snap:false,pullToRefresh:false,pullDownLabel:["Pull down to refresh...","Release to refresh...","Loading..."],pullUpLabel:["Pull up to refresh...","Release to refresh...","Loading..."],onPullDown:function(){},onPullUp:function(){},onScrollStart:null,onScrollEnd:null,onZoomEnd:null};for(q in m){s.options[q]=m[q]}s.options.HWCompositing=s.options.HWCompositing&&a;s.options.HWTransition=s.options.HWTransition&&a;if(s.options.HWCompositing){s.scroller.style.cssText+="-webkit-transition-property:-webkit-transform;-webkit-transform-origin:0 0;-webkit-transform:"+b+"0,0"+h}else{s.scroller.style.cssText+="-webkit-transition-property:top,left;-webkit-transform-origin:0 0;top:0;left:0"}if(s.options.HWTransition){s.scroller.style.cssText+="-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;"}s.options.hScrollbar=s.options.hScroll&&s.options.hScrollbar;s.options.vScrollbar=s.options.vScroll&&s.options.vScrollbar;s.pullDownToRefresh=s.options.pullToRefresh=="down"||s.options.pullToRefresh=="both";s.pullUpToRefresh=s.options.pullToRefresh=="up"||s.options.pullToRefresh=="both";if(s.pullDownToRefresh){u=t.createElement("div");u.className="iScrollPullDown";u.innerHTML='<span class="iScrollPullDownIcon"></span><span class="iScrollPullDownLabel">'+s.options.pullDownLabel[0]+"</span>\n";s.scroller.insertBefore(u,s.scroller.children[0]);s.options.bounce=true;s.offsetBottom=u.offsetHeight;s.scroller.style.marginTop=-s.offsetBottom+"px";s.pullDownEl=u;s.pullDownLabel=u.getElementsByTagName("span")[1]}if(s.pullUpToRefresh){u=t.createElement("div");u.className="iScrollPullUp";u.innerHTML='<span class="iScrollPullUpIcon"></span><span class="iScrollPullUpLabel">'+s.options.pullUpLabel[0]+"</span>\n";s.scroller.appendChild(u);s.options.bounce=true;s.offsetTop=u.offsetHeight;s.scroller.style.marginBottom=-s.offsetTop+"px";s.pullUpEl=u;s.pullUpLabel=u.getElementsByTagName("span")[1]}s.refresh();s._bind(l,window);s._bind(f);if(i&&s.options.zoom){s._bind("gesturestart");s.scroller.style.webkitTransform=s.scroller.style.webkitTransform+" scale(1)"}if(!j){s._bind("mousewheel")}}p.prototype={x:0,y:0,currPageX:0,currPageY:0,pagesX:[],pagesY:[],offsetBottom:0,offsetTop:0,scale:1,lastScale:1,contentReady:true,handleEvent:function(q){var m=this;switch(q.type){case f:m._start(q);break;case e:m._move(q);break;case g:case c:m._end(q);break;case"webkitTransitionEnd":m._transitionEnd(q);break;case l:m._resize();break;case"gesturestart":m._gestStart(q);break;case"gesturechange":m._gestChange(q);break;case"gestureend":case"gesturecancel":m._gestEnd(q);break;case"mousewheel":m._wheel(q);break}},_scrollbar:function(m){var r=this,s=document,q;if(!r[m+"Scrollbar"]){if(r[m+"ScrollbarWrapper"]){r[m+"ScrollbarIndicator"].style.webkitTransform="";r[m+"ScrollbarWrapper"].parentNode.removeChild(r[m+"ScrollbarWrapper"]);r[m+"ScrollbarWrapper"]=null;r[m+"ScrollbarIndicator"]=null}return}if(!r[m+"ScrollbarWrapper"]){q=s.createElement("div");if(r.options.scrollbarClass){q.className=r.options.scrollbarClass+m.toUpperCase()}else{q.style.cssText="position:absolute;z-index:100;"+(m=="h"?"height:7px;bottom:1px;left:2px;right:7px":"width:7px;bottom:7px;top:2px;right:1px")}q.style.cssText+="pointer-events:none;-webkit-transition-property:opacity;-webkit-transition-duration:"+(r.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(r.options.hideScrollbar?"0":"1");r.wrapper.appendChild(q);r[m+"ScrollbarWrapper"]=q;q=s.createElement("div");if(!r.options.scrollbarClass){q.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-webkit-background-clip:padding-box;-webkit-box-sizing:border-box;"+(m=="h"?"height:100%;-webkit-border-radius:4px 3px;":"width:100%;-webkit-border-radius:3px 4px;")}q.style.cssText+="pointer-events:none;-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform:"+b+"0,0"+h;r[m+"ScrollbarWrapper"].appendChild(q);r[m+"ScrollbarIndicator"]=q}if(m=="h"){r.hScrollbarSize=r.hScrollbarWrapper.clientWidth;r.hScrollbarIndicatorSize=d.max(d.round(r.hScrollbarSize*r.hScrollbarSize/r.scrollerW),8);r.hScrollbarIndicator.style.width=r.hScrollbarIndicatorSize+"px";r.hScrollbarMaxScroll=r.hScrollbarSize-r.hScrollbarIndicatorSize;r.hScrollbarProp=r.hScrollbarMaxScroll/r.maxScrollX}else{r.vScrollbarSize=r.vScrollbarWrapper.clientHeight;r.vScrollbarIndicatorSize=d.max(d.round(r.vScrollbarSize*r.vScrollbarSize/r.scrollerH),8);r.vScrollbarIndicator.style.height=r.vScrollbarIndicatorSize+"px";r.vScrollbarMaxScroll=r.vScrollbarSize-r.vScrollbarIndicatorSize;r.vScrollbarProp=r.vScrollbarMaxScroll/r.maxScrollY}r._indicatorPos(m,true)},_resize:function(){var m=this;setTimeout(function(){m.refresh()},0)},_pos:function(m,r){var q=this;q.x=q.hScroll?m:0;q.y=q.vScroll?r:0;q.scroller.style.webkitTransform=b+q.x+"px,"+q.y+"px"+h+" scale("+q.scale+")";q._indicatorPos("h");q._indicatorPos("v")},_indicatorPos:function(m,r){var q=this,s=m=="h"?q.x:q.y;if(!q[m+"Scrollbar"]){return}s=q[m+"ScrollbarProp"]*s;if(s<0){s=q.options.fixedScrollbar?0:s+s*3;if(q[m+"ScrollbarIndicatorSize"]+s<9){s=-q[m+"ScrollbarIndicatorSize"]+8}}else{if(s>q[m+"ScrollbarMaxScroll"]){s=q.options.fixedScrollbar?q[m+"ScrollbarMaxScroll"]:s+(s-q[m+"ScrollbarMaxScroll"])*3;if(q[m+"ScrollbarIndicatorSize"]+q[m+"ScrollbarMaxScroll"]-s<9){s=q[m+"ScrollbarIndicatorSize"]+q[m+"ScrollbarMaxScroll"]-8}}}q[m+"ScrollbarWrapper"].style.webkitTransitionDelay="0";q[m+"ScrollbarWrapper"].style.opacity=r?"0":"1";q[m+"ScrollbarIndicator"].style.webkitTransform=b+(m=="h"?s+"px,0":"0,"+s+"px")+h},_transitionTime:function(q){var m=this;q+="ms";m.scroller.style.webkitTransitionDuration=q;if(m.hScrollbar){m.hScrollbarIndicator.style.webkitTransitionDuration=q}if(m.vScrollbar){m.vScrollbarIndicator.style.webkitTransitionDuration=q}},_start:function(s){var r=this,m=j?s.changedTouches[0]:s,q;r.moved=false;s.preventDefault();if(j&&s.touches.length==2&&r.options.zoom&&i){r.originX=d.abs(s.touches[0].pageX+s.touches[1].pageX-r.wrapperOffsetLeft*2)/2-r.x;r.originY=d.abs(s.touches[0].pageY+s.touches[1].pageY-r.wrapperOffsetTop*2)/2-r.y;return}r.moved=false;r.distX=0;r.distY=0;r.absDistX=0;r.absDistY=0;r.dirX=0;r.dirY=0;r.returnTime=0;r._transitionTime(0);if(r.options.momentum){if(r.scrollInterval){clearInterval(r.scrollInterval);r.scrollInterval=null}if(r.options.HWCompositing){q=new WebKitCSSMatrix(window.getComputedStyle(r.scroller,null).webkitTransform);if(q.m41!=r.x||q.m42!=r.y){r._unbind("webkitTransitionEnd");r._pos(q.m41,q.m42)}}else{q=window.getComputedStyle(r.scroller,null);if(r.x+"px"!=q.left||r.y+"px"!=q.top){r._unbind("webkitTransitionEnd");r._pos(q.left.replace(/[^0-9]/g)*1,q.top.replace(/[^0-9]/g)*1)}}}r.scroller.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)";if(r.hScrollbar){r.hScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)"}if(r.vScrollbar){r.vScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)"}r.startX=r.x;r.startY=r.y;r.pointX=m.pageX;r.pointY=m.pageY;r.startTime=s.timeStamp;if(r.options.onScrollStart){r.options.onScrollStart.call(r)}setTimeout(function(){r._bind(e);r._bind(g);r._bind(c)},0)},_move:function(u){if(j&&u.touches.length>1){return}var s=this,q=j?u.changedTouches[0]:u,r=q.pageX-s.pointX,m=q.pageY-s.pointY,v=s.x+r,t=s.y+m;u.preventDefault();s.pointX=q.pageX;s.pointY=q.pageY;if(v>0||v<s.maxScrollX){v=s.options.bounce?s.x+(r/2.4):v>=0||s.maxScrollX>=0?0:s.maxScrollX}if(t>0||t<s.maxScrollY){t=s.options.bounce?s.y+(m/2.4):t>=0||s.maxScrollY>=0?0:s.maxScrollY;if(s.options.pullToRefresh&&s.contentReady){if(s.pullDownToRefresh&&t>s.offsetBottom){s.pullDownEl.className="iScrollPullDown flip";s.pullDownLabel.innerText=s.options.pullDownLabel[1]}else{if(s.pullDownToRefresh&&s.pullDownEl.className.match("flip")){s.pullDownEl.className="iScrollPullDown";s.pullDownLabel.innerText=s.options.pullDownLabel[0]}}if(s.pullUpToRefresh&&t<s.maxScrollY-s.offsetTop){s.pullUpEl.className="iScrollPullUp flip";s.pullUpLabel.innerText=s.options.pullUpLabel[1]}else{if(s.pullUpToRefresh&&s.pullUpEl.className.match("flip")){s.pullUpEl.className="iScrollPullUp";s.pullUpLabel.innerText=s.options.pullUpLabel[0]}}}}if(s.absDistX<4&&s.absDistY<4){s.distX+=r;s.distY+=m;s.absDistX=d.abs(s.distX);s.absDistY=d.abs(s.distY);return}if(s.options.lockDirection){if(s.absDistX>s.absDistY+3){t=s.y;m=0}else{if(s.absDistY>s.absDistX+3){v=s.x;r=0}}}s.moved=true;s._pos(v,t);s.dirX=r>0?-1:r<0?1:0;s.dirY=m>0?-1:m<0?1:0;if(u.timeStamp-s.startTime>300){s.startTime=u.timeStamp;s.startX=s.x;s.startY=s.y}},_end:function(w){if(j&&w.touches.length!=0){return}var u=this,A=j?w.changedTouches[0]:w,x,z,r={dist:0,time:0},m={dist:0,time:0},t=w.timeStamp-u.startTime,y=u.x,v=u.y,q,s;u._unbind(e);u._unbind(g);u._unbind(c);if(!u.moved){if(j){if(u.doubleTapTimer&&u.options.zoom){clearTimeout(u.doubleTapTimer);u.doubleTapTimer=null;u.zoom(u.pointX,u.pointY,u.scale==1?2:1)}else{u.doubleTapTimer=setTimeout(function(){u.doubleTapTimer=null;x=A.target;while(x.nodeType!=1){x=x.parentNode}z=document.createEvent("MouseEvents");z.initMouseEvent("click",true,true,w.view,1,A.screenX,A.screenY,A.clientX,A.clientY,w.ctrlKey,w.altKey,w.shiftKey,w.metaKey,0,null);z._fake=true;x.dispatchEvent(z)},u.options.zoom?250:0)}}u._resetPos();return}if(u.pullDownToRefresh&&u.contentReady&&u.pullDownEl.className.match("flip")){u.pullDownEl.className="iScrollPullDown loading";u.pullDownLabel.innerText=u.options.pullDownLabel[2];u.scroller.style.marginTop="0";u.offsetBottom=0;u.refresh();u.contentReady=false;u.options.onPullDown()}if(u.pullUpToRefresh&&u.contentReady&&u.pullUpEl.className.match("flip")){u.pullUpEl.className="iScrollPullUp loading";u.pullUpLabel.innerText=u.options.pullUpLabel[2];u.scroller.style.marginBottom="0";u.offsetTop=0;u.refresh();u.contentReady=false;u.options.onPullUp()}if(t<300&&u.options.momentum){r=y?u._momentum(y-u.startX,t,-u.x,u.scrollerW-u.wrapperW+u.x,u.options.bounce?u.wrapperW:0):r;m=v?u._momentum(v-u.startY,t,-u.y,(u.maxScrollY<0?u.scrollerH-u.wrapperH+u.y:0),u.options.bounce?u.wrapperH:0):m;y=u.x+r.dist;v=u.y+m.dist;if((u.x>0&&y>0)||(u.x<u.maxScrollX&&y<u.maxScrollX)){r={dist:0,time:0}}if((u.y>0&&v>0)||(u.y<u.maxScrollY&&v<u.maxScrollY)){m={dist:0,time:0}}}if(r.dist||m.dist){q=d.max(d.max(r.time,m.time),10);if(u.options.snap){s=u._snap(y,v);y=s.x;v=s.y;q=d.max(s.time,q)}u.scrollTo(y,v,q);return}if(u.options.snap){s=u._snap(u.x,u.y);if(s.x!=u.x||s.y!=u.y){u.scrollTo(s.x,s.y,s.time)}return}u._resetPos(200)},_snap:function(z,w){var u=this,t,s,v,r,q,m;v=u.pagesX.length-1;for(t=0,s=u.pagesX.length;t<s;t++){if(z>=u.pagesX[t]){v=t;break}}if(v==u.currPageX&&v>0&&u.dirX<0){v--}z=u.pagesX[v];q=d.abs(z-u.pagesX[u.currPageX]);q=q?d.abs(u.x-z)/q*500:0;u.currPageX=v;v=u.pagesY.length-1;for(t=0;t<v;t++){if(w>=u.pagesY[t]){v=t;break}}if(v==u.currPageY&&v>0&&u.dirY<0){v--}w=u.pagesY[v];m=d.abs(w-u.pagesY[u.currPageY]);m=m?d.abs(u.y-w)/m*500:0;u.currPageY=v;r=d.round(d.max(q,m))||200;return{x:z,y:w,time:r}},_resetPos:function(r){var m=this,s=m.x,q=m.y;if(m.x>=0){s=0}else{if(m.x<m.maxScrollX){s=m.maxScrollX}}if(m.y>=0||m.maxScrollY>0){q=0}else{if(m.y<m.maxScrollY){q=m.maxScrollY}}if(s==m.x&&q==m.y){if(m.moved){if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)}m.moved=false}if(m.hScrollbar&&m.options.hideScrollbar){m.hScrollbarWrapper.style.webkitTransitionDelay="300ms";m.hScrollbarWrapper.style.opacity="0"}if(m.vScrollbar&&m.options.hideScrollbar){m.vScrollbarWrapper.style.webkitTransitionDelay="300ms";m.vScrollbarWrapper.style.opacity="0"}return}if(r){m.scroller.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)";if(m.hScrollbar){m.hScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)"}if(m.vScrollbar){m.vScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)"}}m.scrollTo(s,q,r||0)},_timedScroll:function(s,r,w){var v=this,q=v.x,m=v.y,u=(new Date).getTime(),t;v._transitionTime(0);if(v.scrollInterval){clearInterval(v.scrollInterval);v.scrollInterval=null}v.scrollInterval=setInterval(function(){var x=(new Date).getTime(),z,y;if(x>=u+w){clearInterval(v.scrollInterval);v.scrollInterval=null;v._pos(s,r);v._transitionEnd();return}x=(x-u)/w-1;t=d.sqrt(1-x*x);z=(s-q)*t+q;y=(r-m)*t+m;v._pos(z,y)},20)},_transitionEnd:function(q){var m=this;if(q){q.stopPropagation()}m._unbind("webkitTransitionEnd");m._resetPos(m.returnTime);m.returnTime=0},_gestStart:function(q){var m=this;m._transitionTime(0);m.lastScale=1;m._bind("gesturechange");m._bind("gestureend");m._bind("gesturecancel")},_gestChange:function(r){var q=this,s=q.scale*r.scale,m,t;if(s<1||s>4){return}m=q.originX-q.originX*r.scale+q.x;t=q.originY-q.originY*r.scale+q.y;q.scroller.style.webkitTransform=b+m+"px,"+t+"px"+h+" scale("+s+")";q.lastScale=r.scale},_gestEnd:function(q){var m=this;m.scale=m.scale*m.lastScale;if(m.scale<1.05){m.scale=1}m.x=m.originX-m.originX*m.lastScale+m.x;m.y=m.originY-m.originY*m.lastScale+m.y;m.scroller.style.webkitTransform=b+m.x+"px,"+m.y+"px"+h+" scale("+m.scale+")";setTimeout(function(){m.refresh()},0);m._unbind("gesturechange");m._unbind("gestureend");m._unbind("gesturecancel")},_wheel:function(s){var r=this,q=r.x+s.wheelDeltaX/12,m=r.y+s.wheelDeltaY/12;if(q>0){q=0}else{if(q<r.maxScrollX){q=r.maxScrollX}}if(m>0){m=0}else{if(m<r.maxScrollY){m=r.maxScrollY}}r.scrollTo(q,m,0)},_momentum:function(x,r,v,m,z){var u=this,w=0.0006,s=d.abs(x)/r,q=(s*s)/(2*w),y=0,t=0;if(x>0&&q>v){t=z/(6/(q/s*w));v=v+t;u.returnTime=800/z*t+100;s=s*v/q;q=v}else{if(x<0&&q>m){t=z/(6/(q/s*w));m=m+t;u.returnTime=800/z*t+100;s=s*m/q;q=m}}q=q*(x<0?-1:1);y=s/w;return{dist:q,time:d.round(y)}},_offset:function(q,m){var s=-q.offsetLeft,r=-q.offsetTop;if(!m){return{x:s,y:r}}while(q=q.offsetParent){s-=q.offsetLeft;r-=q.offsetTop}return{x:s,y:r}},_bind:function(q,m){(m||this.scroller).addEventListener(q,this,false)},_unbind:function(q,m){(m||this.scroller).removeEventListener(q,this,false)},destroy:function(){var m=this;if(m.pullDownToRefresh){m.pullDownEl.parentNode.removeChild(m.pullDownEl)}if(m.pullUpToRefresh){m.pullUpEl.parentNode.removeChild(m.pullUpEl)}m.hScrollbar=false;m.vScrollbar=false;m._scrollbar("h");m._scrollbar("v");m.scroller.style.webkitTransform="";m._unbind("webkitTransitionEnd");m._unbind(l);m._unbind(f);m._unbind(e);m._unbind(g);m._unbind(c);if(m.options.zoom){m._unbind("gesturestart");m._unbind("gesturechange");m._unbind("gestureend");m._unbind("gesturecancel")}},refresh:function(){var t=this,w=0,u=0,r,m,q,v,s;if(t.pullDownToRefresh&&t.pullDownEl.className.match("loading")&&!t.contentReady){v=t.scrollerH;t.contentReady=true;t.pullDownEl.className="iScrollPullDown";t.pullDownLabel.innerText=t.options.pullDownLabel[0];t.offsetBottom=t.pullDownEl.offsetHeight;t.scroller.style.marginTop=-t.offsetBottom+"px"}if(t.pullUpToRefresh&&t.pullUpEl.className.match("loading")&&!t.contentReady){v=t.scrollerH;t.contentReady=true;t.pullUpEl.className="iScrollPullUp";t.pullUpLabel.innerText=t.options.pullUpLabel[0];t.offsetTop=t.pullUpEl.offsetHeight;t.scroller.style.marginBottom=-t.offsetTop+"px"}t.wrapperW=t.wrapper.clientWidth;t.wrapperH=t.wrapper.clientHeight;t.scrollerW=d.round(t.scroller.offsetWidth*t.scale);t.scrollerH=d.round((t.scroller.offsetHeight-t.offsetBottom-t.offsetTop)*t.scale);t.maxScrollX=t.wrapperW-t.scrollerW;t.maxScrollY=t.wrapperH-t.scrollerH;t.dirX=0;t.dirY=0;t._transitionTime(0);t.hScroll=t.options.hScroll&&t.maxScrollX<0;t.vScroll=t.options.vScroll&&(!t.options.bounceLock&&!t.hScroll||t.scrollerH>t.wrapperH);t.hScrollbar=t.hScroll&&t.options.hScrollbar;t.vScrollbar=t.vScroll&&t.options.vScrollbar&&t.scrollerH>t.wrapperH;t._scrollbar("h");t._scrollbar("v");if(typeof t.options.snap=="string"){q=t.scroller.querySelectorAll(t.options.snap);for(r=0,m=q.length;r<m;r++){w=t._offset(q[r]);t.pagesX[r]=w.x<t.maxScrollX?t.maxScrollX:w.x*t.scale;t.pagesY[r]=w.y<t.maxScrollY?t.maxScrollY:w.y*t.scale}}else{if(t.options.snap){while(w>=t.maxScrollX){t.pagesX[u]=w;w=w-t.wrapperW;u++}if(t.maxScrollX%t.wrapperW){t.pagesX[t.pagesX.length]=t.maxScrollX-t.pagesX[t.pagesX.length-1]+t.pagesX[t.pagesX.length-1]}w=u=0;while(w>=t.maxScrollY){t.pagesY[u]=w;w=w-t.wrapperH;u++}if(t.maxScrollY%t.wrapperH){t.pagesY[t.pagesY.length]=t.maxScrollY-t.pagesY[t.pagesY.length-1]+t.pagesY[t.pagesY.length-1]}}}if(t.options.zoom){s=t._offset(t.wrapper,true);t.wrapperOffsetLeft=s.x;t.wrapperOffsetTop=s.y}if(v&&t.y==0){v=v-t.scrollerH+t.y;t.scrollTo(0,v,0)}t._resetPos()},scrollTo:function(m,t,s,r){var q=this;if(r){m=q.x-m;t=q.y-t}s=!s||(d.round(q.x)==d.round(m)&&d.round(q.y)==d.round(t))?0:s;q.moved=true;if(!q.options.HWTransition){q._timedScroll(m,t,s);return}if(s){q._bind("webkitTransitionEnd")}q._transitionTime(s);q._pos(m,t);if(!s){setTimeout(function(){q._transitionEnd()},0)}},scrollToElement:function(m,r){var q=this,s;m=m.nodeType?m:q.scroller.querySelector(m);if(!m){return}s=q._offset(m);s.x=s.x>0?0:s.x<q.maxScrollX?q.maxScrollX:s.x;s.y=s.y>0?0:s.y<q.maxScrollY?q.maxScrollY:s.y;r=r===undefined?d.max(d.abs(s.x)*2,d.abs(s.y)*2):r;q.scrollTo(s.x,s.y,r)},scrollToPage:function(r,q,t){var s=this,m,u;if(s.options.snap){r=r=="next"?s.currPageX+1:r=="prev"?s.currPageX-1:r;q=q=="next"?s.currPageY+1:q=="prev"?s.currPageY-1:q;r=r<0?0:r>s.pagesX.length-1?s.pagesX.length-1:r;q=q<0?0:q>s.pagesY.length-1?s.pagesY.length-1:q;s.currPageX=r;s.currPageY=q;m=s.pagesX[r];u=s.pagesY[q]}else{m=-s.wrapperW*r;u=-s.wrapperH*q;if(m<s.maxScrollX){m=s.maxScrollX}if(u<s.maxScrollY){u=s.maxScrollY}}s.scrollTo(m,u,t||400)},zoom:function(m,t,s){var q=this,r=s/q.scale;m=m-q.wrapperOffsetLeft-q.x;t=t-q.wrapperOffsetTop-q.y;q.x=m-m*r+q.x;q.y=t-t*r+q.y;q.scale=s;q.refresh();q._bind("webkitTransitionEnd");q._transitionTime(200);setTimeout(function(){q.scroller.style.webkitTransform=b+q.x+"px,"+q.y+"px"+h+" scale("+s+")"},0)},};var k="WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix(),j="ontouchstart" in window,i="ongesturestart" in window,a="WebKitTransitionEvent" in window,o=(/iphone|ipad/gi).test(navigator.appVersion),n=(/android/gi).test(navigator.appVersion),l="onorientationchange" in window?"orientationchange":"resize",f=j?"touchstart":"mousedown",e=j?"touchmove":"mousemove",g=j?"touchend":"mouseup",c=j?"touchcancel":"mouseup",b="translate"+(k?"3d(":"("),h=k?",0)":")",d=Math;window.iScroll=p})();