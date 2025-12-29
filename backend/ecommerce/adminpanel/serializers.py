from rest_framework import serializers
from .models import adminAccount
from django.contrib.auth.password_validation import validate_password


from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed



class AdminUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = adminAccount
        fields = ['id', 'username', 'email', 'is_staff', 'is_active', 'date_joined']

class AdminTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)


        if not self.user.is_staff:
            raise AuthenticationFailed('Admin access only')

        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'is_staff': self.user.is_staff
            
        }

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        return token
