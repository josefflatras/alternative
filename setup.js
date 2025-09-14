import { PageFlip } from './lib/page-flip.module.js';
import PhotoSwipeLightbox from './lib/photoswipe-lightbox.esm.js';
/*
const pageFlip = new PageFlip(document.getElementById('book'),
    {
        width: 1200, // required parameter - base page width
        height: 1600,  // required parameter - base page height
        showCover: true,
        flippingTime: 500
    }
);

pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
*/
window.onresize = () => {
    location.reload(); 
}

document.addEventListener('DOMContentLoaded', function() {
    const baseWidth = 1200;
    const baseHeight = 1600;


    const vw = window.innerWidth;
    const vh = window.innerHeight;

    var sf
    if (vw < 600) {
        sf = 0.1; // very small screens
        console.log("TOO SMALL")
    } 
    if (vw >= 600 && vw < 1024) {
        sf = 0.35; // tablets/portrait
        console.log("eeeh")

        if (vh < 500) {
            sf = 0.25; // tablets/portrait
            console.log("landscape")
    }
    } 
    if (vw >= 1024 && vw <= 1600) {
        sf = 0.35; // laptops
        console.log("big")
    } 
    if (vw > 1600) {
        sf = 0.45; // big desktops
        console.log('biggins')
    }
    
    const scaledWidth = Math.round(baseWidth * sf);
    const scaledHeight = Math.round(baseHeight * sf);

    console.log("Viewport:", window.innerWidth, "x", window.innerHeight);
    console.log("Book size:", scaledWidth, "x", scaledHeight);

    const pageFlip = new PageFlip(
        document.getElementById("book"),
        {
            width: scaledWidth, // base page width
            height: scaledHeight, // base page height

            size: "fixed",
            flippingTime: 200,
            // set threshold values:            
            //minWidth: 315,
            //maxWidth: 1000,
            //minHeight: 420,
            //maxHeight: 1350,

            //maxShadowOpacity: 0.5, // Half shadow intensity
            showCover: true,
            mobileScrollSupport: true, // disable content scrolling on mobile devices,
            startZIndex: 0,
            swipeDistance: 0.01,
            usePortrait: false
        }
    );

    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    /*document.querySelector(".page-total").innerText = pageFlip.getPageCount();*/
    
    /*document.querySelector(
        ".page-orientation"
    ).innerText = pageFlip.getOrientation();*/

    document.querySelector("#lab").addEventListener("click", () => {
        pageFlip.flipPrev(); // Turn to the previous page (with animation)
    });

    document.querySelector("#rab").addEventListener("click", () => {
        pageFlip.flipNext(); // Turn to the next page (with animation)
    });


    // triggered by page turning
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
        console.log(document.querySelector(".page-current").innerText)
        if (document.querySelector(".page-current").innerText == 1) {
            document.getElementById("lab").style.display = "none";
        }
        else if (document.querySelector(".page-current").innerText > 1) {
            document.getElementById("lab").style.display = "block";
            document.getElementById("rab").style.display = "block";
        }
        if (document.querySelector(".page-current").innerText >= 11) {
            document.getElementById("rab").style.display = "none";
        }
    });

    // triggered when the state of the book changes
    /*
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });

    // triggered when page orientation changes
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });
    */
});

const lightbox = new PhotoSwipeLightbox({
    gallery: ".page-content",
    children: 'a',
    pswpModule: () => import('./lib/photoswipe.esm.js')
})

lightbox.init();