===============
Egalite website
===============

Introduction
============

This is a website with a backend in Django and a frontend in Reactjs.

Development
===========

Installation
------------

Backend
~~~~~~~

Easiest way is to run the backend in a virtualenv. So let's create one virtualenv and
install the dependencies ::

 virtualenv -p python3 env
 source env/bin/activate
 pip install -r requirements.txt

To run the backend, enter the virtualenv and run the Django dev web server ::

 source env/bin/activate
 cd backend
 python manage.py runserver

Frontend
~~~~~~~~

You need to install npm deps first ::

 cd frontend
 npm install

Then you can start the dev server ::

 npm run start

Reaching the server
~~~~~~~~~~~~~~~~~~~

You can now reach the server at http://localhost:8000/
