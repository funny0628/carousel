//匀速运动
function animationMove(ele, target) {
    clearInterval(ele.timeID)

    ele.timeID = setInterval(() => {
        //1.获取元素当前位置
        var currentLeft = ele.offsetLeft;
        //2.判断元素的移动方向
        var isleft = currentLeft < target ? true : false
        isleft ? currentLeft += 10 : currentLeft -= 10;
        //开始移动
        ele.style.left = currentLeft + 'px';
        //3.终点检测
        if (isleft ? currentLeft >= target : currentLeft <= target) {
            //清除定时器
            clearInterval(ele.timeID);
            //4.边界检测
            ele.style.left = target + 'px';
        }

    }, 10);
}

//缓动运动
function slowanimationMove(ele, target) {
    clearInterval(ele.timeID)
    ele.timeID = setInterval(() => {
        //1.获取元素当前位置
        var currentLeft = ele.offsetLeft;
        //2.计算每次移动距离,由(目标距离 - 当前位置) / 10 因为使用的除法后面会有小数,所以要向上取整
        var step = (target - currentLeft) / 10;
        //取整 ,如果是从左->右 向下取整 ,如果是从右->左是向上取整
         step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //3.开始移动
        currentLeft += step
        ele.style.left = currentLeft + 'px';
        //4.终点检测,因为上面的除法已经向上取整了,所以最终一定是会和目标距离相等的,所以就没有了终点检测,只是清除了定时器,
        if (currentLeft === target) {
            //清除定时器
            clearInterval(ele.timeID);
        }
    }, 10);
}



//不限制元素属性个数,并且可以支持 透明度,层级,和回调函数的缓动动画封装
function animationslow(ele, attrs, fn) {
        //清除定时器
        clearInterval(ele.timer)
        ele.timer = setInterval(() => {
            var isall = true
            for (var key in attrs) {
                console.log(key, attrs[key]);
                var attribute = key;
                var target = attrs[key];
                //1.排除层级
                if (attribute === 'zIndex') {
                    ele.style[attribute] = target;
                } else if (attribute === 'opacity') {//排除透明度
                    //1.获取元素当前的位置
                    var currentAttribute = parseFloat(window.getComputedStyle(ele, null)[attribute]);
                    currentAttribute *= 100;
                    target *= 100
                    //2.计算每次移动的距离
                    var step = (target - currentAttribute) / 10;
                    //取整
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    currentAttribute += step;
                    ele.style[attribute] = currentAttribute / 100;
                    //4.终点检测
                    if (currentAttribute !== target) {
                        isall = false
                    }
                } else {
                    //1.获取元素当前的位置
                    var currentAttribute = parseInt(window.getComputedStyle(ele, null)[attribute]);
                    //2.计算每次移动的距离
                    var step = (target - currentAttribute) / 10;
                    //取整
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    currentAttribute += step;
                    ele.style[attribute] = currentAttribute + 'px';
                    //4.终点检测
                    if (currentAttribute !== target) {
                        isall = false
                    }
                }
            }
            if (isall === true) {
                clearInterval(ele.timer);
                if (typeof fn === "function") {
                    fn()
                }
            }
        }, 50);
    }
