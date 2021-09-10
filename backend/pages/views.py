from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import pages


@api_view(["GET"])
def pages_view(request):
    return Response(pages)
