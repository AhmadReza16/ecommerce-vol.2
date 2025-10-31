from rest_framework import serializers
from models import Account
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('username', 'email', 'password', 'password2')


    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match!")
        return data
    
    def create(self, validated_data):
        user = Account(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    """Serializer for returning basic user info in authenticated endpoints."""
    class Meta:
        model = Account
        fields = ['id', 'email', 'username']