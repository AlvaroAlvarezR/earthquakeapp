<template>
  <b-container>
    <b-row>
        <b-col>
            <search-input @search="setSearch"/>
        </b-col>
    </b-row>
    <list-earthquake :search="search"/>
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
            search: ''
        }
    },
    methods: {
        setSearch(data) {
            this.search = data
        },
    }
}
</script>

<style>

</style>