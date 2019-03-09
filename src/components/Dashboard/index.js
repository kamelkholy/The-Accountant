import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Bar></Bar>
                    </div>
                    <div className="col-6">
                        <Bar></Bar>
                    </div>
                </div>
            </div>
        )
    }
}