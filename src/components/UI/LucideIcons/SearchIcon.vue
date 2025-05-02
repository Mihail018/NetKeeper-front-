<template>
    <SearchCheck class="search-icon" />
</template>

<script setup>
    import { SearchCheck } from 'lucide-vue-next';

    defineOptions({
        name: 'SearchIcon'
    })
</script>

<style scoped>
.search-icon {
    width: 28px;
    height: 28px;
    color: #3b82f6;
    cursor: pointer;
}

</style>