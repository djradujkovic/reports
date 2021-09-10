from django.db import models
from django.db.models import fields

from django.apps import apps

pages = [
    {
        "key": "cities",
        "name": "Gradovi",
        'for': 'city',
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
                "name": "Naziv",
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
                "name": "Naziv",
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
                "value": "",
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
                "value": {"value": "", "min": "", "max": ""},
                "name": "Datum",
                "type": "date",
                "required": True,
                "table": True,
            },
        ],
    },
]

for page in pages:
    fields = {
        field.get("key"): getattr(models, field.get("field_type"))(**field.get("attrs"))
        for field in page.get("fields")
    }
    module = {"__module__": __name__}
    # test5 = {"fields": page.get("fields")}
    classFields = dict(**fields, **module)
    type(page.get("key"), (models.Model,), classFields)
