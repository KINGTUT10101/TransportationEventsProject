import xml.etree.ElementTree as ET

def get_event_attributes(xml_file):
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Use a dictionary to store unique event types and their attributes
    event_attributes = {}

    # Iterate through all event elements
    for event in root.findall('event'):
        event_type = event.get('type')
        # If the event type is not in the dictionary, add it with an empty set
        if event_type not in event_attributes:
            event_attributes[event_type] = set()
        # Add attribute names to the set for this event type
        for attribute in event.attrib:
            event_attributes[event_type].add(attribute)

    return event_attributes

# Assuming the XML data is in a file named 'events.xml' in the same directory as this script
xml_file_path = '../raw_data/output_events.xml'
event_types_attributes = get_event_attributes(xml_file_path)

# Print the unique event types and their associated attributes
for event_type, attributes in event_types_attributes.items():
    print(f'Event Type: {event_type}')
    print(f'Attributes: {attributes}\n')
