/* Fichier créé par
   David Cobac
   Dépôt GIT : https://github.com/cobacdavid
   Nom du projet : pageAccueil
   Online test : http://cobac.free.fr/
   License : CC--BY-NC-SA
   sauf code snippet venant de stackoverflow dans page.js
   sur la lecture d'un fichier JSON
   Idée de départ par
   https://github.com/OneGuyy
*/


/* Fonction suivante venant de
   https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript#24378510
   
   Lecture asynchrone
   
   Le principe : on demande la page voulue (le json) et on
   attend le retour, du coup la construction de la page DOIT
   attendre le retour -> la fonction de callback
   
*/
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}


function ajouteSite (objet) {
    let texte = objet.nom;
    //
    let lien = document.createElement("a");
    lien.classList.add("lien");
    lien.target = "_blank";
    lien.href = objet.url;
    //
    let logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = objet.image;
    logo.alt = objet.bg;
    lien.appendChild(logo);
    //
    let mon_div = document.createElement("div");
    mon_div.classList.add("conteneur");
    mon_div.appendChild(lien);
    //
    return mon_div;
}


function constructionPage() {
    // nombre de lignes attendues
    let nbLignes = Math.floor(sites.length / sitesParLigne);
    /* s'il y a un reste de sites sur la dernière ligne
       alors c'est qu'il faut rajouter une ligne ! */
    let reste = sites.length % sitesParLigne;
    if (reste != 0) {
        nbLignes++;
    }
    //
    for (let l=0; l < nbLignes; l++) {
        // chaque ligne : un div conteneur global
        div_cont = document.createElement("div");
        div_cont.classList.add('conteneurGlobal');
        /* on ajoute les sites autant que besoin sur chacune
           des premières lignes et on calcule ce qu'on a déjà mis
           pour ne pas dépasser la demande sur la dernière ligne
        */
        let s = 0;
        while (s < sitesParLigne && sites.length - sitesParLigne * l - s > 0) {
            let bloc = ajouteSite(sites[sitesParLigne * l + s]);
            bloc.style.zIndex = 1;
            div_cont.appendChild(bloc);
            s++;
        }
        document.body.appendChild(div_cont);
    }
}


function changeAngleAnimation() {
    document.body.style.backgroundImage = "url(" + this.alt + ")";
    this.parentNode.parentNode.style.zIndex = 2;
    let maxi = angleRotation;
    document.documentElement.style.setProperty('--rotationElement',
                                               Math.floor(Math.random() * maxi) - maxi / 2 + 'deg');
}


function reprendPlace() {
    document.body.style.backgroundImage = "var(--couleurFond)";
    let position = this.parentNode.parentNode.style.zIndex;
    this.parentNode.parentNode.style.zIndex = 1;
}


function mouseImages() {
    let images = document.getElementsByClassName("logo");
    for (let i=0; i < images.length; i++) {
        images[i].onmouseover = changeAngleAnimation;
        images[i].onmouseout = reprendPlace;
    }
}


function evenementiel() {
    mouseImages();
}



// récupération de l'adresse complète
let urlPage = window.location;
/* gestion du paramètre */
let urlParametres = new URLSearchParams(urlPage.search);
if (urlPage != "" && urlParametres.has('parligne')) {
    var sitesParLigne = urlParametres.get('parligne');
} else {
    var sitesParLigne = 5;  
}
if (urlPage != "" && urlParametres.has('rotation')) {
    var angleRotation = urlParametres.get('rotation');
} else {
    var angleRotation = 45;  
}
if (urlPage != "" && urlParametres.has('zoom')) {
    var zoom = urlParametres.get('zoom');
} else {
    var zoom = 1.5;  
}
document.documentElement.style.setProperty('--zoom', zoom);
//
var sites = "";
readTextFile("./sites.json",
             function (text) {
                 sites = JSON.parse(text);
                 constructionPage();
                 evenementiel();
             }
            );
//
