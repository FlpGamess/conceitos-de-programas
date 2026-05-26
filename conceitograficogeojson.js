import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
// import brazilRegionsGeoJson from './brazil-regions.json';

const BrazilRegionMap = ({ data }) => {
  // echarts.registerMap('brazil', brazilRegionsGeoJson);

  const getOption = () => {
    // 1. Definir o centro aproximado de cada região (Long, Lat)
    const regionCenters = {
      'Norte': [-60, -5],
      'Nordeste': [-40, -10],
      'Centro-Oeste': [-53, -15],
      'Sudeste': [-45, -20],
      'Sul': [-51, -27]
    };

    // 2. Definir para onde a seta vai apontar (fora do mapa)
    const labelPositions = {
      'Norte': [-75, 5],
      'Nordeste': [-25, -5],
      'Centro-Oeste': [-70, -15],
      'Sudeste': [-25, -25],
      'Sul': [-35, -35]
    };

    // 3. Montar dados para as linhas (setas)
    const linesData = data.map(item => ({
      coords: [ regionCenters[item.name], labelPositions[item.name] ]
    }));

    // 4. Montar dados para os textos
    const scatterData = data.map(item => ({
      name: item.name,
      value: [...labelPositions[item.name], item.value]
    }));

    return {
      tooltip: { trigger: 'item' },
      geo: {
        map: 'brazil',
        roam: false,
        itemStyle: { areaColor: '#f3f3f3', borderColor: '#999' }
      },
      series: [
        {
          name: 'Regiões',
          type: 'map',
          geoIndex: 0,
          data: data // Ex: [{name: 'Norte', value: 100}, ...]
        },
        {
          name: 'Setas',
          type: 'lines',
          coordinateSystem: 'geo',
          symbol: ['none', 'arrow'], // Seta no final da linha
          symbolSize: 8,
          lineStyle: {
            color: '#333',
            width: 1.5,
            type: 'solid',
            curveness: 0.2 // Curvatura estilosa
          },
          data: linesData
        },
        {
          name: 'Valores Externos',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1, // Torna o ponto invisível
          label: {
            show: true,
            formatter: (params) => `{regionName|${params.name}}\n{value|${params.value[2]}}`,
            rich: {
              regionName: { fontSize: 12, color: '#666' },
              value: { fontSize: 18, fontWeight: 'bold', color: '#000' }
            },
            position: 'right'
          },
          data: scatterData
        }
      ]
    };
  };

  return <ReactECharts option={getOption()} style={{ height: '500px', width: '100%' }} />;
};

export default BrazilRegionMap;
