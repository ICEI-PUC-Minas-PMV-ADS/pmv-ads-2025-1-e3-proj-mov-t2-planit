import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Colors } from '../../constants/Colors'


const Calendario: React.FC = () => {
    const selecionarData = (day: DateData) => {
        Alert.alert('Data Selecionada', day.dateString);
    };

    return (
        <View>
            <Calendar 
                onDayPress= {selecionarData}
                theme= {{
                    selectedDayBackgroundColor: Colors.principal,
                    todayTextColor: Colors.principal,
                    arrowColor: Colors.principal,
                    selectedDayTextColor: Colors.secundaria,
                }}
            />
        </View>
    );
};


export default Calendario; 