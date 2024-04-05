from django.urls import include, path
from rest_framework import routers, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import BookViewSet, Login, Register, UpdateUser, FrontPage, Rating

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Real Estate API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/", # Should be changed when we have terms and policies
      contact=openapi.Contact(email="contact@snippets.local"), # Should be changed with the correct mail
      license=openapi.License(name="Mit License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/register', Register.as_view(), name='register_user'),
    path('api/rating', Rating.as_view(), name='rating'),
    path('api/front-page', FrontPage.as_view(), name='front-page'),
    path('api/login/', Login.as_view(), name='login_view'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/updateuser', UpdateUser.as_view(), name='update-user')
]