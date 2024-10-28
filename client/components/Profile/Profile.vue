<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { formatDateTime } from "@/utils/formatDate";
import { Status } from "@/utils/types";

const props = defineProps<{
  profile: any;
  status: Status;
}>();
const emit = defineEmits<{
  (e: "refreshFriends"): void;
  (e: "refreshFriendRequests"): void;
}>();

const sendFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/requests/${props.profile.username}`, "POST");
    emit("refreshFriendRequests");
  } catch {
    return;
  }
};

const removeFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/requests/${props.profile.username}`, "DELETE");
    emit("refreshFriendRequests");
  } catch {
    return;
  }
};

const acceptFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/accept/${props.profile.username}`, "PUT");
    emit("refreshFriendRequests");
    emit("refreshFriends");
  } catch {
    return;
  }
};

const rejectFriendRequest = async () => {
  try {
    await fetchy(`/api/friend/reject/${props.profile.username}`, "PUT");
    emit("refreshFriendRequests");
  } catch {
    return;
  }
};

const removeFriend = async () => {
  try {
    await fetchy(`/api/friends/${props.profile.username}`, "DELETE");
    emit("refreshFriends");
  } catch {
    return;
  }
};
</script>

<template>
  <article>
    <h2 class="username">{{ props.profile.username }}</h2>
    <div class="base">
      <menu>
        <li v-if="props.status === Status.NONE"><button class="btn-small pure-button" @click="sendFriendRequest">Send Friend Request</button></li>
        <li v-else-if="props.status === Status.SENT"><button class="button-error btn-small pure-button" @click="removeFriendRequest">Cancel Friend Request</button></li>
        <li v-else-if="props.status === Status.RECEIVED"><button class="btn-small pure-button btn-primary" @click="acceptFriendRequest">Accept Friend Request</button></li>
        <li v-if="props.status === Status.RECEIVED"><button class="button-error btn-small pure-button" @click="rejectFriendRequest">Reject Friend Request</button></li>
        <li v-else-if="props.status === Status.FRIENDS"><button class="button-error btn-small pure-button" @click="removeFriend">Remove Friend</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.profile.dateCreated !== props.profile.dateUpdated">Edited on: {{ formatDateTime(props.profile.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDateTime(props.profile.dateCreated) }}</p>
      </article>
    </div>
  </article>
</template>
