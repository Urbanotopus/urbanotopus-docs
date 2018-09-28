#!/usr/bin/env python
import logging
import os.path
import sys
import traceback

import jinja2
import yaml
from jinja2 import FileSystemLoader

from flask import Flask

logger = logging.getLogger(__name__)
logging.basicConfig()

THIS_PATH = os.path.realpath(os.path.dirname(__file__))
TEMPLATES_PATH = os.path.join(THIS_PATH, 'templates')


jinja_env = jinja2.Environment(loader=FileSystemLoader(TEMPLATES_PATH))
jinja_env.undefined = jinja2.StrictUndefined


def _id_counter():
    current_id = [0]

    def _counter():
        current_id[0] += 1
        return current_id[0]
    return _counter


def render_template(name, **ctx):
    template = jinja_env.get_or_select_template(name)
    return template.render(ctx)


def render_yaml_error_response(exc_info):
    ctx = {'exc_trace': traceback.format_exception(*exc_info)}
    return render_template('errors/invalid-yml.html', **ctx)


def _render_specs():
    with open('./specs.yml') as fp:
        data = yaml.safe_load(fp)
    return render_template('specs.html', counter=_id_counter(), specs=data)


def render_specs_to_html():
    http_code = 200

    try:
        html_content = _render_specs()
    except Exception as exc:  # noqa
        exc_info = sys.exc_info()
        html_content = render_yaml_error_response(exc_info)
        http_code = 500
        logger.exception(exc)

    return html_content, http_code


def build():
    html_content, http_code = render_specs_to_html()
    sys.stdout.write(html_content)
    sys.exit(0 if http_code == 200 else 1)


def watch_docs_app():
    app = Flask(__name__)
    app.jinja_env = jinja_env
    app.add_url_rule(rule='/', endpoint='docs', view_func=render_specs_to_html)
    return app


if __name__ == '__main__':
    _program_name = os.path.basename(sys.argv[0])
    if _program_name.startswith('watch'):
        watch_docs_app().run(debug=True)
    else:
        build()
