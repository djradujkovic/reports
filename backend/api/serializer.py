from rest_framework import serializers

from django.apps import apps

models = [model for model in apps.get_models() if model._meta.app_label == 'pages']
serializers_classes = {}
for model in models:
	meta = type('Meta', (), {'model': model, 'fields': '__all__'})
	serializer = type(f'{model.__name__}Serializer', (serializers.ModelSerializer,), {'Meta': meta})
	serializers_classes[model.__name__] = serializer