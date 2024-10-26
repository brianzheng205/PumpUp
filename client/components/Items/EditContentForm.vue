<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";
import { ref } from "vue";

const props = defineProps(["contentContainer"]);
const content = ref(props.contentContainer.content);
const emit = defineEmits(["editContainer", "setEditing"]);
// TODO: allow editing of all info
</script>

<template>
  <form @submit.prevent="emit('editContainer', content)">
    <p class="author">{{ props.contentContainer.author }}</p>
    <textarea id="content" v-model="content" placeholder="Create a item!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('setEditing')">Cancel</button></li>
      </menu>
      <p v-if="props.contentContainer.dateCreated !== props.contentContainer.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.contentContainer.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.contentContainer.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
