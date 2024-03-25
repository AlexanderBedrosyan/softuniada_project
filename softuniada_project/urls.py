from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT, }),
    ]