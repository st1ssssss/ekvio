<script setup lang="ts">
import ECard from '@/components/ui/card/ECard.vue'
import EButton from '@/components/ui/button/EButton.vue';
import { computed, ref, watch, type Ref } from 'vue';
import type { HTMLInputEvent } from './config';
import ELoader from '@/components/ui/loader/ELoader.vue';

const randomPhrase = ['Почти закончили...', 'Еще чуть-чуть...', 'Совсем немного...']


const emits = defineEmits<{
    (e:'itemUploaded', value: File): void,
}>()

const fileName:Ref<string|undefined> = ref('Файл не выбран')
const loading = ref(false)

const btnLabel = ref('Выбрать файл')
const rootFile = ref()
const errorMsg = ref('HintText')

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
    if(file !== null){
        errorMsg.value = randomPhrase[Math.floor(Math.random()*3)]
        loading.value = true
        btnLabel.value = 'Отменить'
        setTimeout(()=>{
        loading.value = false
        fileName.value = event.target.files?.item(0)?.name
        errorMsg.value = 'Успешно загружено!'
        if(rootFile.value){
            btnLabel.value = 'Удалить'
        }else{
            btnLabel.value = 'Выбрать файл'
        }
        emits('itemUploaded', file) 
    }, 3000)
    }else{
        errorMsg.value = 'Вы не выбрали файл'
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
    <e-card class="card-item">
        <h4>File loader</h4>
        <div class="item-content">
            <e-button class="item-e-btn" :label="btnLabel" @click="chooseFile"/>
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