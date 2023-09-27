from rest_framework.routers import DefaultRouter

from users.api.views.user_views import UserViewset
from companies.api.views.views import CompanyViewSet
from employees.api.views.employees_views import EmployeeViewSet
from store.api.views.views import SaleViewSet, SaleDetailViewSet
from products.api.views.products_views import ProductViewSet

router = DefaultRouter()

router.register('users', UserViewset, basename='users')
router.register('companies', CompanyViewSet, basename='companies')
router.register('employees', EmployeeViewSet, basename='employees')
router.register('sales', SaleViewSet, basename='sales')
router.register('detail/sales', SaleDetailViewSet, basename='detail')
router.register('products', ProductViewSet, basename='products')

urlpatterns = router.urls
