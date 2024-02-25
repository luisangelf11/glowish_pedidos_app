import React,{useEffect, useState} from 'react'
import { useTimeNowSQL } from '../hooks/useTimeNowSQL';
import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View,
  } from "@react-pdf/renderer";
  import GW from "../assets/GW.png";
import { getOrdersReport } from '../api/reports';

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: "4px",
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: "800",
      color: "#EF5757",
    },
    logo: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    section: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: "11px",
      padding: "20px",
      textAlign: "justify",
    },
    fecha: {
      fontSize: "11px",
      padding: "5px",
      textAlign: 'center',
      color: '#EF5757'
    },
    table: {
      width: "80%",
      margin: "10rem auto",
      padding: "5px",
      fontSize: '10px',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #ccc",
      marginTop: "5px",
      padding: "10px",
    },
    tableCol: { width: "20%", textAlign: "center", color: "#222" },
    tableHeader: {
      width: "20%",
      textAlign: "center",
      fontWeight: 800,
      textTransform: "uppercase",
      color: "#EF5757",
    },
    containerText: {
      width: '400px'
    }
  });

export default function ReportOrders({from, to}) {
    const { dateNowSQL } = useTimeNowSQL();
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await getOrdersReport(from, to);
            setData(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        console.log(from, to)
    }, [])

  return (
    <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={styles.section}>
                    <Image src={GW} style={styles.logo} />
                    <Text style={styles.title}>Reporte de pedidos</Text>
                    <Text style={styles.fecha}>Desde: {from} | Hasta: {to}</Text>
                    <Text style={styles.fecha}>Generado el {dateNowSQL()}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.text}>
                    El siguiente reporte detalla una lista de pedidos realizados desde el {from} hasta 
                    el {to}.
                    El análisis de los pedidos realizados durante el período especificado revela un patrón consistente de demanda por parte de nuestros clientes. Durante este período, se procesaron un total de {data.length} pedidos.
                    </Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableHeader}>
                            <Text>Id</Text>
                        </View>
                        <View style={styles.tableHeader}>
                            <Text>Fecha</Text>
                        </View>
                        <View style={styles.tableHeader}>
                            <Text>Monto</Text>
                        </View>
                        <View style={styles.tableHeader}>
                            <Text>Estado</Text>
                        </View>
                        <View style={styles.tableHeader}>
                            <Text>Id_Usuario</Text>
                        </View>
                    </View>
                    {data.map((item) => (
                        <View key={item.Id} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text>{item.Id}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text>{item.Fecha}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text>{parseFloat(item.Monto).toFixed(2)}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text>{item.Estado}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text>{item.Id_Usuario}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
  )
}
