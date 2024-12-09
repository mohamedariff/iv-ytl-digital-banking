import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as Contacts from 'expo-contacts'

import { checkContactsPermission } from '@/utils'

type ContactDropdownItem = {
  label: string
  value: string | undefined
}

/**
 * @notes
 * Performance optimizations that could be implemented:
 * - Use useMemo for contactList transformation to prevent unnecessary re-renders.
 * - Implement debouncing for search functionality
 * - Consider using React.memo if parent re-renders frequently
 *
 * @todo
 * - Add proper TypeScript types instead of 'any'
 * - Add error handling for contacts permission denial
 * - Add loading state handling
 */
function ContactList({ onChange, value }: any) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])

  const loadContacts = async () => {
    const status = await checkContactsPermission()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync()
      setContacts(data)
    }
  }
  useEffect(() => {
    loadContacts()
  }, [])

  const contactList = contacts.map((contact) => ({
    label: contact.firstName!,
    value: JSON.stringify(contact)
  }))

  const renderItem = (item: ContactDropdownItem) => {
    const isSelected = item.value === value
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {isSelected && (
          <AntDesign
            style={styles.icon}
            name="select1"
            color="black"
            size={20}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contact</Text>

      <Dropdown
        style={styles.dropdown}
        iconStyle={styles.iconStyle}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={contactList}
        labelField="label"
        valueField="value"
        placeholder="Select a contact.."
        searchPlaceholder="Search name.."
        search
        value={value}
        maxHeight={300}
        renderItem={renderItem}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10
  },
  headerText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500'
  },
  dropdown: {
    height: 50,
    padding: 12,
    elevation: 2,
    borderRadius: 8,
    shadowRadius: 1.41,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    backgroundColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 1 }
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textItem: {
    flex: 1,
    fontSize: 16
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'silver'
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
    fontSize: 14,
    color: 'silver'
  }
})

export default ContactList
