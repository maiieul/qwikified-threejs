import { Calendar, Lucide } from "@qds.dev/ui";
import { $, component$, useSignal } from "@qwik.dev/core";

export default component$(() => {
  const selectedDate = useSignal<Calendar.ISODate | null>(null);

  return (
    <div class="calendar-example-container">
      <Calendar.Root class="calendar-root">
        <Calendar.Content>
          <Calendar.Header class="calendar-header">
            <Calendar.Previous class="calendar-header-button">
              <Lucide.ArrowLeft />
            </Calendar.Previous>
            <Calendar.Title />
            <Calendar.Next class="calendar-header-button">
              <Lucide.ArrowRight />
            </Calendar.Next>
          </Calendar.Header>
          <Calendar.Grid class="calendar-grid">
            <Calendar.GridDay
              class="calendar-grid-day"
              onDateChange$={$((date) => {
                console.log("Date changed:", date);
                selectedDate.value = date;
              })}
            />
          </Calendar.Grid>
        </Calendar.Content>
      </Calendar.Root>

      <div>
        <p>Selected date: {selectedDate.value}</p>
      </div>
    </div>
  );
});
