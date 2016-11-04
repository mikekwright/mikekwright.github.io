#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

PATH = 'content'
TIMEZONE = 'America/Denver'
DEFAULT_LANG = 'en'
STATIC_PATHS = ['images', 'extra', 'blog']
ARTICLE_PATHS = ['blog']

AUTHOR = 'Michael Wright'
SITENAME = "Mike's Dev / Data Science Blog"
SITEURL = 'http://localhost:8000'
SITETITLE = 'Dev / Data Science Blog'
SITEDESCRIPTION = 'Simple blog created for discussing different topics around development and data science'
SITELOGO = SITEURL + '/images/avatar.jpg'
FAVICON = SITEURL + '/images/favicon.jpg'

ROBOTS = 'index, follow'
COPYRIGHT_YEAR = 2016

MAIN_MENU = True

#ADD_THIS_ID = 'ra-77hh6723hhjd'
#DISQUS_SITENAME = 'yoursite'
#GOOGLE_ANALYTICS = 'UA-1234-5678'
#GOOGLE_TAG_MANAGER = 'GTM-ABCDEF'
#STATUSCAKE = { 'trackid': 'your-id', 'days': 7, 'design': 6, 'rumid': 1234 }
INDEX_SAVE_AS = 'index.html'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
MENUITEMS = (('Archives', '/archives.html'),
             ('Categories', '/categories.html'),
             ('Tags', '/tags.html'))
#LINKS = (('Pelican', 'http://getpelican.com/'),
#         ('Python.org', 'http://python.org/'),
#         ('Jinja2', 'http://jinja.pocoo.org/'),
#         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('linkedin', 'https://www.linkedin.com/in/mikekwright'),
          ('github', 'https://github.com/mikekwright'),
          ('twitter', 'https://twitter.com/mikekwright'))


DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

#THEME = './themes/alchemy/alchemy'
#THEME = './themes/pelican/syte'
#THEME = './themes/pelican/Flex'
THEME = './themes/Flex'

MARKUP = ('md', 'ipynb')

PLUGIN_PATHS = ['./plugins']
PLUGINS = ['ipynb.markup', 'pelican_gist']

