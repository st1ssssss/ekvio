<script setup lang="ts">
import FileLoader from '@/widgets/file-loader/FileLoader.vue'
import ECard from '@/components/ui/card/ECard.vue'
import CardItem from '@/widgets/card-item/CardItem.vue'
import { onMounted, ref, type Ref } from 'vue';
import type {IJSONFile} from '@/widgets/file-loader/config'

const items:Ref<File[]|IJSONFile[]> = ref([])

const itemAppend = (file:File) => {
    const data:File[] = JSON.parse(localStorage.getItem('FILES')!)
    const toJSONFile:IJSONFile = {
        'name': file.name,
        'lastModified': file.lastModified,
        'size': file.size,
        'type': file.type,
        'webkitRelativePath': file.webkitRelativePath,
    }
    const reducedData = [toJSONFile, ...data] 
    items.value = [...reducedData]
    localStorage.setItem('FILES', JSON.stringify([...reducedData]))
}

const deleteItem = (file:File) => {
    const data:File[] = JSON.parse(localStorage.getItem('FILES')!)
    const reduced = data.filter(el => el.name != file.name)
    items.value = [...reduced]
    localStorage.setItem('FILES', JSON.stringify(reduced))
}

onMounted(()=>{
    localStorage.setItem('FILES', JSON.stringify([]))
})
</script>
<template>
    <e-card bordered :border-rad="'16'" with-padding class="board" :padding-type="'custom'" :padding-num="'0px 20px 22px'">
        <file-loader class="file-loader" :label="'Label'" @item-uploaded="itemAppend" @item-to-delete="deleteItem"></file-loader>
        <div class="card-items-wrapper" v-if="items.length">
            <card-item v-for="item in items" :fileToBeRoot="item" :key="item.size" :label="item.name" @item-uploaded="itemAppend" @item-to-delete="deleteItem"></card-item>
        </div>
    </e-card>
</template>
<style scoped>
.board{
    width: 35%;
    max-height: 90vh;
    overflow: auto;
    gap: 48px;
    -ms-overflow-style: none;  
    scrollbar-width: none; 
}
.board::-webkit-scrollbar {
    width: 0px;  
    background: transparent;
}
.file-loader{
    position: sticky;
    top:0
}
.card-items-wrapper{
    display: flex;
    flex-direction: column;
    gap: 48px;
}
</style>