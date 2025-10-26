import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0, 
    backgroundColor: '#E0F7FA', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000000ff" 
  },
  separator: {
    marginVertical: 0, 
    height: 1,
    width: '80%',
  },

  componentSection: {
 
    marginVertical: 10, 
    alignItems: 'flex-start',
    width: '80%',

    backgroundColor: '#fffefece', 
    borderRadius: 10,          
    padding: 12,               

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  subTitle: {
    fontSize: 25,
    color: '#000000ff', 
    fontWeight: 'bold', 
  }, 

  fpsTitle: {
    fontSize: 18,  
    color: '#00000B',  
    fontWeight: 'bold',
    marginVertical: 2,
  },

  bodyText: {
    fontSize: 16,        
    color: '#333333',   
    lineHeight: 16, 
    marginVertical: 1,
  },
  RoupasTitle: {
    fontSize: 18,  
    color: '#00000B',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  RiscosTitle: {
    fontSize: 18,  
    color: '#00000B',
    fontWeight: 'bold',
    marginVertical: 2,
  }, 
});

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <View style={styles.separator} lightColor="#000000" darkColor="rgba(255,255,255,0.1)" />

      <Entenda />
      <Fps />
      <Roupas />
      <Riscos />
    </View>
);
}

const Entenda = () => {
  return (
    
      <Text style={styles.subTitle}>Entenda a proteção</Text>
    
);
}

const Fps = () => {
  return (
    <View style={styles.componentSection}>
      <Text style={styles.fpsTitle}>O que é FPS? </Text>
      <Text style={styles.bodyText}>
      "FPS sol" é uma maneira informal de se referir ao Fator de Proteção Solar (FPS), um índice que indica o tempo extra que a pele fica protegida contra os raios ultravioleta (UV) em comparação com a pele desprotegida. Quanto maior o número do FPS, mais raios UVB o produto bloqueia, ajudando a prevenir queimaduras solares, envelhecimento precoce, manchas e o risco de câncer de pele. 
      </Text>
   </View>
 );
} 

const Roupas = () => {
   return (
    <View style={styles.componentSection}>
     <Text style={styles.RoupasTitle}>Roupas com proteção UV</Text>
     <Text style={styles.bodyText}>
      Roupas com proteção UV são tecidos especialmente projetados para bloquear ou absorver os raios ultravioleta do sol, oferecendo uma camada adicional de defesa contra os danos causados pela exposição solar. Essas roupas são ideais para atividades ao ar livre, proporcionando conforto e segurança para a pele.
     </Text>
    </View>
 )};

 const Riscos = () => {
   return (
    <View style={styles.componentSection}>
     <Text style={styles.RiscosTitle}>Riscos da exposição solar excessiva</Text>
     <Text style={styles.bodyText}>
      A exposição solar sem proteção adequada pode levar a diversos riscos para a saúde da pele, incluindo queimaduras solares, envelhecimento precoce, danos ao DNA das células da pele e aumento do risco de câncer de pele. É essencial utilizar roupas com proteção UV, além de protetor solar, para minimizar esses riscos e manter a pele saudável.
     </Text>
    </View>
 );
};
