<template>
    <li class="listItem">
        <div v-if="this.link.params.listID.length === 0" class="details">
            <p class="title">{{ title }}</p>
            <p class="desc">{{ desc }}</p>
        </div>
        <router-link v-else :to="link" class="details">
            <p class="title">{{ title }}</p>
            <p class="desc">{{ desc }}</p>
        </router-link>
        <button v-on:click="$emit('remove')">Remove</button>
    </li>
</template>

<style lang="scss" scoped>
    .listItem {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        padding: 0.3em 0em;
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex-grow: 3;
        max-width: 150px;
        word-wrap: break-word;
    }

    p {
        margin: 0;
    }

    a {
        text-decoration: none;
        color: $font;
    }

    a.disabled

    title {
        justify-self: flex-start;
    }

    .desc {
        color: $fontLight;
        font-size: 0.9em;
        justify-self: flex-start;
        overflow-wrap: break-word;
    }

    button {
        background: $primaryDark;
        border-radius: 5px;
        border: none;
        box-shadow: 5px 5px 5px -9px rgba(0,0,0,0.75);
        text-transform: uppercase;
        color: white;
        padding: 0;
        letter-spacing: 1.5px;
        font-size: 0.8em;
        padding: 1em;
        height: 50%;
        z-index: 2;
    }

    @media only screen and (min-width: 400px) {
        .details {
            max-width: 200px;
        }
    }
</style>

<script>
export default {
        name: 'ListItem',
        props: ['title', 'desc', 'link'],
        mounted() {
        }
}
</script>