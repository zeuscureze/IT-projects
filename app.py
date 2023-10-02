from flask import Flask, session, g
import config
from exts import db, mail
from models import UserModel
from blueprints.ai import bp as ai_bp
from blueprints.auth import bp as auth_bp
from blueprints.index import bp as index_bp
from blueprints.qa import bp as qa_bp
from blueprints.gpt import bp as gpt_bp
from flask_migrate import Migrate


app = Flask(__name__)


# 绑定配置文件
app.config.from_object(config)


db.init_app(app)
mail.init_app(app)


migrate = Migrate(app, db)


app.register_blueprint(ai_bp)
app.register_blueprint(auth_bp)

app.register_blueprint(index_bp)
app.register_blueprint(qa_bp)
app.register_blueprint(gpt_bp)


@app.before_request
def my_before_request():
    user_id = session.get("user_id")
    if user_id:
        user = UserModel.query.get(user_id)
        setattr(g, "user", user)
    else:
        setattr(g, "user", None)


@app.context_processor
def my_context_processor():
    return {"user": g.user}


if __name__ == '__main__':
    app.run()
