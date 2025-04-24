import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors'

const EditBtn: React.FC = () => {
    return (
        <TouchableOpacity className='w-40 p-4 rounded-xl bg-principal'>
            <Text className='text-white font-inter font-semibold text-center'>Editar Agenda</Text>
        </TouchableOpacity>
    );
};

export default EditBtn; 