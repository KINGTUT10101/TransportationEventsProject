/*4A. Retrieve all events for a person with ID = " p_9031*/
SELECT event_id, event_time, event_type FROM event_data
WHERE person = 'p_9031';

/*4B. For link ID = " 7735018_0", get link details with the node information for that link.*/
SELECT l.*, t.x AS to_node_x, t.y AS to_node_y, f.x AS from_node_x, f.y AS from_node_y
FROM link l
JOIN node t ON (to_node = t.node_id)
JOIN node f ON (from_node = f.node_id)
WHERE link_id = '7735018_0';

/*4C. Calculate the total distance traveled by each person who walked.
  Display the results in descending order of distance.*/
SELECT person, SUM(distance) AS distance_walked
FROM event_data NATURAL JOIN travelled
WHERE mode = 'walk'
GROUP BY person
ORDER BY distance_walked DESC;

/*4D. Calculate the average time it takes for persons to complete their "actend" activities.
  Display the results in ascending order of average time.*/
SELECT 
    end_events.person, 
    AVG(start_events.event_time - end_events.event_time) AS average_time_to_next_actstart
FROM 
    event_data AS end_events
JOIN 
    event_data AS start_events ON end_events.person = start_events.person
WHERE 
    end_events.event_type = 'actend'
    AND start_events.event_type = 'actstart'
    AND start_events.event_time > end_events.event_time
GROUP BY 
    end_events.person
ORDER BY 
    average_time_to_next_actstart ASC;

/*4E. Retrieve the earliest "departure" time for each person who used the "car" mode*/
SELECT person, MIN(event_time) AS earliest_time
FROM event_data NATURAL JOIN arrival_departure
WHERE legmode = 'car' AND event_type = 'departure'
GROUP BY person;
