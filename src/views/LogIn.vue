<template>
    <div class="login">
        <h1>Carboot Companion</h1>
        <h2>Log In</h2>
        <p class="error" v-if="errMessage"> {{ errMessage }} </p>
        <form>
            <label for="emailInput">E-mail address</label>
            <input type="email"
                   v-model="emailAddress"
                   id="emailInput"
                   placeholder="E-mail address"
                   autocomplete="username"
                   required/>
            <label for="passwordInput">Password</label>
            <input type="password"
                   v-model="password"
                   id="passwordInput"
                   placeholder="Password"
                   autocomplete="current-password"
                   required/>
            <button type="submit" @click="login">Log in</button>
            <p>Don't have an account? <router-link to="/signup">Create one here</router-link></p>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    @media only screen and (min-width: 300px) {
        .login {
            margin: 0em 2em;
            width: 85%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .error {
            color: darkred;
        }

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            & label, & input
            {
                margin-top: 0.7em;
            }
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
            width: 100%;
            margin-top: 1em;
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
    }
        a {
            color: $font;
        }
    }
</style>

<script>
    import firebase from "firebase";

    export default {
        name: 'login',
        data() {
            return {
                errMessage: ``,
                emailAddress: ``,
                password: ``
            }
        },
        methods: {
            login: function () {
                event.preventDefault();
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.emailAddress, this.password)
                    .then(
                        () => {
                            if (this.$router.currentRoute.query.oldPath) {
                                this.$router.replace(this.$router.currentRoute.query.oldPath);
                            }
                            else {
                                this.$router.replace(`lists`);
                            }
                        },
                        (err) => {
                            this.errMessage = err;
                        }
                ).catch(function (error) {
                    console.log(error)
                });
            }
        }
    }
</script>