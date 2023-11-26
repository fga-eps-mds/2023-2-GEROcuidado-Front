import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';

const CalendarAgenda: React.FC = () => {
  const [items, setItems] = useState({});

  const loadItems = (day: any) => {

    setItems({
      [day.dateString]: [
        { name: 'Passear com o idoso', time: '10:00 AM' },
        { name: 'Dar remédio ao idoso', time: '02:30 PM' },
        { name: 'Banhar o idoso', time: '02:30 PM' },
        { name: 'Banhar o idoso', time: '02:30 PM' },
        { name: 'Banhar o idoso', time: '02:30 PM' },
        { name: 'Banhar o idoso', time: '02:30 PM' },
        { name: 'Dormir', time: '02:30 PM' },
        { name: 'Dormir', time: '02:30 PM' },
        { name: 'Levantar', time: '02:30 PM' },
      ],
    });
  };

  const renderItem = (item: any) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.time}</Text>
    </View>
  );

  return (
    <Agenda
    items={items}
    loadItemsForMonth={loadItems}
    renderItem={renderItem}
    style={{ height: '100%' }} 
  />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginTop: 17,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CalendarAgenda;