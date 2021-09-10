from django.db import models
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from django.apps import apps

from .serializer import serializers_classes


@api_view(['GET'])
def data_view(request, app_label, model_name):
    model = apps.get_model(app_label=app_label, model_name=model_name)
    obj = model.objects.all()
    serializer = serializers_classes.get(model_name)(obj, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def data_post(request, app_label, model_name):
    model = apps.get_model(app_label=app_label, model_name=model_name)
    serializer = serializers_classes.get(model_name)(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def data_update(request, app_label, model_name, pk):
    model = apps.get_model(app_label=app_label, model_name=model_name)
    obj = model.objects.get(id=pk)
    serializer = serializers_classes.get(model_name)(instance = obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def data_delete(request, app_label, model_name, pk):
    model = apps.get_model(app_label=app_label, model_name=model_name)
    obj = model.objects.get(id=pk)
    obj.delete()
    return Response('Success')


import random

@api_view(['GET'])
def create_projects(request):
    model = apps.get_model(app_label='pages', model_name='projects')
    all = model.objects.all()
    for a in all:
        a.delete()
    for i in range(100):
        m = model(name=f'BR-{i}', user=random.randint(1,2), price=random.randint(20, 190), position=random.randint(1,2), date='2021-09-07')
        m.save()
    return Response('done')

@api_view(['GET'])
def create_citites(request):
    gradovi = ['Banja Luka', 'Berkovići', 'Bijeljina', 'Bileća', 'Bosanska Dubica', 'Bosanska Gradiška', 'Bosanska Kostajnica',
    'Bosanska Krupa', 'Bosanski Brod', 'Bosanski Novi',
    'Bosanski Šamac',
    'Bratunac',
    'Čajniče',
    'Čelinac',
    'Derventa',
    'Doboj',
    'Donji Žabar',
    'Foča',
    'Gacko',
    'Han-Pijesak',
    'Istočna Ilidža',
    'Istočni Drvar',
    'Istočni Mostar (općina)',
    'Istočni Stari Grad',
    'Istočno Novo Sarajevo',
    'Jezero',
    'Kalinovik',
    'Kotor-Varoš',
    'Kupres (RS)',
    'Laktaši',
    'Lopare',
    'Ljubinje',
    'Milići',
    'Modriča',
    'Mrkonjić Grad',
    'Nevesinje',
    'Novo Goražde',
    'Osmaci',
    'Oštra Luka',
    'Pale',
    'Pelagićevo',
    'Petrovo',
    'Prijedor',
    'Prnjavor',
    'Ribnik',
    'Rogatica',
    'Rudo',
    'Skender Vakuf',
    'Sokolac',
    'Srbac',
    'Srebrenica',
    'Srebrenik',
    'Šekovići',
    'Šipovo',
    'Teslić',
    'Trebinje',
    'Trnovo (RS)',
    'Ugljevik',
    'Višegrad',
    'Vlasenica',
    'Vukosavlje',
    'Zvornik']
    model = apps.get_model(app_label='pages', model_name='cities')
    all = model.objects.all()
    for a in all:
        a.delete()

    for grad in gradovi:
        m = model(name=grad)
        m.save()

    return Response('done')