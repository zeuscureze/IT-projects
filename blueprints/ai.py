from flask import Blueprint, redirect, render_template, request, url_for
import os
import openai


bp = Blueprint("ai", __name__, url_prefix="/ai")


openai.api_key = "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"


@bp.route("/code", methods=("GET", "POST"))
def code():

    user_input = "write qsort with C"
    result = ""
    if request.method == 'POST':
        user_input = request.form['user_input']
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(user_input),
            temperature=0.6,
            max_tokens=500  #
        )
        result = response.choices[0].text
    return render_template('root.html', user_input=user_input, result=result)


def generate_prompt(programming_topic):
    return """Generate a code example related to {}.

Topic: {}
Code:""".format(
        programming_topic,
        programming_topic.capitalize()
    )
