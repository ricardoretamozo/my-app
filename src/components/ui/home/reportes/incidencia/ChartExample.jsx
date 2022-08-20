import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, SimpleGrid } from '@chakra-ui/react'

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);



const ChartExample = ({ reportes, serieReporte }) => {

  const data = reportes

  var total = data.map(item => item.total)

  console.log(serieReporte)

  const options = {
    title: {
      text: 'INCIDENCIAS DE CADA TÉCNICO'
    },
    subtitle: {
      text: 'CANTIDAD DE ESTADO DE INCIDENCIAS DE CADA TÉCNICO'
    },
    yAxis: {
      title: {
        text: 'INCIDENCIAS'
      },
    },
    tooltip: {
      split: true,
      valueSuffix: ' ' + 'INCIDENCIAS'
    },
    series: [
      {
        name: data[0]?.usuario.nombre,
        data: [data[0]?.pendientes, data[0]?.tramitadas, data[0]?.atendidas, data[0]?.total],
      },
      {
        name: data[1]?.usuario.nombre,
        data: [data[1]?.pendientes, data[1]?.tramitadas, data[1]?.atendidas, data[1]?.total],
      },
      {
        name: data[2]?.usuario.nombre,
        data: [data[2]?.pendientes, data[2]?.tramitadas, data[2]?.atendidas, data[2]?.total],
      },
      {
        name: data[3]?.usuario.nombre,
        data: [data[3]?.pendientes, data[3]?.tramitadas, data[3]?.atendidas, data[3]?.total],
      },
    ],
    exporting: {
      showTable: false
    },
  }

  const BellcurveOptions = {
    title: {
      text: 'TOTAL DE INCIDENCIAS DE CADA TÉCNICO'
    },
    xAxis: [{
      title: {
        text: 'Data'
      },
      alignTicks: false
    }, {
      title: {
        text: 'Bell curve'
      },
      alignTicks: false,
      opposite: true
    }],
    yAxis: [{
      title: { text: 'Data' }
    }, {
      title: { text: 'Bell curve' },
      opposite: true
    }],
    chart: {
      plotBackgroundColor: true,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bellcurve'
    },
    series: [{
      name: 'Bell curve',
      type: 'bellcurve',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 1,
      zIndex: -1
    }, {
      name: 'Inciendencias',
      type: 'scatter',
      data: total,
      accessibility: {
        exposeAsGroupOnly: true
      },
      marker: {
        radius: 1.5
      }
    }],
    exporting: {
      showTable: false,
    },
  }

  const BarOptions = {
    title: {
      text: 'CHARTS DE BARRAS POR TÉCNICO'
    },
    series: [
      {
        name: data[0]?.usuario.nombre,
        data: [data[0]?.pendientes, data[0]?.tramitadas, data[0]?.atendidas, data[0]?.total],
        type: "bar",
      },
      {
        name: data[1]?.usuario.nombre,
        data: [data[1]?.pendientes, data[1]?.tramitadas, data[1]?.atendidas, data[1]?.total],
        type: "bar",
      },
      {
        name: data[2]?.usuario.nombre,
        data: [data[2]?.pendientes, data[2]?.tramitadas, data[2]?.atendidas, data[2]?.total],
        type: "bar",
      },
      {
        name: data[3]?.usuario.nombre,
        data: [data[3]?.pendientes, data[3]?.tramitadas, data[3]?.atendidas, data[3]?.total],
        type: "bar",
      },
    ],
    exporting: {
      showTable: false,
    },
  }

  const PieOptions = {
    title: {
      text: 'TOTAL DE INCIDENCIAS POR TÉCNICO PIECHART'
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
      'Incidencias Pendientes: <b>{point.p}</b><br/>' +
      'Incidencias En Tramite: <b>{point.t}</b><br/>' +
      'Total Atendidas: <b>{point.a}</b><br/>' +
      'Total Incidencias: <b>{point.y}</b><br/>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true
        },
        showInLegend: true
      }
    },
    series: [{
      colorByPoint: true,
      data: [
        {
          name: data[0]?.usuario.nombre,
          y: data[0]?.total,
          p: data[0]?.pendientes,
          t: data[0]?.tramitadas,
          a: data[0]?.atendidas,
        },
        {
          name: data[1]?.usuario.nombre,
          y: data[1]?.total,
          p: data[1]?.pendientes,
          t: data[1]?.tramitadas,
          a: data[1]?.atendidas,
        },
        {
          name: data[2]?.usuario.nombre,
          y: data[2]?.total,
          p: data[2]?.pendientes,
          t: data[2]?.tramitadas,
          a: data[2]?.atendidas,
        },
        {
          name: data[3]?.usuario.nombre,
          y: data[3]?.total,
          p: data[3]?.pendientes,
          t: data[3]?.tramitadas,
          a: data[3]?.atendidas,
        },
      ],
    }],
    exporting: {
      showTable: false,
    },
  }

  const AreaOptions = {
    title: {
      text: 'INCIDENCIAS POR TÉCNICO'
    },
    series: [{
      name: 'Incidencias por técnico',
      data: [
        {
          name: data[0]?.usuario.nombre,
          y: data[0]?.total,
        },
        {
          name: data[1]?.usuario.nombre,
          y: data[1]?.total,
        },
        {
          name: data[2]?.usuario.nombre,
          y: data[2]?.total,
        },
        {
          name: data[3]?.usuario.nombre,
          y: data[3]?.total,
        },
      ],
      type: "area",
    }],
    exporting: {
      showTable: false,
    },
  }

  const ConvinateOptions = {
    title: {
      text: 'CONVINACIÓN DE CHARTS'
    },
    series: [
      {
        type: 'column',
        name: data[0]?.usuario.nombre,
        data: [data[0]?.pendientes, data[0]?.tramitadas, data[0]?.atendidas, data[0]?.total],
      },
      {
        type: 'column',
        name: data[1]?.usuario.nombre,
        data: [data[1]?.pendientes, data[1]?.tramitadas, data[1]?.atendidas, data[1]?.total],
      },
      {
        type: 'column',
        name: data[2]?.usuario.nombre,
        data: [data[2]?.pendientes, data[2]?.tramitadas, data[2]?.atendidas, data[2]?.total],
      },
      {
        type: 'column',
        name: data[3]?.usuario.nombre,
        data: [data[3]?.pendientes, data[3]?.tramitadas, data[3]?.atendidas, data[3]?.total],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: 'white'
        }
      }, {
        type: 'pie',
        name: 'Liter',
        data: [{
          name: data[0]?.usuario.nombre,
          y: data[0]?.total,
          color: Highcharts.getOptions().colors[0] 
        }, {
          name: data[1]?.usuario.nombre,
          y: data[1]?.total,
          color: Highcharts.getOptions().colors[1] 
        }, {
          name: data[2]?.usuario.nombre,
          y: data[2]?.total,
          color: Highcharts.getOptions().colors[2] 
        },{
          name: data[3]?.usuario.nombre,
          y: data[3]?.total,
          color: Highcharts.getOptions().colors[3] 
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }
    ],
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing='40px'>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={BellcurveOptions} />
        </Box>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={BarOptions} />
        </Box>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={PieOptions} />
        </Box>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={AreaOptions} />
        </Box>
        <Box height='100%' borderRadius="lg" boxShadow={'md'} p={2}>
          <HighchartsReact highcharts={Highcharts} options={ConvinateOptions} />
        </Box>
      </SimpleGrid>
    </>
  )

}

export default ChartExample;