# file: api/urls.py

from django.urls import path
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    path(r'auth', drf_views.obtain_auth_token, name='auth'),
]
