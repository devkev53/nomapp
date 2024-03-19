from django.urls import path
from users.api.views.user_views import UserViewset, ResetPasswordAPIView
urlpatterns = [
  # path('api/users', UserViewset.as_view(), name='users'),
  # path('api/reset-password', UserViewset.as_view(), name='users'),
  path('api/change-password/<str:token>', ResetPasswordAPIView.as_view(), name='change_password'),
  path('api/reset-password', ResetPasswordAPIView.as_view(), name='reset_password'),
]