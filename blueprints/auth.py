from flask import Blueprint, render_template, jsonify
from exts import mail, db
from flask_mail import Message
from flask import request
import string
import random
from models import EmailCaptchaModel

# /auth
bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/login")
def login():
    pass


@bp.route("/register")
def register():
    return render_template("register.html")


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
