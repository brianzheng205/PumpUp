<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import ToggleLink from "../../Link/ToggleLink.vue";

const props = defineProps(["competition"]);
const emit = defineEmits(["editCompetition", "refreshCompetitions"]);

const { currentUsername } = storeToRefs(useUserStore());

// const comments = ref<Array<Record<string, string>>>([]); // TODO: change to data instead
const link = ref<Record<string, string> | null>(null);
const editing = ref("");

const deleteCompetition = async () => {
  try {
    await fetchy(`/api/competitions/${props.competition._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshCompetitions");
};

// const getCompetitionComments = async (owner?: string) => {
//   const query: Record<string, string> = owner !== undefined ? { owner } : {};
//   try {
//     comments.value = await fetchy(`/api/items/${props.competition._id}/comments`, "GET", { query });
//   } catch {
//     return;
//   }
// };

const setEditing = (itemId: string) => {
  editing.value = itemId;
};

const getCompetitionLink = async () => {
  try {
    link.value = await fetchy(`/api/links`, "GET", { query: { itemId: props.competition._id } });
  } catch {
    return;
  }
};

const createCompetitionLink = async () => {
  try {
    link.value = await fetchy(`/api/links/competitions`, "POST", { body: { competitionId: props.competition._id } });
  } catch {
    return;
  }
};

const deleteCompetitionLink = async () => {
  if (link.value === null) return;

  try {
    await fetchy(`/api/links/competitions/${link.value._id}`, "DELETE");
    link.value = null;
  } catch {
    return;
  }
};

onBeforeMount(async () => {
  // await getCompetitionComments();
  await getCompetitionLink();
});
</script>

<template>
  <p class="title">{{ props.competition.name }}</p>
  <p v-if="props.competition.owner">Created by {{ props.competition.owner }}</p>
  <div class="base">
    <menu v-if="props.competition.owner == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editCompetition', props.competition._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteCompetition">Delete</button></li>
      <li><ToggleLink :linkExists="link !== null" @createLink="createCompetitionLink" @deleteLink="deleteCompetitionLink" /></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.competition.dateCreated !== props.competition.dateUpdated">Edited on: {{ formatDate(props.competition.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.competition.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.title {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
