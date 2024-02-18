import React, { useEffect, useState } from "react";
import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import GW from "../assets/GW.png";
import { useTimeNowSQL } from "../hooks/useTimeNowSQL";
import { getProductReports } from "../api/reports";

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

export default function ReportProducts() {
    const {dateNowSQL} = useTimeNowSQL();
    const [data, setData] = useState([]);

    const getData = async()=>{
        try{
            const res = await getProductReports();
            setData(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.section}>
          <Image src={GW} style={styles.logo} />
          <Text style={styles.title}>Reporte de productos</Text>
          <Text style={styles.fecha}>Generado el {dateNowSQL()}</Text>
        </View>
        <View style={styles.containerText}>
        <Text style={styles.text}>
          Este documento constituye un reporte detallado del inventario actual
          de productos. Contiene información relevante sobre los productos
          disponibles en stock, incluyendo detalles como nombres, cantidades y
          descripciones. Este reporte proporciona una visión general precisa del
          estado actual del inventario, lo que facilita la gestión y
          planificación de existencias.
        </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableHeader}>
              <Text>ID</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Nombre</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Descripción</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Unidades</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Precio</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Descuento</Text>
            </View>
          </View>
          {data.map((item) => (
            <View key={item.Id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>{item.Id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Descripcion}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Unidades}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{parseFloat(item.Precio).toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Descuento}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
