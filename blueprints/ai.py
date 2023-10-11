from flask import Blueprint, redirect, render_template, request, url_for, jsonify, g
from models import HistoryModel
from exts import db
import os
import openai


bp = Blueprint("ai", __name__, url_prefix="/ai")


@bp.route("/chat_response")
def chat_response():
    m = request.args.get("m")
    history = HistoryModel(content=m, user_id=g.user.id)
    db.session.add(history)
    db.session.commit()
    response = m
    return jsonify({"code": 200, "message": "", "response": response})


def generate_prompt(programming_topic):
    return """Generate a code example related to {}.

Topic: {}
Code:""".format(
        programming_topic,
        programming_topic.capitalize()
    )
