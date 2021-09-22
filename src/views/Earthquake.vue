<template>
  <div class="home">
    <form-earthquake />
  </div>
</template>

<script>
// @ is an alias to /src
import FormEarthquake from '@/components/Earthquake/Form.vue';

export default {
  name: 'Earthquake',
  components: {
    FormEarthquake
  }
}
</script>
