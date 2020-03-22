function changeAngleAnimation() {
    /* VERSION duree de rotation (animation infinie) */
    // document.documentElement.style.setProperty('--dureeAnimation', Math.random() + 's');
    let maxi = 30;
    document.documentElement.style.setProperty('--rotationElement',
                                               Math.floor(Math.random() * maxi) - maxi / 2 + 'deg');
}


/* ATTENTION ce qui suit en fonctionne pas :(
   donc pour l'instant codage en dur sur page.js
*/

/* déclenchement du changement d'angle quand on entre dans une image
   on en perturbe pas la structure et les tattributs généraux
   en séparant cela du reste.
   Du coup faut récupérer toutes les images et leur appliquer la
   gestion de l'événement.
   Ce n'est possible que si l'arbre DOM est construit... donc après
   le chargment complet de la page -> événement DOMContentLoaded
*/

window.addEventListener('DOMContentLoaded', function() {
    let images = document.getElementsByClassName("logo");
    for (let i=0; i < images.length; i++) {
        images[i].onmouseover = changeAngleAnimation;
    }
});

