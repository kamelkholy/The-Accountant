import React, { Component } from "react";
import Chart from "chart.js/dist/Chart";

export default class Pie extends Component {
    componentDidMount() {
        const ctx = document.getElementById("pie").getContext("2d");
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [2478, 5267, 734, 784, 433]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Customer Nations Distribution'
                }
            }
        });
    }

    render() {
        return (
            <canvas id="pie" width="400" height="400"></canvas>
        )
    }
}