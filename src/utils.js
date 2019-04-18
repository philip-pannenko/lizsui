export const getHTMLElementFrieldyTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
};

export const generateMetricsData = () => {
    return [
        {
            name: "Group 1", id: 1, sum: 10, metrics: [
                {id: 1, name: "Metric 1", value: 10},
                {id: 2, name: "Metric 2"}
            ]
        }, {
            name: "Group 2", id: 2, sum: 15, metrics: [
                {id: 3, name: "Metric 3", value: 7},
                {id: 4, name: "Metric 4", value: 8}
            ]
        }
    ];
};

export const generateDashboardData = () => {
    return [
        {
            name: "Metric Group 1", id: 1, users: [
                {name: "Philip Pannenko"}, {name: "Elizabeth Hesser"}
            ], metrics: [
                {
                    id: 1, name: "Metric 1", sum: 10, values: [
                        {user: 1, value: 7}, {user: 2, value: 3}]
                },
                {
                    id: 2, name: "Metric 2", sum: 28, values: [
                        {user: 1, value: 15}, {user: 2, value: 13}]
                },
            ]
        }, {
        name: "Metric Group 2", id: 2, users: [
            {name: "Philip Pannenko"}, {name: "Elizabeth Hesser"}
        ], metrics: [
            {
                id: 3, name: "Metric 3", sum: 41, values: [
                    {user: 1, value: 40}, {user: 2, value: 1}]
            },
            {
                id: 4, name: "Metric 4", sum: 2, values: [
                    {user: 1, value: 0}, {user: 2, value: 1}]
            },
        ]
    }
    ];
}
