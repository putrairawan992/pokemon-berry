<template>
  <main>
    <Header :title="$t('listBerry')" />
    <div class="flex items-center justify-end px-5">
      <RouterLink to="/create" class="p-button p-button-sm">{{
        $t("create")
      }}</RouterLink>
    </div>
    <DataTable
      v-model:filters="filters"
      :value="berries"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 30, 50]"
      tableStyle="min-width: 10rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      :globalFilterFields="['name']"
    >
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              :placeholder="$t('searchBerry')"
            />
          </IconField>
        </div>
      </template>

      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text @click="fetchData" />
      </template>

      <Column field="no" :header="$t('No')" style="width: 10%"></Column>
      <Column :header="$t('image')" style="width: 20%">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            alt="Berry"
            class="w-20 h-20"
            v-if="slotProps.data.image"
          />
        </template>
      </Column>
      <Column
        field="name"
        :header="$t('name')"
        sortable
        style="width: 40%"
      ></Column>
      <Column :header="$t('actions')" style="width: 30%">
        <template #body="slotProps">
          <button
            @click="fetchDetails(slotProps.data.name)"
            class="p-button p-button-sm"
          >
            {{ $t("detail") }}
          </button>
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import Header from "../components/Header.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { fetchBerries, fetchBerryDetail } from "../api/berry";

const berries = ref<{ no: number; name: string; image: string | null }[]>([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchData = async () => {
  try {
    const data = await fetchBerries();
    berries.value = data.map((berry: any, index: number) => {
      const idMatch = berry.url.match(/\/berry\/(\d+)\//);
      const id = idMatch ? idMatch[1] : "0";
      return {
        no: index + 1,
        name: berry.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
  } catch (error) {
    console.error("Error fetching berries:", error);
  }
};

const fetchDetails = async (name: string) => {
  try {
    await fetchBerryDetail(name);
    window.location.href = "/detail/" + name;
  } catch (error) {
    console.error("Error fetching berry details:", error);
  }
};

onMounted(fetchData);
</script>
