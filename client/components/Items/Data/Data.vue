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
  <p class="date">{{ formatDate(props.data.date) }}</p>
  <p class="score">Intensity: {{ props.data.score }}</p>
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
  font-size: 1.2em;
  font-weight: bold;
}

.menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
