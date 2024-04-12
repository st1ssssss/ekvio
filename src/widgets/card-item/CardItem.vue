<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
const props = defineProps<{
    label: string
}>()
</script>
<template>
    <e-card class="card-item">
        <h4>{{ label }}</h4>
        <div class="item-content">
            <e-button class="item-e-btn" :label="'Выбрать файл'"></e-button>
            <span>Файл не выбран</span>
        </div>
        <p>
            Hint text
        </p>
    </e-card>
</template>
<style scoped>
.card-item{
    gap: 10px;
}
.item-e-btn{
margin-right: 16px;
}
</style>