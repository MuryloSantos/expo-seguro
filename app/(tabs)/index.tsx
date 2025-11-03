import * as shape from "d3-shape";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { AreaChart, Grid } from "react-native-svg-charts";

type Coords = { latitude: number; longitude: number };
type RiskLevel = { level: string; color: string };

export default function SolSeguro() {
  const [location, setLocation] = useState<Coords | null>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>({
    level: "",
    color: "",
  });
  const [loading, setLoading] = useState(true);
  const [uvData, setUvData] = useState<number[]>([]);

  {/* Define o nível de risco conforme o UV atual */}
  const getRiskInfo = (uv: number): RiskLevel => {
    if (uv < 3) return { level: "Baixo - Risco Baixo", color: "#00A36C" };
    if (uv < 6) return { level: "Moderado - Risco Moderado", color: "#FFB300" };
    if (uv < 8) return { level: "Alto - Risco Alto", color: "#F57C00" };
    if (uv < 11)
      return { level: "Muito Alto - Risco Elevado", color: "#E53935" };
    return { level: "Extremo - Procure uma Sombra", color: "#8E24AA" };
  };

  {/* Solicita permissão e obtém localização */}
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão de localização negada!");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

   {/* Busca dados UV da Open-Meteo */}
  useEffect(() => {
    if (location) {
      (async () => {
        try {
        
        {/* Testar UV Alto! */}
        /*
        const uv = 9.9; // força UV alto
        setUvIndex(uv);
        setRiskLevel(getRiskInfo(uv));
        setLoading(false);
        return;*/
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=uv_index&timezone=America%2FSao_Paulo`
          );
          const data = await res.json();

          // Dados horários de hoje
          const hourlyUV: number[] = data?.hourly?.uv_index ?? [];
          const currentHour = new Date().getHours();
          const todayUV = hourlyUV.slice(currentHour, currentHour + 12); // próximas 12h

          setUvData(todayUV);
          const nowUV = hourlyUV[currentHour];
          setUvIndex(nowUV);
          setRiskLevel(getRiskInfo(nowUV));
        } catch (err) {
          console.error("Erro ao buscar dados UV:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [location]);

  {/* Gradiente do gráfico */}
  const Gradient = () => (
    <Defs>
      {/* @ts-ignore */}
      <LinearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor="#FF9800" stopOpacity={0.4} />
        <Stop offset="100%" stopColor="#FF9800" stopOpacity={0.05} />
      </LinearGradient>
    </Defs>
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        {/* Índice UV e nível */}
        <View style={styles.uvContainer}>
          <Text style={styles.uvText}>ÍNDICE UV: </Text>
          <Text style={styles.uvIndex}>
            {uvIndex !== null ? uvIndex.toFixed(1) : "N/A"}
          </Text>
        </View>

        <Text style={[styles.riskLevel, { color: riskLevel.color }]}>
          {riskLevel.level}
        </Text>

        {/* Card Proteger Agora */}
        {uvIndex !== null && uvIndex >= 8 && (
        <View style={styles.riskHoursCard}>
          <Text style={styles.levelRisk}>Proteger Agora!</Text>
        </View>
        )}
        
        {/* Linha com ícones (mostra só UV alto) */}
        {uvIndex !== null && uvIndex >= 8 && (
          <View style={styles.containerOne}>
            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={require("../../assets/images/protetor-solar.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>FPS 50+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={require("../../assets/images/chapeu-e-oculos.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Chapéu e Óculos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox}>
              <Image
                source={require("../../assets/images/camiseta.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Roupas UV</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mapa */}
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
            <Marker
              coordinate={location}
              title="Você está aqui"
              description={`UV: ${uvIndex?.toFixed(1)}`}
            />
          </MapView>
        ) : (
          <Text>Não foi possível obter localização.</Text>
        )}

        {/* Gráfico com dados reais */}
        <View style={styles.riskHoursCard}>
          <Text style={styles.riskHoursTitle}>Horários de Risco</Text>

          {uvData.length > 0 ? (
            <AreaChart
              style={{ height: 150 }}
              data={uvData}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveBasis}
              svg={{
                fill: "url(#uvGrad)",
                stroke: "#FF9800",
                strokeWidth: 2,
              }}
            >
              {/* ⬇️ O gradiente vai como child direto, sem "extras" */}
              <Defs>
                {/* @ts-ignore - ignora o bug da tipagem */}
                <LinearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#FF9800" stopOpacity={0.4} />
                  <Stop offset="100%" stopColor="#FF9800" stopOpacity={0.05} />
                </LinearGradient>
              </Defs>
              <Grid />
            </AreaChart>
          ) : (
            <Text style={{ textAlign: "center", color: "#666" }}>
              Carregando dados UV...
            </Text>
          )}

          <Text style={styles.chartLabel}>12h - 16h</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  levelRisk: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 15,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  scrollContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 139,
    marginBottom: 10,
  },
  uvIndex: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF9800",
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  map: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  riskHoursCard: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  riskHoursTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 15,
  },
  uvContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  uvText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000000ff",
    marginLeft: 8,
  },
  containerOne: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  iconBox: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  iconText: {
    fontSize: 14,
    color: "#1B3C40",
    fontWeight: "500",
  },
  chartLabel: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
});
