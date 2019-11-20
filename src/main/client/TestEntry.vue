<template>
  <div :id="id" style="margin: 8px 0; border: 1px solid; height: 300px">
    <span style="vertical-align: middle">{{id}}</span>
    <div v-if="intersected"
         style="vertical-align: middle; display: inline-block; background-color: green; width: 30px; height: 30px"></div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      intersected: false
    };
  },
  mounted() {
    this.$root.$on('intersected', (payload) => {
      if (this.id === payload.id) {
        if (this.intersected) {
          console.error('element was already intersecting!');
        } else {
          this.intersected = true;
        }
      }
    });

    this.$root.$emit('add-element', {
      node: this.$el,
      id: this.id
    });
  },
  beforeDestroy() {
    this.$root.$emit('remove-element', {
      node: this.$el,
      id: this.id
    });
    //TODO: de-register from the 'intersected'-Event, otherwise the listener will still fire, even though the element is long gone..
  }
}
</script>
