from django.urls import path
from users.api.views.user_views import UserViewset

urlpatterns = [
  path('api/users', UserViewset.as_view(), name='users')
]