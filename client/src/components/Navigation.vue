<template>
  <div class="nav">
    <div class="nav-header">
      <div class="nav-title">LiftStats</div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    <input type="checkbox" id="nav-check">
    <ul class="links">
      <router-link tag="li" to="/login">Log In</router-link>
      <li class="link-item">Sign Up</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.nav {
  height: 50px;
  background-color: $brand-color;
  color: $light-font;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#nav-check {
  display: none;
}
.nav-btn {
  display: none;

  @media screen and (max-width: 600px) {
    display: inline-block;
  }
}
li {
  display: inline;
  &:hover {
    cursor: pointer;
  }
}
span {
  width: 25px;
  height: 10px;
  border-top: 2px solid $dark-font;
}
</style>
