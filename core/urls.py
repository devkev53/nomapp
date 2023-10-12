from django.urls import path

from .views import HomeView

urlpatterns = [
  # Dashboar routes
  path('', HomeView.as_view(), name='home'),
  # Companies routes 4
  path('companies/', HomeView.as_view(), name='companies'),
  path('company/<int:pk>/', HomeView.as_view(), name='company'),
  path('companies-create/', HomeView.as_view(), name='company_create'),
  path('edit-company/<int:pk>/', HomeView.as_view(), name='company_edit'),
  # Employees routes 3
  path('add-employee/', HomeView.as_view(), name='add_employe'),
  path('employees/', HomeView.as_view(), name='employees'),
  path('employee/<int:pk>/', HomeView.as_view(), name='employee'),
  # Store routes 2
  path('store/', HomeView.as_view(), name='store'),
  path('validate-buy/<int:pk>/', HomeView.as_view(), name='store_validate'),
  # Products routes 1
  path('products/', HomeView.as_view(), name='products'),
  # Profile routes 1
  path('my-profile/', HomeView.as_view(), name='profile'),
  # Login route
  path('login/', HomeView.as_view(), name='login'),
  path('reset-password/', HomeView.as_view(), name='reset_password'),
  path('change-password/<str:token>/', HomeView.as_view(), name='change_pass'),
  path('create-user/', HomeView.as_view(), name='create_user'),
  # path('store-users', HomeView.as_view(), name='store_users'),
]