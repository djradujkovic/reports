from django.urls import path

from .views import pages_view

urlpatterns = [
	path('', pages_view)
]