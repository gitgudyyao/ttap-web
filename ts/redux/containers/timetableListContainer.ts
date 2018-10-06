import {connect} from "react-redux";
import {ITimetableListViewDispatchProps, ITimetableListViewStateProps, TimetableListView} from "../../react/timetableListView";
import {GoToRandomTimetable} from "../actions/goToRandomTimetable";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {ToggleIsOpenOfSlotsTable} from "../actions/toggleIsOpenOfSlotsTable";
import {ToggleIsOpenOfSummary} from "../actions/toggleIsOpenOfSummary";
import {ITimetableListState} from "../reducers/timetableListState";
import { ISlotViewModel } from "./../../model/slotViewModel";
import {GoToNextTimetable} from "./../actions/goToNextTimetable";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import {SelectSlotChoice} from "./../actions/selectSlotChoice";
import {ShowAlternateSlot} from "./../actions/showAlternateSlot";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state) : ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const index = timetableListState.CurrentIndex;
    return {
        currentIndex:       index,
        currentTimetable:   timetableListState.FiltrateTimetables[index],
        isSummaryOpen:      timetableListState.IsSummaryOpen,
        maxIndex:           timetableListState.FiltrateTimetables.length - 1,
        slotViewModelStore: timetableListState.SlotViewModelStore,
        alternateSlots:     timetableListState.AlternateSlots
    };
};

const mapDispatchToProps = (dispatch) : ITimetableListViewDispatchProps => {
    return {
        handleGoToNext:                  () => dispatch(new GoToNextTimetable()),
        handleGoToPrevious:              () => dispatch(new GoToPrevTimetable()),
        handleGoToRandom:                () => dispatch(new GoToRandomTimetable()),
        handleOpenSaveTimetableDialog:   () => dispatch(new ToggleIsOpenOfSaveDialog(true)),
        handleOpenSetTimeConstraintView: () => dispatch(new ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable:            () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleToggleIsOpenOfSummary:     () => dispatch(new ToggleIsOpenOfSummary()),
        handleShowAlternateSlot:         (s: ISlotViewModel) => dispatch(new ShowAlternateSlot(s)),
        handleSelectSlotChoice:          (slotUid: number, newSlotChoice : number) => dispatch(new SelectSlotChoice(slotUid, newSlotChoice)),
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
