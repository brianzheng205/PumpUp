<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import Data from "./Data.vue";

const loaded = ref(false);
const data = ref<Array<Record<string, string>>>([]);

const { currentUsername } = storeToRefs(useUserStore());

async function getData(username?: string, date?: string, dateRange?: string) {
  let query: Record<string, string> = { sort: "date" };

  if (username) query.username = username;
  if (date) query.date = date;
  if (dateRange) query.dateRange = dateRange;

  try {
    console.log("before");
    data.value = await fetchy("/api/data", "GET", { query });
    console.log(data.value);
  } catch (_) {
    return;
  }
  loaded.value = true;
}

onBeforeMount(async () => {
  await getData(currentUsername.value);
  loaded.value = true;
});
</script>

<template>
  <h2>Past Workouts:</h2>
  <section class="data" v-if="loaded && data.length !== 0">
    <article v-for="d in data" :key="d._id">
      <Data :data="d" @refreshData="getData" />
    </article>
  </section>
  <p v-else-if="loaded">No data found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  width: 100%;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.data {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  max-width: 60em;
}
</style>
