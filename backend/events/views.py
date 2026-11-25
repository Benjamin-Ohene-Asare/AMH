
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import Event
from .serializers import EventSerializer
from appointments.permissions import IsHospitalAdmin


# PUBLIC: List published events
class PublicEventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Event.objects.filter(
            is_published=True
        ).order_by("-start_date")


# PUBLIC: View a single published event
class PublicEventDetailView(generics.RetrieveAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Event.objects.filter(is_published=True)


# ADMIN: List and create events
class AdminEventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsHospitalAdmin]
    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    queryset = Event.objects.all().order_by("-created_at")


# ADMIN: Retrieve, update and delete events
class AdminEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsHospitalAdmin]
    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    queryset = Event.objects.all()
