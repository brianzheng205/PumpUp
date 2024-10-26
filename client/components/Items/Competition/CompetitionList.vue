<script setup lang="ts">
import { useEditStore } from "@/stores/editing";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchItemForm from "../SearchItemForm.vue";
import Competition from "./Competition.vue";
import EditCompetitionForm from "./EditCompetitionForm.vue";

const editStore = useEditStore();
const { editingId } = storeToRefs(editStore);

const loaded = ref(false);
const competitions = ref<Array<Record<string, string>>>([]);
const searchUser = ref("");

async function getCompetitions(author?: string) {
  let query: Record<string, string> = author !== undefined ? { username: author } : {};
  let competitionResults;
  try {
    competitionResults = await fetchy("/api/competitions", "GET", { query });
  } catch (_) {
    return;
  }
  console.log(competitionResults);
  searchUser.value = author ? author : "";
  competitions.value = competitionResults;
}

// TODO: make each article clickable

onBeforeMount(async () => {
  await getCompetitions();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchUser">Competitions:</h2>
    <h2 v-else>Competitions by {{ searchUser }}:</h2>
    <SearchItemForm legendText="Search By User" @getItemsByUser="getCompetitions" />
  </div>
  <section class="competitions" v-if="loaded && competitions.length !== 0">
    <article v-for="competition in competitions" :key="competition._id">
      <Competition v-if="editingId !== competition._id" :competition="competition" @refreshCompetitions="getCompetitions" />
      <EditCompetitionForm v-else :competition="competition" @refreshCompetitions="getCompetitions" />
    </article>
  </section>
  <p v-else-if="loaded">No competitions found</p>
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
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.competitions {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
