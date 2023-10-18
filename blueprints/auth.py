from flask import Blueprint, render_template, jsonify, redirect, url_for, session
from exts import mail, db
from flask_mail import Message
from flask import request
import string
import random
from models import EmailCaptchaModel, UserModel
from .forms import RegisterForm, LoginForm, ForgotPasswordForm
from werkzeug.security import generate_password_hash, check_password_hash


# /auth
bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    elif "username" in request.form:
        form = LoginForm(request.form)
        if form.validate():
            username = form.username.data
            password = form.password.data
            user = UserModel.query.filter_by(username=username).first()
            if not user:
                print("User does not exist in the DB server！")
                return redirect(url_for("auth.login"))
            if check_password_hash(user.password, password):
                session['user_id'] = user.id
                return redirect(url_for("gpt.chat"))  # redirect("/code")

            else:
                print("Wrong Password！")
                return redirect(url_for("auth.login"))
        else:
            print(form.errors)
            return redirect(url_for("auth.login"))
    elif "username_register" in request.form:
        form = RegisterForm(request.form)
        if form.validate():
            email = form.email.data
            username = form.username_register.data
            password = form.password_register.data
            user = UserModel(email=email, username=username, password=generate_password_hash(password))
            db.session.add(user)
            db.session.commit()
            return redirect(url_for("auth.login"))
        else:
            print(form.errors)
            return f"Fail Registration {form.errors}"  # redirect(url_for("auth.login"))
    elif "username_forgot" in request.form:
        form = ForgotPasswordForm(request.form)
        if form.validate():
            email = form.email_forgot.data
            username = form.username_forgot.data
            password = form.password_forgot.data
            user = UserModel.query.filter_by(email=email).first()
            user.username = username
            user.password = generate_password_hash(password)
            db.session.commit()
            return redirect(url_for("auth.login"))
        else:
            print(form.errors)
            return f"Fail Resetting Password {form.errors}"  # redirect(url_for("auth.login"))


@bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@bp.route("/captcha/email")
def get_email_captcha():
    email = request.args.get("email")

    source = string.digits
    cap = []
    for i in range(0, 4):
        cap = cap + random.sample(source, 1)
    captcha_string = "".join(cap)
    message = Message(subject="Registration Captcha", recipients=[email], body=f"Your Verification Code is：{captcha_string}")
    mail.send(message)
    email_captcha = EmailCaptchaModel(email=email, captcha=captcha_string)
    db.session.add(email_captcha)
    db.session.commit()
    # RESTful API
    # {code: 200/400/500, message: "", data: {}}
    return jsonify({"code": 200, "message": "", "data": None})


