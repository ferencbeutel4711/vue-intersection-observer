<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      observer: null,
      nodeCache: {},
      observedIds: []
    }
  },
  props: {
    observeElementEventName: String,
    unobserveElementEventName: String,
    intersectionEventName: String,
    observedIdCachingEnabled: Boolean,
    intersectionThreshold: Number
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => {
        return entry.intersectionRatio >= this.intersectionThreshold;
      }).forEach((entry) => {
        const cachedElement = Object.entries(this.nodeCache).filter((cacheEntry) => cacheEntry[1] === entry.target)[0];
        if(!cachedElement) {
          console.error('intersecting node not present in nodeCache!');
        } else {
          if (this.observedIdCachingEnabled) {
            if (cachedElement && !this.observedIds.includes(cachedElement[0])) {
              this.observedIds.push(cachedElement[0]);
              this.$root.$emit(this.intersectionEventName, {
                id: cachedElement[0],
                node: cachedElement[1]
              });
            }
          } else {
            this.$root.$emit(this.intersectionEventName, {
              id: cachedElement[0],
              node: cachedElement[1]
            });
          }
        }
      });
    }, {threshold: this.intersectionThreshold});

    this.$root.$on(this.observeElementEventName, ({node, id}) => {
      if (!this.nodeCache[id] || this.nodeCache[id] !== node) {
        this.nodeCache[id] = node;
        this.observer.observe(node);
      }
    });

    this.$root.$on(this.unobserveElementEventName, ({node, id}) => {
      this.nodeCache[id] = null;
    });
  }
}
</script>
