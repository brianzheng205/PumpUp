<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import SearchItemForm from "../SearchItemForm.vue";
import Competition from "./Competition.vue";

const loaded = ref(false);
const competitions = ref<Array<Record<string, string>>>([]);
const editing = ref("");
const searchUser = ref("");

async function getCompetitions(author?: string) {
  let query: Record<string, string> = author !== undefined ? { username: author } : {};
  let competitionResults;
  try {
    competitionResults = await fetchy("/api/competitions", "GET", { query });
  } catch (_) {
    return;
  }
  searchUser.value = author ? author : "";
  competitions.value = competitionResults;
}

function setEditing(id: string) {
  editing.value = id;
}

// TODO: implement editing
// const editCompetition = async (competitionId: string, content: string) => {
//   try {
//     await fetchy(`/api/competitions/${competitionId}`, "PATCH", { body: { content } });
//   } catch (e) {
//     return;
//   }
//   editing.value = "";
//   await getCompetitions();
// };

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
      <Competition v-if="editing !== competition._id" :competition="competition" @refreshCompetitions="getCompetitions" @editCompetition="setEditing" />
      <!-- <EditContentForm v-else :contentContainer="competition" @editContainer="(content: string) => editCompetition(competition._id, content)" @setEditing="setEditing" /> -->
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
