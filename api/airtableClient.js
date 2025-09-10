export const fetchAvailableSlots = async (formattedDate) => {
    const token = 'patjZl0HxEhYy4FCj.3e4591d8893fdcc40fa4d435e05c881f0d6c67014b46cd428a72c1de375bf41b';
    const baseId = 'appnqVCHbIPRDk9Gw';
    const tableName = 'timetable';

    const filterFormula = `AND(IS_SAME({Date training}, '${formattedDate}', 'day'))`;
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;

    console.log('Airtable URL:', url);
    console.log('Filter formula:', filterFormula);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Ошибка запроса Airtable:', errorDetails);
        throw new Error('Ошибка при получении данных из Airtable');
    }

    const data = await response.json();

    console.log('Airtable response data:', data);

    return data.records.map(record => ({
        id: record.id,
        dateTraining: record.fields['Date training'],
        time: record.fields['Time training'],
        freeSlots: record.fields['number free'],
    }));
};

