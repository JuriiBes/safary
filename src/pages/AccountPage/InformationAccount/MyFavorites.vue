<template>
    <div class="favorites">
        <h2 class="favorites__title">My Favorites</h2>
        <div class="favorites__body">
            <div v-for="(favorites, index) in userFavorites" :key="index" class="favorites__item">
                <favorites-item-card :key="reload" :favorites-id="favorites" @delete="deleteItemList(index)" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import FavoritesItemCard from '@/components/AccountPages/FavoritesItemCard.vue'

export default {
    name: 'MyFavorites',
    components: {
        FavoritesItemCard,
    },
    data() {
        return {
            userFavorites: null,
            detailName: 'favorites',
            reload: 0,
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
    },
    created() {
        this.userFavorites = this.getUserDataDetail(this.detailName)
    },
    methods: {
        ...mapActions(useUserAccountStore, ['deleteFavoritesItem']),
        deleteItemList(index) {
            this.deleteFavoritesItem(index)
            this.reload = this.reload + 1
        },
    },
}
</script>

<style lang="scss" scoped>
.favorites {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    // .favorites__title
    &__title {
        font-size: 1.5rem;
        line-height: 1; /* 75% */
        text-align: start;
        margin-bottom: 2rem;
        letter-spacing: 0.0125rem;
        @media (max-width: 991.98px) {
            margin-bottom: 1rem;
        }
    }
    // .favorites__body
    &__body {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        @media (max-width: 1200px) {
            gap: 1rem;
        }
        @media (max-width: 1100px) {
            grid-template-columns: 1fr;
        }
    }
    // .favorites__item
    &__item {
    }
}
</style>
