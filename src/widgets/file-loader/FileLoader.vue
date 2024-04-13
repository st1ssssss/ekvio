<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
import { computed, ref, watch, type Ref } from 'vue';
import ELoader from '@/components/ui/loader/ELoader.vue';
import type { HTMLInputEvent, btnFLLabels } from './config';
import {randomPhrase} from './config'

const emits = defineEmits<{
    (e:'itemUploaded', value: File): void,
}>()

const fileName:Ref<string|undefined> = ref('Файл не выбран')
const loading = ref(false)

const btnLabel:Ref<btnFLLabels> = ref('Выбрать файл')
const errorMsg = ref('HintText')
let timeout: number

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
    const file:File = event.target.files?.item(0)!
    if(file !== null){
        errorMsg.value = randomPhrase[Math.floor(Math.random()*3)]
        loading.value = true
        btnLabel.value = 'Отменить'
        timeout = setTimeout(()=>{
        loading.value = false
        fileName.value = event.target.files?.item(0)?.name
        errorMsg.value = 'Успешно загружено!'
        btnLabel.value = 'Выбрать файл'
        emits('itemUploaded', file) 
    }, 3000)
    }else{
        errorMsg.value = 'Вы не выбрали файл'
    }
}

const btnFuncReducer = () => {
    switch (btnLabel.value) {
        case 'Выбрать файл':
            chooseFile()
            break;
        case 'Отменить':
            clearTimeout(timeout)
            errorMsg.value = 'Загрузка прервана'
            loading.value = false
            btnLabel.value = 'Выбрать файл'
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
        fileName.value = 'Выберите файл для загрузки'
    }
})

</script>
<template>
    <e-card class="card-item" :padding-type="'custom'" :padding-num="'22px 0px 0px 0px'">
        <h4>File loader</h4>
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