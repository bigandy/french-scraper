<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    rows: any[];
    name: string;
  }
  const { rows, name }: Props = $props();
  let loading = $state(true);

  const initialRowValues = () => {
    const thing: any = {};
    for (const [key] of rows) {
      thing[key] = "";
    }

    return thing;
  };

  let rowValues = $state(initialRowValues());

  let rowAnswers = $derived.by(() => {
    const thing: any = {};
    for (const [key, value] of rows) {
      thing[key] = value;
    }

    return thing;
  });

  const handleInputChange = (e: any, key: string) => {
    rowValues[key] = e.target.value;

    localStorage.setItem(name, JSON.stringify(rowValues));
  };

  onMount(() => {
    const savedData = localStorage.getItem(name);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      rowValues = parsedData;
      console.log({ parsedData });
    }
    loading = false;
  });

  const handleReset = () => {
    localStorage.removeItem(name);

    rowValues = initialRowValues();
  };
</script>

<div class="wrapper">
  <table>
    <tbody>
      {#each rows as [key, value]}
        <tr class:correct={rowValues[key] === rowAnswers[key]} class:loading>
          <td>{key}</td>
          <td>
            <!-- {value} -->
            <input
              value={rowValues[key]}
              oninput={(e) => handleInputChange(e, key)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {#if loading}
    <div class="loading-message">Loading...</div>
  {/if}

  <button onclick={handleReset}>Reset Table</button>
</div>

<style>
  .correct td {
    background: green;
  }

  .loading td {
    background: black;
    color: white;
  }

  .wrapper {
    position: relative;
  }

  .loading-message {
    position: absolute;
    inset: 0;
    color: red;
    z-index: 1;
    display: grid;
    place-content: center;

    backdrop-filter: blur(3px);
  }
</style>
