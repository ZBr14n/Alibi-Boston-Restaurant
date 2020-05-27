
let storeGalleryImages = document.querySelectorAll('.slider');
let leftArrow = document.querySelector('#prev');
let rightArrow = document.querySelector('#next');
let currImageIndex = 0;


let logoViewPort = document.querySelector('.mariel-logo');
let logoViewWrapper = document.querySelector('.mariel-logo-wrapper');
let scrollDown = "scroll-down";

let PlayButton = document.querySelector('#play-btn')
let PauseButton = document.querySelector('#pause-btn')
let runSlideShow;
/*************************************Minimize and Maximize logo when user scrolls************************************************************ */
$(window).scroll(function () {
    if ($(this).scrollTop()  <= 0 ){
        logoViewPort.style.width = '150px';
        logoViewPort.style.height = '150px'; 

        logoViewWrapper.classList.remove(scrollDown);
    }else{
        logoViewWrapper.classList.add(scrollDown);
        
        logoViewPort.style.width = '120px';
        logoViewPort.style.height = '120px';         

        if (window.matchMedia("(max-width: 768px)").matches){
            logoViewPort.style.width = '90px';            
            logoViewPort.style.height = '90px';
        }
    }
});
/************************************************************************************************* */
// when user view mobile, show panel.
// let navRouterPanel = document.querySelector('.nav-routers')
// if (window.matchMedia("(min-width: 769px)").matches){
//     navRouterPanel.classList.add('div').crea
//     navRouterPanel.classList.cre
// }




// reset image index and set current image index[0]
function Reset(){
    for(let i=0; i < storeGalleryImages.length; i++){
        storeGalleryImages[i].style.display = 'none';
    }
}
// start slide
function InitSlide(){
    Reset();
    storeGalleryImages[0].style.display = 'block';
}
InitSlide();
// create next button; first get current image index
// for every button click, incr. index by 1..if it goes over, reset count back to 0 again. 
function NextSlide(imgIndex){
    Reset();
    currImageIndex = imgIndex;
    storeGalleryImages[currImageIndex+1].style.display = 'block';   
    currImageIndex++;
}

// create prev button; first 
//same logic as next button
function PrevSlide(){
    Reset();

    // storeGalleryImages[currImageIndex-1].style.transition = '2s ease-in';   

    storeGalleryImages[currImageIndex-1].style.display = 'block';   
    currImageIndex--;
}
leftArrow.addEventListener('click',function(){
    clearInterval(runSlideShow);
    PauseButton.style.visibility = 'hidden';
    PlayButton.style.visibility = 'visible';

    if(currImageIndex==0){
        currImageIndex = storeGalleryImages.length;
    }
    PrevSlide();
})
rightArrow.addEventListener('click',function(){
    clearInterval(runSlideShow);
    PauseButton.style.visibility = 'hidden';
    PlayButton.style.visibility = 'visible';

    if(currImageIndex >= 4){
        currImageIndex = -1
    }
    NextSlide(currImageIndex);
})


// implement play and pause button 
/**when user arrives to page, the default
 * should be a play button that keeps changing the slideshow,
 * until user clicks "pause" button.
 */


// if(performance.navigation.type === 1){
//     runSlideShow = setInterval(
//         function(){
//             NextSlide(currImageIndex)        
            
//             if (currImageIndex === 4){
//                 currImageIndex = -1
//             }
            
//         }, 
//         2000
//     );
// }


runSlideShow = setInterval(
    function(){
        NextSlide(currImageIndex)        
        
        if (currImageIndex >= 4){
            currImageIndex = -1
        }
        
    }, 
    2000
);

PauseButton.addEventListener('click',function(){
    clearInterval(runSlideShow)        
    PauseButton.style.visibility = 'hidden';
    PlayButton.style.visibility = 'visible';
},false)
PlayButton.addEventListener('click',function(){
    PauseButton.style.visibility = 'visible';
    PlayButton.style.visibility = 'hidden';

    runSlideShow = setInterval(() => {
        NextSlide(currImageIndex)        
        
        if (currImageIndex >= 4){
            currImageIndex = -1
        }        
    }, 2000);
},false)


function scrollTopAnimated() { 
    $("html, body").animate( 
        { scrollTop: "0" }, 1e3); 
} 




// as the user scrolls down to the fleximages, add transitions to it.
let flexImages = document.querySelectorAll(".flexImages img");

flexImages[0].style.opacity = 0;
flexImages[1].style.opacity = 0;
let observer = new IntersectionObserver(function(entries) {
	// isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    
    if(entries[0].isIntersecting === true){
        flexImages[0].style.opacity = 1;
        flexImages[1].style.opacity = 1;
    }

}, { threshold: .05 });

observer.observe(flexImages[0]);
observer.observe(flexImages[1]);