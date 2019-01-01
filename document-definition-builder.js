const monthMap = {
  January: 'styczniu',
  February: 'lutym',
  March: 'marcu',
  April: 'kwietniu',
  May: 'maju',
  June: 'czerwcu',
  July: 'lipcu',
  August: 'sierpniu',
  September: 'wrześniu',
  October: 'październiku',
  November: 'listopadzie',
  December: 'grudniu',
};

const buildBody = input => {
  return [
    [{ text: 'ZAŁĄCZNIK DO FAKTURY', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
    [{ text: `Podwykonawca: ${input.name}`, colSpan: 2, alignment: 'center' }, {}],
    [{ text: 'Dla: yameo Sp. z o.o. ul. Piastowska 11 Gdańsk', colSpan: 2, alignment: 'center' }, {}],
    [{ text: `Ewidencja godzin zrealizowanych w miesiącu ${monthMap[input.month]} ${input.year}`, colSpan: 2, alignment: 'center' }, {}],
    [{ text: 'Godziny zrealizowane', alignment: 'center' }, { text: 'zadanie/zakres', alignment: 'center' }],
  ].concat(
    input.tasks.map(task => {
      return [
        { text: `${task.hours}`, alignment: 'center' }, { text: task.task, alignment: 'center' }
      ];
    })
  );
};

const buildDocumentDefinition = input => {
  return {
    content: [
      {
        table: {
          widths: [250, 250],
          body: buildBody(input),
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === 4 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return '#0074c1';
          },
          vLineColor: function (i, node) {
            return '#0074c1';
          },
        }
      }
    ],
    defaultStyle: {
      font: 'DejaVuSans'
    }
  };
};

module.exports = buildDocumentDefinition;
