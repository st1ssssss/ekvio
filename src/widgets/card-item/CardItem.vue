<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
import { computed, onBeforeMount, ref, watch, type Ref } from 'vue';
import type { HTMLInputEvent } from './config';
import ELoader from '@/components/ui/loader/ELoader.vue';

const randomPhrase = ['Почти закончили...', 'Еще чуть-чуть...', 'Совсем немного...']

const props = defineProps<{
    label: string,
    fileToBeRoot?: File
}>()

const emits = defineEmits<{
    (e:'itemUploaded', value: File): void,
    (e:'itemToDelete', value: File): void
}>()

const fileName:Ref<string|undefined> = ref('Файл не выбран')
const loading = ref(false)
const errorMsg = ref('HintText')
const btnLabel = ref('Выбрать файл')
const rootFile = ref()

const errorMsgStyle = computed(()=>{
    let res
    switch (errorMsg.value) {
        case 'Вы не выбрали файл':
            res ='error'
            break        
        case 'HintText':
            res =''
            break
        default:
            res ='successed'
            break;
    }
    return res
})

const chooseFile = () => {
    document.getElementById('uploader')?.click()
}

const uploadFile = (event:HTMLInputEvent) => {
    const file = event.target.files?.item(0)!
    errorMsg.value = randomPhrase[Math.floor(Math.random()*3)]
    loading.value = true
    btnLabel.value = 'Отменить'
    setTimeout(()=>{
        loading.value = false
        fileName.value = event.target.files?.item(0)?.name
        errorMsg.value = 'Успешно загружено!'
        btnLabel.value = 'Удалить'
        rootFile.value = file
        emits('itemUploaded', file) 
    }, 3000)
}

const deleteFile = () => {
    
}

const btnFuncReducer = (event:HTMLInputEvent) => {
    switch (btnLabel.value) {
        case 'Выбрать файл':
            chooseFile() 
            break;
        case 'Отменить':
            break;
        case 'Удалить':
            deleteFile()
            emits('itemToDelete', rootFile.value)
            break;
        default:
            break;
    }
}

watch(fileName, (val)=>{
    if(val === undefined){
        fileName.value = 'Файл не выбран'
        errorMsg.value = 'Вы не выбрали файл'
        btnLabel.value = 'Выбрать файл'
    }else if(val!== 'Файл не выбран'){
        fileName.value = val?.slice(0, 15)+ '...' + val?.slice(-5)
    }
})

onBeforeMount(()=>{
    props.fileToBeRoot? rootFile.value = props.fileToBeRoot : ''
})
</script>
<template>
    <e-card class="card-item">
        <h4>{{ label }}</h4>
        <div class="item-content">
            <e-button class="item-e-btn" :label="btnLabel" @click="btnFuncReducer"/>
            <span v-if="!loading">{{fileName}}</span>
            <e-loader v-if="loading"/>
            <input type="file" name="" id="uploader" @change="uploadFile">
        </div>
        <p :class=errorMsgStyle>
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
.error{
    color: var(--c-red-500)
}
</style>