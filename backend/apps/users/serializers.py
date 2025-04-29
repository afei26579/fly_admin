from rest_framework import serializers
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'mobile', 'phone', 'address', 'avatar', 'role', 'is_active', 'is_staff', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        if len(value) < 5:
            raise serializers.ValidationError('用户名最少5位')
        if value.isdigit():
            raise serializers.ValidationError('用户名不能为纯数字')
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('密码最少6位')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user 