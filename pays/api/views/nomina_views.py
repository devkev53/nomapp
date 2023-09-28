from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

class CheckPayAPIView(GenericAPIView):

  def get(self, request, *args, **kwargs):
    