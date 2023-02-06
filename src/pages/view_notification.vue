<template>
  <div class="q-pa-md" style="max-width">
    <q-list>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Aircondition / Floor:5 / Room:508</q-item-label>
          <q-item-label caption lines="2"
            >New note has been posted</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon
            class="q-pt-sm"
            name="fa-solid fa-exclamation"
            color="orange"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Aircondition / Floor:5 / Room:508</q-item-label>
          <q-item-label caption lines="2"
            >Ticket status has been updated</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>15 mins ago</q-item-label>
          <q-icon class="q-pt-sm" name="fa-solid fa-check" color="gray-4" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
  </div>
</template>

<script></script>
