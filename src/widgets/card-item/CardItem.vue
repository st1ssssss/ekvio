<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
import { ref, watch, type Ref } from 'vue';
import type { HTMLInputEvent } from './config';
import ELoader from '@/components/ui/loader/ELoader.vue';
import { RefSymbol } from '@vue/reactivity';

const randomPhrase = ['Почти закончили...', 'Еще чуть-чуть...', 'Совсем немного...']

const props = defineProps<{
    label: string
}>()

const fileName:Ref<string|undefined> = ref('Файл не выбран')
const loading = ref(false)
const errorMsg = ref('HintText')

const chooseFile = () => {
    document.getElementById('uploader')?.click()
}
const uploadFile = (event:HTMLInputEvent) => {
    fileName.value = 'Файл не выбран'
    errorMsg.value = randomPhrase[Math.floor(Math.random()*3)]
    loading.value = true
    setTimeout(()=>{
        loading.value = false
        fileName.value = event.target.files?.item(0)?.name
    }, 3000)
}

watch(fileName, (val)=>{
    if(val === 'undefined'){
        fileName.value = 'Файл не выбран'
        errorMsg.value = 'Вы не выбрали файл'
    }else{
        fileName.value = val?.slice(0, 12)+ '...' + val?.slice(-5)
    }
})
</script>
<template>
    <e-card class="card-item">
        <h4>{{ label }}</h4>
        <div class="item-content">
            <e-button class="item-e-btn" :label="'Выбрать файл'" @click="chooseFile"/>
            <span v-if="!loading">{{fileName}}</span>
            <e-loader v-if="loading"/>
            <input type="file" name="" id="uploader" @change="uploadFile">
        </div>
        <p>
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
</style>