from flask import Blueprint, render_template, jsonify, redirect, url_for, session
from exts import mail, db
from flask import request


bp = Blueprint("code", __name__, url_prefix="/code")


@bp.route("/")
def code():
    return render_template("main_page.html")

