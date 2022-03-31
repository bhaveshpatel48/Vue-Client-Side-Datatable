from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Employee
from .serializers import EmployeeSerializer
from django.core import serializers
import json


# Create your views here.
@api_view(['POST','GET'])
def getdata(request):
    emp_data = Employee.objects.all()
    data =serializers.serialize('json', emp_data)
    data =json.loads(data)
    field_list=["name","age","email","department"]
    data_list=[]
    for i in data:
        element = [i["fields"]["name"],i["fields"]["age"],i["fields"]["email"],i["fields"]["department"]]
        data_list.append(element)
    return Response({"fields":field_list,"data":data_list}, status=status.HTTP_200_OK)


@api_view(['POST','GET'])
def adddata(request):
    try:
        request_json = request.data
        Employee.objects.create(name=request_json["name"],age=request_json['age'],email=request_json['email'],department=request_json['department'])
        return Response({"status":200},status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"status": 500}, status=status.HTTP_200_OK)