<script lang="ts">
  interface Props {
    verbNamesToReset: string[];
  }
  const { verbNamesToReset }: Props = $props();

  const handlClick = () => {
    for (const name of verbNamesToReset) {
      localStorage.removeItem(name);
    }
    window.location.reload();
  };
</script>

<div class="wrapper">
  <button onclick={handlClick}>Reset All Local Storage</button>
</div>
