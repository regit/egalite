from rest_framework import serializers, viewsets
from rest_framework.routers import DefaultRouter

from api.models import Organization, OrganizationData

class OrganizationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationData
        fields = ('pk', 'organization', 'created_date', 'year', 'direction_male', 'direction_female', 'global_male_ratio')
        read_only_fields = ('pk', 'created_date', 'year', 'direction_male', 'direction_female', 'global_male_ratio')


class OrganizationSerializer(serializers.ModelSerializer):
    iegh = serializers.SerializerMethodField('last_iegh')
    latest_data_id = serializers.SerializerMethodField('latest_data_id')
    class Meta:
        model = Organization
        fields = ('pk', 'name', 'siret', 'created_date', 'iegh', 'latest_data_id')
        read_only_fields = ('pk', 'name', 'siret', 'created_date', 'iegh', 'latest_data_id')

    def last_iegh(self, orga):
        return orga.last_iegh()

    def latest_data_id(self, orga):
        return orga.latest_data_id()


class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    ordering = ('name', )
    ordering_fields = ('name', 'created_date', 'siret')
    filter_fields = ('name', 'siret')


class OrganizationDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrganizationData.objects.all()
    serializer_class = OrganizationDataSerializer
    ordering = ('year', )
    ordering_fields = ('organization', 'year')
    filter_fields = ('name', 'siret')


router = DefaultRouter()
router.register('organization', OrganizationViewSet)
router.register('orgdata', OrganizationDataViewSet)
