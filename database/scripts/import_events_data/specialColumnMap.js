// Maps the data that is specific to each event type
const specialColumnMap = {
  "actstart": {
      "actType": "act_type",
      "x": "x",
      "y": "y"
  },
  "actend": {
      "actType": "act_type"
  },
  "arrival": {
      "legMode": "legmode"
  },
  "departure": {
      "legMode": "legmode"
  },
  "PersonEntersVehicle": {

  },
  "PersonLeavesVehicle": {

  },
  "vehicle enters traffic": {
      "relativePosition": "relative_position",
      "networkMode": "network_mode"
  },
  "vehicle leaves traffic": {
      "relativePosition": "relative_position",
      "networkMode": "network_mode"
  },
  "entered link": {

  },
  "left link": {

  },
  "dvrpTaskStarted": {
      "dvrpMode": "dvrp_mode",
      "taskIndex": "task_index",
      "taskType": "task_type",
      "dvrpVehicle": "dvrp_vehicle"
  },
  "dvrpTaskEnded": {
      "dvrpMode": "dvrp_mode",
      "taskIndex": "task_index",
      "taskType": "task_type",
      "dvrpVehicle": "dvrp_vehicle"
  },
  "passenger picked up": {
      "mode": "mode",
      "request": "request"
  },
  "passenger dropped off": {
      "mode": "mode",
      "request": "request"
  },
  "VehicleArrivesAtFacility": {
      "delay": "time_delay",
      "facility": "facility",
  },
  "VehicleDepartsAtFacility": {
      "delay": "time_delay",
      "facility": "facility",
  },
  "waitingForPt": {
      "destinationStop": "destination_stop",
      "agent": "agent",
      "atStop": "at_stop"
  },
  "travelled": {
      "distance": "distance",
      "mode": "mode"
  },
  "personMoney": {
      "amount": "amount",
      "purpose": "purpose",
      "transactionPartner": "transaction_partner",
  },
  "TransitDriverStarts": {
      "transitRouteId": "transit_route_id",
      "departureId": "departure_id",
      "transitLineId": "transit_line_id"
  }
}

export default specialColumnMap
