<template>
    <main>
        <Header :title="$t('create_product')" />
        <div class="mt-4 px-5 w-full max-w-2xl">
            <form @submit.prevent="submitProduct">
                <div class="mb-3">
                    <label class="label font-medium">{{ $t('name') }}</label>
                    <InputText v-model="formData.name" type="text" style="width: 100%;" class="mt-1"/>
                </div>

                <div class="mb-3">
                    <label class="label font-medium">{{ $t('image') }}</label>
                    <InputText type="file" @change="handleImageUpload" class="mt-1" style="width: 100%;" />
                </div>

                <div class="mb-3">
                    <label class="label font-medium">{{ $t('description') }}</label>
                    <InputText v-model="formData.description" type="text" style="width: 100%;" class="mt-1" />
                </div>

                <div class="mt-4">
                    <Button :label="$t('submit')" type="submit" />
                </div>
            </form>
        </div>
    </main>

    <Toast />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Header from "../components/Header.vue";
import { addProduct } from "../api/products";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const toast = useToast();

const formData = ref({
    name: "",
    description: "",
    image: "",
});

const handleImageUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        formData.value.image = URL.createObjectURL(file);
    }
};

const submitProduct = async () => {
    try {
        const newProduct = {
            title: formData.value.name,
            description: formData.value.description,
            image: formData.value.image || "https://via.placeholder.com/150",
            category: "electronics",
        };

        await addProduct(newProduct);
        
        toast.add({
            severity: "success",
            summary: t('success'),
            detail: t('product_success'),
            life: 3000, 
        });

        formData.value = { name: "", description: "", image: "" };
        setInterval(() => {
            window.location.href = "/"
        }, 3500);
    } catch (error) {
        console.error("Error submitting product:", error);
        
        toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to add product.",
            life: 3000,
        });
    }
};
</script>
