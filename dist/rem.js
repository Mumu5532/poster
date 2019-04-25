(function(doc, win) {
    var docEl = doc.documentElement,
        winw = document.documentElement.clientWidth || document.body.clientWidth,
        desw = 750;
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = (clientWidth / 7.5) + 'px';
        };
        console.log('docEl',winw)
    if(winw > desw){
        document.getElementById('main').style.width = desw + 'px'
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);