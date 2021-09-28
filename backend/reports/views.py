from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import FileResponse, Http404

from django.apps import apps

from pages.models import pages

from datetime import datetime

import openpyxl

def get_filtered_models(page, filters):
	model = apps.get_model(app_label='pages', model_name=page)
	# filter = {key: value for key, value in filters.items() if type(value) == int and value != 0}
	# models = model.objects.filter(**filter)

	# max_filter = {f'{key}__lte': value.get('max') for key, value in filters.items() if type(value) == dict and value.get('max')}
	# models = models.filter(**max_filter)

	# min_filter = {f'{key}__gte': value.get('min') for key, value in filters.items() if type(value) == dict and value.get('min')}

	# models = models.filter(**min_filter)
	
	# text_filter = {f'{key}__icontains': value for key, value in filters.items() if type(value) == str and value}

	# models = models.filter(**text_filter)

	filter = {}

	for key, value in filters.items():
		if value != 0 and type(value) == int:
			filter[key] = value
		if type(value) == dict:
			if value.get('max'):
				filter[f'{key}__lte'] = value.get('max') 
			if value.get('min'):
				filter[f'{key}__gte'] = value.get('min') 
		if value and type(value) == str:
			filter[f'{key}__icontains'] = value 
	
	return model.objects.filter(**filter)

def get_fields(page):
	for p in pages:
		if p.get('key') == page:
			full_page = p
	fields = full_page.get('fields')

	display_fields = []

	for field in fields: 
		if field.get('name'):
			if field.get('options'):
				display_fields.extend(get_fields(field.get('options')))
			else:
				display_fields.append(field.get('name'))
	
	return display_fields


def get_page(page):
	for p in pages:
		if p.get('key') == page:
			full_page = p
	# print(page)
	# page = {p for p in pages if p.get('key') == page}
	# print(page)
	fields = full_page.get('fields')

	# display_fields = [field.get('name') for field in fields if field.get('name')]
	display_fields = []

	for field in fields:
		if field.get('name'):
			display_field = {
				'key': field.get('key'),
				'name': field.get('name'),
				'page': page
			}
			if field.get('options'):
				# display_field['sub'] = get_page(field.get('options'))
				display_field['options'] = field.get('options')
			display_fields.append(display_field)

	return display_fields



def get_model(model, page):
	fields = get_page(page)
	mdl = []
	for field in fields:
		value = (getattr(model, field.get('key')))
		if field.get('options'):
			m = apps.get_model(app_label='pages', model_name=field.get('options'))
			try:
				m = m.objects.get(id=value)
				value = get_model(model=m, page=field.get('options'))
			except:
				return 0

		if type(value) == list:
			mdl.extend(value)
		else:
			mdl.append(value)

	return mdl

def get_models(models, page):
	return [get_model(model=model, page=page) for model in models if get_model(model=model, page=page) != 0]

def create_xlsx(page, models):

	path = '/home/djole/Documents/fullstack/sluzba/reports'
	table = f'{path}/tabela2.xlsx'
	wb = openpyxl.load_workbook(table)
	sheet = wb['Sheet1']

	fields = get_fields(page)

	for i, field in enumerate(fields):
		sheet[f'{chr(66+i)}2'] = field


	for i, model in enumerate(models, start=3):
		for j, m in enumerate(model):
			sheet[f'{chr(66+j)}{i}'] = m
	


	name = f'report{datetime.now()}'
	saved = f'{path}/{name}.xlsx'
	wb.save(saved)

	return name
	


@api_view(['POST'])
def create_report(request, app_label, model_name):
	models = get_filtered_models(page=model_name, filters=request.data)
	data = get_models(models=models, page=model_name)
	name = create_xlsx(page=model_name, models=data)

	return Response(name)



def download_report(request, name):
	try:
		path = '/home/djole/Documents/fullstack/sluzba/reports'
		return FileResponse(open(f'{path}/{name}.xlsx', 'rb'))
	except FileNotFoundError:
		raise Http404()
