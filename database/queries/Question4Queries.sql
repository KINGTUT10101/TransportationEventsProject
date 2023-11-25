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