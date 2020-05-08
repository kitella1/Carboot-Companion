<template>
    <div class="new">
        <h2>
            <input autocomplete="off"
                   maxlength="20"
                   v-model="newListName"
                   id="newListName"
                   placeholder="Powyck Car Boot Sale"
                   v-on:input="titleListener">
        </h2>
        <form id="newItem" v-on:submit.prevent="addItem">
            <label class="label" for="newListTitle">What are you looking for?</label>
            <input autocomplete="off"
                   maxlength="20"
                   v-model="newListTitle"
                   id="newListTitle"
                   placeholder="e.g. Photo frames"
                   v-on:input="titleListener">
            <label class="characterCount" for="newListTitle">{{ charCountTitle }} / 20</label>
            <label class="label" for="newListDesc">More details</label>
            <input autocomplete="off"
                   maxlength="30"
                   v-model="newListDesc"
                   id="newListDesc"
                   placeholder="e.g. Must hold 4 photos"
                   v-on:input="descListener">
            <label class="characterCount" for="newListTitle">{{ charCountDesc }} / 30</label>
            <button>Add</button>
        </form>
        <ul>
            <li is="ListItem" v-for="(item, index) in listItems" :key="index" :title="item.title" :desc="item.desc" v-on:remove="removeItem(index)" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    @media only screen and (min-width: 300px) {
        .new {
            margin: 0em 2em;
            width: 85%;
        }

        ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0em;
        }

        #newItem {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & .label

    {
        align-self: flex-start;
    }

    }

    input {
        width: 100%;
        border: none;
        border-bottom: 1px solid $fontLight;
        box-sizing: border-box;
        padding: 1em;
        &:focus

    {
        border: 1px solid $primary;
    }

    &:nth-child(1) {
        padding: 0.2em 1em;
        text-align: center;
    }

    }

    .characterCount {
        color: $fontLight;
        font-size: 0.9em;
        margin: 0.5em 0em;
        align-self: flex-end;
        opacity: 0.9;
    }

    button {
        background: $secondary;
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
    }
    }
</style>

<script>
    import ListItem from '@/components/ListItem.vue'

    export default {

        name: 'NewList',
        components: {
            ListItem,
        },
        data() {
            return {
                newListName: `New List Name`,
                newListTitle: ``,
                newListDesc: ``,
                charCountTitle: 0,
                charCountDesc: 0,
                listItems: [
                   
                ],
                nextId: 0
            }
        },
        mounted() {
            if (localStorage.getItem('listItems')) {
                try {
                    this.listItems = JSON.parse(localStorage.getItem('listItems'));
                } catch (e) {
                    localStorage.removeItem('listItems');
                    console.log(e.toString())
                }
            }
        },
    methods: {
        addItem: function () {
            this.listItems.push({
                id: this.nextId++,
                title: this.newListTitle,
                desc: this.newListDesc
            })
            this.saveList()
            this.newListTitle = ``
            this.newListDesc = ``
        },
        titleListener: function () {
            this.charCountTitle = this.newListTitle.length.toString()
        },
        descListener: function () {
            this.charCountDesc = this.newListDesc.length.toString()
        },
        saveList() {
            let parsed = JSON.stringify(this.listItems);
            localStorage.setItem(this.newListName, parsed);
        },
        removeItem(index) {
            this.listItems.splice(index, 1)
            this.saveList()
        }
    }
}
</script>
