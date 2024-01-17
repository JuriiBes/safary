<template>
    <div class="contacts__container">
        <h1 class="contacts__title">Contacts</h1>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3111.4201810390173!2d-121.3258034!3d38.7540657!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b211c7901dfe3%3A0x810986b07a30ac5a!2sEgipto%20Viajeros!5e0!3m2!1suk!2spl!4v1704559427256!5m2!1suk!2spl"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="contacts__maps"
        ></iframe>

        <div class="contacts__text">
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dolores odit asperiores,
                exercitationem recusandae repellat? Et omnis aspernatur illo nostrum, sequi quod, quos dolor velit eius
                ratione ipsa sint cum.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
        </div>
        <div class="contacts__contacts">
            <a href="tel:+44345678903" class="contacts__telephone">
                <font-awesome-icon :icon="['fas', 'phone']" style="color: #eb3050" />
                <p>+44 345 678 903</p>
            </a>
            <a href="mailto:adobexd@gmail.com" class="contacts__mail">
                <font-awesome-icon :icon="['fas', 'envelope-open-text']" style="color: #ed165f" />
                <p>adobexd@gmail.com</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactsPage',
}
</script>

<style lang="scss" scoped>
.contacts {
    // .contacts__container
    &__container {
        padding: 5.5rem 0.9375rem 3rem;
        @media (max-width: 991.92px) {
            padding: 5rem 0.9375rem 3rem;
        }
    }
    // .contacts__title
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
    // .contacts__maps
    &__maps {
        margin-bottom: 2.5rem;
    }
    // .contacts__text
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
        margin-bottom: 2.5rem;
    }
    // .contacts__contacts
    &__contacts {
        color: rgb(237, 22, 95);
        text-align: justify;
        font-size: 1.25rem;
        line-height: 1.4;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        row-gap: 0.9375rem;
        column-gap: 1.5625rem;
    }
    // .contacts__telephone
    // .contacts__mail
    &__telephone,
    &__mail {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 1rem;
        align-items: center;
    }
}
</style>
