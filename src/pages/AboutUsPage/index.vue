<template>
    <div class="about__container">
        <h1 class="about__title">About Us</h1>
        <div class="about__text">
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit asperiores,
                exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor velit eius
                ratione ipsa sint cum.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit
                asperiores, exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor
                velit eius ratione ipsa sint cum.
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit asperiores,
                exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor velit eius
                ratione ipsa sint cum.
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit asperiores,
                exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor velit eius
                ratione ipsa sint cum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit
                asperiores, exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor
                velit eius ratione ipsa sint cum.
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit asperiores,
                exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor velit eius
                ratione ipsa sint cum.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit
                asperiores, exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor
                velit eius ratione ipsa sint cum.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
                dolores odit asperiores, exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi
                quod, quos dolor velit eius ratione ipsa sint cum.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutUsPage',
}
</script>

<style lang="scss" scoped>
.about {
    // .about__container
    &__container {
        padding: 6.25rem 0.9375rem 3.125rem;
        @media (max-width: 991.92px) {
            padding: 5rem 0.9375rem 3.125rem;
        }
    }
    // .about__title
    &__title {
        color: #000;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 2.1875rem;
        @media (max-width: 991.92px) {
            font-size: 2 rem;
        }
    }
    // .about__text
    &__text {
        color: #000;
        text-align: justify;
        font-size: 1.25rem;
        line-height: 1.4;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        @media (max-width: 991.92px) {
            font-size: 1rem;
        }
    }
}
</style>
