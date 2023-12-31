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
   attend le retour, du coup la construction de la page DIT
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


/* Fonction suivante récupérée sur
  https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  Elle va permettre de saisir des URL sans http(s) et se voir
  reconnaître comme tel.
*/
function validURL(str) {
    let pattern = new RegExp(// on ignore le protocole '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function recherche() {
    let e = document.getElementById("barreRecherche");
    let ma_recherche = e.value;
    //
    let long = ma_recherche.length;
    let url = "";
    //
    let suffixe = ma_recherche.substr(long-2, long-1)
    let prefixe = ma_recherche.substr(0, 4)
    if (prefixe == "http") {
        url = ma_recherche;
    } else if (validURL(ma_recherche)) {
        url = 'https://' + ma_recherche;
    } else if (suffixe == ' g') {
        ma_recherche = ma_recherche.substr(0, long-2);
        url = "https://google.com/search?q=" + ma_recherche;
    } else if(suffixe == ' a') {
        ma_recherche = ma_recherche.substr(0, long-2);
        url = "https://www.amazon.fr/s?k=" + ma_recherche;
    } else if(suffixe == ' y') {
        ma_recherche = ma_recherche.substr(0, long-2);
        url = "https://www.youtube.com/results?search_query=" + ma_recherche;
    } else {
        url = "https://duckduckgo.com/?q=" + ma_recherche;
    }
    //
    let w = window.open(url, '_blank');
    w.focus();
}

function ajouteSite (objet) {
    let texte = objet.nom;
    //
    let lien = document.createElement("a");
    lien.classList.add("lien");
    // lien.target = "_blank";
    lien.href = objet.url;
    //
    let logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = objet.image;
    logo.alt = "/static/images/back/" + objet.bg;
    logo.value = 1;
    logo.onclick = function(b) {
        logo.value++;
    };
    lien.appendChild(logo);
    //
    let mon_div = document.createElement("div");
    mon_div.classList.add("conteneur");
    mon_div.appendChild(lien);
    //
    return mon_div;
}


function barre() {
    // la barre de recherche
    let div_rec = document.createElement("div");
    div_rec.classList.add('conteneurRecherche');
    let form_rec = document.createElement("form");
    form_rec.onsubmit = recherche;
    let barre_rec = document.createElement("input");
    barre_rec.id = 'barreRecherche';
    barre_rec.placeholder = "ma recherche + (a|g|y)";
    form_rec.appendChild(barre_rec);
    let sub_rec = document.createElement("input");
    sub_rec.classList.add("submitRecherche");
    sub_rec.type = "submit";
    form_rec.appendChild(sub_rec);
    div_rec.appendChild(form_rec);
    document.body.appendChild(div_rec);
}

function lesImages() {
    // les icônes de site
    let div_gen = document.createElement("div");
    // div_gen.classList.add('conteneurGeneralIcones');
    div_gen.setAttribute('id', 'conteneurGeneralIcones');
    lignesImages(div_gen)
    document.body.appendChild(div_gen);
}

function lignesImages(divElement) {
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
        div_cont.setAttribute('id', 'conteneurLigne' + l);
        div_cont.classList.add('conteneurLigne');
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
        divElement.appendChild(div_cont);
    }
}

function detruitImages(divElement) {
    divElement.innerHTML = '';
}

function constructionPage() {
    barre();
    lesImages();
}

function changeAngleAnimation() {
    let images = document.getElementsByClassName("logo");
    for (let i=0; i<images.length; i++) {
        images[i].style.opacity = 0.4;
    }
    this.style.opacity = 1;
    document.body.style.backgroundImage = "url(" + this.alt + ")";
    this.parentNode.parentNode.style.zIndex = 2;
    let maxi = angleRotation;
    document.documentElement.style.setProperty('--rotationElement',
                                               Math.floor(Math.random() * maxi) - maxi / 2 + 'deg');
}


function reprendPlace() {
    let images = document.getElementsByClassName("logo");
    for (let i=0; i<images.length; i++) {
        images[i].style.opacity = 0.8;
    }
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

function gestionTaille() {
    // gestion du changmeent de dimension, et d'ouverture en
    // situation genre portrait
    if (($(window).width() < 1080) && (sitesParLigne > 5)) {
        sitesParLigne = Math.floor(sitesParLigne / 2);
        let divElement = document.getElementById('conteneurGeneralIcones');
        detruitImages(divElement);
        lignesImages(divElement);
    } else if (($(window).width() > 1080) && (sitesParLigne < 5)) {
        sitesParLigne = 9;
        let divElement = document.getElementById('conteneurGeneralIcones');
        detruitImages(divElement);
        lignesImages(divElement);
    }

}

// gestion du changement de dimension
$(window).resize(gestionTaille);
