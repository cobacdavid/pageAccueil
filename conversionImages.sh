#!/bin/bash

#  Fichier créé par
#   David Cobac
#   Dépôt GIT : https://github.com/cobacdavid
#   Nom du projet : pageAccueil
#   Online test : http://cobac.free.fr/
#   License : CC--BY-NC-SA
#   sauf code snippet venant de stackoverflow dans page.js
#   sur la lecture d'un fichier JSON
#   Idée de départ par
#   https://github.com/OneGuyy

cd images/back/
rm back-*
cd ../copieEcrans/
#
for image in *.png; do
    convert $image \
            -virtual-pixel transparent \
            -modulate 100,50,100 \
            -distort Perspective '0,0,200,50 0,1000,200,900 1920,0,1400,300 1920,1200,1400,900'  \
            -crop 1550x1200+0+0 \
            -blur 10x2 \
            back-$image
done
#
mv back-* ../back/
