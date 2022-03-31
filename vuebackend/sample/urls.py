from django.urls import path
from .views import getdata,adddata

urlpatterns = [
    path('getdata/', getdata),
    path('adddata/', adddata),

]
