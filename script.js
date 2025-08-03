var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),  //el means hamesha top level element hota hai
    smooth: true
});


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {   // for the animation of navigation bar that will be looking like getting visible suddenly from hidden
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,  //after animating of nav, all other text wil come correspondingly at a time...
            stagger: .2,  //we want one by one bunch of particular code.....that's why we used it so that every single bunch of text get delayed by .2sec 
            delay: -1
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duaration: 1.5,
            delay: -1,
            ease: Expo.easeInOut

        });
}

function cirleChaptaKaro() {
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector(#minicircle).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale (1, 1)`;
        }, 100); // using the ttransform property for moving the circle
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {  //whenever the mouse moves in this.window, provide me the details
        document.querySelector(#minicircle).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });  // using the ttransform property for moving the circle
}

cirleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata kro ki mouse kaha par hai, which means identify the X and Y position of the mouse, now display the image in place of X and Y position and move them, rotate while moving, and jaise jaise moue tez ho waise rotation v tez ho

document.querySelectorAll(".elem").forEach(function (elem) {   // forEach teen baar ek-ek function ko chalayega
    var rotate = 0;
    var diffroot = 0;

    elem.addEventListener("mouseleave", function (dets) {   // mouseleave q ki jab mouse ek se dusre pe move hoga toh pichle wale ka img ko hatane ke liye, otherwise pichla wala image nahi hatega
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });


    elem.addEventListener("mousemove", function (dets) {    // agar hum queryselector krke directly .elem pe addEventListener lagate toh woh bas ek mai hi lagta that is only first one
        var diff = dets.clientY - elem.getBoundingClientRect().top    // last one means mouse uss line se kitna niche hai
        diffroot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,   // that is uss line ke top to bottom tak kahi v move karne se uss part pe bas waha ka img hi show hoga 
            left: dets.clientX,   // it is because in horizontal direction wherever you rotate the mouse, it will show that img which is selected for that place
            rotate: gsap.utils.clamp(-20, 20, diffroot * 0.5),
        });
    });
});
