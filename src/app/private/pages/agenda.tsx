import React, { useState, useEffect } from 'react';
import { Agenda, CalendarList, LocaleConfig } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';
import { getAllRotina } from '../../services/rotina.service';
import { IRotina, IRotinaFilter } from '../../interfaces/rotina.interface';
import { IIdoso } from '../../interfaces/idoso.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { IUser } from '../../interfaces/user.interface';

interface IItem {
  name: string;
  dataHora: string | Date;
}

const formatDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return date;
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const CalendarAgenda: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: IItem[] }>({});
  const [rotinas, setRotinas] = useState<IRotina[]>([]);
  const [user, setUser] = useState<IUser | undefined>();
  const [loading, setLoading] = useState(true);
  const [idoso, setIdoso] = useState<IIdoso | undefined>();

  const loadItems = () => {
    const itemsData: { [key: string]: IItem[] } = {};

    rotinas.forEach((rotina) => {
      const dateString = formatDate(rotina.dataHora);
      if (!itemsData[dateString]) {
        itemsData[dateString] = [];
      }

      itemsData[dateString].push({
        name: rotina.titulo,
        dataHora: rotina.dataHora,
      });
    });

    setItems(itemsData);
  };

  const handleUser = () => {
    AsyncStorage.getItem('usuario').then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  const getIdoso = () => {
    AsyncStorage.getItem('idoso').then((idosoString) => {
      if (idosoString) {
        const idosoPayload = JSON.parse(idosoString) as IIdoso;
        setIdoso(idosoPayload);
      }
    });
  };

  const getRotinas = () => {
    setLoading(true);

    const rotinaFilter: IRotinaFilter = {
      idIdoso: Number(idoso?.id),
    };

    getAllRotina(rotinaFilter)
      .then((response) => {
        const newRotinas = response.data as IRotina[];
        setRotinas(newRotinas);
        loadItems();
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleUser();
    getIdoso();
  }, []);

  useEffect(() => {
    getRotinas();
  }, [idoso]);

  const renderItem = (item: any) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.dataHora}</Text>
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
