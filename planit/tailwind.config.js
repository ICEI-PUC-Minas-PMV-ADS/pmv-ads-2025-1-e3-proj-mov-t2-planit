module.exports = {
    content: [
      module.exports = {
        content: ["./**/*.{html,js}"], // ou ajuste conforme a estrutura do seu projeto
        theme: {
          extend: {},
        },
        plugins: [],
      }
      
    ],
    theme: {
      extend: {
        colors: {
            principal: '#FF006F',
            secundaria: '#E1FF00',
            branco: '#FFFFFF',
            preto: '#000',
            rosaleve: '#FFE5EF',
            error: '#FF3B30',
            neutro: '#F4F7FE',
            cinza: '#4B5563', // p/ textos
            iconNavDefault: '#B4B6B8' // quando o icon da navegação não está selecionado
        }
      },
    },
    plugins: [],
  }
  
  /** EXEMPLO DE USO
   * 
   * <View className="bg-rosaleve p-4 rounded-xl" />
   * <Text className="text-cinza">Texto de exemplo</Text>
   * 
   */