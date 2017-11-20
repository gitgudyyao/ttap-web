import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import { TimePeriod } from "../../att/timePeriod";

export interface ISkeleton {
    Layouts : ReactGridLayout.Layout[];
    Children : any[];
}

export class Skeleton implements ISkeleton {
    public static readonly Y_OFFSET = 1;
    public static readonly X_OFFSET = 4;
    public Layouts : ReactGridLayout.Layout[];
    public Children : any[];
    public constructor() {
        const child = [];
        child.push(this.GetTimeRow());
        child.push(this.GetDayColumn());
        let layouts : ReactGridLayout.Layout[] = [];
        layouts = layouts.concat(this.GetTimeRowLayout());
        layouts = layouts.concat(this.GetDayColumnLayout());
        this.Layouts = layouts;
        this.Children = child;
    }

    public Concat(other : ISkeleton) : void {
        this.Children = this
            .Children
            .concat(other.Children);
        this.Layouts = this
            .Layouts
            .concat(other.Layouts);
    }

    private GetTimeRow() {
        const divStyle : React.CSSProperties = {
            borderBottom: "1px solid",
            borderRight: "1px solid",
            height: "20.5px",
            fontFamily: "roboto",
            padding: "2px",
            textAlign: "center"
        };
        const lastDivStyle: React.CSSProperties = {
            borderBottom: "1px solid",
            height: "20.5px",
            fontFamily: "roboto",
            padding: "2px",
            textAlign: "center"
        };
        const result = [];
        for (let i = 0;; i++) {
            let time = i + TimePeriod.Min.Hour - 1;
            const isAtLast = time === TimePeriod.Max.Hour;
            if (time > TimePeriod.Max.Hour) {
                break;
            }
            time = time <= 12
                ? time
                : time - 12;
            result.push(
                <div key={"t" + i}>
                    <div style={isAtLast ? lastDivStyle : divStyle}>{time + ":00"}</div>
                    <div style={isAtLast ? lastDivStyle : divStyle}>{(time + 1) + ":00"}</div>
                </div>
            );
        }
        return result;
    }
    private GetTimeRowLayout() : ReactGridLayout.Layout[] {
        const result = Array < ReactGridLayout.Layout > ();
        for (let i = 0; i < 32; i++) {
            result.push({
                h: 1,
                i: ("t" + i),
                w: 2,
                x: i * 2 + Skeleton.X_OFFSET - 2,
                y: 0
            });
        }
        return result;
    }

    private GetDayColumn() {
        const days = [
            " ",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
            "SUN"
        ];
        const firstDivStyle : React.CSSProperties = {
            borderRight: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div1style : React.CSSProperties = {
            borderRight: "1px solid",
            borderTop: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div2style : React.CSSProperties = {
            display: "table-cell",
            fontFamily: "roboto",
            verticalAlign: "middle"
        };
        const result = [];
        for (let i = 0; i < days.length; i++) {
            result.push(
                <div
                    style={i === 0
                    ? firstDivStyle
                    : div1style}
                    key={"d" + i}>
                    <div style={div2style}>
                        {days[i]}
                    </div>
                </div>
            );
        }
        return result;
    }

    private GetDayColumnLayout() : ReactGridLayout.Layout[] {
        const result = Array < ReactGridLayout.Layout > ();
        for (let j = 0; j < 8; j++) {
            result.push({
                h: 1,
                i: ("d" + j),
                w: 2,
                x: 0,
                y: j
            });
        }
        return result;
    }

}