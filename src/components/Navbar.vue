<template>
  <div class="navbar bg-base-100 border-b border-gray-300 px-5 flex items-center lg:justify-end justify-between">
    <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
      <li class="pi pi-bars"></li>
    </label>
    <div class="flex items-center gap-6">
      <div>
        <Select
          v-model="selectedLang"
          :options="languages"
          optionLabel="name"
          optionValue="code"
          :placeholder="$t('language')"
          class="w-full md:w-56"
          @change="changeLanguage"
        />
      </div>
      <Divider layout="vertical" class="h-10" />
      <div class="flex items-center gap-4">
        <div class="block -space-y-1 text-sm text-end">
          <span class="font-bold">Jhon Doe</span>
          <span class="block text-xs">jhon@example.com</span>
        </div>
        <Avatar icon="pi pi-user" class="mr-2" size="large" shape="circle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";

const Select = defineAsyncComponent(() => import("primevue/select"));
const Avatar = defineAsyncComponent(() => import("primevue/avatar"));
const Divider = defineAsyncComponent(() => import("primevue/divider"));

export default defineComponent({
  name: "Navbar",
  components: {
    Select,
    Avatar,
    Divider,
  },
  setup() {
    const { locale } = useI18n();

    const languages = ref([
      { name: "English", code: "en" },
      { name: "Indonesia", code: "id" },
    ]);

    const selectedLang = ref(locale.value);

    const changeLanguage = () => {
      locale.value = selectedLang.value;
      localStorage.setItem("lang", selectedLang.value);
    };

    return {
      selectedLang,
      languages,
      changeLanguage,
    };
  },
});
</script>
