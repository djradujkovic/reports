from django.urls import path
from .views import create_citites, create_projects, data_delete, data_post, data_update, data_view

# from cities.models import GeneralViewSet

urlpatterns = [
    path('<str:app_label>/<str:model_name>/', data_view),
    path('<str:app_label>/<str:model_name>/post/', data_post),
    path('<str:app_label>/<str:model_name>/<int:pk>/update/', data_update),
    path('<str:app_label>/<str:model_name>/<int:pk>/delete/', data_delete),
    path('createprojects/', create_projects),
    path('createcities/', create_citites),
]