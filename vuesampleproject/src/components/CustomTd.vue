<template>
    <td :id="tdKey">
        {{ tdValue }}
    </td>
</template>

<script>
    export default {
        props : ['tdValue','tdKey'],
        setup(props) {
            // console.log("tdKey and tdValue");
            // console.log(props.tdKey);
            // console.log(props.tdValue);
        }
    }
</script>