function changeAngleAnimation() {
    /* VERSION duree de rotation (animation infinie) */
    // document.documentElement.style.setProperty('--dureeAnimation', Math.random() + 's');
    let maxi = 30;
    document.documentElement.style.setProperty('--rotationElement',
                                               Math.floor(Math.random() * maxi) - maxi / 2 + 'deg');
}

function mouseOverImages() {
    let images = document.getElementsByClassName("logo");
    for (let i=0; i < images.length; i++) {
        images[i].onmouseover = changeAngleAnimation;
    }
}

function evenementiel() {
    mouseOverImages();
}

