import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as Contacts from 'expo-contacts'

type ContactDropdownItem = {
  label: string
  value: string | undefined
}

function ContactList({ onChange, value }: any) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  // const [selectedContact, setSelectedContact] = useState<string>()

  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync()
        setContacts(data)
      }
    })()
  }, [])

  const contactList = contacts.map((contact) => ({
    label: contact.firstName!,
    value: JSON.stringify(contact)
  }))

  const renderItem = (item: ContactDropdownItem) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="select1"
            size={20}
          />
        )}
      </View>
    )
  }

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.headerText}>Contacts</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={contactList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select a contact.."
        searchPlaceholder="Search name.."
        value={value}
        onChange={(item) => onChange(item.value)}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F5F5', // Light gray background
    padding: 16,
    borderRadius: 8, // Rounded corners
    color: '#000', // Black text for input
    fontWeight: '500'
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000' // Black text
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
})

export default ContactList
