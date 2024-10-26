<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { computed, ref } from "vue";

const score = ref<number | null>(null);
const date = ref<Date | null>(null);

const canCreate = computed(() => score.value !== null && date.value !== null);

const logWorkout = async () => {
  if (score.value === null || date.value === null) return;

  try {
    await fetchy("/api/data", "POST", {
      body: { score: score.value.toString(), date: date.value.toString() },
    });
  } catch (_) {
    return;
  }
};
</script>

<template>
  <form class="create-form" @submit.prevent="logWorkout()">
    <h2>New Workout</h2>
    <label for="score">Intensity (0-100):</label>
    <input type="number" id="score" v-model="score" min="0" max="100" step="1" required />
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="date" required />
    <button type="submit" class="pure-button-primary pure-button" :disabled="!canCreate">Log Workout</button>
  </form>
</template>
