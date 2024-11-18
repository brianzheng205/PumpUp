<script setup lang="ts">
const props = defineProps<{
  isLinked: boolean | null;
}>();
const emit = defineEmits<{
  (e: "setIsLinked", value: boolean): void;
}>();
</script>

<template>
  <div class="link-at-creation">
    <p>Do you want this to be anonymous?</p>
    <ul class="options">
      <li :class="{ selected: props.isLinked === false }" @click="emit('setIsLinked', false)">Yes</li>
      <li :class="{ selected: props.isLinked === true }" @click="emit('setIsLinked', true)">No</li>
    </ul>
  </div>
</template>

<style scoped>
.link-at-creation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.options {
  display: flex;
  gap: 0.5em;
  list-style: none;
  padding: 0;
  margin: 0;
}

.options li {
  background-color: var(--gray);
  padding: 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
}

.options li.selected {
  background-color: var(--green);
}
</style>
