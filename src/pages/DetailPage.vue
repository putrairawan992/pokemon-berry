<template>
    <Header :title="$t('detail_list_berry')" />
    <main class="px-5">
      <section>
        <div v-if="berryDetail" class="card shadow-sm border-2 border-gray-300 rounded-2xl max-w-lg">
          <div class="card-body">
            <div class="flex items-center flex-row w-full gap-4">
              <div class="avatar">
                <div class="mask mask-squircle w-24">
                  <img :src="berryImageUrl" :alt="berryDetail.name" />
                </div>
              </div>
              <div class="block">
                <h1 class="text-2xl font-bold capitalize">{{ berryDetail.name }}</h1>
                <p>Size: {{ berryDetail.size }}</p>
                <p>Growth Time: {{ berryDetail.growth_time }}</p>
                <p>Smoothness: {{ berryDetail.smoothness }}</p>
              </div>
            </div>
            <div class="divider"></div>
            <div>
              <h2 class="text-lg font-semibold">Flavors</h2>
              <div class="flex flex-wrap gap-2 mt-2">
                <span 
                  v-for="flavor in berryDetail.flavors" 
                  :key="flavor.flavor.name"
                  class="badge"
                  :class="getBadgeClass(flavor.potency)">
                  {{ flavor.flavor.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-5">
          <p>Loading...</p>
        </div>
      </section>
    </main>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import Header from "../components/Header.vue";
  
  const route = useRoute();
  const berryDetail = ref<any>(null);
  
  const fetchBerryDetail = async (name: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/berry/${name}`);
      berryDetail.value = response.data;
    } catch (error) {
      console.error("Error fetching berry detail:", error);
    }
  };
  
  const berryImageUrl = computed(() => {
    if (!berryDetail.value) return "";
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${berryDetail.value.id}.png`;
  });
  
  const getBadgeClass = (potency: number) => {
    if (potency >= 10) return "badge-primary"; // Biru
    if (potency >= 5) return "badge-secondary"; // Abu-abu
    return "badge-ghost"; // Putih transparan
  };
  
  onMounted(() => {
    const berryName = route.params.id as string;
    fetchBerryDetail(berryName);
  });
  </script>
  