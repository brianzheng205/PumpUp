<script setup lang="ts">
import CreateCompetitionForm from "@/components/Items/Competition/CreateCompetitionForm.vue";
import CreatePostForm from "@/components/Items/Post/CreatePostForm.vue";
</script>

<template>
  <main>
    <h1>Create Something!</h1>
    <div>
      <CreatePostForm />
      <CreateCompetitionForm />
    </div>
  </main>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

h1 {
  text-align: center;
}
</style>
