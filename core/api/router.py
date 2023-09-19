from rest_framework.routers import DefaultRouter

from users.api.views.user_views import UserViewset
from companies.api.views.views import CompanyViewSet
from employees.api.views.employees_views import EmployeeViewSet

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
router.register('companies', CompanyViewSet, basename='companies')
router.register('employees', EmployeeViewSet, basename='employees')

urlpatterns = router.urls
