/*4A. Retrieve all events for a person with ID = " p_9031*/
SELECT * FROM event_data
WHERE person = 'p_9031';

/*4B. For link ID = " 7735018_0", get link details with the node information for that link.*/
SELECT link_id, links_metadata_id, freespeed, capacity, permlanes, oneway, modes, link_length, 
	to_node, t.x AS to_node_x, t.y AS to_node_y, from_node, f.x AS from_node_x, f.y AS from_node_y
FROM link
JOIN node t ON (to_node = t.node_id)
JOIN node f ON (from_node = f.node_id)
WHERE link_id = '7735018_0';

/*4C. Calculate the total distance traveled by each person who walked.
  Display the results in descending order of distance.*/
SELECT person, sum(distance) 
FROM event_data NATURAL JOIN travelled
WHERE mode = 'walk'
GROUP BY person;

/*4D. Calculate the average time it takes for persons to complete their "actend" activities.
  Display the results in ascending order of average time.*/
SELECT person, avg(totalTime)
FROM (SELECT e.person, (s.event_time - e.event_time) AS totaltime
	FROM (event_data e NATURAL JOIN act_end z)
	INNER JOIN (event_data s NATURAL JOIN act_start a) ON (e.person = s.person)
	WHERE z.act_type != a.act_type)
GROUP BY person
ORDER BY avg;
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  SUPER untrustworthy; needs further testing*/

/*
  alt simpler one that might be what he meant?
  I mean, none of the other ones are anywhere near this complicated

    SELECT person, avg(event_time)
    FROM event_data NATURAL JOIN act_end
    GROUP BY person
    ORDER BY avg;
*/

/*4E. Retrieve the earliest "departure" time for each person who used the "car" mode*/
SELECT person, min(event_time)
FROM event_data NATURAL JOIN arrival_departure
WHERE legmode = 'car' AND is_start = FALSE
GROUP BY person;

-- 4B
SELECT
    link.*,
    from_node.x as from_node_x,
    from_node.y as from_node_y,
    to_node.x as to_node_x,
    to_node.y as to_node_y
FROM
    link
JOIN
    node AS from_node ON link.from_node = from_node.node_id
JOIN
    node AS to_node ON link.to_node = to_node.node_id
WHERE
    link.link_id = '7735018_0';
