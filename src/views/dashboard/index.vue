<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <ObServe></ObServe>
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import ObServe from './ObServe'
export default {
  name: 'Dashboard',
  computed: {

  },
  components:{Card,Sale,ObServe}
}
</script>

<style lang="scss" scoped>

</style>
