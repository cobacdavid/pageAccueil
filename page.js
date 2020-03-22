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
    }
    rawFile.send(null);
}
//
function ajoute_site (objet) {
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
    // à pouvoir enlever si possible : voir animation.js
    logo.onmouseover = changeAngleAnimation;
    //
    lien.appendChild(logo);
    //
    let mon_div = document.createElement("div");
    //
    mon_div.classList.add("conteneur");
    mon_div.appendChild(lien);
    //
    return mon_div;
}
//
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
            let bloc = ajoute_site(sites[sitesParLigne * l + s]);
            div_cont.appendChild(bloc);
            s++;
        }
        document.body.appendChild(div_cont);
    }
}
//
// récupération de l'adresse complète
let urlPage = window.location;
/* gestion du paramètre (fonctionne en local)
   ne semble pas fonctionner une fois en ligne
   ... urlParametres est alors vide !
*/
let urlParametres = new URLSearchParams(urlPage.search);
console.log(urlPage);
console.log(urlParametres);
if (urlPage != "" && urlParametres.has('parligne')) {
    var sitesParLigne = urlParametres.get('parligne');
} else {
    var sitesParLigne = 2;  
}
//
var sites = "";
readTextFile("./sites.json",
             function (text) {
                 sites = JSON.parse(text);
                 constructionPage();
             }
            );
//
//
