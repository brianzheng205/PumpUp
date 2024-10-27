<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["getUser"]);

const username = ref("");
</script>

<template>
  <form @submit.prevent="emit('getUser', username)" class="pure-form">
    <fieldset>
      <legend>Search By Username</legend>
      <input id="username" type="text" v-model="username" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
