from flask import Blueprint, render_template, jsonify, redirect, url_for, session, g
from exts import db
from flask import request
from models import UserModel, HistoryModel
from decorators import login_required
import openai

bp = Blueprint("gpt", __name__, url_prefix="/gpt")


@bp.route("/chat")
@login_required
def chat():
    history = HistoryModel.query.filter_by(user_id=g.user.id).order_by(HistoryModel.create_time.desc())
    return render_template("chat.html", history=history)


@bp.route("/workspace")
@login_required
def workspace():
    history = HistoryModel.query.filter_by(user_id=g.user.id).order_by(HistoryModel.create_time.desc())

    # user_input = request.args.get("user_input")
    query = HistoryModel.query.filter_by(user_id=g.user.id).order_by(HistoryModel.create_time.desc()).first()
    user_input = query.content
    """gpt_output = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(user_input),
        temperature=0.6,
        max_tokens=500  # 设置生成的最大标记数量
    )
    result = gpt_output.choices[0].text"""
    result = "FAKE RESPONSE: this appears when gpt is not ready"

    response = "This is answer: \n" + result
    return render_template("workspace.html", user_input=user_input, response=response, history=history)


def generate_prompt(programming_topic):
    return """Generate a code example related to {}.

Topic: {}
Code:""".format(
        programming_topic,
        programming_topic.capitalize()
    )