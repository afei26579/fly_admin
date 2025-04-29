from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # 手机号码
    mobile = models.CharField(max_length=20, unique=True, blank=True, null=True, verbose_name="手机号码")
    # 电话（座机）
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="电话")
    # 家庭住址
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name="家庭住址")
    # 头像
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name="头像")
    # 角色
    ROLE_CHOICES = (
        ('admin', '管理员'),
        ('staff', '员工'),
        ('user', '普通用户'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user', verbose_name="角色")

    class Meta:
        verbose_name = "用户"
        verbose_name_plural = verbose_name
        db_table = 'sys_user'

    def __str__(self):
        return self.username
