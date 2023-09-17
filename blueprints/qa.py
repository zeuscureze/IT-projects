from flask import Blueprint, render_template, jsonify, redirect, url_for, session
from .forms import QuestionForm
from models import QuestionModel
from exts import db
from flask import request


bp = Blueprint("qa", __name__, url_prefix="/qa")


@bp.route("/blogs")
def blogs():
    questions = QuestionModel.query.order_by(QuestionModel.create_time.desc()).all()
    return render_template("Q&A.html", questions=questions)


@bp.route("/detail/<qa_id>")
def detail(qa_id):
    question = QuestionModel.query.get(qa_id)
    return render_template("target-page.html", question=question)
