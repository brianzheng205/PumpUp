<script setup lang="ts">
import { useEditStore } from "@/stores/editing";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import ToggleLink from "../../Link/ToggleLink.vue";

const props = defineProps<{
  competition: any;
}>();
const emit = defineEmits<{
  (e: "refreshCompetitions", author?: string): void;
}>();

const editStore = useEditStore();
const { currentUsername } = storeToRefs(useUserStore());

const link = ref<Record<string, string> | null>(null);

const deleteCompetition = async () => {
  try {
    await fetchy(`/api/competitions/${props.competition.name}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshCompetitions");
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
  await getCompetitionLink();
});
</script>

<template>
  <p class="title">{{ props.competition.name }}</p>
  <p v-if="props.competition.owner">Created by {{ props.competition.owner }}</p>
  <p>End Date: {{ new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(props.competition.endDate)) }}</p>
  <div class="base">
    <menu v-if="props.competition.owner == currentUsername">
      <li><button class="btn-small pure-button" @click="editStore.setEditing(props.competition._id)">Edit</button></li>
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
