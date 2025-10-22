import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Coords = { latitude: number; longitude: number; };
type RiskLevel = { level: string; color: string; };

export default function SolSeguro() {
  const [location, setLocation] = useState<Coords | null>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>({ level: "", color: "" });
  const [loading, setLoading] = useState(true);


  {/* Nivel de Risco */}
  const getRiskInfo = (uv: number): RiskLevel => {
    if (uv < 3) return { level: "Baixo - Risco Baixo", color: "#000000ff" };
    if (uv < 6) return { level: "Moderado - Risco Moderado", color: "#000000ff" };
    if (uv < 8) return { level: "Alto - Risco Alto", color: "#000000ff" };
    if (uv < 11) return { level: "Muito Alto - Risco Elevado", color: "#000000ff" };
    return { level: "Extremo - Procure uma Sobra", color: "#000000ff" };
  };

  {/* Se o usuario negar a localização - Mensagem de Erro */}

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { alert("Permissão negada!"); setLoading(false); return; }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);


  {/* API Meteorologica */}
  useEffect(() => {
    if (location) {
      (async () => {
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=uv_index`);
          const data = await res.json();
          const uv = data?.current?.uv_index;
          setUvIndex(uv);
          setRiskLevel(getRiskInfo(uv));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
      })();
    }
  }, [location]);

  {/* Carregando App */}

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000000ff" />
      <Text style={styles.loadingText}>Carregando SolSeguro...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      {/* Índice UV e nível */}
      <View style={styles.uvContainer}>
    <Text style={styles.uvText}>ÍNDICE UV: </Text>
  <Text style={styles.uvIndex}>{uvIndex?.toFixed(1) ?? "N/A"}</Text>
</View>
      <Text style={[styles.riskLevel, { color: riskLevel.color }]}>{riskLevel.level}</Text>

      {/* Mapa menor */}
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={location} title="Você está aqui" description={`UV: ${uvIndex?.toFixed(1)}`} />
        </MapView>
      ) : <Text>Não foi possível obter localização.</Text>}

      {/* Aqui você pode adicionar o gráfico de horários */}
      <View style={styles.riskHoursCard}>
        <Text style={styles.riskHoursTitle}>Horários de Risco</Text>
        {/* Coloque seu gráfico aqui */}
      </View>
    </View>
  );
}

  {/* Estilos */}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA", alignItems: "center", paddingTop: 40 },
  logo: { width: 100, height: 139, marginBottom: 10 },
  uvIndex: { fontSize: 48, fontWeight: "bold", color: "#FF9800" },
  riskLevel: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  map: { width: "90%", height: 200, borderRadius: 16, marginBottom: 20 },
  riskHoursCard: { width: "90%", backgroundColor: "#fff", padding: 15, borderRadius: 16 },
  riskHoursTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E0F7FA" },
  loadingText: { marginTop: 10, fontSize: 18, color: "#FF9800" },
  uvContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  uvText: { fontSize: 27, fontWeight: "bold", color: "#000000ff", marginLeft: 8 },
});
