<script setup lang="ts">
const props = defineProps<{
  isLinked: boolean | null;
}>();
const emit = defineEmits<{
  (e: "setIsLinked", value: boolean): void;
}>();
</script>

<template>
  <div>
    <p>Do you want to link your username to this item?</p>
    <label for="link-yes">Yes</label>
    <input type="radio" id="link-yes" name="link" :checked="props.isLinked === true" @click="emit('setIsLinked', true)" />
    <label for="link-no">No</label>
    <input type="radio" id="link-no" name="link" :checked="props.isLinked === false" @click="emit('setIsLinked', false)" />
  </div>
</template>
