// Maps the data that is specific to each event type
const specialColumnMap = {
  "actstart": {
      "actType": "act_type",
      "x": "x",
      "y": "y",
      "link": "link_id",
  },
  "actend": {
      "actType": "act_type",
      "link": "link_id"
  },
  "arrival": {
      "legMode": "legmode",
      "link": "link_id",
  },
  "departure": {
      "legMode": "legmode",
      "link": "link_id"
  },
  "PersonEntersVehicle": {

  },
  "PersonLeavesVehicle": {

  },
  "vehicle enters traffic": {
      "relativePosition": "relative_position",
      "networkMode": "network_mode",
      "link": "link_id",
  },
  "vehicle leaves traffic": {
      "relativePosition": "relative_position",
      "networkMode": "network_mode",
      "link": "link_id",
  },
  "entered link": {
      "link": "link_id",
  },
  "left link": {
      "link": "link_id",
  },
  "dvrpTaskStarted": {
      "dvrpMode": "dvrp_mode",
      "taskIndex": "task_index",
      "taskType": "task_type",
      "dvrpVehicle": "dvrp_vehicle",
      "link": "link_id"
  },
  "dvrpTaskEnded": {
      "dvrpMode": "dvrp_mode",
      "taskIndex": "task_index",
      "taskType": "task_type",
      "dvrpVehicle": "dvrp_vehicle",
      "link": "link_id"
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