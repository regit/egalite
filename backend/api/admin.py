from django.contrib import admin

# Register your models here.
from api.models import Organization
from api.models import OrganizationData

admin.site.register(Organization)
admin.site.register(OrganizationData)
