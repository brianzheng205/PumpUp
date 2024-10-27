<script setup lang="ts">
import CreateDataForm from "@/components/Items/Data/CreateDataForm.vue";
import DataList from "@/components/Items/Data/DataList.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
const data = ref<Array<Record<string, string>>>([]);

const { currentUsername } = storeToRefs(useUserStore());

async function getData(date?: string, dateRange?: string) {
  let query: Record<string, string> = { username: currentUsername.value, sort: "date" };

  if (date) query.date = date;
  if (dateRange) query.dateRange = dateRange;

  try {
    console.log(query);
    data.value = await fetchy("/api/data", "GET", { query });
  } catch (_) {
    return;
  }
  loaded.value = true;
}

onBeforeMount(async () => {
  await getData();
  loaded.value = true;
});
</script>

<template>
  <main>
    <h1>Log A Workout!</h1>
    <div>
      <CreateDataForm @refreshData="getData()" />
      <DataList :data="data" :loaded="loaded" />
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
