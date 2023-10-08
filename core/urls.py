from django.urls import path

from .views import HomeView

urlpatterns = [
  path('', HomeView.as_view(), name='home'),
  path('login', HomeView.as_view(), name='login'),
  path('companies', HomeView.as_view(), name='companies'),
  path('company/<int:pk>', HomeView.as_view(), name='company'),
  path('companies-create', HomeView.as_view(), name='company_create'),
  path('add-employee', HomeView.as_view(), name='add_employe'),
  path('employees', HomeView.as_view(), name='employees'),
  path('employee/<int:pk>', HomeView.as_view(), name='employee'),
  path('store', HomeView.as_view(), name='store'),
  path('store-users', HomeView.as_view(), name='store_users'),
  path('validate-buy/<int:pk>', HomeView.as_view(), name='store_validate'),
]