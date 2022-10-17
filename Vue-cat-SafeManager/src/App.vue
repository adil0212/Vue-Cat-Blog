<template>
  <router-view />
</template>

<style lang="scss">
/*勿删！！！*/
.v-dialog-container .lk-dio .v-dialog-modal .v-dialog-body {
  padding: 0 !important;
  //z-index: 99999!important;
}

.v-dropdown-container,.el-popover {
  z-index: 100000!important;
}
//.el-message{
//  z-index: 110000!important;
//}
//.el-popover .el-popper {
//  z-index: 120000!important;
//}
.el-image-viewer__wrapper,.el-message{
  z-index: 12000!important;
}
@import './assets/style/public-class.scss';
</style>
