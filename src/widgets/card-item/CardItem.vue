<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
import {onMounted, ref, watch, type Ref } from 'vue';
import type { IJSONFile } from '../file-loader/config';

const props = defineProps<{
    label: string,
    fileToBeRoot?: File|IJSONFile
}>()

const emits = defineEmits<{
    (e:'itemToDelete', value: File): void
}>()

const fileName:Ref<string|undefined> = ref('Файл не выбран')
const loading = ref(false)
const errorMsg = ref('HintText')
const rootFile = ref()

const deleteFile = () => {
    emits('itemToDelete', rootFile.value)
}

watch(fileName, (val)=>{
        fileName.value = val?.slice(0, 15)+ '...' + val?.slice(-5)
})

onMounted(()=>{
    if(props.fileToBeRoot){
        rootFile.value = props.fileToBeRoot
        fileName.value = props.fileToBeRoot.name
        errorMsg.value = "Загружен"

    }
})
</script>
<template>
    <e-card class="card-item" >
        <h4>{{ label }}</h4>
        <div class="item-content">
            <e-button class="item-e-btn" :label="'Удалить'" @click="deleteFile"/>
            <span v-if="!loading">{{fileName}}</span>
        </div>
        <p class="successed">
            {{ errorMsg }}
        </p>
    </e-card>
</template>
<style scoped>
.card-item{
    gap: 10px;
}
.item-content{
    display: flex;
    align-items: center;
}
.item-e-btn{
margin-right: 16px;
}
#uploader{
    display: none;
}
.successed{
    color: var(--c-green-500)
}
</style>