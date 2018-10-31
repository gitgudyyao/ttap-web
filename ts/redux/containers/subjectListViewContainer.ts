import {
    connect
} from "react-redux";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    ToggleIsOpenOfSubjectListView
} from "../actions/toggleIsOpenOfSubjectListView";
import { ToggleSetTimeConstraintView } from "../actions/toggleSetTimeConstraintView";
import {
    UpdateSlotsTableState
} from "../actions/updateSlotsTableState";
import {
    UpdateTotalState
} from "../actions/updateTotalState";
import {
    ISubjectListState} from "../reducers/subjectListState";
import {
    ISubjectListViewDispatchProps,
    SubjectListView,
    ISubjectListViewStateProps
} from "./../../react/subjectListView";
import {
    NotifyIfTimetableIsFound
} from "./../actions/notifyIfTimetableIsFound";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import {
    ToggleLoadingBar
} from "./../actions/toggleLoadingBar";
import { ToggleIsEnabledOfAlgorithmVisualizer } from "../actions/toggleIsEnabledOfAlgorithmVisualizer";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";
import { ToggleIsOpenOfAlgorithmVisualizerView } from "../actions/toggleIsOpenOfAlgorithmVisualizerView";
import { IMasterState } from "../reducers/masterState";

const mapStateToProps = (state): ISubjectListViewStateProps => {
    const masterState = state.MasterStateReducer as IMasterState;
    const target = masterState.SubjectListState as ISubjectListState;
    return {
        ClashingSubjectPairs: target.ClashingSubjectPairs,
        IsOpen: target.IsOpen,
        IsShowingLoadingBar: target.IsShowingLoadingBar,
        IsShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        SearchedText: target.SearchedText,
        Subjects: target.Subjects,
        IsAlgorithmVisualizerEnabled: masterState.AlgorithmVisualizerState.isEnabled
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => {
            dispatch(new ToggleIsOpenOfSubjectListView(false));
            dispatch(new HideSnackbar());
            dispatch(new UpdateSlotsTableState());
            dispatch(new ToggleSetTimeConstraintView(true));
        },
        handleSearch: (searchedText: string) => {
            dispatch(new SearchSubjectList(searchedText));
            dispatch(new HideSnackbar());
        },
        handleSelection: (subjectIndex: number) => {
            dispatch(new ToggleLoadingBar(true));
            dispatch(new ToggleIsOpenOfAlgorithmVisualizerView(true));
            setTimeout(() => {
                dispatch(new ToggleSubjectSelection(subjectIndex));
                dispatch(new ToggleLoadingBar(false));
                dispatch(new NotifyIfTimetableIsFound());
                dispatch(new UpdateTotalState());
            }, 0);
        },
        handleToggleView: () => dispatch(new ToggleSubjectListViewingOptions()),
        handleToggleIsEnabledOfFindTimetableVisualization: () => dispatch(new ToggleIsEnabledOfAlgorithmVisualizer()),
        handleHideFindTimetableVisualization: () => dispatch(new ToggleIsEnabledOfAlgorithmVisualizer(false)),
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);
