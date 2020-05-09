<template>
    <div class="new">
        <h2>
            <input autocomplete="off"
                   maxlength="20"
                   v-model="list.name"
                   id="listName"
                   placeholder="Powyck Car Boot Sale"
                   v-on:input="titleListener">
        </h2>
        <form id="newItem" v-on:submit.prevent="addItem">
            <label class="label" for="newItemTitle">What are you looking for?</label>
            <input autocomplete="off"
                   maxlength="20"
                   v-model="newItemTitle"
                   id="newItemTitle"
                   placeholder="e.g. Photo frames"
                   v-on:input="titleListener">
            <label class="characterCount" for="newListTitle">{{ charCountTitle }} / 20</label>
            <label class="label" for="newItemDesc">More details</label>
            <input autocomplete="off"
                   maxlength="30"
                   v-model="newItemDesc"
                   id="newItemDesc"
                   placeholder="e.g. Must hold 4 photos"
                   v-on:input="descListener">
            <label class="characterCount" for="newListTitle">{{ charCountDesc }} / 30</label>
            <button>Add</button>
        </form>
        <ul>
            <li is="ListItem" v-for="(item, index) in list.items" :key="index" :title="item.title" :desc="item.desc" v-on:remove="removeItem(index)" :link="{ name: 'EditList', 
           params: { listID: ``}}" />
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
        padding: 0.2em;
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
        props: ['listID'],
        data() {
            return {
                list: {
                    id: '',
                    name: `New List Name`,
                    items: []
                },
                newItemTitle: ``,
                newItemDesc: ``,
                nextItemID: 0,
                charCountTitle: 0,
                charCountDesc: 0
            }
        },
        mounted() {
            if (this.listID) {
                if (localStorage.getItem(this.listID)) {
                    try {
                        this.list.id = this.listID
                        this.list = JSON.parse(localStorage.getItem(this.listID));
                    } catch (e) {
                        localStorage.removeItem(this.listID);
                        console.log(e.toString())
                    }
                }
            }
            else {
                this.list.id = this.generateID()
            }
        },
        beforeDestroy() {
            if (this.list.items.length > 0) {
                this.saveList();
            }
        },
        methods: {
            generateID: function () {
                let id = '';
                let chars = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwxyz1234567890';
                for (let i = 0; i < 10; i++) {
                    id += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return id;
            },
            addItem: function () {
                if (this.charCountTitle > 0) {
                    this.list.items.push({
                        id: this.nextItemID++,
                        title: this.newItemTitle,
                        desc: this.newItemDesc
                    })
                    this.saveList()
                    this.newItemTitle = ``
                    this.newItemDesc = ``
                    this.titleListener()
                    this.descListener()
                }
            },
            titleListener: function () {
                this.charCountTitle = this.newItemTitle.length.toString()
            },
            descListener: function () {
                this.charCountDesc = this.newItemDesc.length.toString()
            },
            saveList() {
                let availableLists = [];
                let newList = true;

                //get current ID list
                if (localStorage.getItem('Available lists')) {
                    try {
                        availableLists = JSON.parse(localStorage.getItem('Available lists'));
                    } catch (e) {
                        localStorage.removeItem('Available lists');
                        console.log(e.toString())
                    }
                }

                //search for list
                for (let i = 0; i < availableLists.length; i++) {
                    if (availableLists[i].id === this.list.id) {
                        newList = false
                        availableLists[i].title = this.list.name
                    }
                }

                //If not already there, add new list id
                if (newList) {
                    availableLists.push({
                        id: this.list.id,
                        title: this.list.name
                    })
                }

                let parsedIDList = JSON.stringify(availableLists);
                localStorage.setItem("Available lists", parsedIDList);

                //Update list items
                let parsedList = JSON.stringify(this.list);
                localStorage.setItem(this.list.id, parsedList);
            },
            removeItem(index) {
                this.list.items.splice(index, 1)
                this.saveList()
            }
        }
    }
</script>
