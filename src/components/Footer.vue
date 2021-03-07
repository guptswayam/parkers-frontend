<template>
    <div class="footer">
        <img src="/src/assets/parkers.png" alt="logo">
        <div style="margin-top:30px">
            <p>© 2020 by Swayam Gupta</p>
            <p>All rights reserved.</p>
        </div>
    </div>
</template>

<style scoped>
.footer{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 50px 25px;
    color: white;
    background: linear-gradient(to right bottom, rgb(54, 54, 54), rgb(32, 32, 32));
}
img{
    width: 225px;
    height: 75px;
}
p{
    line-height: 0.5;
    font-size: 14px;
}
</style>