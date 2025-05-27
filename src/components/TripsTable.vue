<script setup lang="ts">
import '../assets/css/mds-table.css';
import { useTripsState } from '../stores/useTripsState'


const { trips } = useTripsState()
</script>
<style scoped>
    .trips-table {
        margin:20px;
    }
</style>

<template>

  <div class="mds-table--scrollable trips-table" style="width: 100%; max-height: 300px;">
    <table class="mds-table mds-table--nowrap mds-table--footer mds-table--zebra-stripes mds-table--vertical-lines-solid mds-table--header-sticky mds-table--footer-sticky mds-table--outer-border-dashed mds-table--outer-border-square-corners" tabindex="0">
      <thead>
        <tr>
          <th class="mds-table__column--sticky">Trip ID</th>
          <th>Bus No</th>
          <th class="mds-table__cell--text-center">Starting KM</th>
          <th class="mds-table__cell--number">Ending KM</th>
          <th class="mds-table__cell--number">Distance</th> 
          <th>Date</th> <!-- New column -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <th class="mds-table__column--sticky">{{ trip.id }}</th>
          <td>{{ trip.busNo }}</td>
          <td class="mds-table__cell--text-center">{{ trip.startingKm }}</td>
          <td class="mds-table__cell--number">{{ trip.endingKm }}</td>
          <td class="mds-table__cell--number">{{ trip.endingKm - trip.startingKm }}</td> <!-- difference -->
          <td class="mds-table__cell--text-center">{{ trip.date }}</td> <!-- New column -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
