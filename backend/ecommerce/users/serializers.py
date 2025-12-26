from rest_framework import serializers
from .models import Account , Address
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

class RegisterSerializer(serializers.ModelSerializer):          # Serializer مبتنی بر مدل برای ثبت‌نام کاربر 
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Account.objects.all())] #چک می‌کند ایمیل تکراری نباشد 
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'username': {'required': True},     #extra_kwargs باعث می‌شود username هم اجباری باشد 
        }

    def validate(self, data): 
        if data['password'] != data['password2']: #چک می‌کند password و password2 برابر باشند 
            raise serializers.ValidationError("Passwords do not match!")
        return data
    
    # 
    def create(self, validated_data):   
                
        validated_data.pop('password2', None)       # password2 را حذف می‌کند چون مورد نیاز مدل نیست 
        password = validated_data.pop('password')
        user = Account(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    """Serializer for returning and updating basic user info in authenticated endpoints."""
    email = serializers.EmailField(required=True)

    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'first_name', 'last_name']
        read_only_fields = ['id']

    def validate_email(self, value):
        """Validate email is unique except for the current instance."""
        user = self.instance
        # Only validate uniqueness if updating, not on create
        if user and Account.objects.filter(email=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "city", "postal_code", "address_line"]
        read_only_fields = ["id"]

class AdminUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
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