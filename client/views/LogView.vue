<script setup lang="ts">
import CreateDataForm from "@/components/Items/Data/CreateDataForm.vue";
import DataList from "@/components/Items/Data/DataList.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
const data = ref<Array<Record<string, string>>>([]);
const selectedSort = ref<string>("date");
const selectedStartDate = ref<string | null>(null);
const selectedEndDate = ref<string | null>(null);

const { currentUsername } = storeToRefs(useUserStore());

async function getData() {
  let query: Record<string, string> = { username: currentUsername.value, sort: selectedSort.value };

  if (selectedStartDate.value) query.startDate = selectedStartDate.value;
  if (selectedEndDate.value) query.endDate = selectedEndDate.value;

  try {
    data.value = await fetchy("/api/data", "GET", { query });
  } catch (_) {
    return;
  }
  loaded.value = true;
}

function setEndDateToStartDate() {
  if (selectedStartDate.value) {
    selectedEndDate.value = selectedStartDate.value;
    getData();
  }
}

function clearDates() {
  selectedStartDate.value = null;
  selectedEndDate.value = null;
  getData();
}

onBeforeMount(async () => {
  await getData();
  loaded.value = true;
});
</script>

<template>
  <main class="col">
    <h1>Log A Workout!</h1>
    <div class="row">
      <article>
        <h2>Past Workouts:</h2>
        <div class="row">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="selectedSort" @change="getData()">
            <option value="date">Date</option>
            <option value="score">Score</option>
          </select>
        </div>
        <div class="row">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="selectedStartDate" @change="getData()" />
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="selectedEndDate" @change="getData()" />
        </div>
        <div class="row">
          <button class="btn-small pure-button btn" @click="setEndDateToStartDate" :disabled="selectedStartDate === null">Set End Date as Start Date</button>
          <button class="btn-small pure-button btn" @click="clearDates" :disabled="selectedStartDate === null && selectedEndDate === null">Clear</button>
        </div>
      </article>
      <CreateDataForm @refreshData="getData" />
    </div>
    <DataList :data="data" :loaded="loaded" />
  </main>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: 60%;
  margin: 0 auto;
}

h2 {
  margin: 0;
}

.row {
  display: flex;
  gap: 1em;
  align-items: center;
  height: 17vh;
}

article {
  align-items: center;
  gap: 1em;
  height: 100%;
}
</style>
