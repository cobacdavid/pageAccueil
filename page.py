from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def accueil():
    args = request.args
    # if not args.get('sitesParLigne'):
    #     sitesParLigne = 9
    # else:
    #     sitesParLigne = int(args.get('sitesParLigne'))
    sitesParLigne = 9 if not args.get('sitesParLigne') \
        else int(args.get('sitesParLigne'))
    #
    if not args.get('angleRotation'):
        angleRotation = 90
    else:
        angleRotation = int(args.get('angleRotation'))
    #
    if not args.get('zoomIcone'):
        zoomIcone = 2
    else:
        zoomIcone = float(args.get('zoomIcone'))
    #
    return render_template('page.html',
                           sitesParLigne=sitesParLigne,
                           angleRotation=angleRotation,
                           zoomIcone=zoomIcone)
