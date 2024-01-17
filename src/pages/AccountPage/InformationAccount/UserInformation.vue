<template>
    <div class="user-information">
        <h2 class="user-information__title">User Information</h2>
        <div class="user-information__body">
            <div class="user-information__inputs">
                <label class="user-information__label"
                    >First name
                    <input type="text" class="user-information__input" />
                </label>
                <label class="user-information__label"
                    >Last name
                    <input type="text" class="user-information__input" />
                </label>
                <label class="user-information__label"
                    >Email
                    <input type="email" class="user-information__input" />
                </label>
                <div class="user-information__select-body">
                    <h3 class="user-information__label">Gender</h3>
                    <select class="user-information__select">
                        <option class="user-information__option" value="null"></option>
                        <option class="user-information__option" value="male">male</option>
                        <option class="user-information__option" value="female">female</option>
                    </select>
                </div>
                <label class="user-information__label"
                    >Date of birth
                    <input type="date" class="user-information__input" />
                </label>
            </div>
            <button type="button" class="user-information__change-button">Change password</button>
            <label class="user-information__subscription"
                ><input type="checkbox" name="subscription" /> Newsletter subscription</label
            >
        </div>
        <div class="user-information__button-body">
            <button type="button" class="user-information__button-save">save changes</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInformation',
}
</script>

<style lang="scss" scoped>
.user-information {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    // .user-information__title
    &__title {
        color: #000;
        font-size: 1.5rem;
        line-height: 1; /* 75% */
        text-align: start;
        margin-bottom: 2rem;
        letter-spacing: 0.0125rem;
        @media (max-width: 991.98px) {
            margin-bottom: 1rem;
        }
    }
    // .user-information__body
    &__body {
        padding: 3.625rem 4rem 2.875rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        row-gap: 2rem;

        align-items: flex-start;
        @media (max-width: 991.98px) {
            padding: 2rem;
        }
        @media (max-width: 991.98px) {
            align-items: center;
        }
    }
    // .user-information__inputs
    &__inputs {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        width: 350px;
        @media (max-width: 470px) {
            width: 100%;
        }
        @media (max-width: 991.98px) {
            row-gap: 1rem;
        }
        @media (max-width: 470px) {
            width: 100%;
        }
    }
    // .user-information__label
    &__label {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        color: #000;
        font-size: 0.875rem;
        line-height: 1.28;

        align-items: flex-start;
        @media (max-width: 470px) {
            width: 100%;
        }
    }
    // .user-information__input
    &__input {
        border-radius: 0.375rem;
        border: 1px solid #000;
        display: block;
        width: 100%;
        height: 3.75rem;
        flex-shrink: 0;
        padding: 1.4375rem 0.625rem;
        @media (max-width: 991.98px) {
            height: auto;
            padding: 0.5rem 1rem;
        }
        @media (max-width: 470px) {
        }
    }
    // .user-information__select-body
    &__select-body {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        color: #000;
        font-size: 0.875rem;
        line-height: 1.28;
        align-items: flex-start;
    }
    // .user-information__select
    &__select {
        border-radius: 0.375rem;
        border: 1px solid #000;
        width: 100%;
        height: 60px;
        flex-shrink: 0;
        padding: 1.25rem 0.625rem;
        outline: none;
        @media (max-width: 991.98px) {
            height: auto;
            padding: 0.5rem 1rem;
        }
    }
    // .user-information__option
    &__option {
        color: #000;
        font-size: 0.875rem;
        line-height: 1.28;
    }
    // .user-information__change-button
    &__change-button {
        color: #ed165f;
        font-weight: 600;
        line-height: 1.12;
    }
    // .user-information__subscription
    &__subscription {
        color: #000;
        font-weight: 600;
        line-height: 1.12;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 1rem;
    }
    // .user-information__button-body
    &__button-body {
        text-align: start;
        @media (max-width: 687.98px) {
            text-align: end;
        }
    }
    // .user-information__button-save
    &__button-save {
        flex: 1 0 auto;
        color: #fff;
        text-align: center;
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: 0.125rem;
        text-transform: uppercase;
        border-radius: 0.375rem;
        background: #ed165f;
        padding: 0.75rem 2.9375rem;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                background-color: rgba(237, 22, 94, 0.7);
            }
        }
        @media (max-width: 991.98px) {
            padding: 10px 25px;
            font-size: 0.7rem;
        }
    }
}
</style>
