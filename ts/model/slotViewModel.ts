import { IRawSlot, RawSlot } from "./rawSlot";

export interface ISlotViewModel {
    Uid: number; //
    CurrentChoice: number; // zero-based index
    SubjectCode: string;
    SubjectName: string;
    Type: string;
    Group: string[];
    Day: string;
    TimePeriod: string;
    WeekNumber: string[];
    Room: string[];
}

export function CreateSlotViewModel(rawSlot: RawSlot): ISlotViewModel {
    const group = rawSlot.Group.split("/");
    return {
        Uid:            rawSlot.Uid,
        CurrentChoice: 0,
        SubjectCode:   rawSlot.SubjectCode,
        SubjectName:   rawSlot.SubjectName,
        Type:          rawSlot.Type,
        Group:         group,
        Day:           rawSlot.Day,
        TimePeriod:    rawSlot.TimePeriod,
        WeekNumber:    rawSlot.WeekNumber.split("/"),
        Room:          rawSlot.Room.split("/")
    };
}

export function CreateSlotViewModels(rawSlots: RawSlot[]): ISlotViewModel[] {
    return rawSlots.map(CreateSlotViewModel);
}