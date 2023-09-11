from flask import Blueprint, render_template, jsonify, redirect, url_for, session
from exts import db
from flask import request


bp = Blueprint("qa", __name__, url_prefix="/qa")
