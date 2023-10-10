import uuid
from django.shortcuts import get_object_or_404

from rest_framework.decorators import action, permission_classes
from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.api.views.api_views import PermisionPolicyMixin

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.template.loader import render_to_string
from app.settings import local
from users.api.serializers.user_serializers import UserSerializer, UserUpdateSerializer, UserListSerializer, CreateUserSerializer, PasswordSerializer, ResetPasswordSerializer

# class UserViewset(viewsets.GenericViewSet):
class UserViewset(
    # PermisionPolicyMixin, 
    viewsets.GenericViewSet):
    serializer_class = UserListSerializer
    # permission_classes = ()
    permission_classes_per_method = {
        "list": [IsAuthenticated,],
        "retrieve": [IsAuthenticated,],
        "update": [IsAuthenticated,],
        "destroy": [IsAuthenticated,],
        "create": [],
        "change_img": [IsAuthenticated,],
        "set_password": [IsAuthenticated,]
    }

    def get_queryset(self, pk=None):
        ''' Obtain the queryset an validate with PK '''

        print(self.queryset)
        if self.queryset is None:
            return self.serializer_class().Meta.model.objects.filter(is_active=True)
        return self.queryset

    def get_object(self, pk):
        return get_object_or_404(self.serializer_class.Meta.model, pk=pk)
    
    # List all active Users
    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    # Create a new User
    def create(self, request):
        user_serializer = CreateUserSerializer(data=request.data)
        
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # List Detail a User
    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    # Update a User
    def update(self, request, pk=None):
        user = self.get_object(pk)
        print(request.data)
        user_serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response({
        'error':'check your fields', 'errors':user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # Delete a User (No Delete to DB is a logical change the status)
    def destroy(self, request, pk=None):
        user_destroy = self.serializer_class.Meta.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({'message':'user deactivate successful'})
        return Response({'error':'user not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['put'], url_path='assets/profile')
    def change_img(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UserUpdateSerializer(user, data=request.data)
        print(request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response({
            'error':'check your fields', 'errors':user_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='change_password')
    def set_password(self, request, pk=None, *args, **kwargs):
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(data = request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({'message': 'Password updated successfull'}, status=status.HTTP_200_OK)
        return Response({
            'error':'check your fields', 'errors':password_serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordAPIView(GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def send_mail_reset_password(self, user):
        data = {}
        try:
            print(self.request.META)
            URL = local.DOMAIN

            user.reset_token = uuid.uuid4()
            user.save()
           
            link_resetpwd = 'http://{}change-password/{}/'.format(URL, str(user.reset_token))
            print(link_resetpwd)
            
            mailServer = smtplib.SMTP(local.EMAIL_HOST, local.EMAIL_PORT)
            mailServer.starttls()
            mailServer.login(local.EMAIL_HOST_USER, local.EMAIL_HOST_PASSWORD)
            email_to = user.email
            print('Conectando...')

            message = MIMEMultipart()
            message['From'] = local.EMAIL_HOST_USER
            message['To'] = email_to
            message['Sibject'] = 'Reseteo de contraseña.!'


            content = render_to_string('send_email.html', {
                'user': user,
                'link_resetpwd': link_resetpwd,
                'link_home': 'http://{}'.format(URL)
            })
            message.attach(MIMEText(content, 'html'))

            mailServer.sendmail(local.EMAIL_HOST_USER, email_to, message.as_string())

            print('Correo enviado correctamente')
        except Exception as e:
            data['error'] = str(e)
        
        return data

    def post(self, request, *args, **kwargs):
        # try:
        email = request.data["email"]
        user = UserSerializer.Meta.model.objects.filter(email=email).first()
        if user != None:
            print("Entro Aqui..!")
            result = self.send_mail_reset_password(user)
            print(result)
            if  result == {}:
                return Response({"message":"Ok"}, status=status.HTTP_200_OK)
        
            return Response({"errors":"Error 400 Bad Request..!"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"errors":"User not exists..!"}, status=status.HTTP_404_NOT_FOUND)
        # except:
        #     return Response({"errors":"Error 400 Bad Request..!"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def put(self, request, token=None, *args, **kwars):
        reset_token=token

        user = UserSerializer.Meta.model.objects.filter(reset_token=reset_token).first()
        print(user)

        if user != None:
            password_serializer = PasswordSerializer(data = request.data)
            if password_serializer.is_valid():
                user.set_password(password_serializer.validated_data['password'])
                user.reset_token = None
                user.save()
                return Response({'message': 'Password updated successfull'}, status=status.HTTP_200_OK)
 
            return Response({
                'error':'check your fields', 'errors':password_serializer.errors
                },status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'error':'check your fields', 'errors':password_serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
