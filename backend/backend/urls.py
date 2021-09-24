from django.contrib import admin
from django.urls import path
from django.urls.conf import include, re_path

from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('users/', include('fizickalica.urls')),
    # path('projects/', include('projects.urls')),
    # path('cities/', include('cities.urls')),
    path('api/', include('api.urls')),
    path('pages/', include('pages.urls')),
    path('reports/', include('reports.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt'))
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]