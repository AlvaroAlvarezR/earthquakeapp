<template>
  <b-container>
    <b-row cols-sm="1" cols-md="2" cols-lg="2" cols-xl="2">
        <b-col>
            <b-button  class="float-left" size="sm" variant="outline-success" @click="createFeature">Create</b-button>
        </b-col>
        <b-col >
            <search-input @search="setSearch"/>
        </b-col>
    </b-row>
    <b-row>
        <list-earthquake ref="listEartquake" :search="search"/>
    </b-row>
  </b-container>
</template>

<script>
import ListEarthquake from '@/components/Earthquake/List.vue';
import SearchInput from '@/components/Common/SearchInput.vue';

export default {
    name: 'FormEarthquake',
    components: {
        ListEarthquake,
        SearchInput
    },
    data () {
        return {
            search: '',
            featureSelected: {
                geometry: {
                    coordinates: [
                        -100,
                        0,
                        200
                    ],
                    type: 'Point'
                },
                id: '',
                properties: {
                    title: '',
                    status: ''
                }
            },
        }
    },
    methods: {
        setSearch(data) {
            this.search = data
        },
        createFeature(){
            this.$refs.listEartquake.showModalFeature(this.featureSelected, 'create')
        }
    }
}
</script>

<style>

</style>