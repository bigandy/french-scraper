<script lang="ts">
  interface Props {
    rows: any[];
  }
  const { rows }: Props = $props();
  let rowValues = $state(
    rows.map(([key, value]) => {
      console.log({ key, value });

      return value;
    })
  );

  console.log({ rowValues });
</script>

<div>
  <table>
    <tbody>
      {#each rows as [key, value]}
        <tr>
          <td>{key}</td>
          <td>
            {value}
            <input {value} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
