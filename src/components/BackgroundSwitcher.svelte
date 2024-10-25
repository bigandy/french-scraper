<script lang="ts">
  import { isDarkBackground } from "../stores/backgroundStore";
</script>

<div class="wrapper" class:dark={$isDarkBackground}>
  <button onclick={() => isDarkBackground.set(!$isDarkBackground)}
    >ToggleDark</button
  >
</div>

<style>
  .wrapper {
    border: 1px solid;
    min-height: 300px;
  }

  .dark {
    background: black;
    color: white;
  }
</style>
