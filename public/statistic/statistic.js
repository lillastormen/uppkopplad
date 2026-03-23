// import Chart  from "https://cdn.jsdelivr.net/npm/chart.js";



const url = "http://localhost:3000/users/statistics/accuracy";
let chart;
Chart.register(ChartDataLabels);


async function fetchAccuracy() {
    const response = await fetch(url, {
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error('Failed to fetch stats');
    }

    return await response.json();
} 

function prepChartData(data) {
    const labels = data.map(d => d.category);
    const values = data.map(d => d.accuracy);
    const correct = data.map(d => d.correct);
    const total = data.map(d => d.total);


    return { labels, values, correct, total };
}

function renderChart(labels, values, correct, total) {
    const ctx = document.getElementById('myChart');

    //for re-rendering
    if (chart) {
        chart.destroy();
    }

    const borderColors = [
        // '#3b615e',
        '#ab8a38',
        '#ad5f07',
        '#6b8e23',
        '#8b5cf6',
        // '#e63946'
    ];

    const backgroundColors = [
        // 'rgba(59, 97, 94, 0.5)',
        'rgba(171, 138, 56, 0.5)',
        'rgba(173, 95, 7, 0.5)',
        'rgba(107, 142, 35, 0.5)',
        'rgba(139, 92, 246, 0.5)',
        // 'rgba(230, 57, 70, 0.5)'
    ];


    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Accuracy',
                data: values,
                borderRadius: 5,
                borderSkipped: false,
                barThickness: 45,

                borderColor: labels.map((_, i) => borderColors[i % borderColors.length]),
                backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),

                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: '#2e2e2e',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0,0,0,0.05)',  
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 20,
                        color: '#2e2e2e',
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    offset: 4,
                    formatter: (value, context) => {
                        const i = context.dataIndex;
                        return `${value}% (${correct[i]}/${total[i]})`;
                    },
                    color: '#1f1f1f',
                    font: {
                        weight: 'bold',
                        size: 14,
                        family: 'Atkinson Hyperlegible'
                    }
                },
                title: {
                    display: true,
                    // color: '#1f1f1f',
                    // font: {
                    //     size: 24,
                    //     family: 'Atkinson Hyperlegible',
                    //     weight: 600,

                    // },
                },
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}
 
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchAccuracy();

        if(!data.length) {
            document.body.innerHTML += '<p>No data yet</p>';
            return;
        }

        const { labels, values, correct, total } = prepChartData(data);

        renderChart(labels, values, correct, total);
    } catch (error) {
        console.log(error);
        document.querySelector('.container').innerHTML = '<p>Could not load the chart. </p>'
    }
})
