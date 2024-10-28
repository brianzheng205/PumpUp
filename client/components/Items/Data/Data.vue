<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["data"]);
const emit = defineEmits(["refreshData"]);

const deleteData = async () => {
  try {
    await fetchy(`/api/data/${props.data._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshData");
};
</script>

<template>
  <h1 class="score">{{ props.data.score }}</h1>
  <p class="date">{{ formatDate(props.data.date) }}</p>
  <div class="score-bar">
    <div class="score-bar-inner" :style="{ width: `${props.data.score}%` }"></div>
  </div>
  <div class="base">
    <button class="button-error btn-small pure-button" @click="deleteData">Delete</button>
  </div>
</template>

<style scoped>
.date {
  font-size: 1.2em;
  text-align: center;
}

.score {
  font-weight: bold;
  text-align: center;
}

.score-bar {
  height: 1em;
  background-color: var(--gray);
  border-radius: 0.5em;
}

.score-bar-inner {
  height: 100%;
  background-color: var(--green);
  border-radius: 0.5em;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
