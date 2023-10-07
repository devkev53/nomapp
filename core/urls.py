from django.urls import path

from .views import HomeView

urlpatterns = [
  path('', HomeView.as_view(), name='home'),
  path('login', HomeView.as_view(), name='home'),
  path('companies', HomeView.as_view(), name='home'),
  path('company/<int:pk>', HomeView.as_view(), name='home'),
  path('companies-create', HomeView.as_view(), name='home'),
  path('add-employee', HomeView.as_view(), name='home'),
  path('employees', HomeView.as_view(), name='home'),
  path('employee/<int:pk>', HomeView.as_view(), name='home'),
  path('store', HomeView.as_view(), name='home'),
  path('validate-buy/<int:pk>', HomeView.as_view(), name='home'),
]