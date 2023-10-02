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
                print("用户在数据库中不存在！")
                return redirect(url_for("auth.login"))
            if check_password_hash(user.password, password):
                session['user_id'] = user.id
                return redirect(url_for("ai.code"))  # redirect("/code")

            else:
                print("密码错误！")
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
            return f"注册失败 {form.errors}"  # redirect(url_for("auth.login"))
    elif "username_forgot" in request.form:
        print("GESTIN")
        form = ForgotPasswordForm(request.form)
        if form.validate():
            email = form.email_forgot.data
            username = form.username_forgot.data
            password = form.password_forgot.data
            user = UserModel.query.filter_by(email=email).first()
            user.username = username
            user.password = password
            db.session.commit()
            return redirect(url_for("auth.login"))
        else:
            print(form.errors)
            return f"找回失败 {form.errors}"  # redirect(url_for("auth.login"))


@bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@bp.route("/captcha/email")
def get_email_captcha():
    email = request.args.get("email")
    # 四位数字
    source = string.digits
    cap = []
    for i in range(0, 4):
        cap = cap + random.sample(source, 1)
    captcha_string = "".join(cap)
    message = Message(subject="注册验证码", recipients=[email], body=f"您的验证码是：{captcha_string}")
    mail.send(message)
    email_captcha = EmailCaptchaModel(email=email, captcha=captcha_string)
    db.session.add(email_captcha)
    db.session.commit()
    # RESTful API
    # {code: 200/400/500, message: "", data: {}}
    return jsonify({"code": 200, "message": "", "data": None})


@bp.route("/mail/test")
def mail_test():
    message = Message(subject="邮箱测试", recipients=["luo1733221346@163.com"], body="这是一条测试邮件")
    mail.send(message)
    # chenyees0915@gmail.com
    # luo1733221346@163.com
    return "邮件发送成功！"
