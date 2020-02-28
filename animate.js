function animationMove(ele, target) {
    clearInterval(ele.timeID)

    ele.timeID = setInterval(() => {
        var currentLeft = ele.offsetLeft;
        //判断元素的移动方向
        var isleft = currentLeft < target ? true : false

        isleft ? currentLeft += 10 : currentLeft -= 10;
        // isleft ? current += 10 : current -= 10;
        ele.style.left = currentLeft + 'px';
        //终点检测

        if (isleft ? currentLeft >= target : currentLeft <= target) {
            //清除定时器
            clearInterval(ele.timeID);
            //边界检测
            ele.style.left = target + 'px';
        }


    }, 10);
}