<script setup lang="ts">
import CompetitionList from "@/components/Items/Competition/CompetitionList.vue";
import ProfileList from "@/components/Profile/ProfileList.vue";
import { ref } from "vue";

const selected = ref("competitions");
</script>

<template>
  <main>
    <h1>Search</h1>
    <div>
      <select v-model="selected">
        <option value="competitions">Competitions</option>
        <option value="profiles">Profiles</option>
      </select>
    </div>
    <CompetitionList v-if="selected === 'competitions'" />
    <ProfileList v-else />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
