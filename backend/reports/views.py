from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.apps import apps

def CreateReport(page, filters):
	model = apps.get_model(app_label='pages', model_name=page)
	filter = {key: value for key, value in filters.items() if type(value) == int and value != 0}
	models = model.objects.filter(**filter)

	max_filter = {f'{key}__lte': value.get('max') for key, value in filters.items() if type(value) == dict and value.get('max')}
	models = models.filter(**max_filter)

	min_filter = {f'{key}__gte': value.get('min') for key, value in filters.items() if type(value) == dict and value.get('min')}

	models = models.filter(**min_filter)
	
	text_filter = {f'{key}__icontains': value for key, value in filters.items() if type(value) == str and value}

	models = models.filter(**text_filter)
	
	print(len(models))




@api_view(['POST'])
def create_report(request, app_label, model_name):
	CreateReport(page=model_name, filters=request.data)
	return Response('done')
