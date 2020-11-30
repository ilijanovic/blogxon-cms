<template>
  <div class="rounded-md border shadow-md p-3">
    <h1 class="mb-5">Statistics</h1>
    <div class="flex mb-3 justify-between">
      <p>Total views</p>
      <p>{{ statistics.views }}</p>
    </div>
    <div class="flex mb-3 justify-between">
      <p>Total likes</p>
      <p>{{ statistics.likes }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['statistics'],
}
</script>

