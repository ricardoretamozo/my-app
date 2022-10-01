import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, SimpleGrid } from '@chakra-ui/react'

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ChartReporteUsuarios = ({ reportes, serieReporte, nombreTecnicos, totalReportes }) => {

  // SUMAR

  // console.log(nombreTecnicos);
  // console.log(totalReportes);

  function Promedio(myArray) {
    var i = 0, summ = 0, ArrayLen = myArray.length;
    while (i < ArrayLen) {
      summ = summ + myArray[i++];
    }
    return summ / ArrayLen;
  }

  const data = reportes

  var pendientes = data.map(item => item.pendientes)
  var atendidas = data.map(item => item.atendidas)
  var tramitadas = data.map(item => item.tramitadas)
  var total = data.map(item => item.total)

  const datos = [
    {
      name: data.map(item => item.usuario?.nombre),
      data: [
        pendientes, atendidas, tramitadas, total
      ]
    }
  ]

  // console.log(nombreTecnicos)

//   var nombreUsuario = nombreTecnicos.filter(item => item.length < 5)

//   console.log(nombreUsuario)

  var pendientes = data.map(item => item.pendientes)

  //console.log(serieReporte)

  const options = {
    title: {
      text: 'INCIDENCIAS DE CADA USUARIO'
    },
    subtitle: {
      text: 'CANTIDAD DE ESTADO DE INCIDENCIAS DE CADA USUARIO'
    },
    yAxis: {
      title: {
        text: 'Incidencias'
      },
    },
    tooltip: {
      split: true,
      valueSuffix: ' ' + 'INCIDENCIAS'
    },
    series: data.map(item => {
      return {
        name: item.usuario?.nombre,
        data: [item.pendientes, item.atendidas, item.tramitadas, item.total]
      }
    }),
    exporting: {
      showTable: false
    },
  }

  const options2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
  },
  title: {
      text: 'Browser<br>shares<br>January<br>2022',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                  fontWeight: 'bold',
                  color: 'white'
              }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
      }
  },
  series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
          ['Pendietes', 73.86],
          ['En Trámite', 11.97],
          ['Atendidos', 5.52],
          ['Total', 2.98],
          {
              name: 'Other',
              y: 3.77,
              dataLabels: {
                  enabled: false
              }
          }
      ]
  }]
  }

  const BellcurveOptions = {
    title: {
      text: 'TOTAL INCIDENCIAS POR USUARIO'
    },
    xAxis: [{
      title: {
        text: 'Tecnicos'
      },
      type: 'category',
      alignTicks: false
    }],
    yAxis: [{
      title: { 
        text: 'Incidencias' 
      },
      categories : false,
      alignTicks: false
    }],
    chart: {
      plotBackgroundColor: true,
      type: 'bellcurve',
    },
    series: {
      name: 'Total Incidencias',
      data: data.map(item => {
        return {
          name: item.usuario?.nombre,
          y: item.total
        }
      }),
      exporting: {
        showTable: false,
      },
    }
  }

  const BarOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'CHARTS DE BARRAS POR USUARIO'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: 'nombreTecnicos',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad de Incidencias'
      }
    },
    series: [
      {
        name: 'Pendientes',
        data: data.map(item => item.pendientes ),
        color: '#e53e3e'
      },
      {
        name: 'En Tramite',
        data: data.map(item => item.tramitadas ),
        color: '#d69e2e'
      },
      {
        name: 'Atendidas',
        data: data.map(item => item.atendidas ),
        color: '#38a169'
      },
      {
        name: 'Total',
        data: data.map(item => item.total ),
        color: '#4a5568'
      },
    ],
    exporting: {
      showTable: false,
    },
  }

  const PieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Incidencias Pendientes: <b>{point.p}</b><br/>' +
        'Incidencias En Tramite: <b>{point.t}</b><br/>' +
        'Total Atendidas: <b>{point.a}</b><br/>' +
        'Total Incidencias: <b>{point.y}</b><br/>'
    },
    title: {
      text: 'TOTAL DE INCIDENCIAS POR USUARIO PIECHART'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: 'nombreUsuario',
    },    
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
  },
    series: [{
      colorByPoint: true,
      data: data.map(item => {
        return {
          name: item.usuario.nombre,
          y: item.total,
          p: item.pendientes,
          t: item.tramitadas,
          a: item.atendidas,
        }
      }),
    }],
    exporting: {
      showTable: false,
    },
  }

  const AreaOptions = {
    title: {
      text: 'INCIDENCIAS POR USUARIO'
    },
    yAxis: {
      title: {
        text: 'Total Incidencias'
      }

    },
    series: [{
      name: 'Incidencias por usuario',
      data: data.map(item => {
        return {
          name: item.usuario.nombre,
          y: item.total,
        }
      }),
      type: "area",
    }],
    exporting: {
      showTable: false,
    },
  }

  const Barras = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'ESTADO POR TIPO DE INCIDENCIAS'
    },
    subtitle: {
      text: 'Source: <a href="#">Más Detalles</a>'
    },
    xAxis: {
      categories: nombreTecnicos
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Incidencias'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>'
    },
    plotOptions: {
      column: {
        stacking: 'number'
      }
    },
    series: [{
      name: 'Pendientes',
      data: pendientes,
      color: '#e53e3e'
    },
    {
      name: 'En Trámite',
      data: tramitadas,
      color: '#d69e2e'
    },
    {
      name: 'Atendidas',
      data: atendidas,
      color: '#38a169'
    },
    {
      name: 'Total',
      data: total,
      color: '#4a5568'
    }
  ]
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing='40px'>
        <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={BellcurveOptions} />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={Barras} />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={BarOptions} />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={PieOptions} />
        </Box>
        <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={AreaOptions} />
        </Box>
        {/* <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={promedio} />
        </Box> */}
        {/* <Box height='100%' borderRadius="xs" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={options2} />
        </Box> */}
      </SimpleGrid>
    </>
  )

}

export default ChartReporteUsuarios;