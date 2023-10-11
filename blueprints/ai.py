from flask import Blueprint, redirect, render_template, request, url_for, jsonify
import os
import openai


bp = Blueprint("ai", __name__, url_prefix="/ai")


openai.api_key = "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"


@bp.route("/chat_response")
def chat_response():
    m = request.args.get("m")
    response = m
    return jsonify({"code": 200, "message": "", "response": response})


def generate_prompt(programming_topic):
    return """Generate a code example related to {}.

Topic: {}
Code:""".format(
        programming_topic,
        programming_topic.capitalize()
    )
