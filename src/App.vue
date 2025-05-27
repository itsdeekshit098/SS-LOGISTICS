<template>
  <div class="formPage">
    <div class="formWrapper">
      <TripsForm class="form" />
    </div>
  </div>

  <div class="viewTrips">
    <ViewTripsButton />
    <TripsTable />
  </div>

  <div class="viewTripsByBus">
    <ViewTripsByBus/>
  </div>
  

</template>

<script setup lang="ts">
import TripsForm from './components/TripsForm.vue';
import TripsTable from './components/TripsTable.vue';
import ViewTripsButton from './components/ViewTripsButton.vue';
import ViewTripsByBus from './components/viewTripsByBus.vue';
</script>

<style scoped>
.formTitle {
  text-align: center;
  margin-bottom: 20px;
}
.formPage {
  position: relative;
  min-height: max-content;
}

.formWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
