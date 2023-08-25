from flask import Blueprint, render_template, jsonify, redirect, url_for, session
from exts import mail, db
from flask_mail import Message
from flask import request
import string
import random
from models import EmailCaptchaModel
from .forms import RegisterForm, LoginForm
from models import UserModel
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
                # cookies: 存放少量数据，例如登录授权的东西
                # flask中的session是经过贾母后储存在cookie中的
                # session保存登录信息
                session['user_id'] = user.id
                return "logged in"  #redirect("/")

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
            return "success register"  # redirect(url_for("auth.login"))
        else:
            print(form.errors)
            return "fail register"  # redirect(url_for("auth.login"))




@bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")


# 如果没有在下面的括号内指定methods参数， 就默认GET请求
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
