import { View, Text, ScrollView, } from 'react-native'
import React from 'react'
import Calendario from "../../components/calendar/index"
import { Ionicons } from "@expo/vector-icons";

const Calendário = () => {
  return (
    <View className='flex flex-1'>
      <View>
        <Calendario /> 
      </View>

      <ScrollView className='h-auto'>
          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Disponíveis</Text>
                
              <View className='flex flex-row flex-wrap justify-center align-middle gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>
                  
                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>

                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>

                  <View className='border border-green-600 p-4 justify-center rounded-full'>
                    <Text className='text-green-600'>09:00</Text>
                  </View>
              </View>
          </View>
          </View>

          
          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Agendados</Text>
                
              <View className='flex flex-row flex-wrap justify-center gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>

                  <View className='border border-pink-700 p-4 justify-center rounded-full'>
                    <Text className='text-pink-700'>09:00</Text>
                  </View>
              </View>
          </View>
          </View>

          
          <View className='bg-white'>
            <View className='m-3 p-3 border border-neutral-200 rounded-2xl'>
              <Text className='text-center text-xl mb-8'>Horários Bloqueados</Text>
                
              <View className='flex flex-row flex-wrap justify-center gap-5'> 
                  <View>
                    <Ionicons size={20} name="time-outline" className='p-4 justify-center'/>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>

                  <View className='border border-slate-500 p-4 justify-center rounded-full'>
                    <Text className='text-slate-500'>09:00</Text>
                  </View>
              </View>
            </View>
          </View>
        </ScrollView>
    </View>
  )
}



export default Calendário