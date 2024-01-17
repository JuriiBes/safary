<template>
    <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :speed="1000"
        :loop="true"
        :pagination="{
            clickable: true,
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
    >
        <swiper-slide><img :src="require('@/assets/image/main/girl-main.png')" alt="image girl" /></swiper-slide>
        <swiper-slide><img :src="require('@/assets/image/main/girl-main.png')" alt="image girl" /></swiper-slide>
        <swiper-slide><img :src="require('@/assets/image/main/girl-main.png')" alt="image girl" /></swiper-slide>
        <swiper-slide><img :src="require('@/assets/image/main/girl-main.png')" alt="image girl" /></swiper-slide>
        <div class="swiper-pagination"></div>
    </swiper>
</template>
<script>
// import Swiper core and required modules
import { Pagination, Autoplay, A11y } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
// :autoplay="{ delay: 3000, disableOnInteraction: false }"
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper)
        }
        const onSlideChange = () => {
            console.log('slide change')
        }
        return {
            onSwiper,
            onSlideChange,
            modules: [Pagination, Autoplay, A11y],
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('@/scss/_swiper.scss');
</style>
