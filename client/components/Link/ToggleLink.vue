<script setup lang="ts">
const props = defineProps({
  linkExists: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["createLink", "deleteLink"]);
</script>

<template>
  <button v-if="!props.linkExists" @click="emit('createLink')">Create Link</button>
  <button v-else @click="emit('deleteLink')">Delete Link</button>
</template>
