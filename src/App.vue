<template>
<router-view :class="theme" :context="context" @set-theme="theme=$event"></router-view>
</template>

<script>
//-----------------------------------------------
import Context from './models/Context'
//-----------------------------------------------
export default {
  name: 'App',
  data() {
    return {
      context: null,
      theme: 'dark'
    }
  },
  created() {
    this.context = new Context();
  }
}
</script>