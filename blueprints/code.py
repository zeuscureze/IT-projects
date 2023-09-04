from flask import Blueprint, render_template, jsonify, redirect, url_for, session, g
from exts import mail, db
from flask import request


bp = Blueprint("code", __name__, url_prefix="/code")


@bp.route("/")
def code():
    if g.user:
        return render_template("main.html")
    else:
        return redirect(url_for("auth.login"))

