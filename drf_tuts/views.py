# from django.contrib.auth import Question, Choice
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response



# User = get_user_model()

class HomeView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'charts2.html')



def get_data(request, *args, **kwargs):
    data = {
        "sales": 100,
        "customers": 10,
        "returns": 14,
    }
    return JsonResponse(data) # http response


class ChartData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        # qs_count = User.objects.all().count()
        qs_count = 4
        colors = ["#FF0000", "#0000FF", "#FFFF00", "#00FF00", "purple", "orange"]
        labels = ["Users", "Blue", "Yellow", "Green", "Purple", "Orange"]
        default_items = [qs_count, 23, 2, 3, 12, 2]
        data = {
            "colors": colors,
            "labels": labels,
            "values": default_items,
        }
        return Response(data)
