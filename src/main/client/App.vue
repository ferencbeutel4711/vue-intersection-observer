<template>
  <div class="test-app">
    <button @click="reload">Reload</button>
    <button @click="toggleCaching">{{cachingToggleButtonLabel}}</button>
    <IntersectionObserver observe-element-event-name="add-element" unobserve-element-event-name="remove-element"
                          intersection-event-name="intersected" :observed-id-caching-enabled="cachingEnabled"
                          :intersection-threshold="0.75"/>
    <TestEntry v-for="entry in testData" :key="entry.id" :id="entry.id"></TestEntry>
  </div>
</template>
<script>
import IntersectionObserver from './component/IntersectionObserver.vue';
import TestEntry from "./TestEntry";

export default {
  components: {
    TestEntry,
    IntersectionObserver
  },
  computed: {
    cachingToggleButtonLabel() {
      return this.cachingEnabled ? 'disable caching' : 'enable caching';
    }
  },
  data() {
    return {
      cachingEnabled: true,
      testData: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '6'
        },
      ]
    }
  },
  methods: {
    reload() {
      const localTestDataCopy = this.testData;
      this.testData = [];
      setTimeout(() => this.testData = localTestDataCopy, 1);
    },
    toggleCaching() {
      this.cachingEnabled = !this.cachingEnabled;
    }
  }
}
</script>
