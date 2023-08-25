<template>
  <div>
    <p>hello i am teacher</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("i am mounted");
  },
  beforeMount() {
    console.log("i am before mounted");
    
  },
  created() {
    console.log("i am created");
  },
  beforeCreate() {
    console.log("i am before create");
    
  },
}
</script>

<style scoped>
</style>