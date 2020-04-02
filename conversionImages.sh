rm back-*
for image in *.png; do
    convert $image \
            -virtual-pixel transparent \
            -modulate 100,50,100 \
            -distort Perspective '0,0,200,50 0,1000,200,900 1920,0,1400,300 1920,1200,1400,900'  \
            -blur 10x2 \
            back-$image
done
