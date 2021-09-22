<template>
    <b-container class="bv-example-row">
        <b-row class="text-center mt-5 d-flex justify-content-center" v-if="loading">
            <b-spinner variant="primary" label="Spinning" style="width: 10rem; height: 10rem;"></b-spinner>
        </b-row>
        <b-row align-h="start" v-else cols="1" cols-sm="1" cols-md="2" cols-lg="3" cols-xl="5">
            <b-col v-for="feature in listShowed" :key="feature.id" >
                <div class="features-card">
                    <div class="features-card-data">
                        <span><strong>{{feature.properties.title}}</strong></span>
                        <span>{{capitalizeStr(feature.properties.status)}}</span>
                        <div class="coordinates">
                            <span><strong>Lat: </strong>{{cutCoordinate(feature.geometry.coordinates[0])}}</span>
                            <span class="pl-2"><strong>Long: </strong> {{cutCoordinate(feature.geometry.coordinates[1])}}</span>
                        </div>
                        <span>Prof: {{feature.geometry.coordinates[2]}}</span>

                    </div>
                    <b-button-group class="d-flex justify-content-center pt-2">
                        <b-button class="features-card-button" size="sm" variant="outline-primary" @click="showModalFeature(feature, 'edit')">Edit</b-button>
                        <b-button class="features-card-button" size="sm" variant="outline-danger" @click="showModalFeature(feature, 'delete')">Delete</b-button>
                    </b-button-group>
                </div>

            </b-col>
        </b-row>
        <b-modal 
            v-model="modalShow"
            @ok="handleOk"
        >
            <b-form-group
                id="fieldset-1"
                label="Ingrese nuevo titulo"
                label-for="input-1"
            >
                <b-form-input id="input-1" v-model="featureSelected.properties.title" trim></b-form-input>
            </b-form-group>
        </b-modal>
        <b-modal 
            v-model="modalDeleteShow"
           
        >
            <h2>Está seguro?</h2>
            <template #modal-footer="{ cancel }">
                <b-button size="sm" variant="success" @click="deleteFeature()">
                    Si
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    No
                </b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
import fetchApi from '../../helpers/fetchApi';

export default {
    name: 'ListEarthquake',
    data() {
        return {
            url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
            listFiltered: [],
            featureSelected: {
                geometry: {
                    coordinates: [],
                    type: 'Point'
                },
                id: '',
                properties: {
                    title: '',
                    status: 'automatic'
                }
            },
            modalShow: false,
            modalDeleteShow: false,
            loading: true,

        }
    },
    methods: {
        handleOk(){
            const objIndex = this.listFiltered.findIndex((feature => feature.id === this.featureSelected.id));
            this.listFiltered[objIndex].properties.title = this.featureSelected.properties.title;
        },
        getData(data) {
            const dataT = data.filter(feature=>(
                feature.geometry.coordinates[0]>-130 && feature.geometry.coordinates[0]<-30
                && feature.geometry.coordinates[1]>-50 && feature.geometry.coordinates[1]<50
                && feature.geometry.coordinates[2]>1 && feature.geometry.coordinates[2]<400
            ));
            return dataT;
        },
        filterData(search) {
            const data = [... this.listFiltered];
            let dataT = [];
            if (search.length > 0) {
                dataT = data.filter(feature=>(
                    feature.properties.title.toLowerCase().includes(search.toLowerCase())
                ));
            } else {
                dataT = data;
            }
            this.listShowed = dataT.slice(0, 16)
        },
        showModalFeature(feature, modal){
            this.featureSelected = {...feature};
            if (modal ==='edit') {
                this.modalShow = true;
            } else {
                this.modalDeleteShow = true;
            }
        },
        deleteFeature(){
            const objIndex = this.listFiltered.findIndex((feature => feature.id === this.featureSelected.id));
            this.listFiltered.splice(objIndex, 1);
            this.modalDeleteShow = false;
        },
        cutCoordinate(coordinate){
            return coordinate.toFixed(2);
        },
        capitalizeStr(str) {
            const lower = str.toLowerCase();
            return str.charAt(0).toUpperCase() + lower.slice(1);
        }
    },
    props: {
        search:{
            type: String,
            default: '',
        }
    },
    computed: {
        listShowed() {
            const data = this.listFiltered;
            let dataT = [];
            if (this.search.length > 0) {
                dataT = data.filter(feature=>(
                    feature.properties.title.toLowerCase().includes(this.search.toLowerCase())
                ));
            } else {
                dataT = data;
            }
            return dataT.slice(0, 16)
        },
    },
    watch: {
    },
    async mounted() {
        const data = await fetchApi('GET', this.url)
        this.listFiltered = this.getData(data.features);
        this.loading = false;
    }
}
</script>

<style>

</style>