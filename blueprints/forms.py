import wtforms
from wtforms.validators import Email, Length, EqualTo
from models import UserModel, EmailCaptchaModel
from exts import db


class RegisterForm(wtforms.Form):
    username_register = wtforms.StringField(validators=[Length(min=3, max=20, message="Username Format Error！")])
    email = wtforms.StringField(validators=[Email(message="Email Format Error！")])
    captcha = wtforms.StringField(validators=[Length(min=4, max=4, message="Captcha Format Error！")])
    password_register = wtforms.StringField(validators=[Length(min=6, max=20, message="Password Format Error！ ")])
    password_confirm = wtforms.StringField(validators=[EqualTo("password_register", message="Passwords Entered Are Mismatching")])

    def validate_email(self, field):
        email = field.data
        user = UserModel.query.filter_by(email=email).first()
        if user:
            raise wtforms.ValidationError(message="Email Has Already Been Registered！")

    def validate_captcha(self, field):
        captcha = field.data
        email = self.email.data
        captcha_model = EmailCaptchaModel.query.filter_by(email=email, captcha=captcha).first()
        if not captcha_model:
            raise wtforms.ValidationError(message="Email Or Captcha Error！")
        else:
            db.session.delete(captcha_model)
            db.session.commit()


class ForgotPasswordForm(wtforms.Form):
    username_forgot = wtforms.StringField(validators=[Length(min=3, max=20, message="Username Format Error！")])
    email_forgot = wtforms.StringField(validators=[Email(message="Email Format Error！")])
    captcha_forgot = wtforms.StringField(validators=[Length(min=4, max=4, message="Captcha Format Error！")])
    password_forgot = wtforms.StringField(validators=[Length(min=6, max=20, message="Password Format Error！ ")])

    def validate_email_forgot(self, field):
        email = field.data
        user = UserModel.query.filter_by(email=email).first()
        if not user:
            raise wtforms.ValidationError(message="Email Has Not Been Registered！")

    def validate_captcha_forgot(self, field):
        captcha = field.data
        email = self.email_forgot.data
        captcha_model = EmailCaptchaModel.query.filter_by(email=email, captcha=captcha).first()
        if not captcha_model:
            raise wtforms.ValidationError(message="Email Or Captcha Error！")
        else:
            db.session.delete(captcha_model)
            db.session.commit()


class LoginForm(wtforms.Form):
    username = wtforms.StringField(validators=[Length(min=3, max=20, message="Username Format Error！")])
    password = wtforms.StringField(validators=[Length(min=6, max=20, message="Password Format Error！ ")])


class QuestionForm(wtforms.Form):
    title = wtforms.StringField(validators=[Length(min=3, max=100, message="Title Format Error！ ")])
    content = wtforms.StringField(validators=[Length(min=3, message="Content Format Error！ ")])

