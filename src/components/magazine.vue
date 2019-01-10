<template lang="html">
  <div class="magazine">

    <div class="magazine__slot" style="dispaly:none">
      <slot name="text"></slot>
    </div>

    <div class="magazine__left">
      <div class="magazine__left__title">
        <slot name="title"></slot>
      </div>
      <div class="magazine__left__text"></div>
    </div>

    <div class="magazine__right">
      <div class="magazine__right__wrap"></div>
    </div>

  </div>
</template>

<script>
export default {}

</script>

<style scoped lang="scss">
.magazine{
  height: auto;
  width: 80vw;
  margin: auto;
  box-sizing: border-box;
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: auto;
   grid-column-gap: 2rem;
   &__slot{
     display: none;
   }
   &__left{
     &__title{
       height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
     }
     &__text{
       *{
         padding-bottom: 2rem;
         text-align: justify !important;
         -webkit-font-feature-settings : "palt" !important;
         font-feature-settings : "palt" !important;
         line-height: 2rem;
       }
     }
   }
   &__right{
     &__wrap{
       width: 100%;
       height: 100%;
       *{
         top: 0;
         bottom: 0;
         margin: auto;
         position: fixed;
         width: calc(80vw / 2);
         height: auto;
         animation: fadein .5s ease 0s forwards;
       }
     }
   }
 }


 @keyframes fadein{
   0%{
     opacity: 0;
     transform: scale(0.5);
   }
   100%{
     opacity: 1;
     transform: scale(1);
   }
 }

 </style>
