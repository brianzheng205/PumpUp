<script setup lang="ts">
const emit = defineEmits(["setIsLinked"]);
</script>

<template>
  <div>
    <p>Do you want to link your username to this item?</p>
    <label for="link-yes">Yes</label>
    <input type="radio" id="link-yes" name="link" @click="emit('setIsLinked', true)" />
    <label for="link-no">No</label>
    <input type="radio" id="link-no" name="link" @click="emit('setIsLinked', false)" />
  </div>
</template>
