<template>
  <div class="float-right searchInput">
      <b-input-group size="sm">
        <template #prepend>
            <b-input-group-text >Search</b-input-group-text>
        </template>
        <b-form-input v-model="search" />
    </b-input-group>
  </div>
</template>

<script>
export default {
    name: 'SearchInput',
    data() {
        return {
            search: '',
        }
    },
    watch: {
        search() {
            this.$emit('search', this.search)
        },
    },
}
</script>

<style>

</style>