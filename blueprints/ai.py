from flask import Blueprint, redirect, render_template, request, url_for, jsonify, g, escape
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

    user_input = m
    gpt_output = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(user_input),
        temperature=0.3,
        max_tokens=2000
    )
    print(gpt_output)
    result = gpt_output.choices[0].text

    # result = "FAKE RESPONSE: this appears when gpt is not ready"

    response = escape("This is answer: \n" + result)

    return jsonify({"code": 200, "message": "", "response": response})


def generate_prompt(programming_topic):
    return """Generate an explanation without using code, related to {}.

Topic: {}
explanation:""".format(
        programming_topic,
        programming_topic.capitalize()
    )
