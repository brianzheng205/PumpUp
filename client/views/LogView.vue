<script setup lang="ts">
import CreateDataForm from "@/components/Items/Data/CreateDataForm.vue";
import DataList from "@/components/Items/Data/DataList.vue";
</script>

<template>
  <main>
    <h1>Log A Workout!</h1>
    <div>
      <CreateDataForm />
      <DataList />
    </div>
  </main>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: 60%;
  margin: 0 auto;
}

h1 {
  text-align: center;
}
</style>
