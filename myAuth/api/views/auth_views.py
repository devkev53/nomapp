from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from myAuth.api.serializers.auth_serialziers import CustomTokenObtainPairSerializer
from users.api.serializers.user_serializers import CustomUserSerialzer

from users.models import User

class Login(TokenObtainPairView):
  serializer_class = CustomTokenObtainPairSerializer

  def post(self, request, *args, **kwargs):
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    user = authenticate(
      username=username,
      password=password
    )
    if user:
      login_serializer = self.serializer_class(data=request.data)
      if login_serializer.is_valid():
        user_serializer = CustomUserSerialzer(user)
        return Response({
          'token': login_serializer.validated_data.get('access'),
          'refreshToken': login_serializer.validated_data.get('refresh'),
          'user': user_serializer.data,
          'message': 'login successfull'
        }, status=status.HTTP_200_OK)

      return Response({'error': 'password or login is no correct'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'password or login is no correct'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(GenericAPIView):
  # permission_classes = (IsAuthenticated,)

  def post(self, request, *args, **kwargs):
    print(request.headers)
    user=User.objects.filter(id=request.data.get('user', ''))
    if user.exists():
      RefreshToken.for_user(user.first())
      return Response({'message':'logout successfull'}, status=status.HTTP_200_OK)

    return Response({'error': 'user no exists'}, status=status.HTTP_400_BAD_REQUEST)
