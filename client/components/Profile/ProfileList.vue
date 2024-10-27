<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { Status } from "@/utils/types";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import Profile from "./Profile.vue";
import SearchProfileForm from "./SearchProfileForm.vue";

const users = ref<Record<string, string>[]>([]);
const friends = ref<Set<string>>(new Set());
const incomingFriendRequests = ref<Set<string>>(new Set());
const outgoingFriendRequests = ref<Set<string>>(new Set());
const loading = ref(true);
const searchAuthor = ref("");

const { currentUsername } = storeToRefs(useUserStore());

const getUsers = async (username?: string) => {
  const query: Record<string, string> = username !== undefined ? { username } : {};
  try {
    const allUsers = await fetchy("/api/users", "GET", { query });
    users.value = allUsers.filter((user: Record<string, string>) => user.username !== currentUsername.value);
  } catch {
    return;
  }
};

const getFriends = async () => {
  try {
    const friendsList = await fetchy("/api/friends", "GET");
    friends.value = new Set(friendsList);
  } catch {
    return;
  }
};

const getFriendRequests = async () => {
  try {
    const friendRequests = await fetchy("/api/friend/requests", "GET");
    incomingFriendRequests.value = new Set(
      friendRequests.filter((request: Record<string, string>) => request.to === currentUsername.value && request.status === "pending").map((request: Record<string, string>) => request.from),
    );
    outgoingFriendRequests.value = new Set(
      friendRequests.filter((request: Record<string, string>) => request.from === currentUsername.value && request.status === "pending").map((request: Record<string, string>) => request.to),
    );
  } catch {
    return;
  }
};

const getStatus = (profile: Record<string, string>): Status => {
  if (friends.value.has(profile.username)) return Status.FRIENDS;
  if (incomingFriendRequests.value.has(profile.username)) return Status.RECEIVED;
  if (outgoingFriendRequests.value.has(profile.username)) return Status.SENT;
  return Status.NONE;
};

onBeforeMount(async () => {
  await getUsers();
  await getFriends();
  await getFriendRequests();
  loading.value = false;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchAuthor">Profiles:</h2>
    <h2 v-else>Profiles by {{ searchAuthor }}:</h2>
    <SearchProfileForm />
  </div>
  <section v-if="!loading && users.length !== 0">
    <article v-for="profile in users" :key="profile._id">
      <Profile :profile="profile" :status="getStatus(profile)" @refreshFriends="getFriends" @refreshFriendRequests="getFriendRequests" />
    </article>
  </section>
  <p v-else-if="!loading">No profiles found</p>
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
