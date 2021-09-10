from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('users/', include('fizickalica.urls')),
    # path('projects/', include('projects.urls')),
    # path('cities/', include('cities.urls')),
    path('api/', include('api.urls')),
    path('pages/', include('pages.urls')),
    path('reports/', include('reports.urls'))
]
