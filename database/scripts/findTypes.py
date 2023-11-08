import xml.etree.ElementTree as ET

def get_unique_event_types(xml_file):
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Use a set to store unique event types
    unique_event_types = set()

    # Iterate through all event elements and add the 'type' attribute to the set
    for event in root.findall('event'):
        unique_event_types.add(event.get('type'))

    return unique_event_types

# Assuming the XML data is in a file named 'events.xml' in the same directory as this script
xml_file_path = '../raw_data/output_events.xml'
unique_types = get_unique_event_types(xml_file_path)

# Print the unique event types
print(unique_types)
