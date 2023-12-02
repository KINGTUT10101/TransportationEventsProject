// Maps from event type to table name
const typeMap = {
  "actend": "act_end",
  "VehicleDepartsAtFacility": "vehicle_facility",
  "left link": "enter_left_link",
  "entered link": "enter_left_link",
  "passenger dropped off": "passenger_pick_drop",
  "PersonEntersVehicle": "person_vehicle",
  "travelled": "travelled",
  "VehicleArrivesAtFacility": "vehicle_facility",
  "dvrpTaskEnded": "dvrp_task",
  "TransitDriverStarts": "transit_driver_starts",
  "waitingForPt": "waiting_for_pt",
  "PersonLeavesVehicle": "person_vehicle",
  "passenger picked up": "passenger_pick_drop",
  "dvrpTaskStarted": "dvrp_task",
  "arrival": "arrival_departure",
  "personMoney": "person_money",
  "vehicle enters traffic": "vehicle_traffic",
  "actstart": "act_start",
  "departure": "arrival_departure",
  "vehicle leaves traffic": "vehicle_traffic",
}

export default typeMap