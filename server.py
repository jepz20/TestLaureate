import cgi
import datetime
import urllib
import wsgiref.handlers
import os

from google.appengine.ext.webapp import template
from google.appengine.ext import db
from google.appengine.api import users
import webapp2

REGISTER_HTML = open('index.html').read()

class MainPage(webapp2.RequestHandler):
  def get(self):
        template_values = {}
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.write(REGISTER_HTML)



application = webapp2.WSGIApplication([
  ('/', MainPage)
], debug=True)


def main():
  application.RUN()


if __name__ == '__main__':
  main()
