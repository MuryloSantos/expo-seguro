import React, { useState } from "react";
import { Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [showConfig, setShowConfig] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showVersion, setShowVersion] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo SolSeguro */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      {/* Seção 1 - Configuração */}
      <TouchableOpacity
        style={styles.componentSection}
        onPress={() => setShowConfig(true)}
      >
        <Text style={styles.riskHoursCard}>Configuração</Text>
      </TouchableOpacity>

      {/* Seção 2 - Sobre o App */}
      <TouchableOpacity
        style={styles.componentSection}
        onPress={() => setShowAbout(true)}
      >
        <Text style={styles.riskHoursCard}>Sobre o App</Text>
      </TouchableOpacity>

      {/* Seção 3 - Versão */}
      <TouchableOpacity
        style={styles.componentSection}
        onPress={() => setShowVersion(true)}
      >
        <Text style={styles.riskHoursCard}>Versão 1.0.0</Text>
      </TouchableOpacity>

      {/* MODAL 1 - Configuração */}
      <Modal
        visible={showConfig}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfig(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.text}>
              No momento, não há configurações adicionais disponíveis.
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowConfig(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 2 - Sobre o App */}
      <Modal
        visible={showAbout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Sobre o SolSeguro</Text>
            <Text style={styles.text}>
              O SolSeguro foi desenvolvido para ajudar você a se proteger da radiação solar.{"\n"}
              Com base em dados de localização e índice UV em tempo real, o app indica o nível de risco e oferece alertas para cuidar da sua pele de forma inteligente.
              
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowAbout(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 3 - Versão */}
      <Modal
        visible={showVersion}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVersion(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Versão do App</Text>
           
            <Text style={styles.text}>
              📱 Desenvolvido por:{" "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://github.com/GuilhermyAlmeida")}
              >
                Guilhermy de Almeida
              </Text>
              {", "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://github.com/MuryloSantos")}
              >
                Murylo Santos
              </Text>
              {" e "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://github.com/VictorNobrega")}
              >
                Víctor Nóbrega
              </Text>
              {"."}
              {"\n\n"}
              Versão atual: 1.0.0
            </Text>
            
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowVersion(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: "#0288D1",
    textDecorationLine: "none",
  },
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  componentSection: {
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 139,
    marginBottom: 100,
  },
  riskHoursCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
    lineHeight: 22,
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: "#FFB300",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
