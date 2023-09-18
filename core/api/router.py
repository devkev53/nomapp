from rest_framework.routers import DefaultRouter

from users.api.views.user_views import UserViewset
  
router = DefaultRouter()

router.register('users', UserViewset, basename='users')

urlpatterns = router.urls
