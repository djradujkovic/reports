from django.db import models
from django.db.models import fields

from django.apps import apps

from datetime import date

pages = [
    {
        "key": "cities",
        "name": "Gradovi",
        'for': 'city',
        'admin': 4,
        'table': False,
        "fields": [
            {
                "key": "id",
                "field_type": "AutoField",
                "attrs": {
                    "primary_key": True,
                },
                "name": "",
                "value": "",
            },
            {
                "key": "name",
                "field_type": "CharField",
                "attrs": {"max_length": 50},
                "value": "",
                "name": "Naziv grada",
                "label": "Pretraga..",
                "type": "text",
                "required": True,
                "table": False,
            },
        ],
    },
    {
        "key": "users",
        "name": "Korisnici",
        'for': 'user',
        'admin': 4,
        'table': False,
        "fields": [
            {
                "key": "id",
                "field_type": "AutoField",
                "attrs": {
                    "primary_key": True,
                },
                "name": "",
                "value": "",
            },
            {
                "key": "name",
                "field_type": "CharField",
                "attrs": {"max_length": 50},
                "value": "",
                "name": "Ime i prezime",
                "label": "Pretraga..",
                "type": "text",
                "required": True,
                "table": False,
            },
            {
                "key": "city",
                "field_type": "IntegerField",
                "attrs": {},
                "value": 0,
                "label": "Izaberi grad",
                "name": "Grad",
                "type": "select",
                "options": "cities",
                "required": True,
                "table": True,
            },
            {
                "key": "jmbg",
                "field_type": "CharField",
                "attrs": {"max_length": 13},
                "value": "",
                "name": "JMBG",
                "label": "Maticni broj..",
                "type": "text",
                "required": False,
                "table": False,
            },
        ],
    },
    {
        "key": "positions",
        "name": "Pozicije",
        'for': 'position',
        'admin': 6,
        'table': False,
        "fields": [
            {
                "key": "id",
                "field_type": "AutoField",
                "attrs": {
                    "primary_key": True,
                },
                "name": "",
                "value": "",
            },
            {
                "key": "name",
                "field_type": "CharField",
                "attrs": {"max_length": 50},
                "value": "",
                "name": "Naziv pozicije",
                "label": "Pretraga..",
                "type": "text",
                "required": True,
                "table": False,
            },
        ],
    },
    {
        "key": "projects",
        "name": "Odluke",
        'admin': 1,
        'table': True,
        "fields": [
            {
                "key": "id",
                "field_type": "AutoField",
                "attrs": {
                    "primary_key": True,
                },
                "name": "",
                "value": "",
            },
            {
                "key": "name",
                "field_type": "CharField",
                "attrs": {"max_length": 50},
                "value": "BR-",
                "name": "Broj odluke",
                "label": "Pretraga..",
                "type": "text",
                "required": True,
                "table": True,
            },
            {
                "key": "user",
                'field_type': 'IntegerField',
                'attrs': {

                },
                "value": 0,
                "name": "Nosilac",
                "label": "Izaberi nosioca projekta",
                "type": "select",
                "options": "users",
                "required": True,
                "table": True,
            },
            {
                "key": "price",
                'field_type': 'IntegerField',
                'attrs': {},
                "value": {"value": 0, "min": 0, "max": 200},
                "range": [0, 200],
                "name": "Iznos",
                "type": "number",
                "required": True,
                "table": True,
            },
            {
                "key": "position",
                'field_type': 'IntegerField',
                'attrs': {},
                "value": 0,
                "name": "Pozicija",
                "label": "Izaberi poziciju",
                "type": "select",
                "options": "positions",
                "required": True,
                "table": True,
            },
            {
                "key": "date",
                'field_type': 'DateField',
                'attrs': {},
                "value": {"value": date.today(), "min": "", "max": ""},
                "name": "Datum odobravanja",
                "type": "date",
                "required": True,
                "table": True,
            },
        ],
    }
]

for page in pages:
    fields = {
        field.get("key"): getattr(models, field.get("field_type"))(**field.get("attrs"))
        for field in page.get("fields")
    }
    module = {"__module__": __name__}
    classFields = dict(**fields, **module)
    type(page.get("key"), (models.Model,), classFields)
