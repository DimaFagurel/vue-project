<template>
    <div class="footer">
            <div class="footer_content">
                <div class="footer_info"> Dima Fagurel</div>
                <div class="footer_social">
                    <a class="footer_social-link" href="https://github.com/DimaFagurel">
                        <img class="footer_social-img" src="../assets/img/github.png" alt="">
                        GitHub
                    </a>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: "FooterSocial"
    }
</script>

<style scoped lang="scss">
    $background: rgba(179, 127, 252, 0.8);

    .footer {
        flex: 0 0 auto;
        height: 60px;
        background: $background;

        &_content {
            display: flex;
            justify-content: space-evenly;
            height: 100%;

            > * {
                align-self: center;
            }
        }

        &_social-img {
            height: 25px;
            width: auto;

        }
    }
</style>