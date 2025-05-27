// src/stores/useTripsState.ts
import { ref } from 'vue'

export type Trip = {
  id: number
  busNo: string
  startingKm: number
  endingKm: number
  date: Date
}

const trips = ref<Trip[]>([])

export function useTripsState() {
  function setTrips(newTrips: Trip[]) {
    trips.value = newTrips
  }

  return {
    trips,
    setTrips
  }
}

//exporting buses state
export type Bus = {
  id: number
  busNo: string
}

const buses = ref<Bus[]>([])

const busNos = ref<string[]>([])

export function useBusesState() {
  function setBuses(newBuses: Bus[]) {
     busNos.value = newBuses.map(bus => bus.busNo)
  }

  function getBusNos(): string[] {
    return busNos.value
  }

  return {
    buses,
    busNos,
    setBuses,
    getBusNos,
  }
}


//3.tripsbybus
export type TripByBus = {
  id: number
  busNo: string
  startingKm: number
  endingKm: number
  date: Date
}

const tripsByBus = ref<Trip[]>([])

export function useTripsByBusState() {
  function setTripsByBus(newTrips: TripByBus[]) {
    tripsByBus.value = newTrips
  }

  return {
    tripsByBus,
    setTripsByBus
  }
}
