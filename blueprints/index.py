from flask import Blueprint, render_template, jsonify, redirect, url_for, session, g
from exts import mail, db
from flask import request


bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return render_template("index.html")
