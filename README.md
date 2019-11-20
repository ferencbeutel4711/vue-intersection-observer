# Vue-Intersection-Observer

This package can be used to integrate an IntersectionObserver into Vue.js as a custom component.

This Component is able to dynamically register/ unregister nodes to observe. Furthermore, it has a caching mechanism available
as well, in case you only want the intersection to be reported once.

The Component makes heavy use of Vue custom events propagated through the $root-instance.

## Installation

TBD

## How to use

include the Intersection-Observer in your vue single file component like this:

```
<template>
<div>
    <IntersectionObserver observe-element-event-name="add-element" unobserve-element-event-name="remove-element"
                          intersection-event-name="intersected" :observed-id-caching-enabled="cachingEnabled"
                          :intersection-threshold="0.75"/>
</div>
</template>
<script>
import IntersectionObserver from 'IntersectionObserver';

export default {
components: {
    IntersectionObserver
}
}
</script>
```

Obviously, using the other ways of instantiating a vue instance would work with this as well.

There is also an example included in this repo.

### API
As you can see, the IntersectionObserver has a number of properties that need to be defined.

- observe-element-event-name: The string event-name that the IntersectionObserver Component will listen on for node registration
    - When you emit this event, please provide a payload like `{id: 'your-elements-id', node: 'node-to-register'}`
- unobserve-element-event-name: The string event-name that the IntersectionObserver Component will listen on for node de-registration
    - When you emit this event, please provide a payload like `{id: 'your-elements-id', node: 'node-to-de-register'}`
- intersection-event-name: The string event name that this component will emit once an intersection happened.
    - When you listen on this event, please expect a payload like: `{id: 'your-elements-id', node: 'intersecting-node'}`
- observed-id-caching-enabled: This boolean flag determines if the internal caching ob observered elements is enabled or not.
Further information down below.
- intersection-threshold: This Number between 0 and 1 determines how much of an element needs to be in the viewport percentage-wise
to trigger the intersection event

### Caching
If you want to use the internal caching, please keep this in mind:
- Due to how short-lived dom-nodes can be while using vue, the id you are providing during the node registration will be used for the caching
- If the caching is enabled, it means that once an id triggered an intersection-event, there will be no more events for this id