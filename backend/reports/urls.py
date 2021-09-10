from django.urls import path

from .views import create_report

urlpatterns = [
	path('<str:app_label>/<str:model_name>/create/', create_report),
]