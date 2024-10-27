<script setup lang="ts">
import { useEditStore } from "@/stores/editing";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  competition: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: "refreshCompetitions", author?: string): void;
}>();

const editStore = useEditStore();
const { currentUsername } = storeToRefs(useUserStore());

const members = ref<Set<string>>(new Set());
const memberScores = ref<Record<string, string>[]>([]);

const deleteCompetition = async () => {
  try {
    await fetchy(`/api/competitions/${props.competition.name}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshCompetitions");
};

const getCompetitionMembers = async () => {
  try {
    const memberships = await fetchy(`/api/competitions/${props.competition.name}/users`, "GET");
    members.value = new Set(memberships.map((membership: Record<string, string>) => membership.user));
  } catch {
    return;
  }
};

const joinCompetition = async () => {
  try {
    await fetchy(`/api/competitions/${props.competition.name}/users`, "POST");
  } catch {
    return;
  }
  getCompetitionMembers();
};

const leaveCompetition = async () => {
  try {
    await fetchy(`/api/competitions/${props.competition.name}/users`, "DELETE");
  } catch {
    return;
  }
  getCompetitionMembers();
};

// /competitions/:name/scores
const getHighScores = async () => {
  try {
    memberScores.value = await fetchy(`/api/competitions/${props.competition._id}/scores`, "GET");
  } catch {
    return;
  }
};

onBeforeMount(async () => {
  await getCompetitionMembers();
  await getHighScores();
});
</script>

<template>
  <p class="title">{{ props.competition.name }}</p>
  <p v-if="props.competition.owner">Created by {{ props.competition.owner }}</p>
  <p>End Date: {{ formatDate(props.competition.endDate) }}</p>
  <p>Members:</p>
  <ul>
    <li v-for="member in memberScores">{{ member.username }} : {{ member.highScore }}</li>
  </ul>
  <div class="base">
    <menu v-if="props.competition.owner == currentUsername">
      <li><button class="btn-small pure-button" @click="editStore.setEditing(props.competition._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteCompetition">Delete</button></li>
    </menu>
    <button v-else-if="!members.has(currentUsername)" class="btn-small pure-button" @click="joinCompetition">Join</button>
    <button v-else class="button-error btn-small pure-button" @click="leaveCompetition">Leave</button>
    <article class="timestamp">
      <p v-if="props.competition.dateCreated !== props.competition.dateUpdated">Edited on: {{ formatDateTime(props.competition.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDateTime(props.competition.dateCreated) }}</p>
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
